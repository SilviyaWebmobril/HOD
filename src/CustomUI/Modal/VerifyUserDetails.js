import  React ,{Component} from 'react';
import {View ,Text, StyleSheet,Dimensions,TouchableOpacity,Image,Animated,ScrollView} from 'react-native';
import { Card } from 'react-native-elements';
import CustomButton from '../CustomButton/CustomButton';
import CustomLogo from '../../CustomUI/Logo/CustomLogo';
import { connect } from 'react-redux';


class VerifyUserDetails extends Component {

    state= {
        ready: false,
        animatedValue: new Animated.Value(0)
    }

    componentDidMount() {
        this._start();
    }




    _start = () => {
        Animated.timing(this.state.animatedValue, {
          toValue: 1,
        duration: 500,
        useNativeDriver: true
        }).start();
      };


    render() {
        return(
           
            <Animated.View
            style={{
              transform: [
                {
                  translateY: this.state.animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [600, 0]
                  })
                }
              ]}} >
            <View style={styles.mainContainer}>
                <View style={styles.headerStyle}>
                    <Text  style={styles.headerTextStyle}>Verify Details</Text>
                    <TouchableOpacity onPress={()=>{this.props.cancelCallback()}}>
                        <Image source={require('../../Assets/cancel.png')}  />
                    </TouchableOpacity>
                </View>
                <ScrollView>

                <View  style={styles.sectionRow}>

                    <CustomLogo customLogoStyle={{height:100,marginBottom:60}}/>

                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.labelHeaderText}>Name : </Text> 
                        <Text style={styles.labelText}>{this.props.user.userdata.user_name}</Text> 
                    </View>
                    <View style={styles.viewLineBlack}></View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.labelHeaderText}>Mobile : </Text> 
                        <Text style={styles.labelText}>{this.props.user.userdata.user_mobile}</Text> 
                    </View>
                    <View style={styles.viewLineBlack}></View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.labelHeaderText}>Email : </Text> 
                        <Text style={styles.labelText}>{this.props.user.userdata.user_email}</Text> 
                    </View>
                    <View style={styles.viewLineBlack}></View>
                    <View style={{flexDirection:'column'}}>
                        <Text style={styles.labelHeaderText}>Address : <Text style={{fontFamily:'roboto-bold',lineHeight:20}}>{this.props.user.user_address}</Text></Text> 
                        
                        <CustomButton 
                          onPressHandler={()=>{this.props.changeAddressCallback()}}
                        customButttonStyle={{padding:3, height:35,marginTop:10,textAlign:"right",alignSelf:"flex-end",width:"auto",padding:10}}
                        customTextStyle={{ color:'white',fontSize:12}}
                        text="Change"  />
                    </View>
                    
                    <View style={styles.viewLineBlack}></View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.labelHeaderText}>Amount To Pay : </Text>
                        <Text style={styles.labelPriceText}>{'\u20B9'} {this.props.cart_products.get_once_cart_sum }</Text>
                    </View>
                    <View style={{flexDirection:'column'}}>
                        
                        <CustomButton 
                        onPressHandler={()=>{this.props.verifyConfirmDetailsToCheckout()}}
                        customButttonStyle={{marginTop:20}}
                        customTextStyle={{ color:'white',fontSize:17}}
                        text="Confirm"  />
                    </View>








                    </View>

                </ScrollView>
                
            </View>
            </Animated.View>
         
        )
    }


}

mapStateToProps = state=> {

    return {
        user: state.userdata,
        cart_products : state.cart
    }

}

export default connect(mapStateToProps,null)(VerifyUserDetails);

const styles = StyleSheet.create({
    mainContainer:{
        width:Dimensions.get('window').width * 0.8,
        height:null,
        elevation:5,
        backgroundColor:"white",
        borderRadius:5
    },
    headerStyle:{
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
        backgroundColor:"grey",
        height:40,
        flexDirection:"row",
        justifyContent:"space-between",
        paddingLeft:10,
        paddingRight:10,
        alignItems:"center"
    },
    headerTextStyle:{
        color:"white",
        textAlign:"center",
        fontFamily:"roboto-bold",
        fontSize:14,
        textAlign:"center",
    },
    viewLineBlack:{
      width:'100%',
      height:1,
      backgroundColor:"#ececec",
      marginTop:5,
      marginBottom:5
    },
    sectionRow:{
        
        marginTop:20,
        marginLeft:10,
        marginRight:10,
        marginBottom:20
    },
    labelHeaderText:{
        fontFamily:'roboto-bold',
        fontSize:14,
    },
    labelText:{
        fontFamily:'roboto-light',
        fontSize:14,
    },
    labelPriceText :{
        fontFamily:'roboto-bold',
        fontSize:14,
        color:"#FD8D45",
    }



});