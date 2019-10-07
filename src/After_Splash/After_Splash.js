import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView
} from 'react-native';
import * as HOC from '../HOC/mainHoc';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
import CustomLogo  from '../CustomUI/Logo/CustomLogo';

import After_SplashStyle from './After_SplashStyle';
import CustomButton from '../CustomUI/CustomButton/CustomButton';
import CustomButtonWithIcon from '../CustomUI/CustomButton/CustomButtonWithIcon';
import { LoginButton } from 'react-native-fbsdk';
import FBLoginButton from './FBLoginButton';

export default class After_Splash extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
    });

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


    }

    render() {
        return (
            <FullSCreenSpinnerAndDismissKeyboardView style={After_SplashStyle.container}>
                <ScrollView>
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


                        <FBLoginButton />
                        {/* <CustomButtonWithIcon 
                            customViewIconStyle={{backgroundColor:"#2F4F93",borderTopLeftRadius: 5,borderBottomLeftRadius: 5,}} 
                            iconName="facebook" iconSize={25}
                            iconColor="white"
                            onPressHandler={()=> this.onLoginWithFacebook()} 
                            customViewTextStyle={{backgroundColor:"#3B5998", borderBottomRightRadius: 5,borderTopRightRadius: 5,fontSize:15}}
                            customText="REGISTER WITH FACEBOOK"
                            />  */}

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
                </ScrollView>

               

            </FullSCreenSpinnerAndDismissKeyboardView>
             
           
            
          
        );
    }
}
