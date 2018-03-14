import React, { Component } from 'react';

class IngredientSummary extends Component {
  constructor(props){
    super(props);
  }

  render(){
    var acneCount = 0;
    var acneIngredients = [];
    var acneList;

    var irritantCount = 0;
    var irritatingIngredients = [];
    var irritationList;

    var flagCount = 0;
    var flaggedIngredients = [];
    var flaggedList;

    this.props.ingredients.forEach((ingredient) => {
      if (parseInt(ingredient.acne) && parseInt(ingredient.acne) > 0) {
        acneIngredients.push(ingredient);
        acneCount++;
      }
      if (parseInt(ingredient.irritant) && parseInt(ingredient.irritant) > 0) {
        irritatingIngredients.push(ingredient);
        irritantCount++;
      }
      if (this.props.userIngredients && this.props.userIngredients.length > 0) {
        let match = this.props.userIngredients.find(o => o.name === ingredient.name);
        if (match){
          flaggedIngredients.push(ingredient);
          flagCount++;
        }
      }
    });

    if (acneIngredients.length > 0) {
      acneList = acneIngredients.map((ingredient, index) => {
        var quickLink = "#" + ingredient.name
        return <a href={quickLink}><span className="ingredientBadge">{ingredient.name}</span></a>
      })
    }

    if (irritatingIngredients.length > 0) {
      irritationList = irritatingIngredients.map((ingredient, index) => {
        var quickLink = "#" + ingredient.name
        return <a href={quickLink}><span className="ingredientBadge">{ingredient.name}</span></a>
      })
    }

    if (flaggedIngredients.length > 0) {
      flaggedList = flaggedIngredients.map((ingredient, index) => {
        var quickLink = "#" + ingredient.name
        return <a href={quickLink}><span className="ingredientBadge">{ingredient.name}</span></a>
      })
    }

    return (
      <div className="flex">
        <div className="summary">
          <h1>{flagCount}</h1>
          <h2>Flagged ingredients</h2>
          <p>{flaggedList}</p>
        </div>
        <div className="summary">
          <h1>{acneCount}</h1>
          <h2>Potential acne causing ingredients</h2>
          <p>{acneList}</p>
        </div>
        <div className="summary">
          <h1>{irritantCount}</h1>
          <h2>Potential irritating ingredients</h2>
          <p>{irritationList}</p>
        </div>
      </div>
    )
  }
}

export default IngredientSummary;