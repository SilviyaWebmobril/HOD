import React ,{Component} from 'react';
import {View,Text,StyleSheet, Image,TouchableOpacity,Dimensions} from 'react-native';
import Modal from 'react-native-modal';
const deviceWidth = Dimensions.get("window").width;
import * as cartActions from '../../redux/store/actions/cartAction';
import { connect } from 'react-redux';

class AlertModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            isVisible:this.props.alertVisible
        }
    }

    setVisible = () =>{
        this.props.onError("","")
        //this.setState({isVisible:!this.state.isVisible})
    }


    render(){
        return(
            <View style={{flex:1}}> 
                <Modal isVisible={this.state.isVisible}
                    deviceWidth={deviceWidth}
                    >
                    <View style={styles.child}>
                       
                        <View style={styles.titleView}>
                        
                            
                            <View style={styles.rowone}>
                                <Image source={require('../../Assets/logo1.png')}/>
                                <Text style={styles.title}>{this.props.cart.error_title}</Text>

                            </View >
                            <Text style={{fontSize:15}}>{this.props.cart.error_msg}</Text>

                        </View>
                

                        <View style={styles.rowthree}>
                            
                            <View style={{width:"100%"}}>
                                <TouchableOpacity
                                onPress={()=>{this.setVisible()}}
                                >
                                    <View style={styles.orangeButton}
                                    >   
                                        <Text style={{alignSelf:"center",fontWeight:"bold",color:'white',fontFamily:"Roboto-Light",}}>Confirm</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        
                          
                        </View>

                    </View>


                    
                
                </Modal>            

            </View>
           
        )
    }
}


const mapDispatchToProps = dispatch => {

    return {
        onError : (title,error)  => {
            dispatch(cartActions.onError(title,error))
        },
    }
}
const mapStateToProps = (state) =>{

    return{
        
        cart:state.cart
    }
    
}

export default connect(mapStateToProps,mapDispatchToProps)(AlertModal);


const styles = StyleSheet.create({

    greyButton:{
        backgroundColor:"#dcdcdc", marginTop:20,
        padding:10,
    },
    orangeButton:{
        backgroundColor:"#FD8D45", marginTop:20,
        padding:10
    },
    rowone:{
        flexDirection:"row"
    }, 
    rowtwo:{
        flexDirection:"row",
        justifyContent:"center"
    }, 
    rowthree:{
        flexDirection:"row",
        justifyContent:"space-between"
    }, 
    titleView: {
        paddingLeft: 25,
        paddingTop:10,
        paddingBottom:5  
        
      },
      titleDeliver:{
        fontFamily:"Roboto-Light",
        fontSize: 13,
        color: "#FD8D45",
        fontWeight:'bold',
      },
      title: {
        fontFamily:"Roboto-Light",
        fontSize: 15,
        color: "black",
        fontWeight:'bold',
       
      },
      textStyle: {
        fontSize: 14,
        color: "grey",
        fontWeight:'bold',
        marginTop:17,
      },
      child: {
        width: deviceWidth,
        backgroundColor:"white",
        alignSelf:"center",
        elevation:5
        
  
      },
      buttonViewSeleted:{
        backgroundColor:"#FD8D45",
        padding:7,
        borderColor:"grey",
        borderRadius:2
    },
    buttonView:{
        backgroundColor:"grey",
        padding:7,
        borderColor:"grey",
        borderRadius:2
    },


})