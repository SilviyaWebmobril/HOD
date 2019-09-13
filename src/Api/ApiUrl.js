
import {Platform } from 'react-native';

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
    
    // home page api for banners,product categories, all products
    home_page: "home_screen?user_id=",

    //not using 
    get_product_category: "product_categories",

    // not using 
    get_banners:"banners",
    // not using
    get_all_products:"get_all_products",

    get_support:"support",

    get_categories_product:"products?product_cat_id=",

    get_product_details:"product_info?product_id=",

    get_all_certificates:"certificates?user_id=",

    update_profile:"update_profile?",

    send_mobile_for_otp:"send_otp",

    verify_otp:"verify_otp",

    update_mobile_no:"update_mobile",

    verify_otp_on_update_mobile:"update_mobile_verify_otp",

    get_profile:"get_profile",

    add_to_cart: "add_to_cart",

    remove_cart_product:"remove_cart_product",

    get_cart_products : "get_cart_products",

}