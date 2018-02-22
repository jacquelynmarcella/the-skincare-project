import React, { Component } from 'react';

class ProductAction extends Component {
  constructor(props){
    super(props);
  }

  handleClick = (event) => {
    console.log("event target name",event.target.name);
    this.props.handleClick(event);
  }

  render(){

    var productClass;
    if (this.props.userProductCategory === this.props.type) {
      productClass = "selectedCategory" 
    }
    else {
      productClass = "defaultCategory";
    }

    return(
      <button onClick={this.handleClick} name={this.props.type} className={productClass}>{this.props.type}</button>
    )
  }
}

export default ProductAction;