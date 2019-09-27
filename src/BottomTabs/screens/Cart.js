import React ,{Component} from 'react';
import {View ,Text, FlatList, StyleSheet, Alert} from 'react-native';

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



class Cart extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Cart",
        headerStyle: { backgroundColor: '#FD8D45' },
        headerTitleStyle: { color: 'white' },
        headerTintColor: 'white',
       
          
        
  
        });

        constructor(props){
            super(props);
    
            this.state= {
    
                //isLoading:this.props.cart_products.isLoading,
                cart_products:[],
                cartCount:false,
                isLoading:this.props.cart_products.isLoading,
                cartLength:false
    
    
    
            }
        }


        componentDidMount(){
        
           
          this.props.getCartProducts(this.props.user.userdata.user_id);
       
        }

        renderItem(data){
            let { item, index } = data;
            return(
             
                 <CartProductItem data={item} />
               
            );
        }

        onCheckOutHandler= () =>{
            console.log("cart products",this.props.cart_products);
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

              
                Axios.post(ApiUrl.baseurl +  ApiUrl.checkout_cart,formdata)
                .then(response=>{
                 
                    if(response.data.error){

                    }else{

                        var arr_id = [] ;
                        this.props.cart_products.all_cart_products.map(item => {

                            if(item.is_subscribed == 0){

                                arr_id.push(item.product.id);
                            }

                        })

                        this.props.removeFromHomeAfterPayment(arr_id);
                        this.props.removeFromCartAfterPayment();
                    }

                  
                }).catch(error => {
                    console.log("cart error after payment",error);
                    alert("Some Thing went Wrong !. Please try again later");
                });
              }).catch((error) => {
                // handle failure
                
                alert(`${error.description}`);
              });

        }
    

    render(){
        return (
            <FullSCreenSpinnerAndDismissKeyboardView
              style={styles.container}
              spinner={this.props.cart_products.isLoading}>
                 <FlatList
                      
                      data={this.props.cart_products.all_cart_products}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={this.renderItem.bind(this)}
                      style={{marginBottom:20}}
                      />
                
                {this.props.cart_products.all_cart_products.length > 0 
                ?
                <CustomButton  customButttonStyle={{backgroundColor:"#FD8D45",marginBottom:30}}
                 customTextStyle={{ color:'black'}} onPressHandler = {() => this.onCheckOutHandler()} text="CHECKOUT" />
                  
                :
                <View/>
                }
                {this.props.cart_products.all_cart_products.length  == 0
                ?
                    <Text style={{alignSelf:'center',textAlignVertical: "center",  textAlign: 'center', justifyContent:"center",    fontSize:15,fontWeight:'bold',color:"grey"}}>No Items In Cart</Text>
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