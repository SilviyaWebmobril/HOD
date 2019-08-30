import React,{Component} from 'react';
import {View ,Text,StyleSheet,TouchableOpacity,Image}  from 'react-native';
import {connect} from 'react-redux';

class IncrementDecrementButton extends Component {

    constructor(props){
        super(props);

        this.state = {
            quantity:1,
            disableMinus:true
        }
    }

    onPlusHandler = () =>{

        if(this.state.disableMinus){
            this.setState({disableMinus:false})
        }
        this.setState(prevState => ({
            quantity :prevState.quantity + 1 
        }),()=>{

        });
    }

    onMinusHandler = () =>{ 

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

export default IncrementDecrementButton;

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