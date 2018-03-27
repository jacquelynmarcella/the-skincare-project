import React, { Component } from 'react';
import FA from 'react-fontawesome';
import { Link } from 'react-router-dom';

class Home extends Component {
  render(){
    return (
        <div>
        	<header>
        		<img src="/img/three-products.png" alt="Products icon" className="title-image" />
        		<h1>SKIN/CARE</h1>
        		<h2>Smarter product and ingredient tracking for sensitive skin</h2>
        	</header>
        	<hr />
        	<section className="home">
        		<p>Draw clearer connections between ingredients and products by <span className="highlight">flagging</span> ingredients you need to keep an eye on.</p>
        		<div className="infographic">
        			<img src="/img/connections.png" alt="Connections icon" />
        		</div>
        	</section>
        	<hr />
        	<section className="home">
        	    <div className="infographic">
        			<img src="/img/report.png" alt="Report icon" />
        		</div>
        		<p>Easily see when a product contains an ingredient you've flagged, as well as other potentially <span className="highlight">irritating</span> or <span className="highlight">acne-causing</span> ingredients.</p>
        	</section>
        	<hr />
        	<section className="home">
        		<p>Add products that have worked for you to your <span className="highlight">favorites</span> and separately keep track of those that have been <span className="highlight">failures</span>.</p>
        		<div className="infographic">
        			<FA name="heart" />
        			<FA name="thumbs-down" />
        		</div>
        	</section>
        	<hr />
        	<section className="home">
        	    <div className="infographic">
        			<FA name="bookmark" />
        		</div>
        		<p>Just starting to try a new product, or simply want to save it to your list? Add it to your <span className="highlight">bookmarks</span> and you can move it to your favorites or failures later.</p>
        	</section>
        	<hr />
        	<section className="home stack">
        		<p>Ready to get started?</p>
        		<p><Link to="/signup" className="CTA">Sign Up</Link>
        		<Link to="/products" className="CTA">Search Products</Link></p>
        	</section>
        </div>
      );
  }
}

export default Home;
