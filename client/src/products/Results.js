import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import Loading from '../layout/Loading.js';
import threeproducts from '../img/three-products.png';

class Results extends Component {
  constructor(props){
    super(props);
    this.state = {
      results: '',
      status: 'loading',
      selected: ''
    }
  }

  searchProducts = () => {
    let base = this;
    this.setState({
      results: '',
      status: 'loading'
    })
    if(this.props.name){
      axios.post('/products/search',{
        data: base.props.name  
      }).then(response => {
        console.log(response);
        if(response.data === "Data source error"){
          base.setState({
            status: 'dataSourceError'
          })
        }
        else {
          base.setState({
            results: response.data,
            status: 'found'
          })
        }
        // To do: if length is 0 then we need to go back to search and say no results!
      }).catch(err => {
        console.log('Error:', err)
      })
    }
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
          <img src={threeproducts} alt="Product icons" className="title-image" />
          <h1>{this.props.name}</h1>
          <h3>{length} products found</h3>
          <hr />
            {display}
        </div>
      );
    }
    else if(this.state.status === 'selected') {
      return <Redirect to={this.state.selected} />
    }
    else if(this.state.status === 'dataSourceError') {
      return(
        <div>
          <p><center>There is currently an issue with our data source. Please try again later.</center></p>
        </div>
      );
    }
    else {
      return <Loading />
    }
    
  }
}

export default Results;
