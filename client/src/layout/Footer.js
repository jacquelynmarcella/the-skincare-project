import React, { Component } from 'react';

class Footer extends Component {
  render(){
    return(
        <div className="footer">
            <span className="footer-text">&copy; Jacquelyn Marcella {new Date().getFullYear()}</span>
        </div>
      );
  }
}

export default Footer;
