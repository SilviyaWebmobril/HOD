import React,{ Component } from 'react';
import { View , Text ,StyleSheet,TouchableOpacity,Alert,FlatList} from  'react-native';
import CustomTopHeader  from './CustomTopHeader';
import * as HOC from '../HOC/mainHoc';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
import Banners from '../Banners/Banner';
import HorizontalList from '../CustomUI/HorizontalList/HorizontalList';
import CustomTextInputWithIcon from '../CustomUI/CustomTextInput/CustomTextInputWithIcon';
import {images}  from  '../CustomUI/HorizontalList/imageUri';
import ProductItem  from './ProductItem/ProductItem';
import {connect} from 'react-redux';
import * as cartActions from '../redux/store/actions/cartAction';
import * as homeActions from '../redux/store/actions/homeAction';
import * as userAction from '../redux/store/actions/userDataAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



class HomeScreen extends  Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
       header:null
      });
    

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
            schedule_product_price:"",
            searchText:"",
            isRefreshing:false,
            iseditable :false,
            
        }
    }

    scheduleModalVisible = (product_id,product_price) =>{

        console.log("getting data from child",product_id);
        this.setState({scheduleModalVisible:true})
        this.setState({schedule_product_id:product_id});
        this.setState({schedule_product_price:product_price})

    }

    componentWillMount(){
        console.log("hi");
    }
   

    componentDidMount(){
        console.log("this.props.navigation.getParam('iseditable') ",this.props.navigation.getParam('iseditable') );
        this.setState({isRefreshing:false})
        if(this.props.navigation.getParam('iseditable') ){
            this.setState({iseditable:true})
        }
        this.props.onHomeScreen(this.props.userdata.user_id);
        this.props.getProfile(this.props.userdata.user_id);
       
       
       
    }

    onDetailsHandler = (id,name) => {
       
        this.props.navigation.navigate("CategoryProductDetails",{"product_id":id   ,"name":name});
    }

    renderItem(data){
        let { item, index } = data;
       
        return(
            <TouchableOpacity
            onPress={()=>this.onDetailsHandler(item.id,item.name)}
           >
            <ProductItem data={item} scheduleModal={this.scheduleModalVisible.bind(this)}/>
            </TouchableOpacity>
        );
    }

   shouldComponentUpdate (nextProps,nextState){

  
        if(nextProps.getAllProducts != this.props.getAllProducts || nextProps.cart.isLoading != this.props.isLoading){
            return true;
        }else{
            return false;
        }
    
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
    
            if(prevProps.cart !== this.props.cart){

    
    
    
            }
           
    

        }catch(error){

            console.log("on error home screen component did update",error);
        }
      
      
        

     
    }

    showErrorAlert(error){

        Alert.alert(
            'Error',
            `${error}`,
            [
         
            {text: 'OK', onPress: () => this.props.onError("")},
            ], 
            { cancelable: false }
            )
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
            spinner={this.state.isLoading}>
                <KeyboardAwareScrollView >
                    <CustomTopHeader address={this.props.userdata.user_address} />
                    <Banners images={this.props.homescreen.banners}/>
                    <HorizontalList products={this.props.homescreen.product} />
                    <CustomTextInputWithIcon placeholder="Search for Products.." isEditable={this.props.navigation.getParam('iseditable') !== undefined ? true : false} searchValue={this.state.searchText}   onSearchPress={this.onSearchHandler.bind(this)}/>

                   
                   
                    <FlatList
                      
                        data={flatlistdata()}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(item) =>this.renderItem(item)}
                        style={{marginBottom:20}}
                        />
                   

                    
            
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
        dispatch(homeActions.homeScreenProducts(user_id))
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
    

 });