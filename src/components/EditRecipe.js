import React, { Component } from 'react'
import Modal from 'react-modal';
import { Form, Text, Textarea } from 'react-form'

import { customStyle } from '../config';


export default class EditRecipe extends Component {
    render() {
        const { onAddRecipe, addingRecipe } = this.props;
        
        const modalAddRecipe = (
        <Modal
        isOpen={ addingRecipe }
        contentLabel="Modal"
        style={customStyle}
        >
            <div className="modal">
            <h1>New recipe</h1>
            <Form
            onSubmit={(values) => {
                onAddRecipe(values)();
            }}
            >
            {({ values, submitForm, addValue, removeValue, getError }) => {
        
            return (
                <form onSubmit={submitForm} className="u-full-width">
                <div>
                    <Text // This is the built-in Text formInput 
                    field='name' // field is a string version of the field location 
                    placeholder='Recipe name' // all other props are sent through to the underlying component, in this case an <input /> 
                    required
                    />
                    <Textarea 
                    field='ingredients'
                    placeholder='Ingredients separated by commas'
                    required
                    />
                </div>
                <div className="modal-buttons">
                    <div className="u-pull-left">
                        <button onClick={onAddRecipe(undefined)}>Close</button>
                    </div>
                    <div className="u-pull-right">
                        <button type="submit" className="button-primary">Add Recipe</button>
                    </div>
                </div>
                </form>
            )}} 
            </Form>
            </div>
        </Modal>
        );


        return(
            <div>
                {modalAddRecipe}
            </div>
        )
    }
}