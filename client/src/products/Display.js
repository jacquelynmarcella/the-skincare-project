import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../layout/Loading.js'

import ProductAction from './ProductAction.js'
import IngredientTable from '../ingredients/IngredientTable.js'

class IngredientSummary extends Component {
  constructor(props){
    super(props);
  }

  render(){
    var acneCount = 0;
    var acneIngredients = [];
    var acneList;

    var irritantCount = 0;
    var irritatingIngredients = [];
    var irritationList;

    var flagCount = 0;
    var flaggedIngredients = [];
    var flaggedList;

    this.props.ingredients.forEach((ingredient) => {
      if (parseInt(ingredient.acne) && parseInt(ingredient.acne) > 0) {
        acneIngredients.push(ingredient);
        acneCount++;
      }
      if (parseInt(ingredient.irritant) && parseInt(ingredient.irritant) > 0) {
        irritatingIngredients.push(ingredient);
        irritantCount++;
      }
      if (this.props.userIngredients && this.props.userIngredients.length > 0) {
        let match = this.props.userIngredients.find(o => o.name === ingredient.name);
        if (match){
          flaggedIngredients.push(ingredient);
          flagCount++;
        }
      }
    });

    if (acneIngredients.length > 0) {
      acneList = acneIngredients.map((ingredient, index) => {
        return <span className="ingredientBadge">{ingredient.name}</span>
      })
    }

    if (irritatingIngredients.length > 0) {
      irritationList = irritatingIngredients.map((ingredient, index) => {
        return <span className="ingredientBadge">{ingredient.name}</span>
      })
    }

    if (flaggedIngredients.length > 0) {
      flaggedList = flaggedIngredients.map((ingredient, index) => {
        return <span className="ingredientBadge">{ingredient.name}</span>
      })
    }

    return (
      <div className="flex">
        <div className="summary">
          <h2>Ingredients you've flagged that are in this product</h2>
          <h1>{flagCount}</h1>
          <p>{flaggedList}</p>
        </div>
        <div className="summary">
          <h2>Potential acne causing ingredients</h2>
          <h1>{acneCount}</h1>
          <p>{acneList}</p>
        </div>
        <div className="summary">
          <h2>Potential irritating ingredients</h2>
          <h1>{irritantCount}</h1>
          <p>{irritationList}</p>
        </div>
      </div>
    )
  }
}

class Display extends Component {
  constructor(props){
    super(props);
    this.state = {
      userProductCategory: ''
    }
  }

  checkMatch() {
    if (this.props.userProducts) {
      var match = this.props.userProducts.find(o => o.cosdna === this.props.data.cosdna);
      console.log("match info",match);
      if (match) {
        this.setState({
          userProductCategory: match.category
        })
      }
      else {
        this.setState({
          userProductCategory: 'notsaved'
        })
      }
    }  
  }

  componentDidMount(){
    this.checkMatch();
    console.log(this.state);
  }

  handleClick = (event) => {
    let selected = {
      name: this.props.data.name,
      ingredients: this.props.data.ingredients,
      category: event,
      user: this.props.user.id,
      cosdna: this.props.data.cosdna
    }
    let base = this;
    axios.post('/user/products',{
      data: selected
    }).then(response => {
      console.log("from backend",response);
      if (response.data === "deleted") {
        base.setState({
          userProductCategory: 'notsaved'
        })
      }
      else {
        base.setState({
          userProductCategory: response.data.category
        })
        console.log(this.state);
      }
    }).catch(err => {
      console.log('Error:', err)
    })
  }

  handleFlag = (event) => {
    let selected = {
      name: event.name,
      user: this.props.user.id,
      cosdna: event.cosdna,
      ingredientFunction: event.ingredientFunction,
      acne: event.acne,
      irritant: event.irritant,
      safety: event.safety
    }
    console.log(selected,"In parent");
    let base = this;
    axios.post('/user/ingredients',{
      data: selected
    }).then(response => {
      console.log("from backend",response);
    }).catch(err => {
      console.log('Error:', err)
    })
  }

  render(){

    if(this.state.userProductCategory){
      return(
         <div className="display">
            <h1 className="title">{this.props.data.name}</h1>
            <center>
              <ProductAction handleClick={this.handleClick} userProductCategory={this.state.userProductCategory} type="favorite" />
              <ProductAction handleClick={this.handleClick} userProductCategory={this.state.userProductCategory} type="fail" /> 
              <ProductAction handleClick={this.handleClick} userProductCategory={this.state.userProductCategory} type="watch" />
            <hr /> 
            </center>
            <IngredientSummary ingredients={this.props.data.ingredients} user={this.props.user} handleFlag={this.handleFlag} userIngredients={this.props.userIngredients} />
            <IngredientTable ingredients={this.props.data.ingredients} user={this.props.user} userIngredients={this.props.userIngredients} handleFlag={this.handleFlag} tableClass="product" />
        </div>
      )
    }
    else {
      return <Loading />
    }
  }
}

export default Display;
