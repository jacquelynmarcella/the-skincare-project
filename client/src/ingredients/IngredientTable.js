import React, { Component } from 'react';
import FA from 'react-fontawesome';

class IngredientRow extends Component {
  constructor(props){
    super(props);
    this.state = {
      flag: 'noflag'
    }
  }

  handleFlag = (event) => {
    this.props.handleFlag(event);
    checkMatch();
      // if (this.state.flag === 'flag') {
      //   this.setState({
      //     flag: 'noflag'
      //   })
      // }
      // else {
      //   this.setState({
      //     flag: 'flag'
      //   })
      // }  
  }

  checkMatch() {
    let match = this.props.userIngredients.find(o => o.name === this.props.ingredient.name);
    if (match) {
      this.setState({
        flag: 'flag'
      })
    }
    else {
      this.setState({
        flag: 'noflag'
      })
    }
  }

  componentDidMount() {
    this.checkMatch();
  }

  render(){

    var actionIcon;
    if (this.state.flag === "noflag"){
      actionIcon = <FA name="plus" />;
    }
    else if(this.state.flag === "flag"){
      actionIcon = <FA name="minus" />;
    }

    return(
        <tr className={this.state.flag}>
          <td><button onClick={() => this.handleFlag(this.props.ingredient)} id={this.props.ingredient.cosdnaIngId} name={this.props.ingredient.name}>{actionIcon}</button></td>
          <td>{this.props.ingredient.name}</td>
          <td>{this.props.ingredient.ingredientFunction}</td>
          <td>{this.props.ingredient.acne}</td>
          <td>{this.props.ingredient.irritant}</td>
          <td>{this.props.ingredient.safety}</td>
        </tr>
    )
  }
}


class IngredientTable extends Component {
  constructor(props){
    super(props);
  }

  handleFlag = (event) => {
    this.props.handleFlag(event);
  }

  componentDidMount() {

  }

  render(){
    var tableContents = this.props.ingredients.map((ingredient, index) => {   
      return (
        <IngredientRow ingredient={ingredient} userIngredients={this.props.userIngredients} handleFlag={this.props.handleFlag} />
      );
    }); 

    return (
        <table className={this.props.tableClass}>
          <thead>
            <tr>
              <th><FA name="flag" /></th>
              <th>Ingredient</th>
              <th>Function</th>
              <th>Acne</th>
              <th>Irritation</th>
              <th>Safety</th>
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
