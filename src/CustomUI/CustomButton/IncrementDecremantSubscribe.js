import React,{Component} from 'react';
import {View ,Text,StyleSheet,TouchableOpacity,Image}  from 'react-native';
import {connect} from 'react-redux';
import * as cartActions from '../../redux/store/actions/cartAction';

class IncrementDecrementSubscribe extends Component {

    constructor(props){
        super(props);

       
        this.state = {
            quantity:this.props.quantity,
            disableMinus:true,
            user_id:this.props.user.userdata.user_id,
            price:this.props.price,
            product_id:this.props.product_id,
        }
    }

    componentDidMount(){
     
      console.log("prod id",this.state.product_id);
      console.log("price =",this.props.price);
      console.log("quantity==",this.state.quantity);

    }
   
    onPlusHandler = () =>{

        this.props.onLoading(true);
        this.props.onAdd(this.state.product_id,this.state.price,this.props.user.userdata.user_id);
        if(this.state.disableMinus){
            this.setState({disableMinus:false})
        }
        this.setState(prevState => ({
            quantity :prevState.quantity + 1 
        }),()=>{

        });
    }

    onMinusHandler = () =>{ 

        this.props.onLoading(true);
        this.props.onRemove(this.props.data.id,this.props.user.userdata.user_id);

        if(this.state.quantity == 1){
            this.setState({disableMinus:true})
        }else{
           
            this.setState(prevState => ({
               
                quantity :prevState.quantity - 1 
            }),()=>{

            });

        }
    }

    render(){
        return(

            <View style={styles.container}>

                <TouchableOpacity 
                onPress={()=>this.onMinusHandler()} 
                disabled={this.state.disableMinus}>
                    <View style={styles.viewButton1}>
                        <Image source={require('../../../Assets/minus.png')} style={styles.imageStyle}/>
                    </View>
                </TouchableOpacity>
                <View style={styles.viewText}>
                    <Text style={{alignSelf:"center",fontSize:13,fontWeight:"bold"}}>{this.state.quantity}</Text>  
                </View>
                <TouchableOpacity
                  onPress={()=>this.onPlusHandler()}>
                    <View style={styles.viewButton2}>
                        <Image source={require('../../../Assets/plus.png')} style={styles.imageStyle} />
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
        padding:7,
        width:22,
        borderTopLeftRadius:2,
        borderBottomLeftRadius:2
    },
    viewButton2:{
        backgroundColor:"grey",
        padding:7,
        width:22,
        borderTopRightRadius:2,
        borderBottomRightRadius:2
    },
    viewText:{
        backgroundColor:'white',
        width:25,
        padding:2.0,
        borderColor:"grey",
        borderWidth:1
    },
    imageStyle:{
        width:10,
        height:10,
        alignSelf:"center"
    }
    




});