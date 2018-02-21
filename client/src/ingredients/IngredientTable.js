import React, { Component } from 'react';

class IngredientTable extends Component {
  constructor(props){
    super(props);
  }

  handleFlag = (event) => {
    console.log("event",event);
    this.props.handleFlag(event);
  }

  render(){
    var tableContents = this.props.ingredients.map((ingredient, index) => {
      return (
        <tr>
          <td>{ingredient.name}</td>
          <td>{ingredient.ingredientFunction}</td>
          <td>{ingredient.acne}</td>
          <td>{ingredient.irritant}</td>
          <td>{ingredient.safety}</td>
          <td><button onClick={() => this.handleFlag(ingredient)} id={ingredient.cosdnaIngId} name={ingredient.name}>Flag</button></td>
        </tr>
      );
    }); 

    return (
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
              {tableContents}
          </tbody>
        </table>
    );
  }
}

export default IngredientTable;
