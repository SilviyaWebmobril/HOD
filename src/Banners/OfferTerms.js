import React , { Component } from 'react';
import {View, Text,StyleSheet } from 'react-native';
import * as HOC from '../HOC/mainHoc';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
); 
import {connect} from 'react-redux';
import { WebView } from 'react-native-webview';
import ApiUrl from '../Api/ApiUrl';
import Axios from 'axios';

class OfferTerms extends Component {


    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Offer Terms",
        headerStyle: { backgroundColor: '#FD8D45' },
        headerTitleStyle: {  color: 'white',
        alignSelf: 'center',
        flex: 1,
        fontSize: 17,
        },
        headerTintColor: 'white'
      });
    

    constructor(props){
        super(props);
        this.state = { 
            loading:true,
            banner_data:""
        }
    }

    componentDidMount() {

        let formdata = new FormData();
        formdata.append("user_id",this.props.user.userdata.user_id);
        formdata.append("banner_id",this.props.navigation.getParam("banner_id",""));
        Axios.post(ApiUrl.baseurl+ApiUrl.offer_terms,formdata)
            .then(response => {

                console.log("response data",response.data);
                this.setState({loading:false})

                if(!response.data.status){

                    this.setState({banner_data:response.data.data.terms});
                }else{

                    Alert.alert(
                        'Error',
                        'Check Your Internet connection and again later!',
                        [
                     
                        {text: 'OK', onPress: () => console.log("ok")},
                        
                        ], 
                        { cancelable: false }
                        )
                }

            }).catch(err => {

                Alert.alert(
                    'Error',
                    'Check Your Internet connection and again later!',
                    [
                 
                    {text: 'OK', onPress: () => console.log("ok")},
                    
                    ], 
                    { cancelable: false }
                    )

            })

    }

    render(){
        return(
            <FullSCreenSpinnerAndDismissKeyboardView
            style={styles.container}
            loading={this.state.loading}

            >
                <View style={styles.webViewStyle} pointerEvents="none">
                    <WebView
                        style={{width:'auto',minHeight:150,height:'auto'}}
                        originWhitelist={['*']}
                        source={{ html:this.state.banner_data}}
                    />
                </View>

            </FullSCreenSpinnerAndDismissKeyboardView>
        )
    }
}



const mapStateToProps = state => {
    return {
      user: state.userdata,
     
    }
  }
  
  
  export default connect(mapStateToProps,null)(OfferTerms)
  
  
  



const styles =  StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:"#fff"
    },

    webViewStyle:{
        margin:10
    }


});