import React ,{Component} from 'react';
import {View,Text,FlatList,TouchableOpacity,Alert,StyleSheet,Dimensions,Platform,Image,ActivityIndicator} from 'react-native';
import * as userAction   from '../redux/store/actions/userDataAction';
import {connect} from 'react-redux';
import { CheckBox } from 'react-native-elements';
import capitilize from '../utility/helpers';
import Axios from 'axios';
import ApiUrl from '../Api/ApiUrl';
import * as HOC from '../HOC/mainHoc';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);


class SelectAddress extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Select Address",
        headerStyle: { backgroundColor: '#FD8D45' },
        headerTitleStyle: { color: 'white' ,fontSize:17,flex:1 },
        headerTintColor: 'white', 
        headerLeft:(
          <TouchableOpacity
            onPress={()=>{navigation.pop()}}
          >
            {Platform.OS === 'android' 
            ?
            <View style={{flexDirection:"row"}}>
                <Image source={require('../Assets/arrow_left.png')} style={{marginLeft:20}} />
               
            </View>
           
            :
            <View style={{flexDirection:"row"}}>
               <Image source={require('../Assets/back_white_ios.png')} style={{marginLeft:20}} />
                <Text style={{color:"white"}}>Back</Text>
            </View>
           
            }
           
          </TouchableOpacity>
         
      )
      });

    constructor(props){
        super(props);
        this.state = {

           loading:false,
        }
    }

    renderItem = (data) =>{
        let { item, index } = data;
       
        return(
  
          <View>
            <View style={styles.addressHeadingView}>
               
                {/* <Text onPress={()=>this.onEditAddresshandler()}
                style={styles.editTextStyle}>Edit</Text> */}
                
            <CheckBox
               checkedIcon='dot-circle-o'
               uncheckedIcon='circle-o'
               onPress={() => {this.setPrimary(item.id)}}
               checked={item.primary_status === 0 ? false : true}/>
            <Text style={{fontWeight:'bold',width:'80%',lineHeight:15,justifyContent:"center"}}>{capitilize(item.homeaddress)}</Text>
                
            </View>
  
            <View style={styles.viewLineBlack}></View>
          </View>
          
  
  
        );
  
      }

      setPrimary = (address_id) => {

        this.setState({loading:true})

        let formdata =  new FormData();
        formdata.append("user_id",this.props.user.userdata.user_id);
        formdata.append("address_id",address_id);
        console.log("formadata",formdata);
        Axios.post(ApiUrl.baseurl+ApiUrl.set_user_primary_address,formdata)
            .then(response => {
               
                this.setState({loading:false})

                if(!response.data.status){

                   this.props.onNewPrimaryAddress(response.data.homeaddress);
                   this.props.onChangePrimaryStatus(address_id);
                   this.props.cancelCallback();
                    Alert.alert(
                        'Primary Address',
                        'Primary Address Updated Successfully!',
                        [
                     
                        {text: 'OK', onPress: () => console.log("ok")},
                        
                        ], 
                        { cancelable: false }
                        )
                }else{

                    Alert.alert(
                        'Error',
                        'Check Your Internet connection and again later!',
                        [
                     
                        {text: 'OK', onPress: () => console.log("ok")},
                        
                        ], 
                        { cancelable: false }
                        )
                }


            }).catch(error => {
                console.log("response data",error);
                this.setState({loading:false})



            })
      }


    render(){
        return(
         
            <FullSCreenSpinnerAndDismissKeyboardView
            cancelCallback={()=>{console.log("hello");this.setState({viewAddressModal:false})}}>
                <View style={styles.mainContainer}>
               
                    <View style={{flexDirection:'row',justifyContent:"space-between",margin:10}}>
                        <Text style={styles.manageAddressText}>Select Address</Text>
                        <TouchableOpacity onPress={()=> { this.props.navigation.navigate('SearchLocation',{"location_update":1});}}>
                            <Text style={styles.addAddreesText}>Add New</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList  
                    data={this.props.user.all_address}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderItem.bind(this)}
                    style={{marginBottom:20}}/>

                    {this.state.loading 
                    ?
                    <View
                        style={[
                        StyleSheet.absoluteFill,
                        { backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }
                        ]}
                        >
                        <ActivityIndicator size="large" />
                    </View>

                    :
                    <View/>}


                </View>
            </FullSCreenSpinnerAndDismissKeyboardView>
           
        )
    }
}


const mapStateToProps = state => {
    return {
      user: state.userdata,
    
    }
  }


  const mapDisptchToProps = dispatch => {

    return{
      onNewPrimaryAddress: (newAddress)=>{
        dispatch(userAction.userAddress(newAddress))
      },

      onChangePrimaryStatus: (address_id) => {
          dispatch(userAction.changePrimaryStatus(address_id))
      }
      
    }
  }

  
export default connect(mapStateToProps,mapDisptchToProps)(SelectAddress)

const styles = StyleSheet.create({

    mainContainer:{
       
        justifyContent:"center",
        backgroundColor:"white",
        borderRadius:5
    },
    addressHeadingView:{

        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:10,
        alignItems:"center"

    
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
          fontFamily:"Philosopher-Bold",
          fontSize:14,
          textAlign:"center",
      },
      viewLineBlack:{
        width:'100%',
        height:1,
        backgroundColor:"#ececec",
        marginTop:5
      },
      manageAddressText:{
        fontFamily:"Roboto-Light",
        lineHeight:30,
        fontSize:14,
        color:"black",
        fontWeight:"bold",
        
    
      },
      addAddreesText:{
        fontFamily:"Roboto-Light",
        lineHeight:20,
        textDecorationLine:"underline",
        fontSize:12,
        color:"#FD8D45",
        fontWeight:"bold",
        
      },

})