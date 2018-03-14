import React, { Component } from 'react';
import IngredientRow from './IngredientRow.js'

class IngredientTable extends Component {
  constructor(props){
    super(props);
  }

  handleFlag = (event) => {
    this.props.handleFlag(event);
  }

  render(){
    var tableContents = this.props.ingredients.map((ingredient, index) => {   
      return (
        <IngredientRow ingredient={ingredient} userIngredients={this.props.userIngredients} handleFlag={this.props.handleFlag} tableClass={this.props.tableClass} user={this.props.user} />
      );
    }); 

    var tableHead;

    if(this.props.user){
      tableHead = (
        <tr>
          <th>Flag</th>
          <th>Ingredient</th>
          <th>Function</th>
          <th>Acne</th>
          <th>Irritation</th>
        </tr>
      )
    }
    else {
      tableHead = (
        <tr>
          <th>Ingredient</th>
          <th>Function</th>
          <th>Acne</th>
          <th>Irritation</th>
        </tr>
      )
    }

    return (
        <table className={this.props.tableClass}>
          <thead>
            {tableHead}
          </thead>
          <tbody>
            {tableContents}
          </tbody>
        </table>
    );
  }
}

export default IngredientTable;
