import React ,{Component} from 'react';
import {View,Text,StyleSheet,Dimensions,FlatList,Image,Alert, ScrollView, Platform} from 'react-native';
import * as HOC from '../../../HOC/mainHoc';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
import CustomLogo  from '../../../CustomUI/Logo/CustomLogo';
import AsyncStorage from '@react-native-community/async-storage';
var { height } = Dimensions.get('window');
import * as userAction   from '../../../redux/store/actions/userDataAction';
import {connect} from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import capitilize from '../../../utility/helpers';
import Axios from 'axios';
import ApiUrl from '../../../Api/ApiUrl';
import * as cartActions from '../../../redux/store/actions/cartAction';


class ViewProfile  extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Profile",
    headerStyle: { backgroundColor: '#FD8D45' },
    headerTitleStyle: { color: 'white' },
    headerTintColor: 'white', 
    headerLeft:(
      <TouchableOpacity
        onPress={()=>{navigation.pop()}}
      >
        {Platform.OS === 'android' 
        ?
        <View style={{flexDirection:"row"}}>
            <Image source={require('../../../../Assets/arrow_left.png')} style={{marginLeft:20}} />
           
        </View>
       
        :
        <View style={{flexDirection:"row"}}>
           <Image source={require('../../../../Assets/back_white_ios.png')} style={{marginLeft:20}} />
            <Text style={{color:"white"}}>Back</Text>
        </View>
       
        }
       
      </TouchableOpacity>
     
  )
  });


    constructor(props){
        super(props); 
        this.state = {
          user_id:"",
            name:"",
            address:"",
            mobile:"",
            email:"",
            isLoading:true,
            addresses:[],
            viewAddressModal:false,
            isLoading:false,

        }
    }

   




    addNewAddresshandler = () =>{

      this.props.navigation.navigate('SearchLocation',{"location_update":2});
    }

    updateProfileHandler = () =>{
      this.props.navigation.navigate('UpdateProfile');
    }

    onEditMobile = ()=>{
      this.props.navigation.navigate('Login',{update:1});
    }

    onRemoveAddresshandler = (id) =>{

      this.props.onLoading(true);
      Axios.post(ApiUrl.baseurl+ApiUrl.remove_address+id)
      .then(response => {
        this.props.onLoading(false);
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

    renderItem = (data) =>{
      let { item, index } = data;
     
      return(

        <View>
          <View style={styles.addressHeadingView}>
              <Text style={{fontWeight:'bold',lineHeight:20,width:'70%'}}>{capitilize(item.homeaddress)}</Text>
              {/* <Text onPress={()=>this.onEditAddresshandler()}
              style={styles.editTextStyle}>Edit</Text> */}
                <Text onPress={()=>this.onRemoveAddresshandler(item.id)}
              style={styles.editTextStyle}>Remove</Text>
              
          </View>

          <View style={styles.viewLineBlack}></View>
        </View>
        


      );

    }



    render(){
        return (
            <FullSCreenSpinnerAndDismissKeyboardView
            spinner={this.props.cart.isLoading}
            refreshing={false}
            style={styles.container}
             >
                <View style={{marginRight:10,marginTop:10}}>
                    <Text onPress={()=>this.updateProfileHandler()}
                     style={styles.updateTextStyle}>UPDATE</Text>
                    <View style={styles.viewLineUpdate}></View>
                </View>
                <CustomLogo />

                <View style={styles.profileViewStyle}>
                  <Text style={styles.profileNameStyles}>{this.props.user.userdata.user_name}</Text>
                  <Text style={styles.profileEmailMobileStyles}>{this.props.user.userdata.user_email}</Text>
                  <View style={{flexDirection:"row",justifyContent:"center",alignContent:"center"}}>
                    <Text style={{ fontSize:17,lineHeight:30,}}>{this.props.user.userdata.user_mobile}</Text>
                    <Text onPress={()=>this.onEditMobile()} style={{marginLeft:15,lineHeight:30,textDecorationLine:"underline",fontWeight:"bold", fontSize:15,color:"#FD8D45",}}>EDIT</Text>
                  </View>
               
                  
                </View>

                <View style={styles.viewAddress}>
                  <View style={styles.addressHeadingView}>
                    <Text style={styles.manageAddressText}>Manage Address</Text>
                    
                    <View style={styles.viewAddressText}>
                      <Text onPress={()=>this.addNewAddresshandler()} style={styles.addAddreesText}>Add New</Text>
                      <View style={styles.viewLine}></View>
                    </View>
                  </View>
                 
                   
                  <FlatList 
                      data={this.props.user.all_address}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={this.renderItem.bind(this)}
                      style={{marginBottom:20}}/>



                </View>

                
            </FullSCreenSpinnerAndDismissKeyboardView>
            


        )
    }
}




const mapStateToProps = state => {
  return {
    user: state.userdata,
    cart:state.cart,
  }
}

const mapDisptchToProps = dispatch => {

  return{
    onRemoveAddress: (id)=>{
      dispatch(userAction.removeAddress(id))
    },
    onLoading : (value) => {
      dispatch(cartActions.isLoading(value))
  },
  }
}

export default connect(mapStateToProps,mapDisptchToProps)(ViewProfile)



const styles =  StyleSheet.create({

  
  container:{
    flex:1,
    backgroundColor:'#ffffff',
  //  margin:20

},

  profileViewStyle:{

    width:"100%",
    justifyContent:"center",
    alignItems:"center",
    alignSelf:"center"
  },

  profileNameStyles :{

    width:"90%",
    alignSelf:"center",
    lineHeight:30,
    fontSize:20,
    color:"black",
    fontWeight:"bold",
    alignItems:"center",
    justifyContent:"center",
    textAlign:"center"



  },
  profileEmailMobileStyles:{
    width:'90%',
    justifyContent:'center',
    fontSize:17,
    lineHeight:30,
    color:"grey",
    alignSelf:"center",
    alignItems:"center",
    justifyContent:"center",
    textAlign:"center"

  },
  viewAddress:{
    backgroundColor:"#ececec",
    width:"100%",

    marginTop:20

  },
  addressHeadingView:{

    flexDirection:"row",
    margin:15,
    justifyContent:"space-between"

  },
  manageAddressText:{

    lineHeight:30,
    fontSize:14,
    color:"black",
    fontWeight:"bold",
    

  },
  viewAddressText:{
    justifyContent:"space-between",
  
  },
  addAddreesText:{
    lineHeight:30,
    fontSize:12,
    color:"#FD8D45",
    fontWeight:"bold",
    justifyContent:"flex-end",
    alignContent:"flex-end",
    alignSelf:"flex-end"
  },
  viewLine:{
    backgroundColor:"#FD8D45",
    height:1,
    width:50,
  },
  viewLine1:{
    backgroundColor:"#FD8D45",
    height:1,
    width:140,
  },
  viewLineBlack:{
    width:'90%',
    height:1,
    backgroundColor:"#9F9F9F",
    marginLeft:15,
    marginRight:15
  },
  editTextStyle:{
    color:"#FD8D45",
    alignSelf:'center',
    textDecorationLine:"underline"
  },
  viewLineUpdate:{
    backgroundColor:"#FD8D45",
    height:1,
    width:54,
  justifyContent:"flex-end",  
  alignSelf:"flex-end"
  },
  updateTextStyle:{
    color:"#FD8D45",
    textAlign:"right"
  }
  

});