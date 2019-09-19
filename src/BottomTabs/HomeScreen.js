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
import * as homeActions from '../redux/store/actions/homeAction';



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

        


        this.props.onHomeScreen(this.props.userdata.userdata.user_id);
       
        this.setState({getAllProducts:this.props.homescreen.getAllProducts})

       
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

  //  console.log("shouldComponentUpdate home",nextProps.cart);
    return true;
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
                console.log("schedule_id",this.props.schedule_id);
            }
    
            if(prevProps.cart !== this.props.cart){
    
    
    
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
                    <CustomTopHeader address={this.props.userdata.user_address} />
                    <Banners images={this.props.homescreen.banners}/>
                    <HorizontalList products={this.props.homescreen.product} />
                    <CustomTextInputWithIcon placeholder="Search for Products.."/>

                   
                   
                    <FlatList
                      
                        data={this.props.homescreen.getAllProducts}
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