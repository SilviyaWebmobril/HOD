import React ,{Component} from 'react';
import {View,TouchableOpacity,FlatList,StyleSheet,Text,Image,Platform} from 'react-native';
import * as HOC from './../HOC/mainHoc';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
import ProductItem  from './ProductItem/ProductItem';
import {connect} from 'react-redux';    
import CustomTextInputWithIcon from '../CustomUI/CustomTextInput/CustomTextInputWithIcon';
import * as homeActions from '../redux/store/actions/homeAction';
import  capitilize  from '../utility/helpers';
import { withNavigation } from 'react-navigation';

 class Search extends Component{

    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('location'),
        headerStyle: {
            height: 60,
            backgroundColor: 'white',
        },
        headerTitleStyle: {
            fontFamily:"roboto-light",
            color: 'black',
            alignSelf: 'center',
            textAlign: 'center',
            flex: 1,
            fontSize: 17,
        },
        headerTintColor: 'black',
        headerRight: (<View></View>)
    });


    constructor(props){
        super(props);
        this.state = {

            isLoading:this.props.cart.isLoading,
            searchText:"",
            initial:true,
            isRefreshing:false

        }
        this.navigationWillFocusListener = props.navigation.addListener('willFocus', () => {
            // do something like this.setState() to update your view
            this.props.deleteSearch();
          })
    }

    componentWillUnmount () {
        this.navigationWillFocusListener.remove()
      }
    scheduleModalVisible = (product_id,product_price) =>{

        console.log("getting data from child",product_id);
        this.setState({scheduleModalVisible:true})
        this.setState({schedule_product_id:product_id});
        this.setState({schedule_product_price:product_price})

    }

    onDetailsHandler = (id,name) => {
       
        this.props.navigation.navigate("CategoryProductDetails",{"product_id":id   ,"name":name,
        updateProductList1:this.getCallBack.bind(this)});
    }

    getCallBack = (pid,q) => {
        console.log("dvdvhdvdhv",pid);
        console.log("dhsd",this.props.navigation.state.params);
        if( this.props.navigation.state.params !== undefined) {
            this.props.navigation.state.params.updateProductList1(pid,q)
        }
       
    }

    // shouldComponentUpdate = (nextProps, nextState) => {
    //     if (nextProps.isFocused) {
          
    //       return true;
    //     } else {
         
    //       return false;
    //     }
    // }

    renderItem(data){
        let { item, index } = data;
        console.log("render item",item);
        return(
            <TouchableOpacity
            onPress={()=>this.onDetailsHandler(item.id,item.name)}
           >
            <ProductItem products={item} 
             unit={item.unit}
              is_added_to_cart={null} 
              search={1} 
              product_category={item.product_category}
              //updateStateQuantity = {this.props.navigation.state.params.updateStateQuantity()}
              scheduleModal={this.scheduleModalVisible.bind(this)}/>
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
                console.log("schedule_id",this.props.schedule_id);
            }
    
           
    

        }catch(error){

            console.log("on error search screen component did update",error);
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

        this.setState({initial:false});
        this.setState({searchText:value},()=>{

            console.log("value === ",this.state.searchText);
            this.props.onSearchProducts(this.state.searchText);

        });

     
    }

    returnSearchValue = () =>{

        return this.state.searchText;
    }


    onRefresh = () =>{
       // this.setState({isRefreshing:true})
        this.props.deleteSearch();
    }


    render(){

        console.log("hivbcjvbdjbvdjbvdjbj",this.props.userdata.user_address)

        const flatlistdata = () => {

           // return this.props.homescreen.getAllProducts;

            if(Array.isArray(this.props.homescreen.search_products) && this.props.homescreen.search_products.length > 0){
              
                return this.props.homescreen.search_products;
            
            }else{

                return(
                    <Text>No Products Found</Text>
                )

            }

        }




        return(
            <>
            
            <FullSCreenSpinnerAndDismissKeyboardView
            style={styles.container}
            onRefresh={this.onRefresh.bind(this)}
            refreshing={this.state.isRefreshing}
            scheduleVisible={this.state.scheduleModalVisible}
            schedule_product_id ={this.state.schedule_product_id}
            schedule_product_price = {this.state.schedule_product_price}
            spinner={this.state.isLoading}>
                <View style={{marginTop:10}}>
                {this.props.navigation.getParam('location') == null
                    ?
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('SelectAddress')}}>
                    <View style={styles.searchAddress}>
                    
                        <Image source={require('../Assets/location1.png')} style={{width:30,height:30,alignSelf:"center",}} />
                    
                        <Text style={styles.locationTextStyle}numberOfLines = {1} >
                            { this.props.userdata.user_address != null || this.props.userdata.user_address !== undefined ?

                                capitilize(this.props.userdata.user_address)
                                :
                                ""
                                }
                        </Text>
                        
                    </View>
                    </TouchableOpacity>

                    :
                    <View/>
                }
            
             
            {/* <Image style={{width:'95%',height:15,alignSelf:"center",marginTop:2,marginLeft:10,marginRight:10,marginBottom:5}} source={require('../Assets/curve_new.png')} /> */}
                 
                    <CustomTextInputWithIcon keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                            placeholder="Search for Products.." 
                            searchValue={this.state.searchText} 
                            showTextInput={true}
                            container={{marginTop:10}}
                            onSearchPress={this.onSearchHandler.bind(this)}/>
                        <FlatList
                        
                        data={flatlistdata()}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(item) =>this.renderItem(item)}
                        style={{marginBottom:20}}
                        />
                   
                    

                </View>

                {/* {this.props.homescreen.search_products.length  == 0
                ?
                    <Text style={{alignSelf:'center',textAlignVertical: "center",  textAlign: 'center', justifyContent:"center",    fontSize:15,fontWeight:'bold',color:"grey",fontFamily:"Roboto-Light",}}>No Products Found.</Text>
                :
                    <View/>
                } */}
               

            </FullSCreenSpinnerAndDismissKeyboardView>
            </>
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
      deleteSearch: ()=>{
        dispatch(homeActions.deleteSearch())
      }
    }
  }
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(Search);

  const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#ffffff',
      //  margin:20

    },
    locationTextStyle:{
        fontFamily:"roboto-medium",
        fontSize:14,
        lineHeight:20,
        marginTop:7,
        alignSelf:'center',
        padding:5,
        width:"90%"


    },
    searchAddress:{
        padding:3,
        flexDirection:"row",
        width:"95%",
        borderRadius:5,
        borderColor:'#dcdcdc',
        shadowRadius:2,
        shadowColor:"red",
        marginTop:10,
        borderWidth:1,
        elevation:0,
        alignSelf:"center",
        marginLeft:20,
        marginRight:20
      
    }
    

 });