import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Responsive } from 'semantic-ui-react';
import Home from './Home/home';
import NotFound from './notFound';
import SignIn from './Signin/signIn';
import SignUp from './Signup/signUp';
import ForgotPassword from './ForgotPassword/forgotPassword';
import ListCourses from './Course/listCourse';
import Tutorial from '../Components/Tutorial/tutorial';
import AdminLogin from '../Components/Admin/adminLogin';
import UploadContent from '../Components/Admin/Upload/upload';


class Container extends Component {

	render() {
		return (
			<div>
				<Responsive>
					<Switch>
						<Route path="/admin/upload" component={UploadContent} exact />
						<Route path="/admin" component={AdminLogin} exact />
			            <Route path="/course/:id" component={Tutorial} exact />
			            <Route path="/courses" component={ListCourses} exact />
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
