import React, { Component } from 'react';
import Modal from 'react-modal';
import './App.css';

export default class AppContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showingId: null,
      recipes: [
        {
          id: 1,
          name: "asd",
          ingredients: [
            "a",
            "b",
            "c",
          ]
        },
        {
          id: 2,
          name: "qwe",
          ingredients: [
            "q",
            "dº",
            "c",
          ]
        },
      ],

    }
  }

  onRecipeClick(id) {
    return function changeShowingID() {
      console.log(id);
      this.setState( {
        ...this.state,
        showingId: id,
      });
    }.bind(this);
  }

  closeModal() {
    this.setState( {
      ...this.state,
      showingId: undefined,
    })
  }
  

  render() {
    const { recipes, showingId } = this.state;
    const recipeToShow = recipes.find( (e) => e.id === showingId);

    return (
      <App 
      title = {"Recipe Box"}
      recipeToShow = {recipeToShow}
      recipes = {recipes}
      onRecipeClick = {this.onRecipeClick.bind(this)}
      closeModal = {this.closeModal.bind(this)}
      />
    )
  }
}

export class App extends Component {

  render() {
    const { recipeToShow, onRecipeClick, closeModal } = this.props;
    const recipes = this.props.recipes.map( (e,i) => {
      return (
        <tr key={i} onClick={onRecipeClick(e.id)} >
          <td>{e.name}</td>
          <td>{e.ingredients.length}</td>
        </tr>
      )
    });

    const customStyle = {
      overlay: {
        position          : 'absolute',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(220, 220, 220, 0.5)'
      },
      content : {
        top                   : '30%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    }

    return (
      <div className="container">
        <div className="header">
          <h1>{this.props.title}</h1>
        </div>
        <div className="content">
          <Modal
          isOpen={ recipeToShow !== undefined}
          contentLabel="Modal"
          style={customStyle}
          >
            <div className="modal">
              <h1>{ recipeToShow ? recipeToShow.name : ""}</h1>
              <ul>
                {recipeToShow ? recipeToShow.ingredients.map( (ingre,i) => <li key={i}>{ingre}</li> ) : ""}
              </ul>
              <button onClick={closeModal}>Close</button>
            </div>
          </Modal>
          <table className="u-full-width">
            <thead>
              <tr>
                <th>Recipe Name</th>
                <th>Ingredients</th>
              </tr>
            </thead>
            <tbody>
              {recipes}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
