import React, { Component } from 'react';

class Footer extends Component {
  render(){
    return(
        <div className="footer">
            <span className="footer-text">&copy; <a href="http://www.jacquelynmarcella.com" target="_blank">Jacquelyn Marcella</a> {new Date().getFullYear()}</span>
            <span className="footer-text">All product data from <a href="http://www.cosdna.com" target="_blank">CosDNA</a></span>
        </div>
      );
  }
}

export default Footer;
