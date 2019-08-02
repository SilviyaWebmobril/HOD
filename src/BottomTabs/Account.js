import React , { Component } from 'react';
import {View, Text,TouchableOpacity,StyleSheet,Image,ScrollView } from 'react-native';



export default class Account extends Component {

   
    render(){
        return(

            <View style={styles.container}>
                 <View  style={styles.headerView}>
                    <Text style={styles.textStyle}>Account</Text>
                </View>
                <ScrollView >
                    <View style={{ alignItems:"center",justifyContent:"center"}}>   
                        <TouchableOpacity
                            style={{alignContent:"flex-start",width:"100%"}}
                            >
                            <View style={styles.buttonView}>
                                <Image source={require('../../Assets/user1.png')} style={{width:30,height:30,marginRight:10,alignSelf:"flex-start"}} />
                                <Text style={styles.btnTextStyle}>Profile</Text>
                            </View>

                        </TouchableOpacity>
                        <View style={styles.viewLineBlack}></View>
                        <TouchableOpacity
                            style={{alignContent:"flex-start",width:"100%"}}
                            >
                            <View style={styles.buttonView}>
                                <Image source={require('../../Assets/transaction.png')} style={{width:30,height:30,marginRight:10,alignSelf:"flex-start"}} />
                                <Text style={styles.btnTextStyle}>Transaction History</Text>
                            </View>

                        </TouchableOpacity>
                        <View style={styles.viewLineBlack}></View>
                        <TouchableOpacity
                            style={{alignContent:"flex-start",width:"100%"}}
                            >
                            <View style={styles.buttonView}>
                                <Image source={require('../../Assets/code.png')} style={{width:30,height:30,marginRight:10,alignSelf:"flex-start"}} />
                                <Text style={styles.btnTextStyle}>Refferal Code</Text>
                            </View>

                        </TouchableOpacity>
                        <View style={styles.viewLineBlack}></View>
                        <TouchableOpacity
                            style={{alignContent:"flex-start",width:"100%"}}
                            >
                            <View style={styles.buttonView}>
                                <Image source={require('../../Assets/support.png')} style={{width:30,height:30,marginRight:10,alignSelf:"flex-start"}} />
                                <Text style={styles.btnTextStyle}>Support</Text>
                            </View>

                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            style={{alignContent:"flex-start",width:"100%"}}
                            >
                            <View style={styles.buttonView}>
                                <Image source={require('../../Assets/fav.png')} style={{width:30,height:30,marginRight:10,alignSelf:"flex-start"}} />
                                <Text style={styles.btnTextStyle}>About Us</Text>
                            </View>

                        </TouchableOpacity>
                        <View style={styles.viewLineBlack}></View>
                        <TouchableOpacity
                            style={{alignContent:"flex-start",width:"100%"}}
                            >
                            <View style={styles.buttonView}>
                                <Image source={require('../../Assets/privacy.png')} style={{width:30,height:30,marginRight:10,alignSelf:"flex-start"}} />
                                <Text style={styles.btnTextStyle}>Privacy Policy</Text>
                            </View>

                        </TouchableOpacity>
                        <View style={styles.viewLineBlack}></View>
                        <TouchableOpacity
                            style={{alignContent:"flex-start",width:"100%"}}
                            >
                            <View style={styles.buttonView}>
                                <Image source={require('../../Assets/signout.png')} style={{width:30,height:30,marginRight:10,alignSelf:"flex-start"}} />
                                <Text style={styles.btnTextStyle}>Sign Out</Text>
                            </View>

                        </TouchableOpacity>
                        <View style={styles.viewLineBlack}></View>
                    
                    </View>
                </ScrollView>
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
        height:60,
        width:"100%",
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        alignContent:"center",
        justifyContent:"center"

    },
    textStyle:{
        fontSize:20,
        fontWeight:"bold",
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
        fontWeight:"bold",
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