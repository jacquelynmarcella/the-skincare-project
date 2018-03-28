import React, { Component } from 'react';

import connections from '../img/connections.png';

const Loading = () => {
  return (
	<h2><img src={connections} className="title-image" />Loading</h2>
  )
}

export default Loading;