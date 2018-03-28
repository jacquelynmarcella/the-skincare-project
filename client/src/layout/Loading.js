import React, { Component } from 'react';

import connections from '../img/connections.png';

const Loading = () => {
  return (
  	  <header>
	  	  <h2>
		  	  <img src={connections} className="title-image" />
		  	  LOADING
	  	  </h2>
  	  </header>
  )

}

export default Loading;