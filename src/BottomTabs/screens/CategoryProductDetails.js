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
        title: navigation.getParam('name'),
        headerStyle: { backgroundColor: '#FD8D45' },
        headerTitleStyle: { color: 'white' },
        headerTintColor: 'white'
      });

      constructor(props) {
        super(props);
        this.state= {

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
            cart_product:this.props.cart_product


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
                quantity:1
            }
          }
         
        }
    
        // Return null if the state hasn't changed
        return null;
      }

    componentDidMount() {

        console.log("cart items",this.props.cart_product);
        this.props.onLoading(true);
        this.setState({isLoading:this.props.cart_product.isLoading});
        axios.post(ApiUrl.baseurl +ApiUrl.get_product_details+ this.props.navigation.getParam('product_id'))
        .then(response =>{

            this.props.onLoading(false);
            this.setState({isLoading:this.props.cart_product.isLoading});
            var  obj = JSON.stringify(response.data.data);
           
            this.setState({details:JSON.parse(obj)});

            this.setState({img:"http://webmobril.org/dev/hod/"+response.data.data.img})
            this.setState({old_price:response.data.data.old_price});
            this.setState({new_price:response.data.data.new_price});
           // this.setState({quantity:response.data.data.quantity});
            this.setState({unit:response.data.data.unit.name});
            this.setState({productname:response.data.data.name});
            this.setState({description:response.data.data.description});
            this.setState({product_id:response.data.data.id});

           

            if(this.props.cart_product.cart_get_once[response.data.data.id]){

                this.setState({quantity:this.props.cart_product.cart_get_once[response.data.data.id].itemQuanity},()=>{
                    console.log("new quantity",this.state.quantity);
                });
            
            }else{
                this.setState({quantity:1});
            }



        }).catch(error => {
            this.props.onLoading(false);
              this.setState({isLoading:this.props.cart_product.isLoading});



        });

      
    }

    render(){

      
        return(
            
            <FullSCreenSpinnerAndDismissKeyboardView
            styles={styles.container}
            spinner={this.props.cart_product.isLoading}>

                <Image source={{uri:this.state.img}} width={150} height={150} style={styles.imgStyle} />
                <View style={styles.viewLineGrey}></View>
                <View style={styles.mainRow}>
                    <View style={styles.rowLeft}>
                        <Text style={styles.productname}>{this.state.productname}</Text>
                        <View style={styles.unitView}>
                            <Text style={styles.unitViewText}>1L</Text>
                        </View>
                        <View style={styles.priceView}>
                            <View style={styles.newpricetext}>
                                <Text style={styles.newpricetext}>{'\u20B9'}{this.state.new_price}</Text>
                            </View>
                            <View style={styles.oldpricetext}>
                                <Text style={styles.oldpricetext}>{'\u20B9'}{this.state.old_price}</Text>
                            </View>
                        </View>

                    </View>
                    <View style={styles.rowRight}>
                        
                     
                    <IncrementDecrementButton  product_id={this.state.product_id}  quantity={this.state.quantity} price={this.state.new_price} />
                    </View>
                </View>
               
                <View style={styles.webViewStyle} pointerEvents="none">
                    <WebView
                        style={{width:900,height:150}}
                        originWhitelist={['*']}
                        source={{ html:this.state.description}}
                    />
                </View>

                <CustomButton customTextStyle={{ color:'white',}}   customButttonStyle={{marginBottom:25}}
                text="GET ONCE" onPressHandler={()=>{

                    this.props.onLoading(true);
                    this.props.onAdd(this.state.product_id,this.state.new_price,this.props.user.userdata.user_id);
                    
                    Alert.alert("Quantity Updated Successfully!");

                }} />

                <CustomButton  customButttonStyle={{backgroundColor:"#FD8D45",marginBottom:40 }} customTextStyle={{ color:'brown'}} 
                text="SUBSCRIBE" />
        






            </FullSCreenSpinnerAndDismissKeyboardView>

        )
    }
}




const mapStateToProps = (state) => {
    return {
      cart_product: state.cart,
      user:state.userdata
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
        marginLeft:10


    },
    rowRight:{
        alignContent:'flex-end',
        alignSelf:"flex-end",
        marginRight:10
        

    },
    productname:{
        fontSize:20,
        fontWeight:"bold",
        marginBottom:7
      
    },
    unitView:{
        borderColor:"grey",
        borderRadius:2,
        borderWidth:1,
        marginBottom:7,
        width:30,
        padding:7
    },
    unitViewText:{
        fontSize:12,
    },
    priceView:{
        flexDirection:"row",
        flex:3,
      
    },
    newpricetext:{
        fontSize:15,
        fontWeight:"bold",
        color:"#FD8D45",
        marginRight:5
    },
    oldpricetext:{
        fontSize:15,
        fontWeight:"bold",
        color:"grey",
        marginRight:5,
        textDecorationLine: 'line-through',
         textDecorationStyle: 'solid'
    },
    offerText:{
        fontSize:15,
        color:"#FD8D45"
    },
    quantityText:{
        fontWeight:'bold',
        color:"grey",
        fontSize:15,
        alignSelf:"flex-end"
    },
    webViewStyle:{
        margin:10
    }


});