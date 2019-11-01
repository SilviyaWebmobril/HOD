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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import DeviceInfo from 'react-native-device-info';


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

        

        if((this.refs.emailText.getInputTextValue("email") !== "invalid") ){


            this.setState({isLoading:true})
           
           

              var formdata = new FormData();
             
              formdata.append("email",this.refs.emailText.getInputTextValue("email"));
              

              axios.post(ApiUrl.baseurl + ApiUrl.forgot_password,formdata)
              .then(res => {
                this.setState({isLoading:false});
                console.log("user login",res.data);
                  if(res.data.status){


                    Alert.alert("Invalid Email Id !")
                  }else{

                     this.props.navigation.goBack(null);

                      Alert.alert("Email sent successfully! Please check your mail and Login again.")
                      
                  }
                 
                
              })
              .catch(error => {
                  console.log("my error",error)
                  Alert.alert(
                    'Error',
                    'Check Your Internet connection and again later!',
                    [
                 
                    {text: 'OK', onPress: () => console.log("ok")},
                    
                    ], 
                    { cancelable: false }
                    )

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
             refreshing={false}
             style={LoginEmailStyle.container}>
                <KeyboardAwareScrollView >
               
                    <CustomLogo />
                    {/* <View style={OTPStyle.bottom}>
                    
                    
                    </View> */}
                    {DeviceInfo.isTablet()
                    ?
                        <View style={{marginLeft:40,width:'90%',flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start'}}>
                            <Text style={{color:'black',fontWeight: 'bold',fontSize: 14,}}>Enter Email*</Text>
                        </View>
                    :
                        <View style={{marginLeft:20,width:'90%',flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start'}}>
                            <Text style={{color:'black',fontWeight: 'bold',fontSize: 14,}}>Enter Email*</Text>
                        </View>
                    }
                   
                    <CustomTextInput 
                            ref="emailText"
                            inputType="email"
                            placeholder="Enter Your Email"
                            placeholderTextColor='#898785'

                            
                            />

                   

                        
                        <CustomButton customTextStyle={{ color:'white'}} 
                            onPressHandler={()=>this.changePassword()}
                            text="SUBMIT" />

                       

               
                </KeyboardAwareScrollView>
               
                
               
            
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
  
  