import React,{Component} from 'react';
import {View ,Text, StyleSheet, Image,}  from 'react-native';
import CustomButton from '../../CustomUI/CustomButton/CustomButton';
import IncrementDecrementButton from '../../CustomUI/CustomButton/IncrementDecremntButton';
import IncrementDecrementSubscribe from '../../CustomUI/CustomButton/IncrementDecremantSubscribe';
import { useDispatch, useSelector } from 'react-redux';
import * as cartActions from '../../redux/store/actions/cartAction';
import { connect } from 'react-redux';
import ScheduleModal from '../../CustomUI/Modal/ScheduleModal';
import ApiUrl from '../../Api/ApiUrl';


class ProductItem extends Component {

    constructor(props){
        super(props);
        this.state = {

            //showQuantityButton:this.props.data.get_once.itemOnCart,
            is_get_once:-1,
            isSubscribed:-1,
            itemQuantity:0,
            product_id:"",
            itemPrice:"",
            itemSubscribedQuantity:"",
            modalVisible:false,
            subscriptionType:null,
            data:this.props.data

        }
        
    }

   
   
    render(){

        var product_price ;
        if(this.props.products.is_discount == 1){
            product_price  = this.props.products.new_price
           
        }else{
            product_price  = this.props.products.old_price
          
        }
       

        return(
            <>
                <View style={styles.container}>
                    <Image source={{uri:ApiUrl.image_url+this.props.products.img}} resizeMode="contain" style={{width:120,alignSelf:"center",flex:0.5, height:120,borderRadius:10}}/>
                    <View style={styles.sectionRow}>
                        <View  style={{flex:0.6}}>
                            <Text style={styles.textProductname} numberOfLines={2}>{this.props.products.name}</Text>
                            {/* <View style={styles.sectionTextRow}> */}
                           
                            {this.props.products.is_discount ==  1 
                                ?
                                <View style={{justifyContent:"flex-start",alignItems:"flex-start",flexDirection:'row'}}>
                                <Text style={{lineHeight:20,marginTop:0,fontFamily:"roboto-bold",color:"#FD8D45",}}>{'\u20B9'}{this.props.products.new_price}{"   "}</Text>
                                <Text style={{lineHeight:20,marginTop:0,fontFamily:"roboto-light",textDecorationLine: 'line-through',textDecorationStyle: 'solid'}}>{'\u20B9'}{this.props.products.old_price}</Text>
                                </View>
                                :
                                <Text style={{lineHeight:20,marginTop:0,fontFamily:"roboto-bold",color:"#FD8D45"}}>{'\u20B9'}{this.props.products.old_price}</Text>
                            }
                                
                            {/* </View> */}

                        <Text>{this.props.products.quantity} left</Text>
                            
                        </View>
                        <View  style={{justifyContent:"flex-end",alignContent:"flex-end",alignItems:"flex-end",flex:0.4}}>
                                   
                                        
                            <Text style={styles.textBorder}>{parseInt(this.props.products.weight)} {this.props.unit.name}</Text>
                            {this.props.search == 0
                            ?
                            (this.props.is_added_to_cart !== null
                                ?
                                <IncrementDecrementButton  
                                    updateProductQuantity={(product_id , quantity)=>{this.props.updateStateQuantity(product_id, quantity);}}
                                    product_id={this.props.product_id}  
                                    quantity={this.props.is_added_to_cart.quantity} 
                                    price={this.props.products.is_discount == 1 ? this.props.products.new_price : this.props.products.old_price} 
                                    stock_available={this.props.products.display_stock == 1 ? this.props.products.quantity : 0} />
        
                                :
                                <CustomButton 
    
                                        onPressHandler={()=> {
                                            this.props.onLoading(true);
                                            this.props.onAdd(this.props.products.id,product_price,this.props.user.userdata.user_id)
                                            .then(response=> {
                                                if(response == 1){
                                                    
                                                    this.props.updateStateQuantity(this.props.product_id,1);
                                                }
                                            })
                                   
    
                                        }}
                                    customButttonStyle={{backgroundColor:"#FD8D45",padding:3, height:35,marginTop:10,textAlign:"right",alignSelf:"flex-end",width:"auto",padding:10}}
                                    customTextStyle={{ color:'white',fontSize:12}}
                                    text="  Add To Cart "  />
                                )
                                
                            :
                                <View/>
                            
                            }
                            
                            
                        </View>
                        
                        
                    </View>

                               
                </View>
               
                <View style={styles.viewLineGrey}></View>
            </>
           
        );
    


    }
}


const mapDispatchToProps = dispatch =>{
    return {
        onAdd: (product_id,price,user_id) => 
            new Promise((resolve ,reject) => {
                dispatch(cartActions.addToCart(product_id,price,user_id))
                .then((response) => {
                    resolve(response);
                })
                .catch((error)=>{

                })
            })
           
          ,
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
     // cart:state.cart
    }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(ProductItem);

  const styles = StyleSheet.create({

    container:{
      
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        alignContent:"space-between",
        paddingLeft:10,
        paddingRight:10,

    },
    sectionRow:{
        flex:1.5,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:10,
        paddingRight:10,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        alignContent:"space-between",
       // backgroundColor:"green"
      
    },
    sectionTextRow:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"flex-start",
    },
    textColumnLeft:{
       width:"auto",
    
       // alignSelf:"flex-start",
      //  flex:1,

    },
    textColumnRight:{
        flexDirection:"column",
        alignSelf:"flex-end",
      
        textAlign:"right",
        flex:1,
       
        
    },
    textProductname:{
        fontFamily:"roboto-bold",
        fontSize:15,
        //fontWeight:"bold",
        color:"black",
        lineHeight:20,
        marginTop:20,
        marginBottom:5
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
        marginTop:10,
        marginBottom:10,
       
        
    },
    
});
