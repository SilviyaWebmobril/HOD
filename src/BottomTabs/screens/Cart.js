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



class Cart extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.getParam('name'),
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
    
    
    
            }
        }


        componentDidMount(){
            
          this.props.getCartProducts(this.props.user.userdata.user_id);
         console.log("all products in cart",this.props.cart_products.all_products)
        }

        renderItem(data){
            let { item, index } = data;
            return(
               <View/>
                // <ProductItem data={item} />
               
            );
        }
    

    render(){
        return (
            <FullSCreenSpinnerAndDismissKeyboardView
              style={styles.container}
              spinner={this.state.isLoading}>
                 <FlatList
                      
                      data={this.props.cart_products.all_products}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={this.renderItem.bind(this)}
                      style={{marginBottom:20}}
                      />
                  



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
      
        backgroundColor:'#ffffff',
       
    },
   

});