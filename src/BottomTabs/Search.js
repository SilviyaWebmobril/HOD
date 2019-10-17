import React ,{Component} from 'react';
import {View,TouchableOpacity,FlatList,StyleSheet,Text} from 'react-native';
import * as HOC from './../HOC/mainHoc';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
import ProductItem  from './ProductItem/ProductItem';
import {connect} from 'react-redux';    
import CustomTextInputWithIcon from '../CustomUI/CustomTextInput/CustomTextInputWithIcon';
import * as homeActions from '../redux/store/actions/homeAction';

 class Search extends Component{

    constructor(props){
        super(props);
        this.state = {

            isLoading:this.props.cart.isLoading,
            searchText:"",
            initial:true,
            isRefreshing:false

        }
    }

    
    scheduleModalVisible = (product_id,product_price) =>{

        console.log("getting data from child",product_id);
        this.setState({scheduleModalVisible:true})
        this.setState({schedule_product_id:product_id});
        this.setState({schedule_product_price:product_price})

    }

    onDetailsHandler = (id,name) => {
       
        this.props.navigation.navigate("CategoryProductDetails",{"product_id":id   ,"name":name});
    }

    renderItem(data){
        let { item, index } = data;
        console.log("render item",item);
        return(
            <TouchableOpacity
            onPress={()=>this.onDetailsHandler(item.id,item.name)}
           >
            <ProductItem data={item} scheduleModal={this.scheduleModalVisible.bind(this)}/>
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

        const flatlistdata = () => {

           // return this.props.homescreen.getAllProducts;

            if(Array.isArray(this.props.homescreen.search_products) && this.props.homescreen.search_products.length > 0){
              
                return this.props.homescreen.search_products;
            
            }else{

            }

        }




        return(
            <FullSCreenSpinnerAndDismissKeyboardView
            style={styles.container}
            onRefresh={this.onRefresh.bind(this)}
            refreshing={this.state.isRefreshing}
            scheduleVisible={this.state.scheduleModalVisible}
            schedule_product_id ={this.state.schedule_product_id}
            schedule_product_price = {this.state.schedule_product_price}
            spinner={this.state.isLoading}>
                <View style={{marginTop:20}}>
                    <CustomTextInputWithIcon placeholder="Search for Products.." onSubmitEditing={this.onSearchHandler.bind(this)} searchValue={this.state.searchText}  onSearchPress={this.onSearchHandler.bind(this)}/>
                   
                        <FlatList
                        
                        data={flatlistdata()}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(item) =>this.renderItem(item)}
                        style={{marginBottom:20}}
                        />
                   
                    

                </View>

                {this.props.homescreen.search_products.length  == 0
                ?
                    <Text style={{alignSelf:'center',textAlignVertical: "center",  textAlign: 'center', justifyContent:"center",    fontSize:15,fontWeight:'bold',color:"grey"}}>No Items Found.</Text>
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
    

 });