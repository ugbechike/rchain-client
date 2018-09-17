import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import TopNav from '../Menu/nav';
import Footer from '../Menu/footer';
import './notFound.css';
import '../style.css'

const NotFound = (props) => {
  return (
  	<Fragment>
	  	<TopNav />
	    <div style={{marginTop: '100px'}}>
			<section className="error-container">
			  	<span>4</span>
			  	<span><span className="screen-reader-text">0</span></span>
			  	<span>4</span>
			</section>
			<p className="zoom-area"><b>Sorry!</b> the requested page was not found. </p>
			<div className="link-container">
			  	<Button color="red" basic as={Link} to="/" className="more-link">Go Home</Button>
			</div>

	    </div>
	    <Footer />
	</Fragment>
  )
}

export default NotFound;