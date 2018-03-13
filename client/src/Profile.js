import React, { Component } from 'react';
import axios from 'axios';
import IngredientTable from './ingredients/IngredientTable.js'
import Display from './products/Display.js'
import Loading from './layout/Loading.js'
import ProductAction from './products/ProductAction.js'

class ProductList extends Component {
  constructor(props){
    super(props);
  }

  handleClick = (event) => {
    this.props.handleClick(this.props.product);
  }

  handleChange = (event) => {
    let selected = {
      name: this.props.product.name,
      ingredients: this.props.product.ingredients,
      category: event,
      user: this.props.user.id,
      cosdna: this.props.product.cosdna
    }
    this.props.handleChange(selected);
  }

  render(){
    return(
      <div className="productListItem">
          <button className="productTitle" onClick={this.handleClick}>{this.props.product.name}</button>
          <ProductAction handleClick={this.handleChange} userProductCategory={this.props.product.category} type="favorite" />
          <ProductAction handleClick={this.handleChange} userProductCategory={this.props.product.category} type="fail" /> 
          <ProductAction handleClick={this.handleChange} userProductCategory={this.props.product.category} type="watch" /> 
      </div>
    )
  }
}


class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: '',
      ingredients: '',
      loading: true,
      view: 'profile',
      selectedProduct: ''
    }
  }

  getDatabase = () => {
    let base = this;     
    axios({
      method: 'get',
      url: '/user/profile',
      params: {
        user: this.props.user.id
      }
    }).then((result) => {
      this.setState({
        products: result.data[0],
        ingredients: result.data[1],
        loading: false
      })
      console.log("state-ingredients",this.state.ingredients);
      console.log("state-products",this.state.products);
    }).catch((error) => {
      console.log("An error occured", error.response.data);
    });
  }

  handleClick = (event) => {
    console.log(event);
    this.setState({
      view: 'product',
      selectedProduct: event
    })
  }


  handleChange = (event) => {
    let base = this;
    axios.post('/user/products',{
      data: event
    }).then(response => {
      console.log("from backend",response);
      this.getDatabase();
    }).catch(err => {
      console.log('Error:', err)
    })
  }

  handleFlag = (event) => {
    let selected = {
      name: event.name,
      user: this.props.user.id,
      cosdna: event.cosdna,
      ingredientFunction: event.ingredientFunction,
      acne: event.acne,
      irritant: event.irritant,
      safety: event.safety
    }
    console.log(selected,"In parent");
    let base = this;
    axios.post('/user/ingredients',{
      data: selected
    }).then(response => {
      this.getDatabase();
    }).catch(err => {
      console.log('Error:', err)
    })
  }

  handleDelete = (event) => {
    let selected = {
      user: this.props.user.id,
      cosdna: event.cosdna
    }
    let base = this;
    axios.delete('/user/products', {
      data: selected
    }).then(response => {
      this.getDatabase();
    }).catch(err => {
      console.log('Error:', err)
    })
  }

  componentDidMount(){
    if(this.props.user){
      this.getDatabase();
    }
  }

  render(){

    var productList;

    if (this.state.products.length > 0){
      productList = this.state.products.map((product, index) => {
        return (
          <ProductList product={product} handleClick={this.handleClick} user={this.props.user} handleChange={this.handleChange} />
        );
      }); 
    }
    else {
      productList = <p>No products added.</p>
    }

    var ingredientsTable;

    if (this.state.ingredients.length > 0) {
      ingredientsTable = <IngredientTable ingredients={this.state.ingredients} user={this.props.user} handleFlag={this.handleFlag} userIngredients={this.state.ingredients} tableClass="profile" />
    }
    else {
      ingredientsTable = <p>No ingredients added.</p>
    }

    if(this.state.loading === true) {
      return ( <Loading /> )
    }
    else if(this.state.loading === false && this.state.view === "profile" && this.props.user){
      return (
        <div className="profile">
          <h2>{this.props.user.name}</h2>
          <hr /> 
          <div className="flex">
            {productList}
          </div>
          {ingredientsTable}
        </div>
      );
    }
    else if (this.state.loading === false && this.state.view === "product" && this.props.user) {
      return <Display data={this.state.selectedProduct} user={this.props.user} userIngredients={this.state.ingredients} userProducts={this.state.products} tableClass="product" />
    }
    else {
      return (<p>Please log in.</p>);
    }
  }
}

export default Profile;
