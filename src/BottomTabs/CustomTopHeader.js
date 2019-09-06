import React ,{Component}  from 'react';
import {View ,Text,StyleSheet,Image} from   'react-native';
import SearchLocationStyle from '../SearchLocation/SearchLocationStyle';
import {connect} from 'react-redux';
import  capitilize  from '../utility/helpers';



class CustomTopHeader extends  Component {

    componentDidMount () {

      console.log("my address",this.props.userdata);
      //  console.log("custom",  capitilize(this.props.userdata.user_address));
    }


    render(){

        return(

            <View style={styles.container}>
                <View style={styles.deliveryLocationSection}>
                    <View style={{alignItems:"flex-start", flexDirection:"row",}}>
                        <Image style={{width:30,height:30}}  source={require('../../Assets/location1.png')} />
                        <Text style={styles.textStyle}>Delivery Location</Text>
                        <Image style={{width:20,height:20,marginLeft:10,marginTop:8}}  source={require('../../Assets/pencil.png')} />
                    </View>
                    <View  style={{ flexDirection:"row",position: 'absolute', right: 0}}>
                        <Image style={{width:25,height:25,}} source={require('../../Assets/order.png')} />
                        <Image style={{width:30,height:30,marginLeft:10}} source={require('../../Assets/cart.png')} />
                    </View>
                </View>
                <View style={styles.locationView}>
                    <Text style={styles.locationTextStyle}>
                     {this.props.userdata.user_address}
                    </Text>
                    <Text style={styles.locationTextStyle}>Sector 63, Noida</Text>
                    <Image style={{width:'60%',height:20,marginTop:10,marginBottom:0}} source={require('../../Assets/curve.png')} />
                    <View style={styles.viewLineBlack}></View>
                </View>
              
            </View>

        );
    }
}


const mapStateToProps = state => {
    return {
      userdata: state.userdata.userdata
    }
  }
  export default connect(mapStateToProps,null)(CustomTopHeader)
  
  
  

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
        fontSize:17,
        fontWeight:"bold",
        lineHeight:20,
        marginTop:5
    },
    viewLineBlack:{
        width:'100%',
        height:1,
        backgroundColor:"#9F9F9F",
        marginTop:8,
        marginBottom:10
    }


});
