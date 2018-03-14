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
    if (this.state.flag === 'flag') {
      this.setState({
        flag: 'noflag'
      })
    }
    else {
      this.setState({
        flag: 'flag'
      })
    }  
  }

  checkMatch() {
    if(this.props.userIngredients.length > 0) {
      let match = this.props.userIngredients.find(o => o.name === this.props.ingredient.name);
      if (match) {
        this.setState({
          flag: 'flag'
        })
      }
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
    var flagColumn;

    if (this.state.flag === "flag" || this.props.tableClass === "profile"){
      actionIcon = <FA name="minus" />;
    }
    else if (this.state.flag === "noflag"){
      actionIcon = <FA name="plus" />;
    }

    if(this.props.user) {
      flagColumn = (
        <td><button onClick={() => this.handleFlag(this.props.ingredient)} id={this.props.ingredient.cosdna} name={this.props.ingredient.name} className="flagButton">{actionIcon}</button></td>
      )
    }

    return(
        <tr className={this.state.flag} id={this.props.ingredient.name}>
          {flagColumn}
          <td>{this.props.ingredient.name}</td>
          <td>{this.props.ingredient.ingredientFunction}</td>
          <td>{this.props.ingredient.acne}</td>
          <td>{this.props.ingredient.irritant}</td>
        </tr>
    )
  }
}

export default IngredientRow;