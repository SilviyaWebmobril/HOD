import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    
    Alert
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as HOC from '../HOC/mainHoc';

import CustomLogo from '../CustomUI/Logo/CustomLogo';
import CustomTextInput from '../CustomUI/CustomTextInput/CustomTextInput';
import CustomButton from '../CustomUI/CustomButton/CustomButton';
import LoginEmailStyle from './LoginEmailStyle';

const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
import FCM from "react-native-fcm"; 
import AsyncStorage from '@react-native-community/async-storage';
import ApiUrl from '../Api/ApiUrl';
import axios  from 'axios';


export default class LoginEmail extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Login With Email',
        headerStyle: {
            height: 60,
            backgroundColor: '#FD8D45',
        },
        headerTitleStyle: {
            color: 'white',
            alignSelf: 'center',
            textAlign: 'center',
            flex: 1,
            fontSize: 17,
        },
        headerTintColor: 'white',
        headerRight: (<View></View>)
    });

    constructor(props) {
        super(props);
        this.state = {
             seconds: 60 ,
             isFocusedEmail:false,
             isFocusedPassword:false,
             isLoading:false,
            
        
        };
       
      }


    onSubmit = () => {
      
        this.props.navigation.navigate('Create_Account');
    };

    onLoginHandler = () =>{

        if((this.refs.emailText.getInputTextValue("email") !== "invalid") && (this.refs.passwordText.getInputTextValue("password") !== "invalid")){


            this.setState({isLoading:true})
           
            FCM.requestPermissions();
            FCM.getFCMToken().then(token => {
            this.setState({device_token:token});


              var formdata = new FormData();
             
              formdata.append("email",this.refs.emailText.getInputTextValue("email"));
              formdata.append("password",this.refs.passwordText.getInputTextValue("password"));
              formdata.append("device_type",ApiUrl.device_type);
              formdata.append("device_token",this.state.device_token);

              console.log("formdata",formdata);

      
              axios.post(ApiUrl.baseurl + ApiUrl.login,formdata)
              .then(res => {
               
                  console.log("my response",res);
                 
                  if(res.data.error){

                      this.setState({isLoading:false});
                      Alert.alert("Please Check You Email or Password");

                  }else{

                      AsyncStorage.setItem('user_id',JSON.stringify(res.data.result.id))
                      AsyncStorage.setItem("user_name", res.data.result.name)
                      AsyncStorage.setItem("user_email", res.data.result.email)
                      AsyncStorage.setItem('user_mobile',res.data.result.mobile)
                      AsyncStorage.setItem("user_password",res.data.result.txtpassword)
                      if(res.data.result.homeaddress != null){
                        AsyncStorage.setItem("user_home",res.data.result.homeaddress)
                      }else{
                        AsyncStorage.setItem("user_home","");
                      }
                      
                      this.setState({isLoading:false});
                     // Alert.alert("Your Account created Sucessfuly!");
                      this.props.navigation.navigate('Bottomtabs');
  
                      
                  }
                 
                
              })
              .catch(error => {
                  console.log("my error",error.response)
              });



            });

            

        }else{
            Alert.alert("All the * marked fields are required");
        }


    }
    
     
    render() {
        return (
            <FullSCreenSpinnerAndDismissKeyboardView 
             spinner={this.state.isLoading}
             style={LoginEmailStyle.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{marginBottom:20}}>

                    <CustomLogo />
                    {/* <View style={OTPStyle.bottom}>
                    
                    
                    </View> */}
                    <View style={{marginLeft:20,width:'90%',flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start'}}>
                        <Text style={{color:'black',fontWeight: 'bold',fontSize: 14,}}>Email*</Text>
                    </View>
                    <CustomTextInput 
                            ref="emailText"
                            inputType="email"
                            placeholder="Enter Email"
                            placeholderTextColor='#898785'
                            keyboardType='email-address'

                            />

                    <View style={{marginLeft:20,width:'90%',flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start'}}>
                        <Text style={{color:'black',fontWeight: 'bold',fontSize: 14,}}>Password*</Text>
                    </View>
                    <CustomTextInput 
                            ref="passwordText"
                            inputType="password"
                            placeholder="Enter Password"
                            placeholderTextColor='#898785'
                            secureTextEntry={true}

                            
                            />

                        <CustomButton onPressHandler={()=>this.onStartTimer()}  text="Forget Password ?"
                         customButttonStyle={{alignItems:"flex-end",backgroundColor:'white',marginTop:0}} 
                         customTextStyle={{color:'#FD8D45',fontWeight: 'bold',fontSize: 14,textDecorationLine: 'underline'}}/>

 
                        <CustomButton customTextStyle={{ color:'white'}} 
                            onPressHandler={()=>this.onLoginHandler()}
                            text="LOGIN" />

                        <View style={{margin:25,justifyContent:"center"}}> 
                            <Text style={{color:'#808080',fontWeight: 'bold',alignSelf:"center", fontSize: 17,justifyContent:"center"}}>OR</Text>
                        </View>


                        
                        <CustomButton  customButttonStyle={{backgroundColor:"#FD8D45", }} customTextStyle={{ color:'black'}} onPressHandler = {() => this.onSubmit()} text="CREATE ACCOUNT" />


                </View>

                </ScrollView>
               
                
               
            
            </FullSCreenSpinnerAndDismissKeyboardView>
        );
    }
}