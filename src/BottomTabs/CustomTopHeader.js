import React ,{Component}  from 'react';
import {View ,Text,StyleSheet,Image,Platform} from   'react-native';
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
      
    }   

    SearchLocation = () =>{

        //this.props.navigation.navigate('Search',{"location_update":1});
        this.props.navigation.navigate('SelectAddress');
    }

   

    render(){

        console.log("cart total count",this.props.cart_count.total_cart_count);

        return(

            <View style={styles.container}>
                <View style={styles.deliveryLocationSection}>
                    <View style={{alignItems:"flex-start", flexDirection:"row",flex:1}}>
                        <Image style={{width:25,height:25}}  source={require('../Assets/location1.png')} />
                        <Text style={styles.textStyle}>Delivery Location</Text>
                        <TouchableOpacity
                        onPress={()=>{this.SearchLocation()}}>
                            <Image style={{width:15,height:15,marginLeft:10,marginTop:2}}  source={require('../Assets/pencil2.png')} />
                        </TouchableOpacity>
                    </View>
                    <View  style={{ flexDirection:"row",justifyContent:'flex-end',flex:1}}>
                        <TouchableOpacity
                         onPress={()=>{this.props.navigation.navigate("TransactionHistory")}}>
                            <Image style={{width:25,height:25,marginRight:7}} source={require('../Assets/trans.png')} />
                        </TouchableOpacity> 
                       
                        <Cartbadge img= {0} count={this.props.cart_count.total_cart_count} nav={this.props.navigation}/>
                    </View>
                </View>
                <View style={styles.locationView}>
                    <Text style={styles.locationTextStyle}numberOfLines = {1} >
                     { this.props.address != null ?

                         capitilize(this.props.address)
                         :
                         ""
                         }
                    </Text>
                    
                    <Image style={{width:'100%',height:15,marginTop:10,marginBottom:0,}} source={require('../Assets/curve_new.png')} />
                    {/* <View style={styles.viewLineBlack}></View> */}
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
       marginTop:Platform.OS == 'android' ? 20 :40
      
       
    },
    deliveryLocationSection:{

        flexDirection:"row",
        
      
    },
    textStyle:{
        fontFamily:"roboto-light",
        fontSize:18,
       
    },
    locationView:{
        flexDirection:"column"
    },
    locationTextStyle:{
        fontFamily:"roboto-medium",
        fontSize:14,
        lineHeight:20,
        marginTop:7
    },
    viewLineBlack:{
        width:'100%',
        height:1,
        backgroundColor:"#9F9F9F",
        marginTop:2,
        marginBottom:0
    }


});
