import React,{Component} from 'react';
import {View ,Text, StyleSheet, Image,}  from 'react-native';
import CustomButton from '../../CustomUI/CustomButton/CustomButton';
import IncrementDecrementButton from '../../CustomUI/CustomButton/IncrementDecremntButton';
import IncrementDecrementSubscribe from '../../CustomUI/CustomButton/IncrementDecremantSubscribe';
import { useDispatch, useSelector } from 'react-redux';
import * as cartActions from '../../redux/store/actions/cartAction';
import { connect } from 'react-redux';
import ScheduleModal from '../../CustomUI/Modal/ScheduleModal';


class ProductItem extends Component {

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

            <View style={styles.container}>
                
                <Image  source={{uri:"https://www.webmobril.org/dev/hod/"+this.props.data.img}} style={{width:120, height:120,borderRadius:10}}/>
                <View style={styles.sectionRow}>
                    <View style={styles.textColumnLeft}>
                        <Text style={styles.textProductname}>{this.props.data.name}</Text>
                        <Text style={{lineHeight:20}}>{'\u20B9'}{this.props.data.new_price}</Text>
                        <Text  style={{lineHeight:20}}>{this.props.data.quantity} left</Text>
                    </View>
                    {"L" == "L"  ? 
    
                    <View style={styles.textColumnLeft}>
    
                        {(!this.state.showQuantityButton && this.state.is_get_once == -1)
                            ?
     
                            <CustomButton 
                             onPressHandler={()=> {
                                 this.props.onLoading(true);
                                 this.props.onAdd(this.props.data.id,this.state.itemPrice,this.props.user.userdata.user_id)
                               
                            }}
                          
                             customButttonStyle={{backgroundColor:"white",borderColor:"grey",borderWidth:1,borderRadius:2, height:30,marginTop:10,textAlign:"right",alignSelf:"flex-end",width:"70%"}}
                             customTextStyle={{ color:'grey',fontSize:12}}
                             text="Get Once"  />
    
                          
                        :
    
                            <IncrementDecrementButton updateGetOnce={this.updateGetOnce.bind(this)} product_id={this.props.data.id} subscribed_quantity={this.state.itemSubscribedQuantity}  quantity={this.state.itemQuanity} price={this.state.itemPrice} />
    
                        }
                            
                    
                       
                       {(!this.state.showQuantityButton && this.state.isSubscribed == -1 ) ?
    
    
                            <CustomButton 
                                onPressHandler={()=> {
                                this.props.scheduleModal(this.props.data.id,this.state.itemPrice);
                                }}
                                customButttonStyle={{backgroundColor:"#FD8D45", height:30,marginTop:10,textAlign:"right",alignSelf:"flex-end",width:"70%"}}
                                customTextStyle={{ color:'white',fontSize:12}}
                                text="Subscribe"  />
                        
                        
                           
                       
                       :

                       <IncrementDecrementSubscribe subscriptionType={this.state.subscriptionType} product_id={this.props.data.id}  subscribed_quantity={this.state.itemSubscribedQuantity} quantity={this.state.itemQuanity} price={this.state.itemPrice} />

                   
                      
                       }
                       
                    </View>
                    
                    :
    
                    //Add To Cart Button
                    <View  style={styles.textColumnLeft}>
                      
                        <Text style={styles.textBorder}>250g</Text>
                       
                        <CustomButton 

                            //Subsccribe work here
                              onPressHandler={()=> {
                                this.props.onLoading(true);
                                 this.props.onAdd(this.props.data.id,this.state.itemPrice,this.props.user.userdata.user_id)
                               
                              }}
                             customButttonStyle={{backgroundColor:"#FD8D45",padding:3, height:30,marginTop:10,textAlign:"right",alignSelf:"flex-end",width:"70%"}}
                             customTextStyle={{ color:'white',fontSize:12}}
                             text="Add To Cart"  />
                    </View>
                   
                    } 
                   
                </View>

               
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

  export default connect(mapStateToProps,mapDispatchToProps)(ProductItem);

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
    milkRightContains:{

    }
    
});
