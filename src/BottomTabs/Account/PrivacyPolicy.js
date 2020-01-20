import React, { Component} from 'react'
import {View ,Text, StyleSheet}  from 'react-native';
import WebView from 'react-native-webview';
import ApiUrl from '../../Api/ApiUrl';



export default class PrivacyPloicy extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Privacy Policy",
        headerStyle: { backgroundColor: '#FD8D45' },
        headerTitleStyle: { color: 'white',fontSize:17,flex:1 ,fontFamily:"Philosopher-Bold",},
        headerTintColor: 'white'
      });
    

    render(){
        return(
            <WebView source={{ uri: ApiUrl.privacy_policy }} style={{margin:20}} />

        )
    }
}
