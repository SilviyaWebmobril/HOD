import React,{Component} from 'react';
import {View ,Text, StyleSheet, Image,}  from 'react-native';
import CustomButton from '../../CustomUI/CustomButton/CustomButton';
import IncrementDecrementButton from '../../CustomUI/CustomButton/IncrementDecremntButton';
import IncrementDecrementSubscribe from '../../CustomUI/CustomButton/IncrementDecremantSubscribe';
import { useDispatch, useSelector } from 'react-redux';
import * as cartActions from '../../redux/store/actions/cartAction';
import { connect } from 'react-redux';
import ScheduleModal from '../../CustomUI/Modal/ScheduleModal';
import IncrementDecremntButton from '../../CustomUI/CustomButton/IncrementDecremntButton';
import IncrementDecremantSubscribe from '../../CustomUI/CustomButton/IncrementDecremantSubscribe';


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

        }

        
    }

   

    render(){

        return(

            <View>
                <View style={styles.container}>
                    
                    <Image  source={{uri:"https://www.webmobril.org/dev/hod/"+this.props.data.product.img}} style={{width:120, height:120,borderRadius:10}}/>
                    <View style={styles.sectionRow}>
                    <View style={styles.textColumnLeft}>
                            <Text style={styles.textProductname}>{this.props.data.product.name}</Text>
                            <Text style={{lineHeight:20}}>{'\u20B9'}{this.props.data.product.new_price}</Text>
                            <Text  style={{lineHeight:20}}>{this.props.data.product.quantity} left</Text>
                        </View>
                        
                        
                            {this.props.data.is_subscribed == 0 ?
                            
                            //Add To Cart Button
                            <View  style={styles.textColumnLeft}>
                            
                                <Text style={{fontSize:10, alignSelf:"flex-end",fontWeight:"bold",padding:3,borderRadius:3,borderWidth:1,color:"#FD8D45" ,borderColor:"#FD8D45"}}>Get Once</Text>
                                
                                <IncrementDecrementButton  product_id={this.props.data.product.id}  quantity={this.props.data.quantity} price={this.props.data.price} />
                                
                                
                            </View>
                            :
                            //Add To Cart Button
                            <View  style={styles.textColumnLeft}>
                            
                                <Text style={{fontSize:10,alignSelf:"flex-end",fontWeight:"bold",padding:4,borderRadius:3,borderWidth:1,color:"#FD8D45" ,borderColor:"#FD8D45"}}>Subscribed</Text>   
                                <IncrementDecrementSubscribe subscriptionType={this.props.data.subscribed.subscription_type} product_id={this.props.data.product.id}  subscribed_quantity={this.props.data.qauntity} quantity={this.props.data.quantity} price={this.props.data.price} /> 
                                
                                
                            </View> 
                            }
                    

                    
                    
                        
                    </View>

                
                </View>
                
                <View style={styles.viewLineGrey}></View>
            </View>
           
           
    
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

    container:{
      
        flexDirection:"row",
        marginTop:10,
        marginLeft:10,
        marginRight:10,
        //backgroundColor:"red"

    },
    sectionRow:{
        flexDirection:"row",
        flex:1,
        margin:10,
        
        alignSelf:"center"
       

    },
    textColumnLeft:{
        flexDirection:"column",
        alignSelf:"flex-start",
        flex:0.5,
        marginTop:10
        
    },
    textColumnRight:{
        flexDirection:"column",
        alignSelf:"flex-end",
        position: 'absolute', 
        textAlign:"right",
        flex:0.5,
       
        
    },
    textProductname:{
        fontSize:15,
        fontWeight:"bold",
        color:"black",
        lineHeight:30,
    },
    textBorder:{
        // borderColor:'grey',
        // borderRadius:1,
        // borderWidth:0.5,
        textAlign:"right",
        padding:2,
        lineHeight:20,
        marginTop:10,

    },
    viewLineGrey:{
        width:'100%',
        height:1,
        backgroundColor:"#DCDCDC",
        marginTop:10,
        marginBottom:10,
       
        
    },
    
});
