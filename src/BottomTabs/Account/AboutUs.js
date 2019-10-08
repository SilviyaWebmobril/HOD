import React, { Component} from 'react'
import {View ,Text, StyleSheet}  from 'react-native';
import WebView from 'react-native-webview';
import ApiUrl from '../../Api/ApiUrl';



export default class AboutUs extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "About Us",
        headerStyle: { backgroundColor: '#FD8D45' },
        headerTitleStyle: { color: 'white' },
        headerTintColor: 'white'
      });
    

    render(){
        return(
            <WebView source={{ uri: ApiUrl.about_us }} />

        )
    }
}
