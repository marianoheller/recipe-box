import React, { Component } from 'react'
import Modal from 'react-modal';

import { customStyle } from '../config';


export default class ViewRecipe extends Component {
    render() {
        const { recipeToShow, onRecipeClick, deleteRecipe, editRecipe } = this.props;
        
        const modalRecipe = (
        <Modal
        isOpen={ recipeToShow !== undefined}
        contentLabel="Modal"
        style={customStyle}
        >
            <div className="modal">
            <h1>{ recipeToShow ? recipeToShow.name : ""}</h1>
            <ul className="modal-ingredients">
                {recipeToShow ? recipeToShow.ingredients.map( (ingre,i) => <li key={i}>{ingre}</li> ) : ""}
            </ul>
            <div className="modal-buttons">
                <div className="u-pull-left">
                    <button onClick={onRecipeClick(undefined)}>Close</button>
                </div>
                <div className="u-pull-right">
                    <button className="button-danger" onClick={deleteRecipe(recipeToShow ? recipeToShow.id : null)}>Delete</button>
                    <button onClick={editRecipe(recipeToShow ? recipeToShow.id : undefined)}>Edit</button>
                </div>
            </div>
            </div>
        </Modal>
        );


        return(
            <div>
                {modalRecipe}
            </div>
        )
    }
}