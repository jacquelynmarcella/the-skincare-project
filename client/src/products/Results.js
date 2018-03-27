import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Results extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (event) => {
    event.preventDefault();
    let selected = {
      name: event.target.name,
      cosdna: event.target.id
    }
    this.props.handleSelect(selected);
  }

  render(){
    var display;
    var length = this.props.results.length;

    if(length > 0) {
      display = this.props.results.map((product, index) => (
        <Link to={`/products/${product.cosdna}`} className="productResult">{product.name}
          </Link>)      
      );
    }

    return(
          <div className="results">
            <img src="/img/three-products.png" alt="Product icons" className="title-image" />
            <h1>{this.props.searchTerm}</h1>
            <h3>{length} products found</h3>
            <hr />
              {display}
          </div>
      );
  }
}

export default Results;
