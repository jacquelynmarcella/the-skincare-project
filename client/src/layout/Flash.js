import React, { Component } from 'react';

class Flash extends Component {

  render() {
    let flashType = 'error';
    if(this.props && this.props.flashType){
      flashType = this.props.flashType;
    }
    if(this.props && this.props.flash){
      setTimeout(this.props.cancelFlash, 1500);
      return (
        <div className={flashType}>
          {this.props.flash}
        </div>);
    }
    else {
      return (<div className="no-flash">No Flash</div>);
    }
  }
}

export default Flash;
