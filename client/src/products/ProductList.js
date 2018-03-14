import React, { Component } from 'react';
import ProductAction from './ProductAction.js'

class ProductList extends Component {
  constructor(props){
    super(props);
  }

  handleClick = (event) => {
    this.props.handleClick(this.props.product);
  }

  handleChange = (event) => {
    let selected = {
      name: this.props.product.name,
      ingredients: this.props.product.ingredients,
      category: event,
      user: this.props.user.id,
      cosdna: this.props.product.cosdna
    }
    this.props.handleChange(selected);
  }

  render(){
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

export default ProductList;
