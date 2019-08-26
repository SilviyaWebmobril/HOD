
import {Platform } from 'react-native';
import FCM from "react-native-fcm"; 
import RNDeviceToken from 'react-native-device-token';

   
export default {

    googlePlacesApiKey:'AIzaSyBx5f8NnFiA2kEv7ZcFJVtUs0_6TfZaMPw',
    
    device_type : Platform.OS == "android" ? 1 : 2,

    baseurl : "https://www.webmobril.org/dev/hod/api/",

    create_account: "api_first_signup",

    login:"api_login",

 
    // e.g = setLocation:"set_location?user_id=532&name=test&city=noida&locality=noida&street=18&ho_no=18&latitude=77.3434&longitude=81.35435&full_address=g 18 sec 63 noida"
    setLocation:"set_location?user_id=",

    get_video: "video?user_id=",    

    get_product_category: "product_categories",

}