import React,{Component} from 'react';
import {View ,Text,StyleSheet,TouchableOpacity,Image}  from 'react-native';
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

    componentDidMount(){

       // this.setState({quantity:this.props.quantity});
       
    }

      
    componentDidUpdate(prevProps,prevState){

        if(prevProps.subscribed_quantity !== this.props.subscribed_quantity){

            this.setState({subscribed_quantity:this.props.subscribed_quantity});
        }
        if(prevProps.quantity !== this.props.quantity){

            console.log("on commponentDIDUODATE");
            this.setState({quantity:this.props.quantity })
        }

        if(prevProps.price !== this.props.price){

            this.setState({price:this.props.price});
        }

      
    }
    onPlusHandler = () =>{

        this.props.onLoading(true);
        this.props.onAdd(this.props.product_id,this.props.price,this.props.user.userdata.user_id);
       
        // this.setState(prevState => ({
        //     quantity :prevState.quantity + 1 
        // }),()=>{

        // });
    }

    onMinusHandler = () =>{ 

        // this.props.onLoading(true);
        // this.props.onRemove(this.props.product_id,this.props.user.userdata.user_id,this.props.price);


       

        if(this.props.quantity > 0){
            this.props.onLoading(true);
            this.props.onRemove(this.props.product_id,this.props.user.userdata.user_id,this.props.price);
            
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