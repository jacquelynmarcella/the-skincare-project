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
    let imageUrl = '/img/' + this.props.type + '.png';

    if (this.props.userProductCategory === this.props.type) {
      imageUrl = '/img/' + this.props.type + '-selected.png';
    }

    return(
      <button aria-label={this.props.type} onClick={this.handleClick}>
        <img src={imageUrl} alt={this.props.type} className={this.props.size} />
      </button>
    )
  }
}

export default ProductAction;