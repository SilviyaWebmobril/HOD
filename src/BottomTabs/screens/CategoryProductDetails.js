import React ,{Component} from 'react';
import {View,Text,StyleSheet,Image, Alert} from 'react-native';
import * as HOC from '../../HOC/mainHoc';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
//hello
import axios from 'axios';
import ApiUrl from '../../Api/ApiUrl';
import IncrementDecrementButton from '../../CustomUI/CustomButton/IncrementDecremntButton';
import { WebView } from 'react-native-webview';
import CustomButton from  '../../CustomUI/CustomButton/CustomButton';
import {connect} from 'react-redux';
import * as cartActions from '../../redux/store/actions/cartAction';


class CategoryProductDetails extends Component {

    static navigationOptions = ({ navigation, screenProps }) => {
        const { params = {} } = navigation.state;
        return{
            title:      navigation.getParam('name')  ,
            headerStyle: { backgroundColor: '#FD8D45' },
            headerTitleStyle: { color: 'white',fontSize:17,fontFamily:"roboto-bold",textAlign:"center",marginLeft:50},
            headerTintColor: 'white',
            headerTitleContainerStyle: {
                left: 0, // THIS RIGHT HERE
              },
            headerRight:(
                <Cartbadge 
                count={navigation.getParam('count', '0')} 
                nav={navigation}
                updateStateQuantity={(product_id,quantity) =>  {params.callBack(product_id,quantity)}} />
            )
        }
      
      };

      constructor(props) {
        super(props);
        this.state= {
            cartCount:false,
            isLoading:this.props.cart_product.isLoading,
            details:null,
            img:"",
            old_price:0,
            new_price:0,
            offer_price:0,
            quantity:"",
            unit:"",
            description:"",
            product_id:"",
            cart_product:this.props.cart_product,
            weight:0,
            quantity_left:"",
            scheduleModalVisible:false,
            allow_subscription:"",
            is_discount:"",
            display_stock :0,
            stock_quantity:0,
            showGoToCartBtn:false,
            product_cat_id:""


        }
    }


    

    static getDerivedStateFromProps(props, state) {
       
        // if (props.cart_product !== state.cart_product) {

        //   if(props.cart_product.cart_get_once[props.navigation.getParam('product_id')]){
        //     return {
        //         quantity: props.cart_product.cart_get_once[props.navigation.getParam('product_id')].itemQuanity,
        //       };
        //   }else{
        //     return{
        //         quantity:0
        //     }
        //   }
         
        // }
    
        // Return null if the state hasn't changed
        return null;
      }

      getcallBack = (product_id,quantity) => {

        if( this.props.navigation.state.params !== undefined){
            this.props.navigation.state.params.updateProductList1(product_id, quantity);
        }
        
        this.setState({quantity:quantity},()=>{
            if(this.state.quantity < 1){
                this.setState({showGoToCartBtn:false})
            }
        });
      }

      updateStateQuantity = (product_id,quantity ) => {
          console.log("i am updating value",quantity);
        this.props.navigation.state.params.updateProductList1(product_id, quantity);
        this.setState({quantity:quantity},()=>{
            if(this.state.quantity < 1){
                this.setState({showGoToCartBtn:false})
            }
        }); 
      }
 

    componentDidMount() {
        console.log("total",this.props.cart.total_cart_count );
        this.props.navigation.setParams({callBack : this.getcallBack.bind(this)})
        this.props.navigation.setParams({ 'count': this.props.cart.total_cart_count });
        if(this.props.cart.total_cart_count > 0){
            this.setState({cartCount:true})
        }else{
            this.setState({cartCount:false})
        }

       
        this.props.onLoading(true);
        this.setState({isLoading:this.props.cart_product.isLoading});
        axios.post(ApiUrl.baseurl +ApiUrl.get_product_details+ this.props.navigation.getParam('product_id'))
        .then(response =>{
          
            this.props.onLoading(false);
            this.setState({isLoading:this.props.cart_product.isLoading});
            var  obj = JSON.stringify(response.data.data);
           
            this.setState({details:JSON.parse(obj)});

            this.setState({img:"http://webmobril.org/dev/hod/"+response.data.data.img},()=>{
                console.log("img=",this.state.img);
            })
            console.log("img111=",response.data.data);
            this.setState({product_cat_id:response.data.data.product_cat_id});
            this.setState({old_price:response.data.data.old_price});
            this.setState({new_price:response.data.data.new_price});
            this.setState({display_stock:response.data.data.display_stock});
            this.setState({stock_quantity:response.data.data.quantity});
           this.setState({quantity_left:response.data.data.quantity});
            this.setState({weight:response.data.data.weight});
            this.setState({unit:response.data.data.unit.name});
            this.setState({productname:response.data.data.name});
            this.setState({description:response.data.data.description});
            this.setState({product_id:response.data.data.id});
            this.setState({is_discount : response.data.data.is_discount})
            this.setState({allow_subscription:response.data.data.product_category.allow_subscription});

            if(this.props.cart_product.cart_get_once[response.data.data.id]){

                this.setState({quantity:this.props.cart_product.cart_get_once[response.data.data.id].itemQuanity},()=>{
                    console.log("new quantity",this.state.quantity);
                });
                this.setState({showGoToCartBtn:true})
            
            }else{
                this.setState({quantity:0});
                this.setState({showGoToCartBtn:false})
            }



        }).catch(error => {
            this.props.onLoading(false);
              this.setState({isLoading:this.props.cart_product.isLoading});



        });

      
    }

    scheduleModalVisible = () =>{

        this.setState({scheduleModalVisible:true})
       
    }

    componentDidUpdate (prevProps,prevState) {

        if(prevProps.schedule_id !==  this.props.schedule_id){
    
            this.setState({scheduleModalVisible:false})
            
        }

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

        if(prevProps.cart.transaction_completed !== this.props.cart.transaction_completed){

            if(this.props.cart.transaction_completed == 1){

                this.setState({quantity: 0});
                this.setState({showGoToCartBtn:false})
        
            }
           
        }


    }

  

    render(){

        var price ;
        if(this.state.is_discount ==  1){
            price = this.state.new_price;
        }else{
            price = this.state.old_price;
        }

      
        return(
            
            <FullSCreenSpinnerAndDismissKeyboardView
            styles={styles.container}
            scheduleVisible={this.state.scheduleModalVisible}
            refreshing={false}
            schedule_product_id ={this.state.product_id}
            schedule_product_price = {price}
            spinner={this.props.cart_product.isLoading}>

                <Image source={{uri:this.state.img}} width={150} height={150} resizeMode="contain" style={styles.imgStyle} />
                <View style={styles.viewLineGrey}></View>
                <Text style={styles.productname} numberOfLines={3}>{this.state.productname}</Text>
                <View style={styles.mainRow}>
                    <View style={styles.rowLeft}>
                       
                        <View style={styles.unitView}>
                            <Text style={styles.unitViewText}>{parseInt(this.state.weight)} {this.state.unit}</Text>
                        </View>
                        {this.state.is_discount ==  1
                        ?
                        <View style={styles.priceView}>
                            <View style={styles.newpricetext}>
                                <Text style={styles.newpricetext}>{'\u20B9'}{this.state.new_price}</Text>
                            </View>
                            <View style={styles.oldpricetext}>
                                <Text style={styles.oldpricetext}>{'\u20B9'}{this.state.old_price}</Text>
                            </View>
                        </View>
                        :
                        <View style={styles.priceView}>
                            <View style={styles.newpricetext}>
                                <Text style={styles.newpricetext}>{'\u20B9'}{this.state.old_price}</Text>
                            </View>
                        </View>
                        }
                        

                    </View>
                    <View style={styles.rowRight}>
                        
                        {/* <View style={styles.oldpricetext}>
                            <Text style={styles.quantity_left}>{this.state.quantity_left} Left</Text>
                        </View> */}
                        {this.state.quantity >= 1 ?
                         <IncrementDecrementButton  
                         updateProductQuantity={(product_id , quantity)=>{
                             this.props.navigation.state.params.updateProductList1(product_id, quantity);
                             this.setState({quantity:quantity},()=>{
                                 if(this.state.quantity < 1){
                                     this.setState({showGoToCartBtn:false})
                                 }
                             });}}
                         product_cat_id={this.state.product_cat_id}
                         product_id={this.state.product_id}  
                         quantity={this.state.quantity} 
                         stock_available={this.state.display_stock == 1 ? this.state.stock_quantity : 0}
                         price={this.state.is_discount == 1 ? this.state.new_price : this.state.old_price} />
                        :
                        <View/>
                        }
                       
                    </View>
                </View>
               
                <View style={styles.webViewStyle} pointerEvents="none">
                    <WebView
                        style={{width:'auto',minHeight:150,height:'auto'}}
                        originWhitelist={['*']}
                        source={{ html:this.state.description}}
                    />
                </View>

               

                {this.state.showGoToCartBtn
                ?
                <CustomButton 
                customMainStyle = {{width:'80%',alignSelf:"center"}}
                customTextStyle={{ color:'white',}}   customButttonStyle={{marginBottom:25}}
                text="GO TO CART" onPressHandler={()=>{
                    this.props.navigation.navigate('Cart',{ updateProductList1:(id,q) => this.updateStateQuantity(id,q)});
                }} />
                :
                <CustomButton 
                customMainStyle = {{width:'80%',alignSelf:"center"}}
                customTextStyle={{ color:'white',}}   customButttonStyle={{marginBottom:25}}
                text="ADD TO CART" onPressHandler={()=>{

                    this.props.onLoading(true);
                    this.props.onAdd(this.state.product_id,price,this.props.user.userdata.user_id,this.state.product_cat_id)
                    .then(response=> {
                        if(response == 1){
                            console.log("qua",this.props.quantity);
                            let quantity = this.props.quantity ;
                            if(quantity == undefined){
                                quantity = 1;
                            }else{
                                quantity = quantity + 1;
                            }
                           
                           // this.props.updateProductQuantity(this.props.product_id,quantity);
                           this.props.navigation.state.params.updateProductList1(this.state.product_id, quantity);
                           this.setState({quantity:quantity})
                           this.setState({showGoToCartBtn:true})
                          
                        }
                    })
                   

                }} />
                }
                






            </FullSCreenSpinnerAndDismissKeyboardView>

        )
    }
}




const mapStateToProps = (state) => {
    return {
      cart:state.cart,
      cart_product: state.cart,
      user:state.userdata,
      schedule_id: state.schedule,
    }
  }
  

  const mapDispatchToProps = dispatch =>{
    return {

        onAdd: (product_id,price,user_id) => {
            return new Promise ((resolve,reject) =>{
                dispatch(cartActions.addToCart(product_id,price,user_id))
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error)=>{

                    })
    

            })
           

          },
       
        onRemove : (product_id,user_id,price) => {
            return new Promise ((resolve ,reject ) => {
                dispatch(cartActions.removeFromCart(product_id,user_id,price))
                    .then((response ) => {
                        resolve(response)
                    })
                    .catch(error =>{

                    });
            })
        },
       
        onLoading : (value) => {
            
            dispatch(cartActions.isLoading(value))


        }
        
    }
}


  export default connect(mapStateToProps,mapDispatchToProps)(CategoryProductDetails)

const styles =  StyleSheet.create({

    container:{
        backgroundColor:"#fff"
    },

    imgStyle:{

        alignSelf:'center',
        margin:15,
     
    },
    viewLineGrey:{
        width:'100%',
        height:1,
        backgroundColor:"#ECECEC",
        marginTop:10
    },
    mainRow:{
       
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    rowLeft:{
        alignSelf:"flex-start",
        marginLeft:10,
       flex:0.7,
    
    },
    rowRight:{
        justifyContent:"center",
        alignSelf:"flex-end",
        marginRight:10,
        flex:0.3
        

    },
    quantity_left:{
        fontSize:12,
        fontWeight:"bold",
        marginBottom:7,
        alignSelf:"flex-end"
      
    },
    productname:{
        fontFamily:'roboto-bold',
        fontSize:17,
        marginBottom:7,
        marginLeft:10
      
    },
    unitView:{
        justifyContent:"flex-start",
        alignItems:"flex-start",
        borderColor:"grey",
       
    },
    unitViewText:{
        fontFamily:'roboto-light',
        fontSize:12,
        padding:5 ,
        alignSelf:"flex-start",
        borderRadius:2,
        borderWidth:1,
        marginBottom:7,
        width:'auto', // set this width to null and try! ,justifyContent:"center"
    },
    priceView:{
        flexDirection:"row",
        flex:3,
      
    },
    newpricetext:{
        fontFamily:'roboto-bold',
        fontSize:15,
        color:"#FD8D45",
        marginRight:5
    },
    oldpricetext:{
        fontFamily:'roboto-bold',
        fontSize:15,
        color:"grey",
        marginRight:5,
        textDecorationLine: 'line-through',
         textDecorationStyle: 'solid'
    },
    offerText:{
        fontFamily:'roboto-light',
        fontSize:15,
        color:"#FD8D45"
    },
    quantityText:{
        fontFamily:'roboto-light',
        color:"grey",
        fontSize:15,
        alignSelf:"flex-end"
    },
    webViewStyle:{
        margin:10
    }


});