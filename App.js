

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AppContainer from './src/Routes/Route';



type Props = {};
class App extends Component<Props> {
  render() {
    return (
     <AppContainer/>
    );
  }
}

export default App;