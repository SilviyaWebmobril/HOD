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
        headerTitleStyle: { color: 'white' ,fontSize:17,flex:1 ,textAlign:"center"},
        headerTintColor: 'white', 
        headerTitleContainerStyle: {
          left: 0, // THIS RIGHT HERE
        },
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
            <Text style={{fontFamily:'roboto-medium',flex:2.5,marginRight:10,lineHeight:15,justifyContent:"center"}}>{capitilize(item.homeaddress)}</Text>
            {item.primary_status === 0 ? 

            <Text onPress={()=>this.onRemoveAddresshandler(item.id)}
                style={styles.editTextStyle}>Remove</Text>
           
            :
            <View/>
            }
          </View>
            <View style={styles.viewLineBlack}></View>
          </View>
          
  
  
        );
  
      }

      onRemoveAddresshandler = (id) =>{

        Alert.alert(
          'Remove Address',
          "Are you sure you want to remove this address ?",
          [
       
          {text: 'OK', onPress: () =>  {this.removeAdd(id)}},
          {text: 'CANCEL', onPress: () =>  {console.log("ok")}},
          ], 
          { cancelable: false }
          );
  
        
      }

      removeAdd(id){

        this.setState({loading:true})
        Axios.post(ApiUrl.baseurl+ApiUrl.remove_address+id)
        .then(response => {
         this.setState({loading:false})
          console.log("removing address view profile",response);
          if(response.data.error){
  
            Alert.alert(
              'Remove Address',
              "Cannot Remove Primary Address!",
              [
           
              {text: 'OK', onPress: () =>  {console.log("ok")}},
              ], 
              { cancelable: false }
              )
          
          }else{
            Alert.alert(
              'Remove Address',
              "Address Removed Successfully!",
              [
           
              {text: 'OK', onPress: () =>  {console.log("ok")}},
              ], 
              { cancelable: false }
              );
  
            this.props.onRemoveAddress(id);
           
          
          }
  
        }).catch(error=>{
          this.props.onLoading(false);
        })
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
            refreshing={false}
            spinner={this.state.loading}
           >
                <View style={styles.mainContainer}>
               
                    <View style={{flexDirection:'row',justifyContent:"space-between",margin:10}}>
                        <Text style={styles.manageAddressText}>Select Address</Text>
                        <TouchableOpacity onPress={()=> { this.props.navigation.navigate('SearchLocation',{"location_update":1,"view_profile":0});}}>
                            <Text style={styles.addAddreesText}>Add New</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList  
                    data={this.props.user.all_address}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderItem.bind(this)}
                    style={{marginBottom:20}}/>

                    {/* {this.state.loading 
                    ?
                    <View
                        style={[
                        StyleSheet.absoluteFill,
                        { backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }
                        ]}
                        >
                        <ActivityIndicator size="large" color="#48241e" />
                    </View>

                    :
                    <View/>} */}


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
     
      onRemoveAddress: (id)=>{
        dispatch(userAction.removeAddress(id))
      },

      onChangePrimaryStatus: (address_id) => {
          dispatch(userAction.changePrimaryStatus(address_id))
      },
     
      
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
          fontFamily:'roboto-bold',
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
        fontFamily:'roboto-light',
        lineHeight:30,
        fontSize:14,
        color:"black",
        fontWeight:"bold",
        
    
      },
      addAddreesText:{
        fontFamily:'roboto-light',
        lineHeight:20,
        textDecorationLine:"underline",
        fontSize:12,
        color:"#FD8D45",
        fontWeight:"bold",
        
      },
      editTextStyle:{
        fontFamily:'roboto-light',
        color:"#FD8D45",
        alignSelf:'flex-end',
        flex:0.7,
        textDecorationLine:"underline"
      },

})