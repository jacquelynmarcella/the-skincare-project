import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import Loading from '../layout/Loading.js';

class Results extends Component {
  constructor(props){
    super(props);
    this.state = {
      results: '',
      status: 'complete',
      selected: ''
    }
  }

  searchProducts = () => {
    let base = this;
    axios.post('/products/search',{
      data: this.props.match.params.product  
    }).then(response => {
      console.log(response);
      base.setState({
        results: response.data,
        status: 'found'
      })
      // To do: if length is 0 then we need to go back to search and say no results!
    }).catch(err => {
      console.log('Error:', err)
    })
  }

  handleClick = (e) => {
    let address = '/products/' + e.target.id;
    this.setState({
      status: 'selected',
      selected: address
    })
  }

  componentDidMount() {
    this.searchProducts();
  }

  render(){
    var display;
    var length = this.state.results.length;

    if(length > 0) {
      display = this.state.results.map((product, index) => (
        <button key={index} id={product.cosdna} className="productResult" onClick={(e) => this.handleClick(e)}>{product.name}</button>)
      );
    }

    if(this.state.status === 'found') {
      return(
        <div className="results">
          <img src="/img/three-products.png" alt="Product icons" className="title-image" />
          <h1>{this.props.match.params.product}</h1>
          <h3>{length} products found</h3>
          <hr />
            {display}
        </div>
      );
    }
    else if(this.state.status === 'selected') {
      return <Redirect to={this.state.selected} />
    }
    else {
      return <Loading />
    }
    
  }
}

export default Results;
