import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../layout/Loading.js'

import ProductAction from './ProductAction.js'
import IngredientTable from '../ingredients/IngredientTable.js'
import IngredientSummary from '../ingredients/IngredientSummary.js'

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

  handleBack = (event) => {
  }

  render(){

    if(this.state.userProductCategory){
      return(
         <div className="display">
            <h1 className="title">{this.props.data.name}</h1>
            <center>
            <hr />
              <ProductAction handleClick={this.handleClick} userProductCategory={this.state.userProductCategory} type="favorite" />
              <ProductAction handleClick={this.handleClick} userProductCategory={this.state.userProductCategory} type="fail" /> 
              <ProductAction handleClick={this.handleClick} userProductCategory={this.state.userProductCategory} type="watch" />
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
