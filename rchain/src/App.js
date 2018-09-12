import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import SignIn from './Components/Signin/signIn';
import SignUp from './Components/Signup/signUp';
import ForgotPassword from './Components/ForgotPassword/forgotPassword'

class App extends Component {


  render()  {
    return(
   
      <BrowserRouter>
       
        <div>
        
          <Switch>
            <Route path="/signup" component={SignUp} exact />
            <Route path="/login" component={SignIn} exact/>
            <Route path="/reset" component={ForgotPassword} exact/>
            <Route component={Error}/>
          </Switch>
        </div>
      
      </BrowserRouter>
      
    );
  }
}

export default App;

