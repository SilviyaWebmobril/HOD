import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ToastAndroid,
    Alert
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as HOC from '../HOC/mainHoc';
import OTPStyle from './OTPStyles';
import CustomLogo from '../CustomUI/Logo/CustomLogo';
import CustomTextInput from '../CustomUI/CustomTextInput/CustomTextInput';
import CustomButton from '../CustomUI/CustomButton/CustomButton';
import Axios from 'axios';
import ApiUrl from '../Api/ApiUrl';

const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
import {connect} from 'react-redux';

import AsyncStorage from '@react-native-community/async-storage';
import * as userAction from '../redux/store/actions/userDataAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import firebase from 'react-native-firebase';


class OTP extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'OTP',
        headerStyle: {
            height: 60,
            backgroundColor: '#FD8D45',
        },
        headerTitleStyle: {
            fontFamily:"Roboto-Light",
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
             isFocused:false,
             disableResend:true,
             isLoading:false


        };
       
      }
      tick() {
        this.state.seconds>0?this.setState(prevState => ({seconds: prevState.seconds - 1})): (clearInterval(this.interval), Alert.alert(
            'Resend OTP',
            `OTP Expired Please RESEND`,
            [
         
            {text: 'OK', onPress: () => console.log("ok")},
            
            ], 
            { cancelable: false }
            ),this.setState({disableResend:false}));
    }

    resendOTP = () =>{

        this.setState({isLoading:true})
        var formdata = new FormData();
        formdata.append("mobile_no",this.props.navigation.getParam('mobile'));
        
        Axios.post(ApiUrl.baseurl +ApiUrl.send_mobile_for_otp,formdata).then(response => {
            this.setState({isLoading:false})

            console.log("response send mobile",response);
            ToastAndroid.show("Your otp is "+response.data.otp,ToastAndroid.LONG);
            if(response.data.error){
               
                Alert.alert(
                    'OTP',
                    `${response.data.message}`,
                    [
                 
                    {text: 'OK', onPress: () => console.log("ok")},
                    
                    ], 
                    { cancelable: false }
                    )
            }else{
                //this.props.navigation.navigate('OTP',{mobile:this.refs.mobile.getInputTextValue("mobile"),update:0});
            }
            

        }).catch(error => {
            this.setState({isLoading:false})
            console.log("error",error);
            Alert.alert(
                'Error',
                'Check Your Internet connection and again later!',
                [
             
                {text: 'OK', onPress: () => console.log("ok")},
                
                ], 
                { cancelable: false }
                )
        });
        
    }
    
      //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log("gvsgscvhsvhbc1111",fcmToken);
   
    if (!fcmToken) {
       
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            // user has a device token
            console.log("gvsgscvhsvhbc",fcmToken);
            await AsyncStorage.setItem('fcmToken', fcmToken);
            
        }
    }
    return fcmToken;
  }
    
    onSubmit = async() => {
       

        if(this.props.navigation.getParam("update") ==0 ){


            if(this.refs.otp.getInputTextValue("otp") !== "invalid"){
                
                this.getToken().then(
                    response => {
                        console.log("hixccvxhx",response);

                        this.setState({isLoading:true})
                        var formdata = new FormData();
                        formdata.append("mobile_no",this.props.navigation.getParam('mobile'));
                        formdata.append("otp",this.refs.otp.getInputTextValue("otp"));
                        formdata.append("device_type",ApiUrl.device_type);
                        formdata.append("device_token",response);
                        Axios.post(ApiUrl.baseurl + ApiUrl.verify_otp,formdata).then(res => {
                            this.setState({isLoading:false});
                            console.log("error",res.data)
                            if(res.data.error){
            
                              
                              
                                Alert.alert(
                                    'OTP',
                                    'Invalid OTP',
                                    [
                                 
                                    {text: 'OK', onPress: () => console.log("ok")},
                                    
                                    ], 
                                    { cancelable: false }
                                    )
            
                            }else{
                                clearInterval(this.interval);
                                AsyncStorage.setItem('user_id',JSON.stringify(res.data.data.id))
                                
                                let userdata = {};
                                Object.assign(userdata,{"user_id":JSON.stringify(res.data.data.id)});
                                if(res.data.data.name !== null){
        
                                    Object.assign(userdata,{"user_name": res.data.data.name});
                                }else{
                                    Object.assign(userdata,{"user_name": ""});
                                }
                                if(res.data.data.email !== null){
                                    Object.assign(userdata,{"user_email":res.data.data.email});
                                }else{
                                    Object.assign(userdata,{"user_email":""});
                                }
                                if(res.data.data.mobile !== null){
                                    Object.assign(userdata,{"user_mobile":res.data.data.mobile});  
                                }else{
                                    Object.assign(userdata,{"user_mobile":""});  
                                }
                                if(res.data.data.gender !== null){
                                    Object.assign(userdata,{"user_gender":res.data.data.gender});
                                }else{
                                    Object.assign(userdata,{"user_gender":""});
                                }
                                if(res.data.data.dob){
                                    Object.assign(userdata,{"user_dob":res.data.data.dob});
                                }else{
                                    Object.assign(userdata,{"user_dob":""});
                                }
                                if(res.data.data.married !== null){
                                    Object.assign(userdata,{"user_married":res.data.data.married});
                                }else{
                                    Object.assign(userdata,{"user_married":""});
                                }
                                if(res.data.data.family_members !== null){
                                    Object.assign(userdata,{"user_family_members":res.data.data.family_members});
                                }else{
                                    Object.assign(userdata,{"user_family_members":""});
                                }
                                if(res.data.data.vegitarian !== null){
                                    Object.assign(userdata,{"user_vegitarian":res.data.data.vegitarian});
                                }else{
                                    Object.assign(userdata,{"user_vegitarian":""});
                                }
                            
                                if(res.data.data.homeaddress !== null){
                                   
                                
                                  Object.assign(userdata,{"user_address":res.data.data.homeaddress});
                                  this.props.onUpdateAddress(res.data.data.homeaddress);
                                }else{
                                 
                                  Object.assign(userdata,{"user_address":""});
                                  this.props.onUpdateAddress(res.data.data.homeaddress);
                                }
                              
                                this.props.onUpdateUser(userdata);
                                this.props.onUpdateUserId(JSON.stringify(res.data.data.id));
                                this.setState({isLoading:false});
                         
                                this.props.navigation.navigate('Bottomtabs');
            
                            }
                        }).catch(error => {
                            this.setState({isLoading:false});
                            console.log("error",error);
                            Alert.alert(
                                'Error',
                                'Check Your Internet Connection!',
                                [
                             
                                {text: 'OK', onPress: () => console.log("ok")},
                                
                                ], 
                                { cancelable: false }
                                )
                            
                        });
                    }
                );
               
            }else{
               
                Alert.alert(
                    'OTP',
                    'Please Enter valid OTP!',
                    [
                 
                    {text: 'OK', onPress: () => console.log("ok")},
                    
                    ], 
                    { cancelable: false }
                    )
                
            }

        }else{

            console.log("on update");
            if(this.refs.otp.getInputTextValue("otp") !== "invalid"){
                clearInterval(this.interval);
                this.setState({isLoading:true})
                var formdata = new FormData();
                formdata.append("mobile_no",this.props.navigation.getParam('mobile'));
                formdata.append("otp",this.refs.otp.getInputTextValue("otp"));
                formdata.append("user_id",this.props.userdata.userdata.user_id);
                Axios.post(ApiUrl.baseurl + ApiUrl.verify_otp_on_update_mobile,formdata).then(res => {
                    this.setState({isLoading:false});
                    if(res.data.error){
    
                      
                       
                        Alert.alert(
                            'OTP',
                            'Invalid OTP',
                            [
                         
                            {text: 'OK', onPress: () => console.log("ok")},
                            
                            ], 
                            { cancelable: false }
                            )
    
                    }else{

                        this.props.onUpdateMobile(this.props.navigation.getParam('mobile'));
                        // this.storeValues(this.props.navigation.getParam('mobile'))
                       
                        Alert.alert(
                            'OTP',
                            'Your Mobile no Updated Successfully!',
                            [
                         
                            {text: 'OK', onPress: () => console.log("ok")},
                            
                            ], 
                            { cancelable: false }
                            )
    
                        
                        this.props.navigation.navigate('ViewProfile');  
    
                    }
                }).catch(error => {
                    this.setState({isLoading:false});
                    console.log("error",error);
                    Alert.alert(
                        'OTP',
                        'Check Your Internet Connection!',
                        [
                     
                        {text: 'OK', onPress: () => console.log("ok")},
                        
                        ], 
                        { cancelable: false }
                        )
                    
                });
    
            }else{
              
                Alert.alert(
                    'OTP',
                    'Please Enter valid OTP!.',
                    [
                 
                    {text: 'OK', onPress: () => console.log("ok")},
                    
                    ], 
                    { cancelable: false }
                    )

            }

        }
       

       
    };
    
    onStartTimer(){
        if(!this.state.disableResend){
            clearInterval(this.interval);
            this.setState({seconds:60});
            this.interval = setInterval(() => this.tick(), 1000);
            this.setState({disableResend:true})
        }
       
    }
      componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
        
      }
      componentWillUnmount() {
        clearInterval(this.interval);
      }
    render() {
        return (
            <FullSCreenSpinnerAndDismissKeyboardView refreshing={false} spinner={this.state.isLoading}>
                <KeyboardAwareScrollView >
                    <View style={OTPStyle.container}>

                        <View style={OTPStyle.circle}>
                            <Text style={OTPStyle.Timertxt}> {this.state.seconds} </Text>
                        </View>
                        <View style={{justifyContent:"center" ,alignItems:"center",marginBottom:20}}>

                        <CustomTextInput 
                            ref="otp"
                            placeholder="Enter OTP" 
                            placeholderTextColor='#898785'
                            returnKeyType = { "next" }
                            inputType="otp"
                            keyboardType='numeric'

                        />




                        </View>
                        <CustomButton onPressHandler={()=>{this.onStartTimer();this.resendOTP()}} disabled={this.state.disableResend} text=" Resend " customButttonStyle={OTPStyle.customButtomSty} customTextStyle={this.state.disableResend ? OTPStyle.disableCustomResendTextSty : OTPStyle.customResendTextSty}/>

                        <CustomButton customTextStyle={{ color:'white'}} onPressHandler = {() => this.onSubmit()} text="SUBMIT" />

                    
                    </View>
                </KeyboardAwareScrollView>
               
                
               
            
            </FullSCreenSpinnerAndDismissKeyboardView>
        );
    }
}



const mapStateToProps = state => {
    return {
      userdata: state.userdata
    }
  }


  
const mapDispatchToProps = dispatch => {
    return {
        
        onUpdateUser: (userdata) => {
            dispatch(userAction.userData(userdata))
        },
      
        onUpdateAddress : (address) => {
          
            dispatch(userAction.userAddress(address))
        },
        onUpdateMobile :(mobile) => {
            dispatch(userAction.changeMobile(mobile))
        },
        onUpdateUserId: (id) => {
            dispatch(userAction.getUserId(id))
          },
    
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(OTP)
  