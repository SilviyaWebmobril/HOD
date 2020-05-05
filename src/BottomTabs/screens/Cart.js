import React ,{Component} from 'react';
import {View ,Text, FlatList, StyleSheet, Alert,Dimensions} from 'react-native';

const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
import * as HOC from '../../HOC/mainHoc';

import ProductItem from './../ProductItem/ProductItem';
import Axios from 'axios';
import ApiUrl from '../../Api/ApiUrl';
import { connect } from 'react-redux';
import * as cartActions  from '../../redux/store/actions/cartAction';
import CartProductItem from '../ProductItem/CartProductItem';
import CustomButton  from  '../../CustomUI/CustomButton/CustomButton';
import Create_AccountStyle from '../../Create_Account/Create_AccountStyle';
import RazorpayCheckout from 'react-native-razorpay';
import * as homeAction from '../../redux/store/actions/homeAction';
import firebase from 'react-native-firebase';
import * as userDataAction from '../../redux/store/actions/userDataAction';
import AsyncStorage from '@react-native-community/async-storage';
import Geocoder from 'react-native-geocoding';



class Cart extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Cart",
        headerStyle: { backgroundColor: '#FD8D45', },
        headerTitleStyle: { color: 'white' ,fontSize:17,flex:1,fontFamily:"roboto-bold",textAlign:'center'},
        headerTintColor: 'white',
        headerTitleContainerStyle: {
            left: 0, // THIS RIGHT HERE
        },
          
        });

        constructor(props){
            super(props);
    
            this.state= {
    
                //isLoading:this.props.cart_products.isLoading,
                cart_products:[],
                cartCount:false,
                isLoading:this.props.cart_products.isLoading,
                cartLength:false,
                isRefreshing:false,
                showUserDetails:false,
                showTimerModal:false
    
    
    
            }
        }

        onRefresh = () =>{

          
            this.setState({isRefreshing:true})
            this.componentDidMount();
        }

      
        componentDidMount(){
        
           this.setState({isRefreshing:false})
           console.log("user",this.props.user.user_address);
          this.props.getCartProducts(this.props.user.userdata.user_id);
         
         //   this.createNotificationListeners(); //add this line
       
        }

        async createNotificationListeners() {
            /*
            * Triggered when a particular notification has been received in foreground
            * */
            this.notificationListener = firebase.notifications().onNotification((notification) => {

                console.log("notifaication log1",notification);
                this.setState({showTimerModal:false});
                this.getNotificationData();
            });
          
          
            this.messageListener = firebase.messaging().onMessage((message) => {
              //process data message

              console.log("get message",JSON.stringify(message));
              this.setState({showTimerModal:false});
              this.getNotificationData(message);
            });
          }


          getNotificationData = (notification) => {

            // const channelId = new firebase.notifications.Android.Channel(
            //     'Default',
            //     'Default',
            //     firebase.notifications.Android.Importance.High
            // );
            // firebase.notifications().android.createChannel(channelId);

            // let notification_to_be_displayed = new firebase.notifications.Notification({
            //     data: notification._android._notification._data,
            //     sound: 'default',
            //     show_in_foreground: true,
            //     title: notification.data.title,
            //     body: notification.data.body,
            // });

            // if (Platform.OS == 'android') {
            //     notification_to_be_displayed.android
            //         .setPriority(firebase.notifications.Android.Priority.High)
            //         .android.setChannelId('Default')
            //         .android.setVibrate(1000);
            // }
            // console.log('FOREGROUND NOTIFICATION LISTENER: \n', notification_to_be_displayed);

          //  firebase.notifications().displayNotification(notification_to_be_displayed);

          console.log("notification.data.status",notification.data.status);
            if(notification.data.status == 'true'){

                this.razorPayCheckout();
            }else{

                this.props.changeAvailabilityStatus();
                Alert.alert(
                    'Verify Address',
                    'Sorry for the inconvience. This address is not available ,try using another address.',
                    [
                 
                   
                    {text: 'Ok', onPress: () => console.log("ok")},
                    ], 
                    { cancelable: false }
                    )
            }

          }

         

        renderItem(data){
            let { item, index } = data;
            //console.log("cart each item",item);
            return(
             
                 <CartProductItem data={item}   
                 updateStateQuantity = {(product_id , quantity)=>{ this.props.navigation.state.params.updateProductList1(product_id, quantity);}}/>
               
            );
        }

        checkUserDetails = () =>{

            if((this.props.user.userdata.user_name == null) || (this.props.user.userdata.user_email == null)  || (this.props.user.user_address == null) || ( this.props.user.user_address == "") || (this.props.user.user_address == undefined)){
                return false;
            }else{

               
                this.setState({showUserDetails:true});
                return true;
            }
        }

        checkPrimaryAddressAvailability = () =>{

            this.props.addressAvailability(this.props.user.userdata.user_id);
           
        }

        changeAddressCallback = () => {

            this.props.navigation.navigate('SelectAddress');
        }

        verifyConfirmDetailsToCheckout = () => {

            this.setState({showUserDetails:false})
            //commenting this used in address availablitity
           // this.checkPrimaryAddressAvailability();
           // get user lat long and send to backend to check the address is valid or not

           Geocoder.init("AIzaSyDBxQEvhACIZ73YCvPF9fI7A2l6lULic0E");
           Geocoder.from(this.props.user.user_address)
           .then(json => {
               var location = json.results[0].geometry.location;
               console.log(json);
               console.log("location",location);
              
                this.props.checkUserAddressByLatLong(location.lat, location.lng,this.props.user.userdata.user_id,this.props.cart_products.get_once_cart_sum)

           })
           .catch(error => 
               {
                console.log("er",error)  
                           showMessage(0, 'Please Enter valid Address', 'Edit Profile', true, false);

           });

    

        }

        razorPayCheckout = () => {

            this.props.changeTransactionStatus(0)
            var options = {
                description: '',
                image: 'https://i.imgur.com/3g7nmJC.png',
                currency: 'INR',
                key: 'rzp_test_dUp5Ii1AWLex6g',
                amount: parseFloat(this.props.cart_products.get_once_cart_sum * 100).toFixed(2),
                name: this.props.user.userdata.user_name,
                prefill: {
                  email: this.props.user.userdata.user_email,
                  contact: this.props.user.userdata.user_mobile,
                  name: 'House Of Desi'
                },
                theme: {color: '#F37254'}
              }
              RazorpayCheckout.open(options).then((data) => {
                // handle success
               
                var formdata = new FormData();
                formdata.append("user_id",this.props.user.userdata.user_id);
                formdata.append("payment_id",data.razorpay_payment_id);
                formdata.append("net_amt",this.props.cart_products.get_once_cart_sum);

                this.props.onLoading(true);
                Axios.post(ApiUrl.baseurl +  ApiUrl.checkout_cart,formdata)
                .then(response=>{
                    this.props.onLoading(false);
                    if(response.data.error){

                    }else{

                        var arr_id = [] ;
                        this.props.cart_products.all_cart_products.map(item => {

                            if(item.is_subscribed == 0){

                                arr_id.push(item.product.id);
                            }

                        });
                        this.props.changeTransactionStatus(1);
                        this.props.onHomeScreen(this.props.user.userdata.user_id);
                        this.props.removeFromHomeAfterPayment(arr_id);
                        this.props.removeFromCartAfterPayment();
                      
                        Alert.alert(
                            'Checkout',
                            'Thank You for completing the order.',
                            [
                         
                           
                            {text: 'Ok', onPress: () => {  this.props.changeAvailabilityStatus();  }},
                            {text: 'Check Transaction', onPress: () => {this.props.navigation.navigate("TransactionHistory"); this.props.changeAvailabilityStatus();}},
                            ], 
                            { cancelable: false }
                            )
                    }

                  
                }).catch(error => {
                    this.props.onLoading(false);
                    console.log("cart error after payment",error);
                    this.props.changeAvailabilityStatus();
                    //alert("Something went Wrong !. Please try again later.");
                    Alert.alert(
                        'Error',
                        'Something went Wrong !. Please try again later.',
                        [
                     
                        {text: 'OK', onPress: () => console.log("ok")},
                        ], 
                        { cancelable: false }
                        )
                });
              }).catch((error) => {
                // handle failure
                
                this.props.changeAvailabilityStatus();
                Alert.alert(
                    'Checkout',
                    `${error.description}`,
                    [
                 
                    {text: 'OK', onPress: () => console.log("ok")},
                    ], 
                    { cancelable: false }
                    )
                
              });
        }

        onCheckOutHandler= () =>{

           
            if(!this.checkUserDetails()){

                Alert.alert(
                    'Checkout',
                    'Please Complete your Profile and Add Delivery Address to Checkout!',
                    [
                 
                    {text: 'OK', onPress: () => this.props.navigation.navigate("ViewProfile")},
                    ], 
                    { cancelable: false }
                    )
            
            }
           
        }

    oncanelTimerModal  = () => {
        this.setState({showTimerModal:false});
        Alert.alert(
            'Verify Address',
            'Sorry for the inconvience. We are unable to verify the address , please try after some time.',
            [
         
           
            {text: 'Ok', onPress: () => console.log("ok")},
            ], 
            { cancelable: false }
            )

    }


    // shouldComponentUpdate(nextProps,nextState){

        
    //     if(this.props.cart_products.all_cart_products !== nextProps.all_cart_products ){
    //         console.log("hiichcbhc cart ",nextProps)
    //         return true;
    //     }

    //     return false 


    // }

    componentDidUpdate(prevProps,prevState){

       
        if(prevProps.user.user_address_available !== this.props.user.user_address_available){
           
            // if(this.props.user.user_address_available == 1){
            //     console.log("prevpropsuyertg3t35834875y38");
            //     this.setState({showTimerModal:true});

            // }else
            
            if(this.props.user.user_address_available == 1){
                console.log("on update..... razorpay calling")
                this.razorPayCheckout();
            }else if(this.props.user.user_address_available == 0){
               // this.props.changeAvailabilityStatus();
                Alert.alert(
                    'Verify Address',
                    'We are unable to reach your address now . Please try with another address. Sorry for the inconvience !',
                    [
                 
                   
                    {text: 'Ok', onPress: () => console.log("ok")},
                    ], 
                    { cancelable: false }
                    )
            }
    
    
        }

    }
    

    render(){
        return (
            <FullSCreenSpinnerAndDismissKeyboardView
            onRefresh={this.onRefresh.bind(this)}
            refreshing={this.state.isRefreshing}
            timerModal ={this.state.showTimerModal}
            cancelTimerInterVal={()=> {console.log("cancelTimerInterVal");this.oncanelTimerModal()}}
              style={styles.container}
              userDetails={this.state.showUserDetails}
              verifyConfirmDetailsToCheckout={()=>{this.verifyConfirmDetailsToCheckout()}}
              changeAddressCallback = {()=>this.changeAddressCallback()}
              cancelCallback={()=>{this.setState({showUserDetails:false})}}
              spinner={this.props.cart_products.isLoading}>
                 <FlatList
                      
                      data={this.props.cart_products.all_cart_products}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={this.renderItem.bind(this)}
                      style={{marginBottom:20}}
                      />
                
                {this.props.cart_products.all_cart_products.length > 0 
                ?
                <CustomButton  customButttonStyle={{marginBottom:30}}
                 customTextStyle={{ color:'white'}} onPressHandler = {() => this.onCheckOutHandler()} text="CHECKOUT" />
                  
                :
                <View/>
                }
                {this.props.cart_products.all_cart_products.length  == 0
                ?
                    <Text style={{fontFamily:"roboto-bold",alignSelf:'center',textAlignVertical: "center",  textAlign: 'center', justifyContent:"center",fontSize:15,color:"grey"}}>No Items In Cart</Text>
                :
                    <View/>
                }
                  


            </FullSCreenSpinnerAndDismissKeyboardView>
        )
    }
}

mapStateToProps = state=> {

    return {
        user: state.userdata,
        cart_products : state.cart
    }


}

mapDispatchToProps = dispatch =>{

    return{
        getCartProducts:(user_id) =>{
            dispatch(cartActions.fetchCartProducts(user_id))
        },
        onLoading : (value) => {
            dispatch(cartActions.isLoading(value))
        },
        removeFromCartAfterPayment : () =>{
            dispatch(cartActions.removeItemAfterPaymentInCart())
        },
        removeFromHomeAfterPayment :(arr) => {
            dispatch(homeAction.removeItemAterPaymentInHome(arr))
        },
        onHomeScreen:(user_id) =>{
            dispatch(homeAction.homeScreenProducts(user_id))
          },
        addressAvailability : (user_id) => {
            dispatch(userDataAction.checkUserAddressAvailbility(user_id))
        },
        changeAvailabilityStatus : () => {
            dispatch(userDataAction.changeAddressStatus())
        },
        checkUserAddressByLatLong : (lat,long,user_id,amount) => {
            dispatch(userDataAction.checkAddressByLatLng(lat,long,user_id,amount))
        },
        changeTransactionStatus : ( status) => {
            dispatch(cartActions.changeTransactionStatus(status))
        }
        
         
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart);

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#ffffff',
       
    },
   

});