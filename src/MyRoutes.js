import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Wrapper/AuthRoute';

import Login from './Container/Login';
import Top from './component/Top'

const Routes = () => (
        <Switch>
            <Route exact path='/login' component={Login}/>
            <Route path='/top' component={TopPanel}/>
            <Route component={Login}/>
        </Switch>
);

export default Routes;


/*

        <Route path='/' component={Splash}/>
*/
