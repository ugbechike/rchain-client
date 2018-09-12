import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Responsive } from 'semantic-ui-react';
import Home from './Home/home';
import NotFound from './notFound';
import SignIn from './Signin/signIn';
import SignUp from './Signup/signUp';
import ForgotPassword from './ForgotPassword/forgotPassword';

class Container extends Component {

	render() {
		return (
			<div>
				<Responsive>
					<Switch>
			            <Route path="/signup" component={SignUp} exact />
			            <Route path="/login" component={SignIn} exact/>
			            <Route path="/reset" component={ForgotPassword} exact/>
						<Route path="/" component={Home} />
						<Route component={NotFound} />

					</Switch>
				</Responsive>
			</div>
		);
	}
}

export default Container;
