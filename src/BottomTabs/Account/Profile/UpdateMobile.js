import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    StyleSheet
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import LoginStyle from '../../../Login/LoginStyle';
import CustomLogo from '../../../CustomUI/Logo/CustomLogo';
import * as HOC from '../../../HOC/mainHoc';
import CustomButton from '../../../CustomUI/CustomButton/CustomButton';
import CustomTextInput from '../../../CustomUI/CustomTextInput/CustomTextInput';

const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
import { SwitchActions } from 'react-navigation';
import Axios from 'axios';
import ApiUrl from '../../../Api/ApiUrl';
import {connect} from 'react-redux';

class UpdateMobile extends Component {


  
    static navigationOptions = ({ navigation }) => ({

        title: "Update Mobile",
        headerStyle: {
            height: 60,
            backgroundColor: '#FD8D45',
        },
        headerTitleStyle: {
            color: 'white',
            alignSelf: 'center',
                       flex: 1,
            fontSize: 17,
            
        },
        headerTintColor: 'white',
        headerRight: (<View></View>)
    });

    constructor(props){
        super(props);
     
        this.state={isFocused:false, onUpdate:this.props.navigation.getParam("update")}

        
    }

   
   
    onContinue=()=>{   
      
         //  update param to check wheater usr is login currently or udating mobile no. update =0 (Login) , update= 1(Change mobile)
        if(this.props.navigation.getParam("update") == 0){

            // 

            if(this.refs.mobile.getInputTextValue("mobile") !== "invalid"){

                this.setState({isLoading:true});
    
                var formdata = new FormData();
                formdata.append("mobile_no",this.refs.mobile.getInputTextValue("mobile"));
               
                Axios.post(ApiUrl.baseurl +ApiUrl.send_mobile_for_otp,formdata).then(response => {
                    this.setState({isLoading:false})
    
                    console.log("response send mobile",response);
                    if(response.data.error){
                        Alert.alert(`${response.data.message}`);;
                    }else{
                        this.props.navigation.navigate('OTP',{mobile:this.refs.mobile.getInputTextValue("mobile"),update:0});
                    }
                   
    
                }).catch(error => {
                    this.setState({isLoading:false})
                    console.log("error",error);
                });
               
           }else{
               Alert.alert("Please Enter Mobile No.")
           }
            
        }else{

            if(this.refs.mobile.getInputTextValue("mobile") !== "invalid"){

                this.setState({isLoading:true});
    
                console.log("userdata === >",this.props.userdata);
                var formdata = new FormData();  
                formdata.append("mobile",this.refs.mobile.getInputTextValue("mobile"));
                formdata.append("user_id",this.props.userdata.userdata.user_id);
               
                Axios.post(ApiUrl.baseurl +ApiUrl.update_mobile_no,formdata).then(response => {
                    this.setState({isLoading:false})
    
                    console.log("response send mobile",response);
                    if(response.data.error){
                        
                        Alert.alert(
                            'Update Mobile',
                            `${response.data.message}`,
                            [
                         
                            {text: 'OK', onPress: () => console.log("ok")},
                            
                            ], 
                            { cancelable: false }
                            )
                    }else{
                        this.props.navigation.navigate('OTP',{mobile:this.refs.mobile.getInputTextValue("mobile"),update:1});
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
            }else{
                Alert.alert("Please Enter Mobile No.")
            }   
        }

    };
    onCreate_Account = () => {
        this.props.navigation.navigate('Create_Account');
    };
    render() {
        return (
            <FullSCreenSpinnerAndDismissKeyboardView style={styles.container} refreshing={false} spinner={this.state.isLoading}>
                <KeyboardAwareScrollView >
                    <CustomLogo/>

                    <Text style={styles.labelText}>Mobile No.</Text>
                    <CustomTextInput 
                        ref="mobile"
                        placeholder="Enter mobile number" 
                        placeholderTextColor='#898785'
                        returnKeyType = { "next" }
                        inputType="mobile"
                        keyboardType='numeric'
                
                    />
                    <CustomButton text="CONTINUE"
                     customButttonStyle={{marginBottom:40,marginTop:20}}
                     customTextStyle={{ color:'white'}} onPressHandler = {() => this.onContinue()}  />


               
                   
                    
                 

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
  
  export default connect(mapStateToProps,null)(UpdateMobile)

  const styles = StyleSheet.create({


    container:{
        flex:1,
        backgroundColor:'#fff',
        marginLeft:0,
        marginRight:0,
        marginTop:15,
       
    },

   
    labelText:{
        fontFamily:"roboto-light",
        color:'grey',
        fontSize: 17,
        marginLeft:15
    },

  })
  