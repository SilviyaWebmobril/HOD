import React ,{Component}  from 'react';
import {View ,Text,StyleSheet,Image} from   'react-native';
import SearchLocationStyle from '../SearchLocation/SearchLocationStyle';
import {connect} from 'react-redux';
import  capitilize  from '../utility/helpers';
import Cartbadge from '../CustomUI/Cart/Cartbadge';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { withNavigation } from 'react-navigation';



class CustomTopHeader extends  Component {

    constructor(props){
        super(props);
    }
   
    componentDidMount(){
        console.log("address",this.props.userdata);
    }   

    SearchLocation = () =>{

        this.props.navigation.navigate('SearchLocation',{"location_update":0});
    }

    shouldComponentUpdate(nextProps,prevProps){

        console.log("shouldComponentUpdate customTopHeader",nextProps);
        return true;
    }
   

    render(){

        return(

            <View style={styles.container}>
                <View style={styles.deliveryLocationSection}>
                    <View style={{alignItems:"flex-start", flexDirection:"row",}}>
                        <Image style={{width:25,height:25}}  source={require('../../Assets/location1.png')} />
                        <Text style={styles.textStyle}>Delivery Location</Text>
                        <TouchableOpacity
                        onPress={()=>{this.SearchLocation()}}>
                            <Image style={{width:15,height:15,marginLeft:10,marginTop:8}}  source={require('../../Assets/pencil.png')} />
                        </TouchableOpacity>
                    </View>
                    <View  style={{ flexDirection:"row",position: 'absolute', right: 0}}>
                        <Image style={{width:25,height:25,marginRight:10}} source={require('../../Assets/order.png')} />
                        <Cartbadge img= {0} count={this.props.cart_count.total_cart_count}/>
                    </View>
                </View>
                <View style={styles.locationView}>
                    <Text style={styles.locationTextStyle}numberOfLines = { 2} >
                     { this.props.address != null ?

                         capitilize(this.props.address)
                         :
                         ""
                         }
                    </Text>
                    
                    <Image style={{width:'60%',height:20,marginTop:10,marginBottom:0}} source={require('../../Assets/curve.png')} />
                    <View style={styles.viewLineBlack}></View>
                </View>
              
            </View>

        );
    }
}


const mapStateToProps = state => {
    return {
      userdata: state.userdata,
      cart_count:state.cart
    }
  }
  export default connect(mapStateToProps,null)(withNavigation(CustomTopHeader))
  
  
  

const styles =  StyleSheet.create({

    container:{
       height:90,
       marginLeft:20,
       marginRight:20,
       marginTop:20
      
       
    },
    deliveryLocationSection:{

        flexDirection:"row",
      
    },
    textStyle:{
        fontSize:17,
        marginTop:4,
    },
    locationView:{
        flexDirection:"column"
    },
    locationTextStyle:{
        fontSize:14,
        fontWeight:"bold",
        lineHeight:20,
        marginTop:7
    },
    viewLineBlack:{
        width:'100%',
        height:1,
        backgroundColor:"#9F9F9F",
        marginTop:8,
        marginBottom:10
    }


});
