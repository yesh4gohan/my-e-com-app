import './main.css'

import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {syncHistoryWithStore} from 'react-router-redux'
import {Router, Route, browserHistory} from 'react-router'
import {Provider} from 'react-redux'
import Basket from "containers/basket"
import reducers from 'reducers'
import Layout from 'containers/layout'
import Phones from 'containers/phones'
import Phone from 'containers/phone'
import Login from 'components/Login'
import Register from 'components/register'
import AppNavBar from "components/navbar"
import Amplify from "aws-amplify";
import config from "./config/config"

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk)
))

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={store}>
        <div>
           
        <Router history={history}>
        
            <Route component={Layout}>
                <Route path='/' component={Phones} />
            
                
                

            </Route>
            <Route  path="/basket" component={Basket} />
            <Route path = "/phone/:id" component = {Phone}/>
        </Router>
        </div>
    </Provider>,
    document.getElementById('root')
);
