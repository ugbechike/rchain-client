import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Responsive } from 'semantic-ui-react';
import PrivateRoute from './privateRoute';
import Home from './Home/home';
import NotFound from './NotFound/notFound';
import SignIn from './Signin/signIn';
import SignUp from './Signup/signUp';
import ForgotPassword from './ForgotPassword/forgotPassword';
import ListCourses from './Course/listCourse';
import Tutorial from '../Components/Tutorial/tutorial';
import AdminLogin from '../Components/Admin/adminLogin';
import UploadContent from '../Components/Admin/Upload/upload';
import AdminDashboard from '../Components/Admin/Dash/adminDashboard';
import Users from '../Components/Admin/User/user';
import AllCourses from './Admin/Course/listCourse';
import Upload from './Admin/Upload/upload';
import SendMail from './Admin/Sendmail/sendMail';
import User from './User/user';

import RchainBot from './Chatbot/rchainBot';


class Container extends Component {

	render() {
		return (
			<div>
				<Responsive>
					<Switch>
						<Route path="/admin/dashboard/SendMail" component={SendMail}/>
						<Route path="/admin/dashboard/courses" component={AllCourses} exact />
						<Route path="/admin/dashboard/user" component={Users} exact />
						<Route path="/admin/dashboard" component={AdminDashboard} exact />
						<Route path="/admin/dashboard/upload_video" component={UploadContent} exact />
						<Route path="/admin/upload" component={Upload} exact />
						<Route path="/admin" component={AdminLogin} exact />

						<PrivateRoute user={false} component={User} path="/auth/user/dashboard" />
						<Route user={false} component={Tutorial} path="/course/:id" />

            <Route path="/courses" component={ListCourses} exact />
            <Route path="/signup" component={SignUp} exact />
            <Route path="/login" component={SignIn} exact/>
			      <Route path="/reset" component={ForgotPassword} exact/>
						<Route path="/" component={Home} exact />
						<Route component={NotFound} />
					</Switch>

				</Responsive>

			</div>
		);
	}
}

export default Container;
