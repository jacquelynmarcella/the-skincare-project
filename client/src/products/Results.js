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
      cosdnaId: event.target.id
    }
    this.props.handleSelect(selected);
  }

  render(){
    var display = this.props.results.map((product, index) => {
      return <button className="productResult" onClick={this.handleClick} id={product.cosdnaId} name={product.name}>{product.name}</button>
    });

    var length = this.props.results.length;

    return(
          <div>
            <h2>Product name results</h2>
            <h3>{length} products found</h3>
              {display}
          </div>
      );
  }
}

export default Results;
