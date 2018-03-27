import React, { Component } from 'react';
import ProductAction from './ProductAction.js'
import { Redirect } from 'react-router-dom';

class ProductList extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected: ''
    }
  }

  handleClick = (event) => {
    let selected = '/products/' + this.props.product.cosdna;
    console.log(selected);
    // this.setState({
    //   selected: selected
    // })
  }

  handleChange = (event) => {
    let changed = {
      name: this.props.product.name,
      ingredients: this.props.product.ingredients,
      category: event,
      user: this.props.user.id,
      cosdna: this.props.product.cosdna
    }
    this.props.handleChange(changed);
  }

  render(){
    if(this.state.selected){
      <Redirect to={this.state.selected} />
    }
    else {
      return(
        <div className="productListItem">
            <button className="productTitle" onClick={this.handleClick}>{this.props.product.name}</button>
            <ProductAction handleClick={this.handleChange} userProductCategory={this.props.product.category} type="favorite" />
            <ProductAction handleClick={this.handleChange} userProductCategory={this.props.product.category} type="fail" /> 
            <ProductAction handleClick={this.handleChange} userProductCategory={this.props.product.category} type="watch" /> 
        </div>
      )     
    }

  }
}

export default ProductList;
