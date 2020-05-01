import React, {Component}  from 'react';
import {View ,FlatList,StyleSheet,TouchableOpacity,Image,Alert,Platform} from 'react-native';
import * as HOC from '../../HOC/mainHoc';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
import axios from 'axios';
import ApiUrl from '../../Api/ApiUrl';
import ProductItem from '../ProductItem/ProductItem';
import * as cartActions  from '../../redux/store/actions/cartAction';
import * as homeActions from '../../redux/store/actions/homeAction';
import Cartbadge from '../../CustomUI/Cart/Cartbadge';
import {connect} from 'react-redux';
import { Tooltip, Text  } from 'react-native-elements';
import CustomTextInputWithIcon from '../../CustomUI/CustomTextInput/CustomTextInputWithIcon';
import  capitilize  from '../../utility/helpers';


class CategoryProduct extends Component {

    static navigationOptions = ({ navigation, screenProps }) => {
        const { params = {} } = navigation.state;
        return {
            title:navigation.getParam('name')  ,
            headerStyle: { backgroundColor: '#FD8D45' },
            headerTitleStyle: { color: 'white' ,fontSize:17,flex:1,justifyContent:"center",textAlign:"left"},
            headerTintColor: 'white',
            headerRight:(
                <>
                 {/* <Cartbadge count={navigation.getParam('count', '0')} nav={navigation} 
                    updateStateQuantity={(product_id,q)=>
                        {params.handleUpdate(product_id,q)}}
                    /> */}
                {navigation.state.params.type == 2
                ?
                <Tooltip withOverlay={false} withPointer={false} backgroundColor={'white'} popover={<Text  style={{color:"#FD8D45"}}>Info here</Text>}>
                <Text>Press me</Text>
                </Tooltip>
                :
                <View/>
                }
              
                <Cartbadge count={navigation.getParam('count', '0')} nav={navigation} 
                    updateStateQuantity={(product_id,q)=>
                        {params.handleUpdate(product_id,q)}}
                    />
                </>
            )}
        
        };

    constructor(props){
        super(props);

        this.state= {

            isLoading:this.props.cart.isLoading,
            getAllProducts:[],
            cartCount:false,
            scheduleModalVisible:false,
            schedule_product_id:"",
            isRefreshing:false,
            schedule_product_price:"",
            category_all_products : [],
            



        }



       
    }

     
    componentDidMount () {

        this.props.navigation.setParams({ handleUpdate: this.updateStateQuantity.bind(this), });
        this.props.navigation.setParams({ 'count': this.props.cart.total_cart_count });
        if(this.props.cart.total_cart_count > 0){
            this.setState({cartCount:true})
        }else{
            this.setState({cartCount:false})
        }

    
        this.props.onCategoryScreen(this.props.navigation.getParam('category_id'),this.props.userdata.user_id)
            .then(response => {

                if(!response.data.error){
                    this.setState({category_all_products : response.data.data})
                }

               

            })
       
       
     
     
    }

    onRefresh = () =>{

       
        this.setState({isRefreshing:true})
        this.componentDidMount();
    }


  

     componentDidUpdate(prevProps, prevState){
       


        try{

            if(prevProps.navigation.getParam('count', '0') != this.props.cart.total_cart_count){
                this.props.navigation.setParams({ 'count': this.props.cart.total_cart_count })
                if(this.props.cart.total_cart_count > 0){
                    if(!this.state.cartCount){
                        this.setState({cartCount:true})
                    }
                   
                }else{
                    if(this.state.cartCount){
                        this.setState({cartCount:false})
                    }
                    
                }
            }


            if(prevProps.cart.error !==  this.props.cart.error){
          
                if(this.props.cart.error !== ""){
                   this.showErrorAlert(this.props.cart.error);
                }
              
    
            }
    
            if(prevProps.cart.isLoading !== this.props.cart.isLoading){
                this.setState({isLoading:this.props.cart.isLoading})
                
            }
    
            if(prevProps.schedule_id !==  this.props.schedule_id){
    
                if(this.state.scheduleModalVisible){
                    this.setState({scheduleModalVisible:false})
                    console.log("schedule_id",this.props.schedule_id);
                }
               
             
            }

            if(prevProps.cart.transaction_completed !== this.props.cart.transaction_completed){

                if(this.props.cart.transaction_completed == 1){

                    let prevProduct  = [...this.state.category_all_products];

                    prevProduct.map(element => {

                        element.is_added_to_cart = null;
                       
                    });
            
                    console.log("from category products",prevProduct)
            
                    this.setState({category_all_products : [...prevProduct]})
            
                }
               
            }
    
         
        }catch(error){

            console.log("on error home screen component did update",error);
        }
      
    }


    onDetailsHandler = (id) => {

        this.props.navigation.navigate("CategoryProductDetails",{"product_id":id   ,"name":this.props.navigation.getParam('name'),
        updateProductList1:this.updateStateQuantity.bind(this)
        });
    }

    
    scheduleModalVisible = (product_id,product_price) =>{

        console.log("getting data from child",product_id);
        this.setState({scheduleModalVisible:true})
        this.setState({schedule_product_id:product_id});
        this.setState({schedule_product_price:product_price})

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


        updateStateQuantity = (product_id , quantity) => {

            let prevProduct  = [...this.state.category_all_products];
    
            console.log("on updation",quantity);
            prevProduct.map(element => {
                if(element.id == product_id){
    
                    if(quantity > 0){
                        if(element.is_added_to_cart !== null){
                            element.is_added_to_cart.quantity = quantity;
                        }else{
                            element.is_added_to_cart = {};
                           Object.assign(element.is_added_to_cart ,{ quantity : quantity});
                           
                        }
                    }else{
                        element.is_added_to_cart = null;
                    }
                    
                   
                }
            });

            console.log("prv1gdcvgvvgcg category product called",prevProduct);
            this.props.navigation.state.params.updateProductList(product_id,quantity)
            this.setState({category_all_products : [...prevProduct]})
    
    
        }


        updateStateQuantityFromDetails = (product_id , quantity) => {

            let prevProduct  = [...this.state.category_all_products];
    
            prevProduct.map(element => {
                if(element.id == product_id){
    
                    if(quantity > 0){
                        if(element.is_added_to_cart !== null){
                            element.is_added_to_cart.quantity = quantity;
                        }else{
                            element.is_added_to_cart = {};
                           Object.assign(element.is_added_to_cart ,{ quantity : quantity});
                           
                        }
                    }else{
                        element.is_added_to_cart = null;
                    }
                    
                   
                }
            });

            console.log("prv2",prevProduct);
           /// this.props.navigation.state.params.updateProductList(product_id,quantity)
            this.setState({category_all_products : [...prevProduct]})
    
    
        }
        
   

    renderItem(data){
        let { item, index } = data;
       
        return(
             <TouchableOpacity
            onPress={()=>this.onDetailsHandler(item.id,item.name)}
           >
            <ProductItem 
                products={item}  
                unit={item.unit} 
                product_id={item.id}
                is_added_to_cart={item.is_added_to_cart} 
                search={0} 
                updateStateQuantity = {this.updateStateQuantity.bind(this)}
                scheduleModal={this.scheduleModalVisible.bind(this)}/>
            </TouchableOpacity>
            
      
        );
    }

    render(){
        return(

            <FullSCreenSpinnerAndDismissKeyboardView
            style={styles.container}
            onRefresh={this.onRefresh.bind(this)}
            refreshing={this.state.isRefreshing}
            scheduleVisible={this.state.scheduleModalVisible}
            schedule_product_id ={this.state.schedule_product_id}
            schedule_product_price = {this.state.schedule_product_price}
            itemQuantity={this.props.cart.total_cart_count}
            itemTotalPrice={this.props.cart.totalAmount}
            cartLayout={this.state.cartCount}
            spinner={this.state.isLoading}
            >  
                <CustomTextInputWithIcon keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                placeholder="Search for Products.." isEditable={this.props.navigation.getParam('iseditable',"") == 1 ? true : false} 
                searchValue={this.state.searchText} 
                textpress={()=>{this.props.navigation.navigate('SearchProducts',{location: capitilize(this.props.userdata.user_address),
                    updateProductList1:this.updateStateQuantity.bind(this),category_id:this.props.navigation.getParam('category_id')})}} 
                showTextInput={this.state.showTextInput}
                onSearchPress={( )=>{this.props.navigation.navigate('SearchProducts',{get_back_button:true, 
                    updateProductList1:this.updateStateQuantity.bind(this),category_id:this.props.navigation.getParam('category_id')})}}
                />

                <FlatList
                      
                    data={this.state.category_all_products}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderItem.bind(this)}
                    style={{marginBottom:20}}
                    />

            {
                this.state.category_all_products.length == 0 
                ?
                <Text style={{fontFamily:"Roboto-Light",fontWeight:"bold",justifyContent:"center",alignSelf:"center",fontSize:15}}>No Products Found.</Text>
                :
                <View/>

            }    
                

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
     
      onLoading : (value) => {
          dispatch(cartActions.isLoading(value))
      },
      onCategoryScreen:(category_id,user_id) =>{
          return new Promise((resolve ,reject) => {
            dispatch(homeActions.categoryProducts(category_id,user_id))
                .then(response => {

                    resolve(response);
                })
          });
        
      }
    }
  }
  
  
export default connect(mapStateToProps,mapDispatchToProps)(CategoryProduct);

const styles = StyleSheet.create({

    container:{
      
        backgroundColor:'#ffffff',
       
    },
    viewCartLayout:{
        width:'100%',
        height:50,
        backgroundColor:'green',
        flexDirection:"row",
        position:"absolute",
        bottom:0,
        left:0,
        right:0,

    },
    rowLeft:{
        flexDirection:"row",
        alignItems:"center",
        margin:20,
    },
    textStyles:{
        fontSize:14,
        fontFamily:'roboto-bold',
        color:"white"
    }


});