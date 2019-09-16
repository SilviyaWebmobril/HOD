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
            is_subscribed:-1,
            itemQuantity:0,
            product_id:"",
            itemPrice:"",
            itemSubscribedQuantity:"",
            modalVisible:false,
            

        }
    }

    componentDidMount(){



    }

    componentDidUpdate(prevProps , prevState){

      
      

        if(prevProps.cart !== this.props.cart){

            
            this.setState({showQuantityButton:this.props.cart.itemOnCart});

            if('cart' in this.props.data){

                if(this.props.data.cart.itemOnCart){
    
                    if(this.props.data.cart.is_subscribed == 2){
            
                        console.log("cool i am here",this.props.cart);
            
                        if('get_once' in this.props.cart.product_item || 'subscribed' in this.props.cart.product_item){
            
                           
            
                         // these are needed in IncrementDecremnet Component 
                         console.log("qantity",this.props.cart.product_item.get_once[this.props.data.id].itemQuanity);
                          quantity = this.props.cart.product_item.get_once[this.props.data.id].itemQuanity;
                          price = this.props.cart.product_item.get_once[this.props.data.id].itemPrice;    
                          get_once = this.props.cart.product_item.get_once[this.props.data.id].isSubscribed;
                          subscribed = this.props.cart.product_item.subscribed[this.props.data.id].isSubscribed;
                          subscribed_quantity = this.props.cart.product_item.subscribed[this.props.data.id].itemQuanity;
            
                      
                        
                         
                        }
                        
                
                      
                       
                    }else{
            
                        if('get_once' in this.props.cart){
            
                            quantity = this.props.cart.product_item.get_once[this.props.data.id].itemQuanity;
                            price = this.props.cart.product_item.get_once[this.props.data.id].itemPrice;
                            subscribed = this.props.cart.product_item.get_once[this.props.data.id].isSubscribed;
                            subscribed_quantity = 1;
                            console.log("is subs1111",quantity);
            
                                        
                         
                        }
                      
            
                    }
            
                }else{
                    quantity = 1;
                    price = this.props.data.new_price
                    subscribed_quantity=1;
                    // need to change the UI of INcrement Decrement
                    subscribed = -1;
                    get_once = -1;
            
                    
                
            
            
                
                }
    
            }


            this.setState({itemQuanity:quantity},()=>{
                console.log("updated quantity",this.state.itemQuanity);
            });
            this.setState({itemPrice:price});
            this.setState({itemSubscribedQuantity:subscribed_quantity});
            this.setState({isSubscribed:subscribed});
            this.setState({is_get_once:get_once});
    
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
                    {this.props.data.unit.name == "L"  ? 
    
                    <View style={styles.textColumnLeft}>
    
                        {(this.state.showQuantityButton && this.state.is_get_once != -1)
                            ?
     
                            <CustomButton 
                             onPressHandler={()=> {
                                //  dispatch(cartActions.isLoading(true));
                                //  dispatch(cartActions.addToCart(this.props.data.id,this.props.data.new_price,user_id));
                                //  setQuantityHide(!showQuantityButton)
                            }}
                            // onPressHandler={()=> {
                            //     dispatch(cartActions.isLoading(true));
                            //     dispatch(cartActions.addToCart(props.data,user_id));
                                
                                
                            //   }}
                             customButttonStyle={{backgroundColor:"white",borderColor:"grey",borderWidth:1,borderRadius:2, height:30,marginTop:10,textAlign:"right",alignSelf:"flex-end",width:"70%"}}
                             customTextStyle={{ color:'grey',fontSize:12}}
                             text="Get Once"  />
    
                          
                        :
    
                            <IncrementDecrementButton product_id={this.props.data.id} subscribed_quantity={this.state.itemSubscribedQuantity}  quantity={this.state.itemQuanity} price={this.state.itemPrice} />
    
                        }
                            
                    
                       
                       {(this.state.showQuantityButton && this.state.is_subscribed != -1 ) ?
    
    
                            <CustomButton 
                                customButttonStyle={{backgroundColor:"#FD8D45", height:30,marginTop:10,textAlign:"right",alignSelf:"flex-end",width:"70%"}}
                                customTextStyle={{ color:'white',fontSize:12}}
                                text="Subscribe"  />
                        
                        
                           
                       
                       :

                       <IncrementDecrementSubscribe product_id={this.props.data.id}  subscribed_quantity={this.state.itemSubscribedQuantity} quantity={this.state.itemQuanity} price={this.state.itemPrice} />

                   
                      
                       }
                       
                    </View>
                    
                    :
    
                    //Add To Cart Button
                    <View  style={styles.textColumnLeft}>
                      
                        <Text style={styles.textBorder}>250g</Text>
                       
                        <CustomButton 
                              onPressHandler={()=> {
                                this.setState({modalVisible:true})
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

const mapStateToProps = state => {
    return {
      userdata: state.userdata,
      cart:state.cart
    }
  }

  export default connect(mapStateToProps,null)(ProductItem);

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
