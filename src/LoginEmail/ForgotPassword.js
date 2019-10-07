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
import { ADD_USER_DATA } from '../redux/store/actions/types';

import CustomLogo from '../CustomUI/Logo/CustomLogo';
import CustomTextInput from '../CustomUI/CustomTextInput/CustomTextInput';
import CustomButton from '../CustomUI/CustomButton/CustomButton';
import LoginEmailStyle from './LoginEmailStyle';
import {connect} from 'react-redux';
import { userData ,userAddress,getUserId} from '../redux/store/actions/userDataAction';

const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
// import FCM from "react-native-fcm"; 
import AsyncStorage from '@react-native-community/async-storage';
import ApiUrl from '../Api/ApiUrl';
import axios  from 'axios';
import firebase from 'react-native-firebase';


class ForgotPassword extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Forgot Password',
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


 

    changePassword = () =>{

        if((this.refs.passwordText.getInputTextValue("password") !== "invalid") && (this.refs.confirmPasswordText.getInputTextValue("confirmpassword") !== "invalid") && 
        this.refs.passwordText.getInputTextValue("password").length !== this.refs.confirmPasswordText.getInputTextValue("confirmpassword").length){

            Alert.alert("Password and Confirm password does not match");
            return ;
        }

        if((this.refs.passwordText.getInputTextValue("password") !== "invalid") && (this.refs.confirmPasswordText.getInputTextValue("confirmpassword") !== "invalid")){


            this.setState({isLoading:true})
           
           

              var formdata = new FormData();
             
              formdata.append("password",this.refs.emailText.getInputTextValue("password"));
              formdata.append("confirm_password",this.refs.passwordText.getInputTextValue("confirmpassword"));
              

              axios.post(ApiUrl.baseurl + ApiUrl.login,formdata)
              .then(res => {
              
                 
                  if(res.data.error){

                      this.setState({isLoading:false});
                      Alert.alert("New Password and Confirm Password doesn't match!");

                  }else{

                        console.log("user login",res.data.result);
                     
                      this.props.navigation.navigate('Bottomtabs');
  
                      
                  }
                 
                
              })
              .catch(error => {
                  console.log("my error",error)
                  alert("Check You Netwrok connect and try again!");

                  this.setState({isLoading:false});
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
                        <Text style={{color:'black',fontWeight: 'bold',fontSize: 14,}}>New Password*</Text>
                    </View>
                    <CustomTextInput 
                            ref="passwordText"
                            inputType="password"
                            placeholder="Enter  New Password"
                            placeholderTextColor='#898785'
                            secureTextEntry={true}

                            
                            />

                    <View style={{marginLeft:20,width:'90%',flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start'}}>
                        <Text style={{color:'black',fontWeight: 'bold',fontSize: 14,}}>Confirm Password*</Text>
                    </View>
                    <CustomTextInput 
                            ref="confirmPasswordText"
                            inputType="confirmpassword"
                            placeholder="Confirm Password"
                            placeholderTextColor='#898785'
                            secureTextEntry={true}

                            
                            />

                        
                        <CustomButton customTextStyle={{ color:'white'}} 
                            onPressHandler={()=>this.changePassword()}
                            text="Change Password" />

                       

                </View>

                </ScrollView>
               
                
               
            
            </FullSCreenSpinnerAndDismissKeyboardView>
        );
    }
}




const mapDispatchToProps = dispatch => {
    return {
        
        onUpdateUser: (userdata) => {
            dispatch(userData(userdata))
        },
      
        onUpdateAddress : (address) => {
          
            dispatch(userAddress(address))
        },
        onUpdateUserId: (id) => {
            dispatch(getUserId(id))
          },
    
    }
  }
  
  export default connect(null,mapDispatchToProps)(ForgotPassword)
  
  