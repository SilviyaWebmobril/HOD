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

            var options = {
                description: 'Credits towards consultation',
                image: 'https://i.imgur.com/3g7nmJC.png',
                currency: 'INR',
                key: 'rzp_test_1DP5mmOlF5G5ag',
                amount: '5000',
                name: 'foo',
                prefill: {
                  email: 'void@razorpay.com',
                  contact: '9191919191',
                  name: 'Razorpay Software'
                },
                theme: {color: '#F37254'}
              }
              RazorpayCheckout.open(options).then((data) => {
                // handle success
                alert(`Success: ${data.razorpay_payment_id}`);
              }).catch((error) => {
                // handle failure
                alert(`Error: ${error.code} | ${error.description}`);
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
                <CustomButton  customButttonStyle={{backgroundColor:"#FD8D45",}}
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