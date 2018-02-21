import React, { Component } from 'react';
import axios from 'axios';
import IngredientTable from './ingredients/IngredientTable.js'
import Loading from './layout/Loading.js'

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: '',
      ingredients: '',
      status: 'loading'
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
      console.log(result);
      this.setState({
        products: result.data[0].products,
        ingredients: result.data[1].ingredients,
        status: 'ready'

      })
    }).catch((error) => {
      console.log("An error occured", error.response.data);
    });
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
    axios.post('/user/ingredients/add',{
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
            {product.name}
            {product.cosdnaId}
            {product.category}
          </div>
        );
      }); 
    }
    else {
      productList = <p>No products added.</p>
    }

    var ingredientsTable;

    if (this.state.ingredients.length > 0) {
      ingredientsTable = <IngredientTable ingredients={this.state.ingredients} user={this.props.user} handleFlag={this.handleFlag} />
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
          {ingredientsTable}
        </div>
      );
    }
    else {
      return (<p>Please log in.</p>);
    }
  }
}

export default Profile;
