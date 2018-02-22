import React, { Component } from 'react';
import axios from 'axios';
import IngredientTable from './ingredients/IngredientTable.js'
import Display from './products/Display.js'
import Loading from './layout/Loading.js'

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: '',
      ingredients: '',
      status: 'loading',
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
        status: 'ready'
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
      status: 'productview',
      selectedProduct: event
    })
  }

  handleFlag = (event) => {
    let selected = {
      name: event.name,
      user: this.props.user.id,
      cosdnaIngId: event.cosdnaIngId,
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
      cosdnaId: event.cosdnaId
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

  componentDidMount() {
    this.getDatabase();
  }

  render(){

    var productList;

    if (this.state.products.length > 0){
      productList = this.state.products.map((product, index) => {
        return (
          <div>
          <button onClick={() => this.handleClick(product)}>{product.name}</button>
          <button onClick={() => this.handleDelete(product)}>X</button>
          </div>
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

    if(this.state.status === "loading") {
      return ( <Loading /> )
    }
    else if(this.state.status === "ready" && this.props.user){
      return (
        <div>
          <h2>{this.props.user.name}</h2>
          {productList}
          {ingredientsTable}
        </div>
      );
    }
    else if (this.state.status === "productview" && this.props.user) {
      return <Display data={this.state.selectedProduct} user={this.props.user} userIngredients={this.state.ingredients} tableClass="product" />
    }
    else {
      return (<p>Please log in.</p>);
    }
  }
}

export default Profile;
