import React, { Component} from 'react'
import {View ,Text, StyleSheet,ActivityIndicator}  from 'react-native';
import WebView from 'react-native-webview';
import ApiUrl from '../../Api/ApiUrl';



export default class AboutUs extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "About Us",
        headerStyle: { backgroundColor: '#FD8D45' },
        headerTitleStyle: { color: 'white',fontSize:17,flex:1 },
        headerTintColor: 'white'
      });
    
      constructor(props){
        super(props);
        this.state ={ 
            loading:true,
        }

      }
    

    render(){
        return(
            <>
            <WebView source={{ uri: ApiUrl.about_us }} style={{margin:20}} onLoad={()=> this.setState({loading:false})}/>
            {this.state.loading &&
              <View
                style={[
                  StyleSheet.absoluteFill,
                  { backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }
                ]}
              >
                <ActivityIndicator size="large"  color="#48241e"/>
              </View>}
            </>

        )
    }
}
