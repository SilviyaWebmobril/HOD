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
import { TouchableHighlight } from 'react-native-gesture-handler';
import CustomButton from '../CustomUI/CustomButton/CustomButton';



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
            cart_products:[],
            scheduleModalVisible:false,
            schedule_product_id:"",
            schedule_product_price:""
            
        }
    }

    scheduleModalVisible = (product_id,product_price) =>{

        console.log("getting data from child",product_id);
        this.setState({scheduleModalVisible:true})
        this.setState({schedule_product_id:product_id});
        this.setState({schedule_product_price:product_price})

    }

   

    componentDidMount(){

        axios.post(ApiUrl.baseurl+ApiUrl.home_page+this.props.userdata.userdata.user_id).then(res => {

            this.props.onLoading(false);
            this.setState({isLoading:this.props.cart.isLoading});
            this.setState({product:res.data.product_categories});
            this.setState({banners:res.data.banners});
            this.setState({cart_products:res.data.cart_products})
            console.log("cart ", res.data.cart_products)
            this.props.cartProducts( this.props.userdata.userdata.user_id);
            
            var products = [...res.data.all_products];
            products.forEach(item=>{


                var itemOnCart = false;
                var last_product_id = 0;

               
                if(res.data.cart_products.length > 0){

                    console.log("cart length",res.data.cart_products.length);

                    res.data.cart_products.forEach(cart_item =>{

                       
                            
                            if(parseInt(cart_item.product.id) === item.id){
                                
                                if(cart_item.product.id ==  last_product_id){

                                    Object.assign(item,{cart:{itemOnCart:true,is_subscribed:2,
                                    subscription_type:cart_item.subscription_type}});
                                    itemOnCart = true;
                                    last_product_id = cart_item.product.id;
                                }else{

                                    Object.assign(item,{cart:{itemOnCart:true,is_subscribed:cart_item.is_subscribed,
                                    subscription_type:cart_item.subscription_type}});
                                    itemOnCart = true;
                                    last_product_id = cart_item.product.id;

                                }
                             
                            }else{
                              
                                Object.assign(item,{cart:{itemOnCart:false,is_subscribed:null,subscription_type:cart_item.subscription_type}});
                                itemOnCart = false;
                            }
            
                      
                       
                    });
                }else{

                    Object.assign(item,{cart:{itemOnCart:false,is_subscribed:null,subscription_type:null}});
                }
                
               


            });

            this.setState({getAllProducts:[...products]},()=>{

                console.log("new products",this.state.getAllProducts);
            });
           

            
    


        }).catch( error  => {  
            this.props.onLoading(false); 
            this.setState({isLoading:this.props.cart.isLoading});
            console.log("on error home screen",error); 


        });

    


      



        
        

        

    }

    onDetailsHandler = (id,name) => {

        this.props.navigation.navigate("CategoryProductDetails",{"product_id":id   ,"name":name});
    }

    renderItem(data){
        let { item, index } = data;
      
        return(
            <TouchableOpacity
           >
            <ProductItem data={item} scheduleModal={this.scheduleModalVisible.bind(this)}/>
            </TouchableOpacity>
        );
    }


    // shouldComponentUpdate(nextProps,nextState){
    //     console.log("componentWillReceiveProps",nextProps);
    //     if(nextProps.cart !== this.props.cart){
    
    
    
    //         var products = [...this.state.getAllProducts];
    //         console.log("products of cart",this.props.cart);
    //         var cart_products = [...this.state.cart_products];
    //         products.forEach(item=>{


    //             var itemOnCart = false;
    //             var last_product_id = 0;
                

              

    //             if('get_once' in  nextProps.cart.product_item && 'subscribed' in nextProps.cart.product_item){

                
    //                 if(JSON.stringify(item.id) == nextProps.cart.product_item.get_once[item.id]
    //                         && item.product_id == nextProps.cart.product_item.subscribed[item.id]){

    //                     Object.assign(item,{cart:{itemOnCart:true,is_subscribed:2,
    //                         subscription_type:nextProps.cart.product_item.subscribed[item.id].subscryptionType}});
    //                         last_product_id = item.id;

    //                 }else{

    //                     Object.assign(item,{cart:{itemOnCart:false,is_subscribed:null,subscription_type:null}});
    //                 } 



    //             }
                
    //             if(item.id  !== last_product_id){

              

    //                 if('get_once' in  nextProps.cart.product_item ){

                      
    //                         if(JSON.stringify(item.id) in nextProps.cart.product_item.get_once){
    //                       console.log("hello comparing");
    //                         Object.assign(item,{cart:{itemOnCart:true,
    //                             is_subscribed:nextProps.cart.product_item.get_once[item.id].isSubscribed,
    //                             subscription_type:nextProps.cart.product_item.get_once[item.id].subscryptionType}});
    //                             itemOnCart = true;
    
    
    //                     }else{
    
    //                         Object.assign(item,{cart:{itemOnCart:false,is_subscribed:null,subscription_type:null}});
    //                     } 
    
    
    //                 }else if('subscribed' in  nextProps.cart.product_item ){
    
    //                     if(JSON.stringify(item.id) == nextProps.cart.product_item.subscribed[item.id]){
    
    //                         Object.assign(item,{cart:{itemOnCart:true,
    //                             is_subscribed:nextProps.cart.product_item.subscribed[item.id].isSubscribed,
    //                             subscription_type:nextProps.cart.product_item.subscribed[item.id].subscryptionType}});
    //                             itemOnCart = true;
    //                     }else{
    
    //                         Object.assign(item,{cart:{itemOnCart:false,is_subscribed:null,subscription_type:null}});
    //                     } 
    
    
    //                 }else{
    //                     Object.assign(item,{cart:{itemOnCart:false,is_subscribed:null,subscription_type:null}});
    //                 }

    //             }
                
               
                    
                


    //        });

    //         this.setState({getAllProducts:[...products]},()=>{

    //             console.log("on update ",this.state.getAllProducts);
    //         });
    //         return true;

    //     }else{
    //         return false;
    //     }

     
       
        

    // }

    componentDidUpdate(prevProps,prevState){

        try{


            if(prevProps.cart.error !==  this.props.cart.error){
          
                if(this.props.cart.error !== ""){
                   this.showErrorAlert(this.props.cart.error);
                }
              
    
            }
    
            if(prevProps.cart.isLoading !== this.props.cart.isLoading){
                this.setState({isLoading:this.props.cart.isLoading})
            }
    
            if(prevProps.schedule_id !==  this.props.schedule_id){
    
                this.setState({scheduleModalVisible:false})
                console.log("schedule_id",this.props.schedule_id);
            }
    
            if(prevProps.cart !== this.props.cart){
    
    
    
            //     var products = [...this.state.getAllProducts];
            //     console.log("products of cart",this.props.cart);
            //     var cart_products = [...this.state.cart_products];
            //     products.forEach(item=>{
    
    
            //         var itemOnCart = false;
            //         var last_product_id = 0;
                    
    
                  
    
            //         if('get_once' in  this.props.cart.product_item && 'subscribed' in this.props.cart.product_item){
    
                    
            //             if(JSON.stringify(item.id) == this.props.cart.product_item.get_once[item.id]
            //                     && item.product_id == this.props.cart.product_item.subscribed[item.id]){
    
            //                 Object.assign(item,{cart:{itemOnCart:true,is_subscribed:2,
            //                     subscription_type:this.props.cart.product_item.subscribed[item.id].subscryptionType}});
            //                     last_product_id = item.id;
    
            //             }else{
    
            //                 Object.assign(item,{cart:{itemOnCart:false,is_subscribed:null,subscription_type:null}});
            //             } 



            //         }
                    
            //         if(item.id  !== last_product_id){

                  

            //             if('get_once' in  this.props.cart.product_item ){
    
                          
            //                     if(JSON.stringify(item.id) in this.props.cart.product_item.get_once){
            //                   console.log("hello comparing");
            //                     Object.assign(item,{cart:{itemOnCart:true,
            //                         is_subscribed:this.props.cart.product_item.get_once[item.id].isSubscribed,
            //                         subscription_type:this.props.cart.product_item.get_once[item.id].subscryptionType}});
            //                         itemOnCart = true;
        
        
            //                 }else{
        
            //                     Object.assign(item,{cart:{itemOnCart:false,is_subscribed:null,subscription_type:null}});
            //                 } 
        
        
            //             }else if('subscribed' in  this.props.cart.product_item ){
        
            //                 if(JSON.stringify(item.id) == this.props.cart.product_item.subscribed[item.id]){
        
            //                     Object.assign(item,{cart:{itemOnCart:true,
            //                         is_subscribed:this.props.cart.product_item.subscribed[item.id].isSubscribed,
            //                         subscription_type:this.props.cart.product_item.subscribed[item.id].subscryptionType}});
            //                         itemOnCart = true;
            //                 }else{
        
            //                     Object.assign(item,{cart:{itemOnCart:false,is_subscribed:null,subscription_type:null}});
            //                 } 
        
        
            //             }else{
            //                 Object.assign(item,{cart:{itemOnCart:false,is_subscribed:null,subscription_type:null}});
            //             }

            //         }
                    
                   
                        
                    
    
    
            //    });
    
            //     this.setState({getAllProducts:[...products]},()=>{
    
            //         console.log("on update ",this.state.getAllProducts);
            //     });
               
    
            }
           
    

        }catch(error){

            console.log("on error home screen component did update",error);
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
            scheduleVisible={this.state.scheduleModalVisible}
            schedule_product_id ={this.state.schedule_product_id}
            schedule_product_price = {this.state.schedule_product_price}
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
      cart:state.cart,
      schedule_id: state.schedule
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