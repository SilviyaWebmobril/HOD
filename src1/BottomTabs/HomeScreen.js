import React,{ Component } from 'react';
import { View , Text ,StyleSheet,TouchableOpacity,Alert,FlatList,Platform,TouchableWithoutFeedback} from  'react-native';
import CustomTopHeader  from './CustomTopHeader';
import * as HOC from '../HOC/mainHoc';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
import Banners from '../Banners/Banner';
import HorizontalList from '../CustomUI/HorizontalList/HorizontalList';
import CustomTextInputWithIcon from '../CustomUI/CustomTextInput/CustomTextInputWithIcon';
import ProductItem  from './ProductItem/ProductItem';
import {connect} from 'react-redux';
import * as cartActions from '../redux/store/actions/cartAction';
import * as homeActions from '../redux/store/actions/homeAction';
import * as userAction from '../redux/store/actions/userDataAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Keyboard } from 'react-native';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import  capitilize  from '../utility/helpers';


class HomeScreen extends  Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
       header:null
      });
    

    constructor(props){
        super(props);
        this.state={
            //images: [...images],
            isLoading:this.props.cart.isLoading,
            product:[],
            product_categories:[],
            banners:[],
            getAllProducts:[],
            error_msg:this.props.cart.error_msg,
            cart_products:[],
            scheduleModalVisible:false,
            schedule_product_id:"",
            schedule_product_price:"",
            searchText:"",
            isRefreshing:false,
            iseditable :false,
            hideComponent:false,
            cartCount:false,
            showTextInput:false,
            
        }
    }

    scheduleModalVisible = (product_id,product_price) =>{

        console.log("getting data from child",product_id);
        this.setState({scheduleModalVisible:true})
        this.setState({schedule_product_id:product_id});
        this.setState({schedule_product_price:product_price})

    }

  
    componentDidMount(){
        this.props.deleteCart();
        this.props.deleteSearch();

        this.setState({isRefreshing:false})
        
        this.props.getProfile(this.props.userdata.user_id);
        this.props.onHomeScreen(this.props.userdata.user_id)
            .then(response => {

                if(!response.data.error){

                    this.setState({getAllProducts:[...response.data.all_products]});
                    this.setState({banners : [...response.data.banners]});
                    this.setState({product_categories:[...response.data.product_categories]});


                }
            })
       
        console.log("bhsbdj",this.props.cart.total_cart_count);
        
   
       
    }

  

    onDetailsHandler = (id,name) => {
       
        this.props.navigation.navigate("CategoryProductDetails",{"product_id":id   ,"name":name});
    }

    renderItem(data){
        let { item, index } = data;

        console.log("itemmmmm",item);
       
        return(
            <TouchableOpacity
            onPress={()=>this.onDetailsHandler(item.products.id,item.products.name)}
           >
            <ProductItem products={item.products}  unit={item.unit} is_added_to_cart={item.is_added_to_cart} search={0} scheduleModal={this.scheduleModalVisible.bind(this)}/>
            </TouchableOpacity>
        );
    }

   
  
    componentDidUpdate(prevProps,prevState){

        try{


            if(prevProps.cart.error !==  this.props.cart.error){
          
                if(this.props.cart.error !== ""){
                   this.showErrorAlert(this.props.cart.error);
                }
              
    
            }
    
            if(prevProps.cart.isLoading !== this.props.cart.isLoading){
                this.setState({isLoading:this.props.cart.isLoading})
                // this.props.onLoading(true);
            }
    
            if(prevProps.schedule_id !==  this.props.schedule_id){
    
                this.setState({scheduleModalVisible:false})
                
            }
    
    

        }catch(error){

            console.log("on error home screen component did update",error);
        }
      
      
        

     
    }

    showErrorAlert(error){
        this.props.onError("")
        // Alert.alert(
        //     'Error',
        //     `${error}`,
        //     [
         
        //     {text: 'OK', onPress: () => this.props.onError("")},
        //     ], 
        //     { cancelable: false }
        //     )
    }

    onSearchPress = () => {
       
        this.setState({hideComponent:true,showTextInput:true},()=>{
            this.refs._scrollView.scrollToPosition(0); 

        })
       
    }

    onSearchHandler = (value)=>{
       
        this.setState({searchText:value},()=>{

            console.log("value === ",this.state.searchText);
            this.props.onSearchProducts(this.state.searchText);

        });

     
    }

    returnSearchValue = () =>{

        return this.state.searchText;
    }

    onRefresh = () =>{
        this.setState({iseditable:false})
        this.setState({hideComponent:false,showTextInput:false});
        var userdata = [];

        //this.props.onUpdateUser(userdata);
        this.props.deleteCart();
        this.props.deleteSearch();
        this.setState({isRefreshing:true})
        this.componentDidMount();
    }


    render(){
        const { navigation } = this.props;

        const flatlistdata = () => {

            //return this.props.homescreen.getAllProducts;

            if(Array.isArray(this.props.homescreen.search_products) && this.props.homescreen.search_products.length > 0){
              
                return this.props.homescreen.search_products;
            
            }else{
               
                return this.props.homescreen.getAllProducts;
            }

        }

       
       
        return(
           
            <FullSCreenSpinnerAndDismissKeyboardView
            onRefresh={this.onRefresh.bind(this)}
            refreshing={this.state.isRefreshing}
            style={styles.container}
            scheduleVisible={this.state.scheduleModalVisible}
            schedule_product_id ={this.state.schedule_product_id}
            schedule_product_price = {this.state.schedule_product_price}
            itemQuantity={this.props.cart.total_cart_count}
            itemTotalPrice={this.props.cart.totalAmount}
            cartLayout={this.props.cart.total_cart_count > 0}
            spinner={this.state.isLoading}>
                <KeyboardAwareScrollView ref='_scrollView'
                >

                    {!this.state.hideComponent
                    ?
                    <>
                        <CustomTopHeader address={this.props.userdata.user_address} />
                        <CustomTextInputWithIcon keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                            placeholder="Search for Products.." isEditable={this.props.navigation.getParam('iseditable',"") == 1 ? true : false} 
                            searchValue={this.state.searchText} 
                            // onFocus={()=>{this.onSearchPress()}}  
                            // textpress={()=>{this.onSearchPress()}} 
                            // showTextInput={this.state.showTextInput}
                            // onSearchPress={this.onSearchHandler.bind(this)}
                            onFocus={()=>{}}  
                            textpress={()=>{this.props.navigation.navigate('SearchProducts',{location: capitilize(this.props.userdata.user_address)})}} 
                            showTextInput={this.state.showTextInput}
                            onSearchPress={( )=>{this.props.navigation.navigate('SearchProducts',{get_back_button:true})}}
                            />
                            {/* <View style={styles.viewLineBlack}></View> */}
                  
                            {this.state.banners.length > 0
                            ?
                                
                                <Banners images={this.state.banners} navigate={true}/>
                              
                            :
                                <View/>
                            }
                            {
                        this.state.product_categories.length > 0
                        ?
                        <HorizontalList products={this.state.product_categories} />
                        :
                        <View/>
                    }
                    </>
                  
                    :
                    <View/>
                    }
                    
                    
                  
                   
                   
                    <FlatList
                      
                        data={this.state.getAllProducts}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(item) =>this.renderItem(item)}
                        style={{marginBottom:20}}
                        />


                    {this.state.getAllProducts.length  == 0
                    ?
                        <Text style={{fontFamily:"Roboto-Light",alignSelf:'center',textAlignVertical: "center",  textAlign: 'center', justifyContent:"center",    fontSize:15,fontWeight:'bold',color:"grey"}}>No Products Found.</Text>
                    :
                        <View/>
                    }
                    

                    
            
                </KeyboardAwareScrollView>

            </FullSCreenSpinnerAndDismissKeyboardView>
             
        );
    }
 }


 

const mapStateToProps = state => {
    return {
      userdata: state.userdata,
      cart:state.cart,
      schedule_id: state.schedule,
      homescreen:state.home
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
      },    
      onHomeScreen:(user_id) =>{
        return new Promise((resolve ,reject )=>{
            dispatch(homeActions.homeScreenProducts(user_id))
                .then(response =>{
                    resolve(response);
                })
                .catch(error =>{
                    reject(error);
                })
        })
      },
      onSearchProducts :(value)=>{
          dispatch(homeActions.searchProducts(value))
      },
      deleteCart:()=>{
        dispatch(cartActions.deleteCart());
    },
      getProfile:(id) =>{
          dispatch(userAction.getUserProfile(id))
      },
      deleteSearch: ()=>{
        dispatch(homeActions.deleteSearch())
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

    viewLineBlack:{
        width:'90%',
        height:1,
        alignSelf:'center',
        backgroundColor:"#9F9F9F",
        marginTop:2,
        marginBottom:0,
        marginLeft:10,
        marginRight:10

    }

    

 });