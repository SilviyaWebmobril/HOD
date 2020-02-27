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

            showQuantityButton:this.props.data.get_once.itemOnCart,
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
        if(this.props.data.is_discount == 1){
            product_price  = this.props.data.new_price
           
        }else{
            product_price  = this.props.data.old_price
          
        }
       

        return(
            <>
                <View style={styles.container}>
                    <Image source={{uri:ApiUrl.image_url+this.props.data.img}} resizeMode="contain" style={{width:120,alignSelf:"center",flex:0.5, height:120,borderRadius:10}}/>
                    <View style={styles.sectionRow}>
                        <View >
                            <Text style={styles.textProductname}>{this.props.data.name}</Text>
                            {/* <View style={styles.sectionTextRow}> */}
                           
                            {this.props.data.is_discount ==  1 
                                ?
                                <View style={{justifyContent:"flex-start",alignItems:"flex-start",flexDirection:'row'}}>
                                <Text style={{lineHeight:20,marginTop:0,fontFamily:"roboto-bold",color:"#FD8D45",}}>{'\u20B9'}{this.props.data.new_price}{"   "}</Text>
                                <Text style={{lineHeight:20,marginTop:0,fontFamily:"roboto-light",textDecorationLine: 'line-through',textDecorationStyle: 'solid'}}>{'\u20B9'}{this.props.data.old_price}</Text>
                                </View>
                                :
                                <Text style={{lineHeight:20,marginTop:0,fontFamily:"roboto-light",}}>{'\u20B9'}{this.props.data.old_price}</Text>
                            }
                                
                            {/* </View> */}

                        <Text>{this.props.data.quantity} left</Text>
                            
                        </View>
                        {this.props.data.product_category.allow_subscription == 1  ? 
        
                            <View style={{justifyContent:"flex-end",alignContent:"flex-end",alignItems:"flex-end"}}>
                                
                                    <Text style={styles.textBorder}>  {parseInt(this.props.data.weight)}{this.props.data.unit.name} </Text>
                           
                                {!this.props.data.get_once.itemOnCart
                                    ?

                                    <CustomButton 
                                    onPressHandler={()=> {
                                        this.props.onLoading(true);
                                        this.props.onAdd(this.props.data.id,product_price,this.props.user.userdata.user_id)
                                    
                                    }}
                                
                                    customButttonStyle={{backgroundColor:"white",borderColor:"grey",borderWidth:1,borderRadius:2, height:35,marginTop:10,textAlign:"right",alignSelf:"flex-end",width:"auto",padding:10}}
                                    customTextStyle={{ color:'grey',fontSize:12}}
                                    text="  Get Once "  />

                                
                                :
                                

                                    <IncrementDecrementButton  product_id={this.props.data.id}  quantity={this.props.data.get_once.quantity} price={this.props.data.is_discount == 1 ? this.props.data.new_price : this.props.data.old_price} stock_available={this.props.data.quantity} />
                                
                                }
                                    
                            
                            
                                {/* {(!this.props.data.subscribed.itemOnCart  ) ?

                                        
                                        <CustomButton 
                                            onPressHandler={()=> {
                                            this.props.scheduleModal(this.props.data.id,product_price);
                                            }}
                                            customButttonStyle={{backgroundColor:"#FD8D45", height:35,marginTop:10,textAlign:"right",alignSelf:"flex-end",width:"auto",padding:10}}
                                            customTextStyle={{ color:'white',fontSize:12}}
                                            text=" Subscribe "  />
                                    
                                    
                                    
                                
                                :
                                

                                        <IncrementDecrementSubscribe subscriptionType={this.props.data.subscribed.subscription_type} product_id={this.props.data.id}  subscribed_qauntity={this.props.data.subscribed.subscribed_qauntity} quantity={this.props.data.quantity} price={this.props.data.is_discount == 1 ? this.props.data.new_price : this.props.data.old_price} />
                                
                            
                                
                                } */}
                            
                            </View>
                            
                            :
                            (!this.props.data.get_once.itemOnCart ? 
                                //Add To Cart Button
                                <View  style={{justifyContent:"flex-end",alignContent:"flex-end",alignItems:"flex-end"}}>
                                   
                                        
                                    <Text style={styles.textBorder}>{parseInt(this.props.data.weight)} {this.props.data.unit.name}</Text>
                                    
                                    <CustomButton 

                                        //Subsccribe work here
                                            onPressHandler={()=> {
                                            this.props.onLoading(true);
                                        
                                            this.props.onAdd(this.props.data.id,product_price,this.props.user.userdata.user_id)
                                            
                                            }}
                                        customButttonStyle={{backgroundColor:"#FD8D45",padding:3, height:35,marginTop:10,textAlign:"right",alignSelf:"flex-end",width:"auto",padding:10}}
                                        customTextStyle={{ color:'white',fontSize:12}}
                                        text="  Add To Cart "  />
                                </View>
                            :
                                <View style={{justifyContent:"flex-end",alignContent:"flex-end",alignItems:"flex-end"}}>
                                        <Text style={styles.textBorder}>{parseInt(this.props.data.weight)} {this.props.data.unit.name}</Text>
                                        <IncrementDecrementButton  product_id={this.props.data.id}  quantity={this.props.data.get_once.quantity} price={this.props.data.is_discount == 1 ? this.props.data.new_price : this.props.data.old_price} stock_available={this.props.data.quantity} />
                                </View>
                            )
                        
                        
                        } 
                        
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
