import React, { Component } from 'react';
import FA from 'react-fontawesome';

class ProductAction extends Component {
  constructor(props){
    super(props);
  }

  handleClick = (event) => {
    this.props.handleClick(this.props.type);
  }

  render(){

    var productClass;
    var iconType;
    if (this.props.userProductCategory === this.props.type) {
      productClass = "selectedCategory" 
    }
    else {
      productClass = "defaultCategory";
    }

    if (this.props.type === "favorite") {
    	iconType = <FA name="heart" />;
    }
    else if (this.props.type === "fail") {
    	iconType = <FA name="thumbs-down" />;
    }
    else if (this.props.type === "watch") {
    	iconType = <FA name="bookmark" />;
    }

    return(
      <button aria-label={this.props.type} onClick={this.handleClick} className={productClass} alt={this.props.type}>{iconType}</button>
    )
  }
}

export default ProductAction;