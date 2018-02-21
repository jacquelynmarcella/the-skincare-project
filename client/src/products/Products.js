import React, { Component } from 'react';
import axios from 'axios';

import Search from './Search.js';
import Results from './Results.js';
import Display from './Display.js';
import Loading from '../layout/Loading.js'

class Products extends Component {
  constructor(props){
    super(props);
    this.state = {
      status: 'searching',
      nameResults: '',
      productData: ''
    }
  }

  handleSubmit = (data) => {
    console.log("form submitted: ",data);
    this.setState({
      status: 'loading'
    })
    let base = this;
    axios.post('/products/search',{
      data: data  
    }).then(response => {
      console.log(response);
      base.setState({
        nameResults: response.data,
        status: 'nameresults'
      })
      // To do: if length is 0 then we need to go back to search and say no results!
    }).catch(err => {
      console.log('Error:', err)
    })
  }

  handleSelect = (data) => {
    console.log("specific product selected: ",data);
    this.setState({
      status: 'loading',
    })
    let base = this;
    axios.post('/products/ingredients',{
      data: data 
    }).then(response => {
      console.log(response);
      base.setState({
        productData: response.data,
        status: 'productdisplay'
      })
    }).catch(err => {
      console.log('Error:', err)
    })
  }

  render(){

    var display;

    if (this.state.status === 'searching') {
      display =  <Search handleSubmit={this.handleSubmit} />
    }
    else if (this.state.status === 'loading') {
      display = <Loading />
    }
    else if (this.state.status === 'nameresults') {
      display = <Results results={this.state.nameResults} handleSelect={this.handleSelect} />
    }
    else if (this.state.status === 'productdisplay') {
      display = <Display data={this.state.productData} user={this.props.user} />
    }

    return(
          <div>
            {display}
          </div>
      );
  }
}

export default Products;