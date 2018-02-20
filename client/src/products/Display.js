import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Display extends Component {
  constructor(props){
    super(props);
  }

  handleClick = (event) => {
    event.preventDefault();
    let selected = {
      name: this.props.data.name,
      ingredients: this.props.data.ingredients,
      category: event.target.id,
      user: this.props.user.id
    }
    console.log(selected,"In child");
    let base = this;
    axios.post('/user/products/add',{
      data: selected
    }).then(response => {
      console.log("from backend",response);
      // No page action needed here, thinking just change button classes to reflect what's added
    }).catch(err => {
      console.log('Error:', err)
    })

    //Doing axios call here to make this component more reusable, this should be a somewhat standalone!
    // To do: some kind of "tooltip" to show more info on what each type is intended to be used for
    // to do: if no user, buttons should do smoething different or not be visible
    // To do: button classes reflect status in Database. If not doing a call, we should check this... figure out how to pass this through from both sides to make this work
  
  }

  render(){

    var acneCount = 0;
    var acneIngredients = [];
    var acneList;

    var irritantCount = 0;
    var ittiatingIngredients = [];
    var irritationList;

    var ingredientTable = this.props.data.ingredients.map((ingredient, index) => {

      if (parseInt(ingredient.acne) && parseInt(ingredient.acne) > 0) {
        acneIngredients.push(ingredient.acne);
        acneCount++;
      }
      if (parseInt(ingredient.irritant) && parseInt(ingredient.irritant) > 0) {
        irritatingIngredients.push(ingredient.irritant);
        irritantCount++;
      }

      return (
        <tr>
          <td>{ingredient.name}</td>
          <td>{ingredient.ingredientFunction}</td>
          <td>{ingredient.acne}</td>
          <td>{ingredient.irritant}</td>
          <td>{ingredient.safety}</td>
          <td>Flag</td>
        </tr>
      );
    });

    if (acneIngredients.length > 0) {
      acneList = acneIngredients.map((ingredient, index) => {
        return <span>{ingredient}</span>
      })
    }

    if (irritatingIngredients.length > 0) {
      irritationList = acneIngredients.map((ingredient, index) => {
        return <span>{ingredient}</span>
      })
    }

    return(
          <div>
            <h1>{this.props.data.name}</h1>
            <button onClick={this.handleClick} id="favorites">Favorites</button>
            <button onClick={this.handleClick} id="failures">Fails</button>
            <button onClick={this.handleClick} id="watchlist">Watchlist</button>

            <p>{acneCount} that may cause acne</p>
            <p>{acneList}</p>
            <p>{irritantCount} that may be irritating</p>
            <p>{irritationList}</p>

            <table>
              <thead>
                <tr>
                  <th>Ingredient</th>
                  <th>Function</th>
                  <th>Acne</th>
                  <th>Irritation</th>
                  <th>Safety</th>
                  <th>Flag</th>
                </tr>
              </thead>
              <tbody>
                {ingredientTable}
              </tbody>
            </table>
          </div>
      );
  }
}

export default Display;
