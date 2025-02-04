import React,{Component} from 'react';
import {View ,Text, StyleSheet, Image, Dimensions,}  from 'react-native';
import CustomButton from '../../CustomUI/CustomButton/CustomButton';
import IncrementDecrementButton from '../../CustomUI/CustomButton/IncrementDecremntButton';
import IncrementDecrementSubscribe from '../../CustomUI/CustomButton/IncrementDecremantSubscribe';
import { useDispatch, useSelector } from 'react-redux';
import * as cartActions from '../../redux/store/actions/cartAction';
import { connect } from 'react-redux';
import ApiUrl from '../../Api/ApiUrl';


class CartProductItem extends Component {

    constructor(props){
        super(props);
        this.state = {

            showQuantityButton:false,
            is_get_once:-1,
            isSubscribed:-1,
            itemQuantity:0,
            product_id:"",
            itemPrice:"",
            itemSubscribedQuantity:"",
            modalVisible:false,
            subscriptionType:null,
            subscription_type:""

        }

        
    }

    componentDidMount(){

       // this.setSubScription();
    }

    setSubScription (){

        var  subscription_type ;
        if(this.props.data.subscription_type == 1){
            subscription_type = "Alternate Days";
            this.setState({subscription_type:subscription_type});
        }else if(this.props.data.subscription_type == 2){ 
            subscription_type = "Daily";
            this.setState({subscription_type:subscription_type});
        }else if(this.props.data.subscription_type == 3){
            subscription_type = "Weekdays";
            this.setState({subscription_type:subscription_type});
        }else if(this.props.data.subscription_type == 4){
            subscription_type = "Weekends";
            this.setState({subscription_type:subscription_type});
        }else if(this.props.data.subscription_type == 5 ){
            if(this.props.data.sub_type == 1){
                subscription_type = "Every "+ this.props.data.no_of_days+" Days";
                this.setState({subscription_type:subscription_type});
            }else if(this.props.data.sub_type == 2){
                var split_days =  this.props.data.no_of_days.split(",") ;
                subscription_type ="";
                console.log("split_days 1",subscription_type);
               
                if(split_days.includes("1")){
                  
                    subscription_type = subscription_type + "Mon -";
                    this.setState({subscription_type:subscription_type});
                } if(split_days.includes("2")){
                    subscription_type = subscription_type + "Tues -";
                    this.setState({subscription_type:subscription_type});
                }if(split_days.includes("3")){
                    console.log("split_days 2 wed",subscription_type);
                    subscription_type = subscription_type + "Wed -";
                    this.setState({subscription_type:subscription_type});
                }if(split_days.includes("4")){
                    subscription_type = subscription_type + "Thurs -";
                    this.setState({subscription_type:subscription_type});
                } if(split_days.includes("5")){
                    subscription_type = subscription_type + "Fri -";
                    this.setState({subscription_type:subscription_type});
                }if(split_days.includes("6")){
                    subscription_type = subscription_type + "Sat -";
                    this.setState({subscription_type:subscription_type});
                } if(split_days.includes("7")){
                    subscription_type =  subscription_type + "Sun -";
                    this.setState({subscription_type:subscription_type});
                }

                if(subscription_type !== " "){
                    // var lastChar = strVal.slice(-1);
                    // if (lastChar == ',') {
                    //     strVal = strVal.slice(0, -1);
                    // }
                    subscription_type = subscription_type.substring(0, subscription_type.length - 1);
                    this.setState({subscription_type:subscription_type});
                }

            }
        }

    }

    // shouldComponentUpdate(nextProps, nextState){
    //     return false;
    // }

    render(){
       
    
        return(
            <>
            <View style={styles.container}>
            <Image  source={{uri:ApiUrl.image_url+this.props.data.product.img}} resizeMode="contain" style={styles.imageStyle}/>
            <View style={{alignItems:'flex-start',justifyContent:"flex-start",flexShrink:1,marginTop:10,paddingLeft :10}}>
                <Text style={styles.textProductname} numberOfLines={3}>{this.props.data.product.name}</Text>
                
                <Text style={styles.unitViewText}>{parseInt(this.props.data.product.weight)} {this.props.data.product.unit.name}</Text>
                    <View style={{justifyContent:'space-between',alignItems:"center",flexDirection:'row',width:"100%"}}>
                        {this.props.data.product.is_discount ==  1 
                            ?
                            <Text style={{lineHeight:17,marginTop:0,alignSelf:"center",fontFamily:"roboto-light",}}>{'\u20B9'}{parseFloat(parseFloat(this.props.data.product.new_price) * parseFloat(this.props.data.quantity)).toFixed(2)}</Text>
                            :
                            <Text style={{lineHeight:17,marginTop:0,alignSelf:"center",fontFamily:"roboto-light",}}>{'\u20B9'}{parseFloat(parseFloat(this.props.data.product.old_price) * parseFloat(this.props.data.quantity)).toFixed(2)}</Text>
                        }
                       
                        <IncrementDecrementButton  
                            updateProductQuantity={(product_id , quantity)=>{this.props.updateStateQuantity(product_id, quantity);}}
                            from_cart={1}
                            product_id={this.props.data.product.id}  
                            quantity={this.props.data.quantity} 
                            price={this.props.data.product.is_discount == 1 ? this.props.data.product.new_price : this.props.data.product.old_price} 
                            stock_available={this.props.data.product.quantity} />
                        
                        
                        
                    </View>
                    <Text style={styles.textProductname1} numberOfLines={2}>{this.props.data.product.product_category.name}</Text>
                

            </View>
            </View>
            <View style={styles.viewLineGrey}></View>
            </>
        );
    


    }
}


const mapDispatchToProps = dispatch =>{
    return {
        onAdd: (product_id,price,user_id) => {
            dispatch(cartActions.addToCart(product_id,price,user_id))
          },
        onRemove : (product_id,user_id) => {
              dispatch(cartActions.removeFromCart(product_id,user_id))
          },
        onLoading : (value) => {
            
            dispatch(cartActions.isLoading(value))


        }
        
    }
}

const mapStateToProps = state => {
    return {
      user: state.userdata,
      cart:state.cart
    }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(CartProductItem);

  const styles = StyleSheet.create({

    imageStyle:{
        width:100,alignSelf:"center", height:120,borderRadius:10
    },

    container:{
        flexDirection:"row",
        justifyContent:"flex-start",
        //alignItems:"center",
        paddingTop:5,
        paddingLeft:10,
        paddingRight:10,
        width:Dimensions.get('window').width ,

    },
   
    textProductname:{
        fontFamily:"roboto-bold",
        fontSize:15,
        color:"black",
        lineHeight:20,
    },
    textBorder:{
        borderColor:"grey",
         textAlign:"center",
         padding:2,
         fontFamily:"roboto-light",
         borderRadius:2,
         lineHeight:20,
         width:"auto",
         borderWidth:1
         
        // marginTop:10,
 
     },
    viewLineGrey:{
        width:'100%',
        height:1,
        backgroundColor:"#DCDCDC",
        marginTop:5,
        marginBottom:5,
       
        
    },
    unitView:{
        justifyContent:"flex-start",
        alignItems:"flex-start",
        borderColor:"grey",
       
    },
    unitViewText:{
        marginTop:5,
        //borderColor:"grey",
        fontFamily:'roboto-light',
        fontSize:12,
        //padding:5 ,
        alignSelf:"flex-start",
        // borderRadius:2,
        // borderWidth:1,
        marginBottom:0,
        width:'auto', // set this width to null and try! ,justifyContent:"center"
    },
    textProductname1:{
        fontFamily:"roboto-bold",
        fontSize:10,
        //fontWeight:"bold",
        color:"black",
        lineHeight:17,
       // marginTop:20,
    },
    
});
