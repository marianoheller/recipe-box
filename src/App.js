import React, { Component } from 'react';
import {reactLocalStorage} from 'reactjs-localstorage';

import ViewRecipe from './components/ViewRecipe';
import EditRecipe from './components/EditRecipe';
import { initState} from './config';
import './App.css';

export default class AppContainer extends Component {

  constructor(props) {
    super(props);

    // localStorage.clear();
    const localSto = reactLocalStorage.get('recipes');
    if ( localSto === undefined ) {
      console.log("Initial localstorage set");
      reactLocalStorage.set( "recipes" ,JSON.stringify(initState.recipes) );
      reactLocalStorage.set( "nextID" , initState.nextID );
      this.state = initState;
    }
    else {
      console.log("Loaded from memory");
      const recipes = JSON.parse(localSto);
      this.state = {
        ...initState,
        recipes: recipes,
        nextID: reactLocalStorage.get("nextID"),
      }
    }
  }

  onRecipeClick(id) {
    return function changeShowingID() {
      this.setState( {
        ...this.state,
        showingId: id,
      });
    }.bind(this);
  }

  toggleAddRecipe() {
    this.setState( {
      ...this.state,
      addingRecipe: !this.state.addingRecipe,
    })
  }

  onAddRecipe(recipe) {
    return function () {
      let { recipes, nextID } = this.state;
      if( recipe !== undefined) {
        recipes = recipes.filter( (r) => r.id !== recipe.nextID )
        const newRecipe = {
          ...recipe,
          id: recipe.nextID,
          ingredients: recipe.ingredients.split(",").map( (e) => e.trim() ),
        };
        recipes.push(newRecipe);
      }
      reactLocalStorage.set( "recipes" , JSON.stringify(recipes) );
      reactLocalStorage.set( "nextID" , recipe!==undefined ? String(parseInt(nextID)+1) : nextID );
      this.setState( {
        ...this.state,
        nextID: recipe!==undefined ? String(parseInt(nextID)+1) : nextID,
        recipes: recipes,
        addingRecipe: false,
      });
    }.bind(this);
  }

  deleteRecipe(id) {
    return function() {
      const recipes = this.state.recipes.filter( (r) => r.id !== id )
      reactLocalStorage.set( "recipes" , JSON.stringify(recipes) );
      this.setState( {
        ...this.state,
        recipes: recipes,
      })
    }.bind(this);
  }

  onEditRecipe(id) {
    return function() {
      this.setState( {
        ...this.state,
        addingRecipe: true,
        showingId: undefined,
        editingRecipe: this.state.recipes.find( (e) => e.id===id),
      })
    }.bind(this);
  }
  

  render() {
    const { recipes, showingId, nextID, editingRecipe } = this.state;
    const recipeToShow = recipes.find( (e) => e.id === showingId);

    return (
      <App 
      title = {"Recipe Box"}
      recipeToShow = {recipeToShow}
      recipes = {recipes}
      onRecipeClick = {this.onRecipeClick.bind(this)}
      deleteRecipe = {this.deleteRecipe.bind(this)}
      nextID = {nextID}
      onEditRecipe = {this.onEditRecipe.bind(this)}
      editingRecipe = { editingRecipe }
      
      addingRecipe = {this.state.addingRecipe}
      onAddRecipe = {this.onAddRecipe.bind(this)}
      toggleAddRecipe = {this.toggleAddRecipe.bind(this)}
      />
    )
  }
}





export class App extends Component {

  render() {
    const { 
      recipeToShow, 
      onRecipeClick,
      deleteRecipe,
      nextID,
      onEditRecipe,
      editingRecipe,

      addingRecipe,   //State
      onAddRecipe,    //Add recipe final
      toggleAddRecipe,   //button addRecipe
    } = this.props;

    
    const recipes = this.props.recipes.sort( (r1,r2) => {
      return parseInt(r1.id) - parseInt(r2.id);
    }).map( (e,i) => {
      return (
        <tr key={i} onClick={onRecipeClick(e.id)} >
          <td>{e.name}</td>
        </tr>
      )
    });


  
    return (
      <div className="container">
        <div className="header">
          <h1>{this.props.title}</h1>
          <button className="button-primary" onClick={toggleAddRecipe}>Add recipe</button>
        </div>
        <div className="content">

          <ViewRecipe 
          recipeToShow= {recipeToShow}
          onRecipeClick= {onRecipeClick}
          deleteRecipe = {deleteRecipe}
          editRecipe = {onEditRecipe}
          />
          <EditRecipe 
          addingRecipe={addingRecipe}
          onAddRecipe={onAddRecipe}
          nextID = {nextID}
          recipeToEdit = {editingRecipe}
          />

          <table className="u-full-width">
            <thead>
              <tr>
                <th>Recipes</th>
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
