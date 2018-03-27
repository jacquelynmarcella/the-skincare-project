import React, { Component } from 'react';
import axios from 'axios';
import IngredientTable from './ingredients/IngredientTable.js'
import Display from './products/Display.js'
import Loading from './layout/Loading.js'
import ProductList from './products/ProductList.js'

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

  // handleBack = () => {
  //   if(this.props.user){
  //     this.getDatabase();
  //   }
  //   if (this.state.view === 'product') {
  //     this.setState({
  //       view: 'profile',
  //       selectedProduct: ''     
  //     })
  //   }
  // }

  componentDidMount(){
    if(this.props.user){
      this.getDatabase();
    }
  }

  render(){

    var productList;
    var productCount = 0;

    if (this.state.products.length > 0){
      productList = this.state.products.map((product, index) => {
        return (
          <ProductList product={product} handleClick={this.handleClick} user={this.props.user} handleChange={this.handleChange} />
        );
      }); 
      productCount = this.state.products.length
    }
    else {
      productList = <center><p>No products added.</p></center>
    }

    var ingredientsTable;
    var ingredientCount = 0;

    if (this.state.ingredients.length > 0) {
      ingredientsTable = <IngredientTable ingredients={this.state.ingredients} user={this.props.user} handleFlag={this.handleFlag} userIngredients={this.state.ingredients} tableClass="profile" />
      ingredientCount = this.state.ingredients.length
    }
    else {
      ingredientsTable = <p>No ingredients added.</p>
    }

    if(this.state.loading === true && this.props.user) {
      return ( <Loading /> )
    }
    else if(this.state.loading === false && this.state.view === "profile" && this.props.user){
      return (
        <div className="profile">
          <header>
            <h1>
              <img src="/img/mirror.png" alt="Mirror icon" className="title-image" />
              {this.props.user.name}
            </h1>
            <hr /> 
            <h4>{productCount} products saved | {ingredientCount} ingredients flagged</h4>
          </header>

          <div className="flex section">
            <div className="summary">
              <img src="/img/favorite.png" aria-label="Favorite Products" alt="Favorite icon" className="icon-large" />
              {productList}
            </div>
            <div className="summary">
              <img src="/img/fail.png" aria-label="Failed Products" alt="Fail icon" className="icon-large" />
              {productList}
            </div>
            <div className="summary">
              <img src="/img/watch.png" aria-label="Bookmaked Products" alt="Bookmark icon" className="icon-large" />
              {productList}
            </div>
          </div>
          <hr />
          <div className="section">
            <h2>Flagged Ingredients</h2>
            {ingredientsTable}
          </div>
        </div>
      );
    }
    else if (this.state.loading === false && this.state.view === "product" && this.props.user) {
      return (
        <div>
          <Display data={this.state.selectedProduct} user={this.props.user} userIngredients={this.state.ingredients} userProducts={this.state.products} tableClass="product" />
        </div>
      )
    }
    else {
      return (<p>Please log in.</p>);
    }
  }
}

export default Profile;
