import React, { Component } from 'react'
import * as Yup from 'yup'
import {Formik, Field, Form} from 'formik'
import Table from 'react-bootstrap/Table'

const formSchema = Yup.object().shape({
    "poke": Yup.string().required("Required"),


})

const initialValues = {
    poke: ''
}

export default class Pokemon extends Component {

    constructor() {
        super();
        this.state={
            poke: {},
            notPoke : false
        };
    }

    handleSubmit=({poke})=>{
        fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`)
            .then(result=>result.json())
            .then(data=>{
                this.setState({
                    poke: data, notPoke: false }, ()=>console.log(this.state.poke))
            })
            .catch(error=>{console.log(error)}); this.setState({notPoke:true})
    }

    render() {
        return (
            <div>
                <h1>Who's That Pokemon???</h1>
                {this.state.notPoke ? <small style={{color:"red"}}>This is not a Pokemon!</small>:""}
                <Formik initialValues={initialValues}
                        validationSchema={formSchema}
                        onSubmit={
                            (values, {resetForm})=>{
                                
                                
                                this.handleSubmit(values);
                                resetForm(initialValues);
                                

                            }
                            
                        }>
                            {
                                ({errors, touched})=>(
                                    <Form>
                                        <label htmlFor="poke" className="form-label">Enter a Pokemon:</label>
                                        <Field name="poke" className="form-control"/>
                                        {errors.poke && touched.poke ? (<div style={{color:'red'}}>{errors.poke}</div>):null}
                                        
                                        <button type="submit" className="btn btn-primary">Catch 'em</button>
                                    </Form>
                                )
                            }


                </Formik>
                
                {this.state.poke.name?.length > 0 ?        
                <Table striped bordered hover>
                
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>HP</th>
                    <th>Attack</th>
                    <th>Defense</th>                    
                    <th>Image</th>                    
                    
                    </tr>
                </thead>
                <tbody>
                    
                            {
                                <tr>
                                    <td>{this.state.poke.name}</td>
                                    
                                    <td>{this.state.poke.stats[0].base_stat}</td>
                                    <td>{this.state.poke.stats[2].base_stat}</td>
                                    <td>{this.state.poke.stats[1].base_stat}</td>
                                    <td><img src={this.state.poke.sprites.front_shiny} alt="pokemon image"/></td>
                                </tr>
                            }

                   
                    
                    
                    
                    
                </tbody>
            
                </Table>
                    :" "}

            </div>
        )
    }
}