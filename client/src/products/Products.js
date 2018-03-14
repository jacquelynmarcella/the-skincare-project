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
      searchTerm: '',
      nameResults: '',
      productData: '',
      userProducts: '',
      userIngredients: ''
    }
  }

  getDatabase = () => {
    let base = this;
    if (this.props.user) {
      axios({
        method: 'get',
        url: '/user/profile',
        params: {
          user: this.props.user.id
        }
      }).then((result) => {
        console.log(result);
        this.setState({
          userProducts: result.data[0],
          userIngredients: result.data[1]
        })
        console.log("state-ingredients",this.state.ingredients);
        console.log("state-products",this.state.products);
      }).catch((error) => {
        console.log("An error occured", error.response.data);
      });
    }     
  }

  handleSubmit = (data) => {
    console.log("form submitted: ",data);
    this.setState({
      status: 'loading',
      searchTerm: data
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

  handleBack = () => {
    if (this.state.status === "nameresults") {
      this.setState({
        status: 'searching',
        searchTerm: '',
        nameResults: '',
      })
    }
    else if (this.state.status === "productdisplay") {
      this.setState({
        status: 'nameresults',
        productData: ''
      })
    }
  }

  componentDidMount() {
    this.getDatabase();
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
      display = (
        <div> 
          <button onClick={this.handleBack} className="back">Back</button>
          <Results results={this.state.nameResults} searchTerm={this.state.searchTerm} handleSelect={this.handleSelect} />
        </div>
      );
    }
    else if (this.state.status === 'productdisplay') {
      display = ( 
        <div>
          <button onClick={this.handleBack} className="back">Back</button>
          <Display data={this.state.productData} user={this.props.user} userIngredients={this.state.userIngredients} userProducts={this.state.userProducts} />
        </div>
      );     
    }

    return(
          <div>
            {display}
          </div>
      );
  }
}

export default Products;