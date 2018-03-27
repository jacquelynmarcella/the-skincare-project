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
      userProductCategory: '',
      data: ''
    }
  }

  checkMatch() {
    if (this.props.userProducts.length > 0) {
      var match = this.props.userProducts.find(o => o.cosdna === this.props.match.params.cosdna);
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
    else {
      this.setState({
        userProductCategory: 'notsaved'
      })
    }
  }

  findProduct = () => {
    let base = this;
    axios.post('/products/ingredients',{
      data: base.props.match.params.cosdna
    }).then(response => {
      console.log(response,"from findProduct");
      base.setState({
        data: response.data
      })
    }).catch(err => {
      console.log('Error:', err)
    })
  }

  componentDidMount() {
    this.findProduct();
    this.checkMatch();
    console.log(this.props.match.params.cosdna,"cosdna from params");
    console.log(this.state);
  }

  handleClick = (event) => {
    let selected = {
      name: this.state.data.name,
      ingredients: this.state.data.ingredients,
      category: event,
      user: this.props.user.id,
      cosdna: this.state.data.cosdna
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

    var actionButtons;

    if(this.props.user){
      actionButtons = (
        <div>
          <ProductAction handleClick={this.handleClick} userProductCategory={this.state.userProductCategory} type="favorite" size="icon-large" />
          <ProductAction handleClick={this.handleClick} userProductCategory={this.state.userProductCategory} type="fail" size="icon-large" /> 
          <ProductAction handleClick={this.handleClick} userProductCategory={this.state.userProductCategory} type="watch" size="icon-large" />
        </div>
      )
    }

    if(this.state.userProductCategory && this.state.data){
      return(
         <div className="display">
          <header>
            <h1 className="title">
              <img src="/img/product1.png" alt="Product icon" className="title-image" />
              {this.state.data.name}
            </h1>
            <hr />
            {actionButtons}
          </header>
          <IngredientSummary ingredients={this.state.data.ingredients} user={this.props.user} handleFlag={this.handleFlag} userIngredients={this.props.userIngredients} />
          <IngredientTable ingredients={this.state.data.ingredients} user={this.props.user} userIngredients={this.props.userIngredients} handleFlag={this.handleFlag} tableClass="product" />
        </div>
      )
    }
    else {
      return <Loading />
    }
  }
}

export default Display;
