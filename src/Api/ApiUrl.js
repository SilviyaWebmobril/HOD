
import {Platform } from 'react-native';
import FCM from "react-native-fcm"; 
import RNDeviceToken from 'react-native-device-token';

   
export default {

    
    device_type : Platform.OS == "android" ? 1 : 2,

    baseurl : "https://www.webmobril.org/dev/hod/api/",

    create_account: "api_first_signup",

    login:"api_login",

}