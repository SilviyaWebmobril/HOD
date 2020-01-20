import React ,{Component} from 'react';
import {View,Text,StyleSheet,Image, Alert} from 'react-native';
import * as HOC from '../../HOC/mainHoc';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);

import axios from 'axios';
import ApiUrl from '../../Api/ApiUrl';
import IncrementDecrementButton from '../../CustomUI/CustomButton/IncrementDecremntButton';
import { WebView } from 'react-native-webview';
import CustomButton from  '../../CustomUI/CustomButton/CustomButton';
import {connect} from 'react-redux';
import * as cartActions from '../../redux/store/actions/cartAction';


class CategoryProductDetails extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title:      navigation.getParam('name')  ,
        headerStyle: { backgroundColor: '#FD8D45' },
        headerTitleStyle: { color: 'white',fontSize:17,flex:1 ,fontFamily:"Roboto-Light",},
        headerTintColor: 'white',
        headerRight:(
            <Cartbadge count={navigation.getParam('count', '0')} nav={navigation} />
        )
      });

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
            is_discount:""


        }
    }


    

    static getDerivedStateFromProps(props, state) {
       
        if (props.cart_product !== state.cart_product) {

          if(props.cart_product.cart_get_once[props.navigation.getParam('product_id')]){
            return {
                quantity: props.cart_product.cart_get_once[props.navigation.getParam('product_id')].itemQuanity,
              };
          }else{
            return{
                quantity:0
            }
          }
         
        }
    
        // Return null if the state hasn't changed
        return null;
      }


    componentDidMount() {
        console.log("total",this.props.cart.total_cart_count );
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
            this.setState({old_price:response.data.data.old_price});
            this.setState({new_price:response.data.data.new_price});
           // this.setState({quantity:response.data.data.quantity});
           this.setState({quantity_left:response.data.data.quantity});
            this.setState({weight:response.data.data.weight});
            this.setState({unit:response.data.data.unit.name});
            this.setState({productname:response.data.data.name});
            this.setState({description:response.data.data.description});
            this.setState({product_id:response.data.data.id});
            this.setState({is_discount : response.data.data.is_discount})
            this.setState({allow_subscription:response.data.data.product_category.allow_subscription});


           
            console.log("res ->",this.props.cart_product.cart_get_once[response.data.data.id])
            if(this.props.cart_product.cart_get_once[response.data.data.id]){

                this.setState({quantity:this.props.cart_product.cart_get_once[response.data.data.id].itemQuanity},()=>{
                    console.log("new quantity",this.state.quantity);
                });
            
            }else{
                this.setState({quantity:0});
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
                <View style={styles.mainRow}>
                    <View style={styles.rowLeft}>
                        <Text style={styles.productname}>{this.state.productname}</Text>
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
                         <IncrementDecrementButton  product_id={this.state.product_id}  quantity={this.state.quantity} price={this.state.is_discount == 1 ? this.state.new_price : this.state.old_price} />
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

                <CustomButton customTextStyle={{ color:'white',}}   customButttonStyle={{marginBottom:25}}
                text="ADD TO CART" onPressHandler={()=>{

                    this.props.onLoading(true);
                    this.props.onAdd(this.state.product_id,price,this.props.user.userdata.user_id);
                   

                }} />

                {/* {this.state.allow_subscription ==  1 

                 ?
                    <CustomButton  customButttonStyle={{backgroundColor:"#FD8D45",marginBottom:40 }} customTextStyle={{ color:'brown'}} 
                    text="SUBSCRIBE"  onPressHandler={()=>{this.scheduleModalVisible()}}/>
            
                  :

                    <View/>

                } */}
                






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
            dispatch(cartActions.addToCart(product_id,price,user_id))
          },
        onRemove : (product_id,user_id,price) => {
              dispatch(cartActions.removeFromCart(product_id,user_id,price))
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
        justifyContent:"space-between"
    },
    rowLeft:{
        alignContent:"flex-start",
        alignSelf:"flex-start",
        marginLeft:10,
       


    },
    rowRight:{
        alignContent:'flex-end',
        alignSelf:"flex-end",
        marginRight:10
        

    },
    quantity_left:{
        fontSize:12,
        fontWeight:"bold",
        marginBottom:7,
        alignSelf:"flex-end"
      
    },
    productname:{
        fontFamily:"Philosopher-Bold",
        fontSize:17,
        marginBottom:7
      
    },
    unitView:{
        justifyContent:"flex-start",
        alignItems:"flex-start",
        borderColor:"grey",
       
    },
    unitViewText:{
        fontFamily:"philosopher-regular",
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
        fontFamily:"philosopher-regular",
        fontSize:15,
        color:"#FD8D45",
        marginRight:5
    },
    oldpricetext:{
        fontFamily:"philosopher-regular",
        fontSize:15,
        color:"grey",
        marginRight:5,
        textDecorationLine: 'line-through',
         textDecorationStyle: 'solid'
    },
    offerText:{
        fontFamily:"philosopher-regular",
        fontSize:15,
        color:"#FD8D45"
    },
    quantityText:{
        fontFamily:"philosopher-regular",
        color:"grey",
        fontSize:15,
        alignSelf:"flex-end"
    },
    webViewStyle:{
        margin:10
    }


});