import React, { useState } from "react";
import './App.css';
import Login from './component/Authenticate/Login.js';
import Register from './component/Authenticate/Register.js';
// import DummyHome from './component/Home/DummyHome.js';
import Home from './component/Home/Home.js';
import IndexProfile from './component/Profile';
import SetupProfile from './component/Profile/SetupProfile';
import { connect } from 'react-redux';
import { setUser } from './actions';

import FirebaseController from './firebase.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App(props) {


  const { currentUser, setUser } = props;
  // control the auth
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  function handleLoggedIn() {
    if (!isLoggedIn) {
      setIsLoggedIn(true);
    }
  }

  function handleLoggedOut() {
    if (isLoggedIn) {
      FirebaseController.logout()
      setIsLoggedIn(false);
    }
  }

  FirebaseController.auth.onAuthStateChanged(function (user) {
    if (user) {
      setIsLoggedIn(true);
      setUser(user);
      let uid = user.uid;
    }
  });

  
  return (

   
    
    <Router>
      <Switch>
        <Route exact path="/user/:uid" render={() => <IndexProfile currentUser={currentUser} isLoggedIn={isLoggedIn} logout={handleLoggedOut} />} />
        <Route exact path="/login" render={() => <Login isLoggedIn={isLoggedIn} login={handleLoggedIn} />} />
        <Route exact path="/register" render={() => <Register isLoggedIn={isLoggedIn} />} />
        <Route exact path="/" render={() => <Home isLoggedIn={isLoggedIn} logout={handleLoggedOut} />} />
        <Route exact path="/Setup_Profile" render={() => <SetupProfile isLoggedIn={isLoggedIn} logout={handleLoggedOut} />} />
      </Switch>
    </Router>
  );
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})



export default connect(mapStateToProps, { setUser })(App);
