import React, { Component } from 'react';
import ProductAction from './ProductAction.js'
import { Link } from 'react-router-dom';

class ProductList extends Component {
  constructor(props){
    super(props);
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
    let linkUrl = "/products/" + this.props.product.cosdna;

      return(
        <div className="productListItem">
            <Link to={linkUrl}><button className="productTitle">{this.props.product.name}</button></Link>
            <ProductAction handleClick={this.handleChange} userProductCategory={this.props.product.category} type="favorite" />
            <ProductAction handleClick={this.handleChange} userProductCategory={this.props.product.category} type="fail" /> 
            <ProductAction handleClick={this.handleChange} userProductCategory={this.props.product.category} type="watch" /> 
        </div>
      )     

  }
}

export default ProductList;
