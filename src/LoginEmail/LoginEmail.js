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


class LoginEmail extends Component {
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
           
            firebase.messaging().getToken()
            .then(token => {
            this.setState({device_token:token});


              var formdata = new FormData();
             
              formdata.append("email",this.refs.emailText.getInputTextValue("email"));
              formdata.append("password",this.refs.passwordText.getInputTextValue("password"));
              formdata.append("device_type",ApiUrl.device_type);
              formdata.append("device_token",this.state.device_token);

              axios.post(ApiUrl.baseurl + ApiUrl.login,formdata)
              .then(res => {
              
                 
                  if(res.data.error){

                      this.setState({isLoading:false});
                      Alert.alert("Please Check Your Email or Password");

                  }else{

                        console.log("user login",res.data.result);
                      AsyncStorage.setItem('user_id',JSON.stringify(res.data.result.id))
                      

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
                      this.props.onUpdateAddress(res.data.result.homeaddress);
                      this.setState({isLoading:false});
                     // Alert.alert("Your Account created Sucessfuly!");
                      this.props.navigation.navigate('Bottomtabs');
  
                      
                  }
                 
                
              })
              .catch(error => {
                  console.log("my error",error.response)
                  alert("Something went wrong!")
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

                        <CustomButton   text="Forget Password ?"
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
  
  export default connect(null,mapDispatchToProps)(LoginEmail)
  
  