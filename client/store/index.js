import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { usersReducer } from './users'
import { alertsReducer } from './alerts'

//COMBINE REDUCERS

const reducer = combineReducers({ 
  users: usersReducer,
  alerts: alertsReducer,
 });

 //CREATE STORE

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
