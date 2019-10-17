import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Alert,
    Platform
} from 'react-native';
import * as HOC from '../HOC/mainHoc';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
import CustomLogo  from '../CustomUI/Logo/CustomLogo';
import { LoginManager ,AccessToken,GraphRequest,GraphRequestManager} from "react-native-fbsdk";

import After_SplashStyle from './After_SplashStyle';
import CustomButton from '../CustomUI/CustomButton/CustomButton';
import CustomButtonWithIcon from '../CustomUI/CustomButton/CustomButtonWithIcon';
import FBLoginButton from './FBLoginButton';
import Axios from 'axios';
import ApiUrl from '../Api/ApiUrl';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';  
import { userData ,getUserId} from '../redux/store/actions/userDataAction'; 
import {connect } from 'react-redux';

class After_Splash extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    constructor(props){
        super(props);
        this.state = {
            isLoading:false
        }
    }
   

    onLogin = () => {
      
        this.props.navigation.navigate('Login',{update:0});
    };
    onCreate_Account = () => {
        this.props.navigation.navigate('Create_Account');
    };

    onLoginEmail  = () => {
        this.props.navigation.navigate('LoginEmail');
    }

    onLoginWithFacebook = () =>{
       this.setState({isLoading:true});
    firebase.messaging().getToken()
    .then(token => {
   


    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(result => 
         {
  
          if (result.isCancelled) {
            this.setState({isLoading:false});
            console.log('Login cancelled')

          } else {
          
              AccessToken.getCurrentAccessToken().then(
             (data) => {
               let accessToken = data.accessToken
                //Alert.alert(accessToken.toString())
  
               const responseInfoCallback = (error, result) => {
                 if (error) {
                     console.log("graph error",error)
                     //Alert.alert('Error fetching data: ' + error.toString());
                     this.setState({isLoading:false});
                     Alert.alert(
                        'Error',
                        'Something went wrong ! Please try again later.',
                        [
                     
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ], 
                        { cancelable: false }
                        )
                 } else {
                    console.log("graph result",result.name)
                   // Alert.alert('Success fetching data: ' + JSON.stringify(result));

                    let formdata = new FormData();
                    //formdata.append("name",JSON.stringify(result.email));
                    formdata.append("name",result.name)
                    formdata.append("email",result.email);
                    formdata.append("fb_id",result.id);
                    if(Platform.OS ==  "android"){
                        formdata.append("device_type","1");
                    }else{
                        formdata.append("device_type","2");

                    }
                    formdata.append("device_token",token);
                    Axios.post(ApiUrl.baseurl + ApiUrl.facebook_login,formdata)
                    .then(res=> {

                        console.log("response api",res);
                       // AsyncStorage.setItem('user_id',JSON.stringify(res.data.result.id))
                      

                        let userdata ={};
                    
                        Object.assign(userdata,{"user_id":JSON.stringify(res.data.result.id)});
                        Object.assign(userdata,{"user_name": res.data.result.name});
                        Object.assign(userdata,{"user_email":res.data.result.email});
                        Object.assign(userdata,{"user_mobile":res.data.result.mobile});
                        Object.assign(userdata,{"user_gender":res.data.result.name});
                        Object.assign(userdata,{"user_dob":res.data.result.dob});
                        Object.assign(userdata,{"user_married":JSON.stringify(res.data.result.married)});
                        Object.assign(userdata,{"user_family_members":res.data.result.family_members});
                        Object.assign(userdata,{"user_vegitarian":JSON.stringify(res.data.result.vegitarian)});
                        this.props.onUpdateUserId(JSON.stringify(res.data.result.id));
                        this.props.onUpdateUser(userdata);
                       this.setState({isLoading:false});
                       // Alert.alert("Your Account created Sucessfuly!");
                        if(res.data.register_flag == 0){

                            AsyncStorage.setItem('user_id',JSON.stringify(res.data.result.id))
                           
                            this.props.navigation.navigate('Bottomtabs');
        
                        }else{
                            Alert.alert("Your Account created Successfully!");
                            this.props.navigation.navigate('SearchLocation',{"location_update":1});
        
                        }

                    }).catch(error => {
                        this.setState({isLoading:false});
                        console.log("error", error);
                        Alert.alert(
                            'Error',
                            'Something went wrong ! Please try again later.',
                            [
                         
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                            ], 
                            { cancelable: false }
                            )
                    });


                 }
               }
  
               const infoRequest = new GraphRequest(
                 '/me',
                 {
                   accessToken: accessToken,
                   parameters: {
                     fields: {
                       string: 'email,name,id'
                     }
                   }
                 },
                 responseInfoCallback
               );
               new GraphRequestManager().addRequest(infoRequest).start();
             
               //ToastAndroid.show("Result ..."+ a.toString(),ToastAndroid.LONG)
  
             }
           )
          }
  
    }).catch (error => {
        this.setState({isLoading:false});
        Alert.alert(
            'Error',
            'Something went wrong ! Please try again later.',
            [
         
            {text: 'OK', onPress: () => console.log('OK Pressed')},
            ], 
            { cancelable: false }
            )
    })
    
    });
    

    }

    render() {
        return (
            <FullSCreenSpinnerAndDismissKeyboardView spinner={this.state.isLoading} refreshing={false}
             style={After_SplashStyle.container}>
                
                    <View>
                        <CustomLogo customLogoStyle={{height:180}}/>
             
                        <View style={After_SplashStyle.after_splash_bottom}>

                        {/* <CustomButton text="LOGIN" onPressHandler={()=>this.onLogin()} customButttonStyle={{marginBottom:25}} customTextStyle={{ color:'white'}} /> */}

                        <CustomButtonWithIcon 
                            customViewIconStyle={{backgroundColor:"#B95704",borderTopLeftRadius: 5,borderBottomLeftRadius: 5,}} 
                            iconName="cellphone-message" iconSize={25}
                            iconColor="white"
                            onPressHandler={()=>this.onLogin()}
                            customViewTextStyle={{backgroundColor:"#BB6822", borderBottomRightRadius: 5,borderTopRightRadius: 5,fontSize:15}}
                            customText="LOGIN WITH OTP"
                            customButttonStyle={{marginBottom:25}}
                            /> 


                        
                        <CustomButtonWithIcon 
                            customViewIconStyle={{backgroundColor:"#2F4F93",borderTopLeftRadius: 5,borderBottomLeftRadius: 5,}} 
                            iconName="facebook" iconSize={25}
                            iconColor="white"
                            onPressHandler={()=> this.onLoginWithFacebook()} 
                            customViewTextStyle={{backgroundColor:"#3B5998", borderBottomRightRadius: 5,borderTopRightRadius: 5,fontSize:15}}
                            customText="REGISTER WITH FACEBOOK"
                            /> 

                            <View style={{marginTop:25}}></View>

                        <CustomButtonWithIcon 
                            customViewIconStyle={{backgroundColor:"#D41519",borderTopLeftRadius: 5,borderBottomLeftRadius: 5,}} 
                            iconName="email" iconSize={25}
                            iconColor="white"
                            onPressHandler={()=> this.onLoginEmail()} 
                            customViewTextStyle={{backgroundColor:"#DB3236", borderBottomRightRadius: 5,borderTopRightRadius: 5,fontSize:15}}
                            customText="LOGIN WITH EMAIL"
                            />

                        <View style={{margin:25}}> 
                            <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>OR</Text>
                        </View>
                        
                        <CustomButton text="CREATE ACCOUNT" 
                            onPressHandler={()=>this.onCreate_Account()} 
                            customButttonStyle={{backgroundColor:"#FD8D45", }}
                            customTextStyle={{ color:'#48241e'}} 
                        />
                
                        </View>
                    

                    </View>
               
            </FullSCreenSpinnerAndDismissKeyboardView>
             
           
            
          
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
      onUpdateUser: (userdata) => {
        dispatch(userData(userdata))
      },
      onUpdateUserId: (id) => {
        dispatch(getUserId(id))
      },
    }
  }
  
  export default connect(null,mapDispatchToProps)(After_Splash)
  
  
  