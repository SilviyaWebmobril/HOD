import React , { Component } from 'react';
import {View, Text,TouchableOpacity,StyleSheet,Image,ActivityIndicator,ScrollView ,Platform ,Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {ADD_USER_DATA} from '../redux/store/actions/types';
import * as CartAction from '../redux/store/actions/cartAction';
import Axios from 'axios';
import ApiUrl from '../Api/ApiUrl';


class Account extends Component {


    constructor(props){
        super(props);
        this.state = {
            isLoading:false
        }
    }


    onLogoutHandler = async () => {

        Alert.alert(
            'Logout',
            'Are you sure you want to Logout!',
            [
         
            {text: 'OK', onPress: () => {this.onlogout()}},
            {text: 'Cancel', onPress: () => {console.log("ok")}},
            ], 
            { cancelable: false }
        )
       
      
      }

      onlogout =  () => {

        this.setState({isLoading:true});
        console.log("id",this.props.userdata.userdata.user_id);
        var  formdata = new FormData();
        formdata.append("user_id",this.props.userdata.userdata.user_id)
        Axios.post(ApiUrl.baseurl +  ApiUrl.logout,formdata)
        .then(response => {
            console.log("response logout ", response);
           this.removeData();

        }).catch(error => {
            
            Alert.alert(
                'Error',
                'Check Your Network Connection and Try Again Later!',
                [
             
                {text: 'OK', onPress: () => {console.log("ok")}},
                ], 
                { cancelable: false }
                )
        });

       
      }
 
    removeData = async()=>{
        this.setState({isLoading:false});
        const keys = ['user_id', 'user_name','user_email','user_mobile','user_password','user_home']
        try {
        await AsyncStorage.multiRemove(keys)
        this.props.navigation.navigate('MyApp');
        } catch(e) {
        // remove error

        }
        var userdata = [];

        this.props.onUpdateUser(userdata);
        this.props.deleteCart();
    }

      viewProfile = () =>{

        this.props.navigation.navigate('ViewProfile');
      }
      
      transactionHistory = () =>{
          this.props.navigation.navigate("TransactionHistory");
      }

      onSupportHandler = () =>{

        this.props.navigation.navigate("Support");
      }   
      onAboutUsHandler = () =>{

        this.props.navigation.navigate("AboutUs");

      }

      onPrivacyPolicyHandler = () =>{
          this.props.navigation.navigate("PrivacyPolicy");
      }


    render(){
        return(

            <View style={styles.container}>
                 <View  style={styles.headerView}>
                    <Text style={styles.headertextStyle}>Account</Text>
                </View>
                <ScrollView >
                    <View style={{ alignItems:"center",justifyContent:"center"}}>   
                        <TouchableOpacity
                            style={{alignContent:"flex-start",width:"100%"}}
                            onPress={()=> this.viewProfile()}
                            >
                            <View style={styles.buttonView}>
                                <Image source={require('../Assets/user1.png')} style={{width:30,height:30,marginRight:10,alignSelf:"flex-start"}} />
                                <Text style={styles.btnTextStyle}>Profile</Text>
                            </View>

                        </TouchableOpacity>

                        <View style={styles.viewLineBlack}></View>
                        <TouchableOpacity
                        onPress={()=>this.transactionHistory()}
                            style={{alignContent:"flex-start",width:"100%"}}
                            >
                            <View style={styles.buttonView}>
                                <Image source={require('../Assets/transaction.png')} style={{width:30,height:30,marginRight:10,alignSelf:"flex-start"}} />
                                <Text style={styles.btnTextStyle}>Transaction History</Text>
                            </View>

                        </TouchableOpacity>
                        <View style={styles.viewLineBlack}></View>
                        <TouchableOpacity
                            style={{alignContent:"flex-start",width:"100%"}}
                            >
                            <View style={styles.buttonView}>
                                <Image source={require('../Assets/code.png')} style={{width:30,height:30,marginRight:10,alignSelf:"flex-start"}} />
                                <Text style={styles.btnTextStyle}>Refferal Code</Text>
                            </View>

                        </TouchableOpacity>
                        <View style={styles.viewLineBlack}></View>
                        <TouchableOpacity
                            style={{alignContent:"flex-start",width:"100%"}}
                            onPress={()=>this.onSupportHandler()}
                            >
                            <View style={styles.buttonView}>
                                <Image source={require('../Assets/support.png')} style={{width:30,height:30,marginRight:10,alignSelf:"flex-start"}} />
                                <Text style={styles.btnTextStyle}>Support</Text>
                            </View>

                        </TouchableOpacity>
                        <View style={styles.viewLineBlack}></View>
                        <TouchableOpacity
                        onPress={()=>{this.onAboutUsHandler()}}
                            style={{alignContent:"flex-start",width:"100%"}}
                            >
                            <View style={styles.buttonView}>
                                <Image source={require('../Assets/fav.png')} style={{width:30,height:30,marginRight:10,alignSelf:"flex-start"}} />
                                <Text style={styles.btnTextStyle}>About Us</Text>
                            </View>

                        </TouchableOpacity>
                        <View style={styles.viewLineBlack}></View>
                        <TouchableOpacity
                        onPress={()=>{this.onPrivacyPolicyHandler()}}
                            style={{alignContent:"flex-start",width:"100%"}}
                            >
                            <View style={styles.buttonView}>
                                <Image source={require('../Assets/privacy.png')} style={{width:30,height:30,marginRight:10,alignSelf:"flex-start"}} />
                                <Text style={styles.btnTextStyle}>Privacy Policy</Text>
                            </View>

                        </TouchableOpacity>
                        <View style={styles.viewLineBlack}></View>
                        <TouchableOpacity
                            onPress={()=>this.onLogoutHandler()}
                            style={{alignContent:"flex-start",width:"100%"}}
                            >
                            <View style={styles.buttonView}>
                                <Image source={require('../Assets/signout.png')} style={{width:30,height:30,marginRight:10,alignSelf:"flex-start"}} />
                                <Text style={styles.btnTextStyle}>Sign Out</Text>
                            </View>

                        </TouchableOpacity>
                        <View style={styles.viewLineBlack}></View>
                    
                    </View>
                    
                </ScrollView>
                {this.state.isLoading &&
                    <View
                    style={[
                        StyleSheet.absoluteFill,
                        { backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center',flex:1 }
                    ]}
                    >
                    <ActivityIndicator size="large" />
                    </View>}

            </View>

        );
    }

}


const styles =  StyleSheet.create({
   
    container:{
        flex:1,
        backgroundColor:'#fff',
       
    },
    headerView:{
        backgroundColor:"#FD8D45",
        paddingTop:Platform.OS == 'android' ? 0 : 40,
        height:Platform.OS == 'android' ? 60 : 80,
        width:"100%",
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        alignContent:"center",
        justifyContent:"center"

    },
    headertextStyle:{
        fontFamily:'roboto-bold',
        fontSize:20,
        color:"white",
        alignSelf:"center",
        textAlign:"center",   
    },
    textStyle:{
        fontFamily:'roboto-bold',
        fontSize:20,
        color:"white",
        alignSelf:"center",
        textAlign:"center",
    },
    buttonView:{
        width:"100%",
        padding:20,
        flexDirection:"row",
        alignContent:"flex-start",
        alignItems:"flex-start",
        justifyContent:"flex-start",
       
        
    },
    btnTextStyle:{
        fontFamily:'roboto-bold',
        //fontWeight:"bold",
        color:"grey",
        fontSize:17
    },
    viewLineBlack:{
        width:'100%',
        height:1,
        backgroundColor:"#ececec",
        marginBottom:2,
       
        
    },

});




const mapStateToProps = (state) => {
    return {
      userdata: state.userdata
    }
  }



const mapDispatchToProps = dispatch => {
    return {
      onUpdateUser: (userdata) => {
        dispatch({
            type:ADD_USER_DATA,
            payload:userdata,
        })
      },
      deleteCart:()=>{
          dispatch(CartAction.deleteCart());
      }
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Account)
  
  
  