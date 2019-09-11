

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AppContainer from './src/Routes/Route';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import { connect } from 'react-redux'
import navigation from './src/redux/reducer';
import locationReducer from './src/redux/store/reducers/location'
import userDataReducer from  './src/redux/store/reducers/userDataReducer';
import cartReducer from './src/redux/store/reducers/cartReducer';
import ReduxThunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const reducer = combineReducers({ 
  location :locationReducer,
  userdata: userDataReducer,
  cart: cartReducer,
})
const store = createStore(reducer,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),applyMiddleware(ReduxThunk));

type Props = {};
class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <AppContainer    />
     </Provider>
    );
  }
}

// const mapStateToProps = state => ({
//   navigation: state.navigation,
// })

export default App;