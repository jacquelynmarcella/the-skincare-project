import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import Display from './Display.js';
import Loading from '../layout/Loading.js'

class Products extends Component {
  constructor(props){
    super(props);
    this.state = {
      status: 'searching',
      searchTerm: '',
      nameResults: '',
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

  componentDidMount() {
    this.getDatabase();
  }

  render(){   

    return(
          <div>
             <Route path="/products/:cosdna" render={
              (props) => (<Display user={this.props.user} userIngredients={this.state.userIngredients} userProducts={this.state.userProducts} {...props} />)
            } />
          </div>
    );
  }
}

export default Products;