
import {Platform } from 'react-native';
export default {

    device_type : Platform.OS == "android" ? 1 : 2,

    baseurl : "https://www.webmobril.org/dev/hod/api/",

    create_account: "api_first_signup",

    login:"api_login",

}