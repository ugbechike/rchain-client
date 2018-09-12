import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Responsive } from 'semantic-ui-react';
import Home from './Home/home';
import NotFound from './notFound';

class Container extends Component {

	render() {
		return (
			<div>
				<Responsive>
					<Switch>

						<Route path="/" component={Home} />
						<Route component={NotFound} />

					</Switch>
				</Responsive>
			</div>
		);
	}
}

export default Container;
