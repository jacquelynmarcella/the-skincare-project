import React, { Component } from 'react';
import Logout from '../auth/Logout.js';
import { Link } from 'react-router-dom';



class ProductSearch extends Component {

  render(){
    return(
          <div>
            Products Search
          </div>
      );
  }
}

class ProductNameResults extends Component {

  render(){
    return(
          <div>
            Product name results
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

  render(){
    return(
          <div>
            Products route
            <ProductSearch />
            <ProductNameResults />
            <ProductDisplay />
          </div>
      );
  }
}

export default Products;