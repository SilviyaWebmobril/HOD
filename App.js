

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AppContainer from './src/Routes/Route';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import { connect } from 'react-redux'
import navigation from './src/redux/reducer';
import locationReducer from './src/redux/store/reducers/location'

const reducer = combineReducers({ 
  location :locationReducer
})
const store = createStore(reducer, applyMiddleware(logger))

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