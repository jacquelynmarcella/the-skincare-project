import React, { Component } from 'react';
import FA from 'react-fontawesome';

// import fail from '../img/fail.png';
// import failSelected from '../img/fail-selected.png';
// import favorite from '../img/favorite.png';
// import favoriteSelected from '../img/favorite-selected.png';
// import watch from '../img/watch.png';
// import watchSelected from '../img/watch-selected.png';
// Not importing images here because we are conditionally rendering images based on the prop passed in, so these work a bit differently

class ProductAction extends Component {
  constructor(props){
    super(props);
  } 

  handleClick = (event) => {
    this.props.handleClick(this.props.type);
  }

  render(){

    if (this.props.userProductCategory === this.props.type) {
      return(
        <button aria-label={this.props.type} onClick={this.handleClick}>
          <img src={require('../img/' + this.props.type + '-selected.png')} alt={this.props.type} className={this.props.size} />
        </button>
      )
    }
    else {
      return (
        <button aria-label={this.props.type} onClick={this.handleClick}>
          <img src={require('../img/' + this.props.type + '.png')} alt={this.props.type} className={this.props.size} />
        </button>
      )
    }
  }
}

export default ProductAction;