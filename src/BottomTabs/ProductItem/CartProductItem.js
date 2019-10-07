import React,{Component} from 'react';
import {View ,Text, StyleSheet, Image,}  from 'react-native';
import CustomButton from '../../CustomUI/CustomButton/CustomButton';
import IncrementDecrementButton from '../../CustomUI/CustomButton/IncrementDecremntButton';
import IncrementDecrementSubscribe from '../../CustomUI/CustomButton/IncrementDecremantSubscribe';
import { useDispatch, useSelector } from 'react-redux';
import * as cartActions from '../../redux/store/actions/cartAction';
import { connect } from 'react-redux';


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

        console.log("cart ",this.props.data);
        this.setSubScription();
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
                  
                    subscription_type = subscription_type + "Mon - ";
                    this.setState({subscription_type:subscription_type});
                } if(split_days.includes("2")){
                    subscription_type = subscription_type + "Tues - ";
                    this.setState({subscription_type:subscription_type});
                }if(split_days.includes("3")){
                    console.log("split_days 2 wed",subscription_type);
                    subscription_type = subscription_type + "Wed - ";
                    this.setState({subscription_type:subscription_type});
                }if(split_days.includes("4")){
                    subscription_type = subscription_type + "Thurs - ";
                    this.setState({subscription_type:subscription_type});
                } if(split_days.includes("5")){
                    subscription_type = subscription_type + "Fri - ";
                    this.setState({subscription_type:subscription_type});
                }if(split_days.includes("6")){
                    subscription_type = subscription_type + "Sat - ";
                    this.setState({subscription_type:subscription_type});
                } if(split_days.includes("7")){
                    subscription_type =  subscription_type + "Sun";
                    this.setState({subscription_type:subscription_type});
                }

            }
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
                            <Text  style={{lineHeight:20}}>{this.props.data.product.quantity} Left</Text>
                        </View>
                        
                        
                            {this.props.data.is_subscribed == 0 ?
                            
                            //Add To Cart Button
                            <View  style={styles.textColumnLeft}>
                            
                                <Text style={{fontSize:10, alignSelf:"flex-end",fontWeight:"bold",padding:3,borderRadius:3,borderWidth:1,color:"#FD8D45" ,borderColor:"#FD8D45"}}>Get Once</Text>
                                
                                <IncrementDecrementButton  product_id={this.props.data.product.id}  quantity={this.props.data.quantity} price={this.props.data.product.new_price} />
                                
                                
                            </View>
                            :
                            //Add To Cart Button
                            <View  style={styles.textColumnLeft}>
                            
                                <Text style={{fontSize:10,alignSelf:"flex-end",fontWeight:"bold",padding:4,borderRadius:3,borderWidth:1,color:"#FD8D45" ,borderColor:"#FD8D45"}}>{this.state.subscription_type}</Text>   
                                <IncrementDecrementSubscribe subscriptionType={this.props.data.subscription_type} product_id={this.props.data.product.id}  subscribed_qauntity={this.props.data.quantity} quantity={this.props.data.quantity} price={this.props.data.product.new_price} />
                                
                                
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
