import './main.css'

import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {syncHistoryWithStore} from 'react-router-redux'
import {Router, Route, browserHistory,Switch} from 'react-router'
import {Provider} from 'react-redux'
import TestApi from "apitest"
import reducers from 'reducers'
import Layout from 'containers/layout'
import Phones from 'containers/phones'
import Phone from 'containers/phone'
import Login from 'components/Login'
import Register from 'components/register'
import Basket from "containers/basket";
import Amplify from "aws-amplify";
import config from "./config/config"
import {API} from "aws-amplify"
const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk)
))

Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region: config.cognito.REGION,
      userPoolId: config.cognito.USER_POOL_ID,
    //   identityPoolId: config.cognito.IDENTITY_POOL_ID,
      userPoolWebClientId: config.cognito.APP_CLIENT_ID
    }
    // Storage: {
    //   region: config.s3.REGION,
    //   bucket: config.s3.BUCKET,
    //   identityPoolId: config.cognito.IDENTITY_POOL_ID
    // },
    // API: {
    //   endpoints: [
    //     {
    //       name: "notes",
    //       endpoint: config.apiGateway.URL,
    //       region: config.apiGateway.REGION
    //     },
    //   ]
    // }
  });

const history = syncHistoryWithStore(browserHistory, store)


Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region: config.cognito.REGION,
      userPoolId: config.cognito.USER_POOL_ID,
    //   identityPoolId: config.cognito.IDENTITY_POOL_ID,
      userPoolWebClientId: config.cognito.APP_CLIENT_ID
    },
    // Storage: {
    //   region: config.s3.REGION,
    //   bucket: config.s3.BUCKET,
    //   identityPoolId: config.cognito.IDENTITY_POOL_ID
    // },
    API: {
      endpoints: [
        {
          name: "shopping-cart",
          endpoint: "https://jq5zrjkh31.execute-api.us-east-1.amazonaws.com/stage1",
          region: config.apiGateway.REGION
        },
      ]
     }
  });

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route component={Layout}>
            
                <Route  path="/" component={Phones} />
              
            </Route>
            <Route path = "/phone/:productId" component = {Phone}/>
            <Route path = "/login" component = {Login}/>
            <Route path = "/register" component = {Register}/>
            <Route path = "/basket" component = {Basket}/>
            <Route path = "/test" component = {TestApi}/>

        </Router>
    </Provider>,
    document.getElementById('root')
);