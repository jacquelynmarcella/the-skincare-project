import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import IngredientTable from '../ingredients/IngredientTable.js'


class IngredientSummary extends Component {
  constructor(props){
    super(props);
  }

  handleFlag = (event) => {
    console.log("event",event);
    this.props.handleFlag(event);
  }

  render(){
    var acneCount = 0;
    var acneIngredients = [];
    var acneList;
    var irritantCount = 0;
    var irritatingIngredients = [];
    var irritationList;

    this.props.ingredients.forEach((ingredient) => {
      if (parseInt(ingredient.acne) && parseInt(ingredient.acne) > 0) {
        acneIngredients.push(ingredient);
        acneCount++;
      }
      if (parseInt(ingredient.irritant) && parseInt(ingredient.irritant) > 0) {
        irritatingIngredients.push(ingredient);
        irritantCount++;
      }
    });

    if (acneIngredients.length > 0) {
      acneList = acneIngredients.map((ingredient, index) => {
        return <span>{ingredient.name} <button onClick={() => this.handleFlag(ingredient)} id={ingredient.cosdnaIngId} name={ingredient.name}>Flag</button></span>
      })
    }

    if (irritatingIngredients.length > 0) {
      irritationList = irritatingIngredients.map((ingredient, index) => {
        return <span>{ingredient.name} <button onClick={() => this.handleFlag(ingredient)} id={ingredient.cosdnaIngId} name={ingredient.name}>Flag</button></span>
      })
    }

    return (
      <div>
        <p>{acneCount} that may cause acne</p>
        <p>{acneList}</p>
        <p>{irritantCount} that may be irritating</p>
        <p>{irritationList}</p>
      </div>
    )
  }
}

class Display extends Component {
  constructor(props){
    super(props);
    this.state = {
      userProducts: '',
      userIngredients: ''
    }
  }

  handleClick = (event) => {
    event.preventDefault();
    let selected = {
      name: this.props.data.name,
      ingredients: this.props.data.ingredients,
      category: event.target.id,
      user: this.props.user.id,
      cosdnaId: this.props.data.cosdnaId
    }
    console.log(selected,"In child");
    let base = this;
    axios.post('/user/products/add',{
      data: selected
    }).then(response => {
      console.log("from backend",response);
      // No page action needed here, thinking just change button classes to reflect what's added
    }).catch(err => {
      console.log('Error:', err)
    })
  }

  handleFlag = (event) => {
    let selected = {
      name: event.name,
      user: this.props.user.id,
      cosdnaIngId: event.cosdnaIngId,
      ingredientFunction: event.ingredientFunction,
      acne: event.acne,
      irritant: event.irritant,
      safety: event.safety
    }
    console.log(selected,"In parent");
    let base = this;
    axios.post('/user/ingredients/add',{
      data: selected
    }).then(response => {
      console.log("from backend",response);
    }).catch(err => {
      console.log('Error:', err)
    })
  }

    //Doing axios call here to make this component more reusable, this should be a somewhat standalone!
    // To do: some kind of "tooltip" to show more info on what each type is intended to be used for
    // to do: if no user, buttons should do smoething different or not be visible
    // To do: button classes reflect status in Database. If not doing a call, we should check this... figure out how to pass this through from both sides to make this work

  render(){
    return(
          <div>
            <h1>{this.props.data.name}</h1>
            <button onClick={this.handleClick} id="favorite">Favorites</button>
            <button onClick={this.handleClick} id="fail">Fails</button>
            <button onClick={this.handleClick} id="watch">Watchlist</button>
            <p>Matching flags</p>
            <IngredientSummary ingredients={this.props.data.ingredients} user={this.props.user} handleFlag={this.handleFlag} />
            <IngredientTable ingredients={this.props.data.ingredients} user={this.props.user} handleFlag={this.handleFlag} />
          </div>
      );
  }
}

export default Display;
