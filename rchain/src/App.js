import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import SignIn from './Components/Signin/signIn';
import SignUp from './Components/Signup/signUp'

class App extends Component {


  render()  {
    return(
   
      <BrowserRouter>
       
        <div>
        
          <Switch>
            <Route path="/signup" component={SignUp} exact />
            <Route path="/login" component={SignIn} exact/>
            <Route component={Error}/>
          </Switch>
        </div>
      
      </BrowserRouter>
      
    );
  }
}

export default App;

