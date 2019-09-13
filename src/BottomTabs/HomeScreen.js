import React,{ Component } from 'react';
import { View , Text ,StyleSheet,TouchableOpacity,Alert,FlatList} from  'react-native';
import CustomTopHeader  from './CustomTopHeader';
import * as HOC from '../HOC/mainHoc';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
import axios from 'axios';
import Banners from '../Banners/Banner';
import HorizontalList from '../CustomUI/HorizontalList/HorizontalList';
import CustomTextInputWithIcon from '../CustomUI/CustomTextInput/CustomTextInputWithIcon';
import {images}  from  '../CustomUI/HorizontalList/imageUri';
import ProductItem  from './ProductItem/ProductItem';
import ApiUrl from '../Api/ApiUrl';
import {connect} from 'react-redux';
import Cartbadge from '../CustomUI/Cart/Cartbadge';
import * as cartActions from '../redux/store/actions/cartAction';



class HomeScreen extends  Component {

    constructor(props){
        super(props);
        this.state={
            images: [...images],
            isLoading:this.props.cart.isLoading,
            product:[],
            banners:[],
            getAllProducts:[],
            error_msg:this.props.cart.error_msg,
            product_with_cart:[],
        }
    }

    componentDidMount(){

        axios.post(ApiUrl.baseurl+ApiUrl.home_page+this.props.userdata.userdata.user_id).then(res => {

            this.props.onLoading(false);
            this.setState({isLoading:this.props.cart.isLoading});
            this.setState({product:res.data.product_categories});
            this.setState({banners:res.data.banners});
           
            this.props.cartProducts( this.props.userdata.userdata.user_id);
            
            var products = [...res.data.all_products];
            products.forEach(item=>{


                var itemOnCart = false;

                if(res.data.cart_products.length > 0){

                    res.data.cart_products.forEach(cart_item =>{

                        if(!itemOnCart){
                            
                            if(parseInt(cart_item.product.id) === item.id){
                                
            
                                Object.assign(item,{cart:{itemOnCart:true,is_subscribed:cart_item.isSubscribed,
                                subscription_type:cart_item.subscription_type}});
                                itemOnCart = true;
                            }else{
                              
                                Object.assign(item,{cart:{itemOnCart:false,is_subscribed:2,subscription_type:cart_item.subscription_type}});
                                itemOnCart = false;
                            }
            
                        }
                       
                    });
                }else{

                    Object.assign(item,{cart:{itemOnCart:false,quantityInCart:0}});
                }
                
               


            });

            this.setState({getAllProducts:products},()=>{

                console.log("get all products",this.state.getAllProducts);
            });
           

            
    


        }).catch( error  => {  
            this.props.onLoading(false); 
            this.setState({isLoading:this.props.cart.isLoading});
            console.log("on error",error); 


        });

    


      



        
        

        

    }

    onDetailsHandler = (id,name) => {

        this.props.navigation.navigate("CategoryProductDetails",{"product_id":id   ,"name":name});
    }

    renderItem(data){
        let { item, index } = data;
      
        return(
            <TouchableOpacity
            onPress={()=>this.onDetailsHandler(item.id,item.name)}>
            <ProductItem data={item} />
            </TouchableOpacity>
        );
    }

    componentDidUpdate(prevProps,prevState){
      
        if(prevProps.cart.error !==  this.props.cart.error){
          
            if(this.props.cart.error !== ""){
               this.showErrorAlert(this.props.cart.error);
            }
          

        }

        if(prevProps.cart.isLoading !== this.props.cart.isLoading){
            this.setState({isLoading:this.props.cart.isLoading})
        }

        
     
    }

    showErrorAlert(error){

        Alert.alert(
            'Support',
            `${error}`,
            [
         
            {text: 'OK', onPress: () => this.props.onError("")},
            ], 
            { cancelable: false }
            )
    }
    

    render(){


       
        return(
           
            <FullSCreenSpinnerAndDismissKeyboardView
            style={styles.container}
            spinner={this.state.isLoading}>
                <View >
                    <CustomTopHeader />
                    <Banners images={this.state.banners}/>
                    <HorizontalList products={this.state.product} />
                    <CustomTextInputWithIcon placeholder="Search for Products.."/>
                   
                    <FlatList
                      
                        data={this.state.getAllProducts}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(item) =>this.renderItem(item)}
                        style={{marginBottom:20}}
                        />
                   

                    
            
                </View>

        


            </FullSCreenSpinnerAndDismissKeyboardView>
             
        );
    }
 }


 

const mapStateToProps = state => {
    return {
      userdata: state.userdata,
      cart:state.cart
    }
  }


  
const mapDispatchToProps = dispatch => {
    return {
      onUpdateUser: (userdata) => {
        dispatch(userData(userdata))
      },
      onError : (error)  => {
          dispatch(cartActions.onError(error))
      },
      cartProducts : (user_id) =>{ 
        dispatch(cartActions.fetchCartProducts(user_id));
      },
      onLoading : (value) => {
          dispatch(cartActions.isLoading(value))
      }
    }
  }
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen)

 const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#ffffff',
      //  margin:20

    },
    

 });