import React,{Component} from 'react';
import {View ,Text,StyleSheet,TouchableOpacity,Image,Alert}  from 'react-native';
import {connect} from 'react-redux';
import * as cartActions from '../../redux/store/actions/cartAction';

class IncrementDecrementButton extends Component {

    constructor(props){
        super(props);

       
        this.state = {
            quantity:"",
            
            user_id:this.props.user.userdata.user_id,
            price:"",
            product_id:this.props.product_id,
            subscribed_quantity:""
        }
    }

  
   
    onPlusHandler = () =>{

        console.log("avail",this.props.stock_available > this.props.quantity);
        console.log("stock",this.props.stock_available);
        console.log("qua",this.props.quantity)
        if(this.props.stock_available > this.props.quantity){

            this.props.onLoading(true);
            this.props.onAdd(this.props.product_id,this.props.price,this.props.user.userdata.user_id,this.props.product_cat_id)
                .then(response=> {
                    if(response == 1){
                        let quantity = this.props.quantity ;
                        if(this.props.from_cart !== 1){
                            quantity = quantity + 1;
                           
                            this.props.updateProductQuantity(this.props.product_id,quantity);
                        }else{
                           
                            this.props.updateProductQuantity(this.props.product_id,quantity);
                        }
                      
                      
                      
                    }
                })
       
        }else{

            Alert.alert(
                'Add To Cart',
                "Sorry for the Inconvinence. Out of Stock!",
                [
             
                {text: 'OK', onPress: () =>  {console.log("ok")}},
                ], 
                { cancelable: false }
                )
        }

      
    }

    onMinusHandler = () =>{ 

        if(this.props.quantity > 0){
            this.props.onLoading(true);
            let quantityBefUpdation = this.props.quantity;
            let prop_product_id = this.props.product_id;
            this.props.onRemove(this.props.product_id,this.props.user.userdata.user_id,this.props.price)
                .then(response => {

                    if(response ==  1){
                        console.log("fr c",this.props.from_cart);
                       
                        if(this.props.from_cart == 1){
                            let quantity = quantityBefUpdation - 1;
                            
                            console.log("hfdvfhdfhbhfh before",quantityBefUpdation)
                            console.log("hfdvfhdfhbhfh product_id",prop_product_id);
                            if(quantity >= 0)
                                this.props.updateProductQuantity(prop_product_id,quantity);
                        }else{
                            let quantity = this.props.quantity ;
                            quantity = quantity - 1;
                            console.log("fr c q",quantity);
                            if(quantity >= 0)
                                this.props.updateProductQuantity(this.props.product_id,quantity);
                        }
                       
                    }
                })
                .catch(error=>{
                    
                })
            
        }
      
       
    }

    render(){
        return(

            <View style={styles.container}>

                <TouchableOpacity 
                onPress={()=>this.onMinusHandler()} 
                >
                    <View style={styles.viewButton1}>
                        <Image source={require('../../Assets/minus.png')} style={styles.imageStyle}/>
                    </View>
                </TouchableOpacity>
                <View style={styles.viewText}>
                    <Text style={{alignSelf:"center",fontSize:12,fontWeight:"bold"}}> {this.props.quantity} </Text>  
                </View>
                <TouchableOpacity
                  onPress={()=>this.onPlusHandler()}>
                    <View style={styles.viewButton2}>
                        <Image source={require('../../Assets/plus.png')} style={styles.imageStyle} />
                    </View>
                </TouchableOpacity>

            </View>

        )
    }



}

const mapStateToProps  = state => {
    return {
        cart:state.cart,
        user:state.userdata
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onAdd: (product_id,price,user_id,product_cat_id) => {
            return new Promise ((resolve,reject) =>{
                dispatch(cartActions.addToCart(product_id,price,user_id,product_cat_id))
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

export default connect(mapStateToProps,mapDispatchToProps)(IncrementDecrementButton);

const styles =  StyleSheet.create({

    container:{
       
        flexDirection:"row",
        alignSelf:"flex-end",
        alignItems:"flex-end",
        marginTop:5

    },
    viewButton1:{
        backgroundColor:"grey",
        padding:6.3,
        width:'auto',
        height:'auto',
       
        borderTopLeftRadius:2,
        borderBottomLeftRadius:2
    },
    viewButton2:{
        backgroundColor:"grey",
        padding:6.3,
        width:'auto',
        height:'auto',
        minWidth:22,
        borderTopRightRadius:2,
        borderBottomRightRadius:2
    },
    viewText:{
        fontFamily:"Roboto-Light",
        backgroundColor:'white',
        width:'auto',
        minWidth:2.5,
        padding:2.2,
        borderColor:"grey",
        borderWidth:1
    },
    imageStyle:{
        width:10,
        height:10,
        alignSelf:"center"
    }
    




});