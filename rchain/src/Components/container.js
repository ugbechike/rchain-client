import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom'
import SignIn from './Signin/signIn';
import SignUp from './Signup/signUp';
import ForgotPassword from './ForgotPassword/forgotPassword'

class Container extends Component {


  render()  {
    return(
        <div>
          <Switch>
            <Route path="/signup" component={SignUp} exact />
            <Route path="/login" component={SignIn} exact/>
            <Route path="/reset" component={ForgotPassword} exact/>
            <Route component={Error}/>
          </Switch>
        </div>
    );
  }
}

export default Container;

