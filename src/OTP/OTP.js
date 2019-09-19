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


class OTP extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'OTP',
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
    onSubmit = () => {
        clearInterval(this.interval);

        if(this.props.navigation.getParam("update") ==0 ){

            if(this.refs.otp.getInputTextValue("otp") !== "invalid"){
                this.setState({isLoading:true})
                var formdata = new FormData();
                formdata.append("mobile_no",this.props.navigation.getParam('mobile'));
                formdata.append("otp",this.refs.otp.getInputTextValue("otp"));
                Axios.post(ApiUrl.baseurl + ApiUrl.verify_otp,formdata).then(res => {
                    this.setState({isLoading:false});
                    if(res.data.error){
    
                      
                        Alert.alert("Invalid OTP");
    
                    }else{
                        console.log("otp screen",res);
                        AsyncStorage.setItem('user_id',JSON.stringify(res.data.data.id))
                        AsyncStorage.setItem("user_name", res.data.data.name)
                        AsyncStorage.setItem("user_email", res.data.data.email)
                        AsyncStorage.setItem('user_mobile',res.data.data.mobile)
                        AsyncStorage.setItem("user_password",res.data.data.txtpassword)
    
                        let userdata = {};
                        Object.assign(userdata,{"user_id":JSON.stringify(res.data.data.id)});
                        Object.assign(userdata,{"user_name": res.data.data.name});
                        Object.assign(userdata,{"user_email":res.data.data.email});
                        Object.assign(userdata,{"user_mobile":res.data.data.mobile});   
                       
                        
                        if(res.data.result.homeaddress !== null){
                            console.log("not null");
                          AsyncStorage.setItem("user_home",res.data.data.homeaddress)
                          Object.assign(userdata,{"user_address":res.data.data.homeaddress});
                          this.props.onUpdateAddress(res.data.data.homeaddress);
                        }else{
                          console.log("home null");
                          AsyncStorage.setItem("user_home","");
                          Object.assign(userdata,{"user_address":""});
                          this.props.onUpdateAddress(res.data.data.homeaddress);
                        }
                      
                        this.props.onUpdateUser(userdata);
                        this.setState({isLoading:false});
                 
                        this.props.navigation.navigate('Bottomtabs');
    
                    }
                }).catch(error => {
                    this.setState({isLoading:false});
                    console.log("error",error);
                });
    
            }else{
                Alert.alert("Please Enter valid OTP!.")
            }

        }else{

            console.log("on update");
            if(this.refs.otp.getInputTextValue("otp") !== "invalid"){
                this.setState({isLoading:true})
                var formdata = new FormData();
                formdata.append("mobile_no",this.props.navigation.getParam('mobile'));
                formdata.append("otp",this.refs.otp.getInputTextValue("otp"));
                formdata.append("user_id",this.props.userdata.userdata.user_id);
                Axios.post(ApiUrl.baseurl + ApiUrl.verify_otp_on_update_mobile,formdata).then(res => {
                    this.setState({isLoading:false});
                    if(res.data.error){
    
                      
                        Alert.alert("Invalid OTP");
    
                    }else{
    
                        Alert.alert("Your Mobile no Changed Successfully!");
    
                    }
                }).catch(error => {
                    this.setState({isLoading:false});
                    console.log("error",error);
                });
    
            }else{
                Alert.alert("Please Enter valid OTP!.")
            }

        }
       

       
    };
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
        this.state.seconds>0?this.setState(prevState => ({seconds: prevState.seconds - 1})): (clearInterval(this.interval),Alert.alert("OTP Expired Please RESEND"),this.setState({disableResend:false}));
    }
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
            <FullSCreenSpinnerAndDismissKeyboardView style={OTPStyle.container} spinner={this.state.isLoading}>
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{marginBottom:20}}>

                    <CustomLogo />
                    <View style={OTPStyle.bottom}>
                    <Text style={{flexDirection:'row',alignItems:'center',color:'black',fontWeight: 'bold',fontSize: 20,marginBottom:10}}>OTP</Text>
                    <Text style={{color:'#898785',fontWeight: 'bold',fontSize: 17,marginBottom:20,marginTop:10}}>Phone Number Verification</Text>
                    <View style={OTPStyle.circle}>
                        <Text style={OTPStyle.Timertxt}>{this.state.seconds}</Text>
                        </View>
                    <View style={{width:'90%',flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start'}}>
                        <Text style={{color:'black',fontWeight: 'bold',fontSize: 14,}}>OTP</Text>
                    </View>

                    </View>
                    <View style={{alignItems:"center",marginBottom:20}}>

                            <CustomTextInput 
                                ref="otp"
                                placeholder="Enter OTP" 
                                placeholderTextColor='#898785'
                                returnKeyType = { "next" }
                                inputType="otp"
                                keyboardType='numeric'
                            
                            />


                        <CustomButton onPressHandler={()=>this.onStartTimer()} disabled={this.state.disableResend} text="Resend" customButttonStyle={OTPStyle.customButtomSty} customTextStyle={this.state.disableResend ? OTPStyle.disableCustomResendTextSty : OTPStyle.customResendTextSty}/>

                        <CustomButton customTextStyle={{ color:'white'}} onPressHandler = {() => this.onSubmit()} text="SUBMIT" />


                    </View>



                </View>

                </ScrollView>
               
                
               
            
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
            dispatch(userData(userdata))
        },
      
        onUpdateAddress : (address) => {
          
            dispatch(userAddress(address))
        }
    
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(OTP)
  