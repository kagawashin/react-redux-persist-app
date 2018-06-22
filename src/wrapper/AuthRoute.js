import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { PRIVATE_ROOT, PUBLIC_ROOT } from '../config'

//Mock of an Auth method, can be replaced with an async call to the backend. Must return true or false
const isAuthenticated = () => localStorage.hasOwnProperty("token") 


// isPrivate が false と明確に定義されている箇所以外は Private として扱う
const AuthRoute = ({component, ...props}) => {
  const { isPrivate } = component;
  if ( isAuthenticated() ){
    //console.log("isAuthenticated = true");
    //User is Authenticated
    if (isPrivate === false) {
      //If the route is public, the user is redirected to the app's private root.
      //console.log("is no Private");
      return <Redirect to={ PRIVATE_ROOT } />;
    }
    else {
      //If the route is private the user may proceed.
      //console.log("is Private");
      return <Route { ...props } component={ component } />;
    }
  }
  else {
    //console.log("isAuthenticated = false");
    //User is not Authenticated
    if (isPrivate === false) {
      //console.log("is no Private");
      //If the route is public, the user may proceed.
      return <Route { ...props } component={ component } />;
    }
    else {
      //console.log("is Private");
      //If the route is private the user is redirected to the app's public root.
      return <Redirect to={ PUBLIC_ROOT } />;
    }
  }
};
/*
AuthRoute.propTypes = {
  component: React.PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ])
};`*/

export default AuthRoute;