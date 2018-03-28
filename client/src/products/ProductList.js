import React, { Component } from 'react';
import ProductAction from './ProductAction.js'
import { Link } from 'react-router-dom';

class ProductListItem extends Component {
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
            <Link to={linkUrl} className="productTitle"><button>{this.props.product.name}</button></Link>
            <ProductAction handleClick={this.handleChange} userProductCategory={this.props.product.category} type="favorite" size="icon-small" />
            <ProductAction handleClick={this.handleChange} userProductCategory={this.props.product.category} type="fail" size="icon-small" /> 
            <ProductAction handleClick={this.handleChange} userProductCategory={this.props.product.category} type="watch" size="icon-small" /> 
        </div>
      )     
  }
}




class ProductList extends Component {
  render(){

    var productList;

    if (this.props.products.length > 0){
      productList = this.props.products.map((product, index) => {

        if(product.category === this.props.category) {
          return (
            <ProductListItem product={product} handleClick={this.props.handleClick} user={this.props.user} handleChange={this.props.handleChange} />
          );
        }
    
      }); 
    }
    else {
      productList = <center><p>No products added.</p></center>
    }

    return(
      <div>
        {productList}
      </div>
    )
  }
}

export default ProductList;
