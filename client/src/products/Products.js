import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Loading = () => {
  return <div>Loading...</div>
}

class ProductSearch extends Component {
  constructor(props){
    super(props);
    this.state = {
      product: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleSubmit(this.state.product);
  }

  handleChange = (event) => {
    //Will update location upon change of the text fields
    this.setState({ 
      [event.target.name]: event.target.value
    });
  }

  render(){
    return(
          <div>
          <h2>Search for a product</h2>
            <form onSubmit={this.handleSubmit}>
                <input name="product" placeholder="e.g. Clinique Mositurizer" onChange={this.handleChange} value={this.state.product} />
            <input type="submit" value="Search" />
            </form>
          </div>
      );
  }
}

class ProductNameResults extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (event) => {
    event.preventDefault();
    console.log("event",event);
    console.log("event.target",event.target);
    console.log("event target id inside child", event.target.id);
    this.props.handleSelect(event);
  }

  render(){
    var display = this.props.results.map((product, index) => {
      return <button onClick={this.handleClick} id={product.url}>{product.name}</button>
    });

    return(
          <div>
            <h2>Product name results</h2>
              {display}
          </div>
      );
  }
}


class ProductDisplay extends Component {

  render(){
    return(
          <div>
            Individual product display
          </div>
      );
  }
}


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
    console.log("event in parent",data);
    // Axios call, will run scraper for product details
    // Set state to loading
    // Upon results returned, set to productdisplay
  }

  render(){

    var display;

    if (this.state.status === 'searching') {
      display =  <ProductSearch handleSubmit={this.handleSubmit} />
    }
    else if (this.state.status === 'loading') {
      display = <Loading />
    }
    else if (this.state.status === 'nameresults') {
      display = <ProductNameResults results={this.state.nameResults} handleSelect={this.handleSelect} />
    }
    else if (this.state.status === 'productdisplay') {
      display = <ProductDisplay data={this.state.productData} />
    }

    return(
          <div>
            {display}
          </div>
      );
  }
}

export default Products;