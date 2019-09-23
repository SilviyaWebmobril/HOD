import React ,{Component} from 'react';
import {View,Text,StyleSheet,Dimensions,FlatList,Image} from 'react-native';


import * as HOC from '../../../HOC/mainHoc';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
import CustomLogo  from '../../../CustomUI/Logo/CustomLogo';
import AsyncStorage from '@react-native-community/async-storage';

var { height } = Dimensions.get('window');
import userData  from '../../../redux/store/actions/userDataAction';
import {connect} from 'react-redux';
import ApiUrl from '../../../Api/ApiUrl';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';


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
        <Image source={require('../../../../Assets/arrow_left.png')} style={{marginLeft:20}} />
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

        }
    }

    getvalues = async () => {

      let values
      try {
        values = await AsyncStorage.multiGet(['user_id','user_name','user_email', 'user_mobile'])
      } catch(e) {
        // read error
      }
    
      // this.setState({user_id:values[0][1]});
      // this.setState({name:values[1][1]});
      // this.setState({email:values[2][1]});
      // this.setState({mobile:values[3][1]});
     // this.setState({address:values[4][1]});
     
    
    
    }

    componentDidMount() {

      //this.getvalues();
      console.log("userdata hello",this.props.user);
      var formdata = new FormData();
      formdata.append("user_id",this.props.user.userdata.user_id);
    
      axios.get(ApiUrl.baseurl+ApiUrl.get_profile+this.props.user.userdata.user_id).then(response => {

        console.log("all addresses",response);

        this.setState({isLoading:false});
      }).catch(error => {
        console.log("errrrror",error);
        this.setState({isLoading:false});
      });

    }



    addNewAddresshandler = () =>{

      this.props.navigation.navigate('SearchLocation',{"location_update":1});
    }

    updateProfileHandler = () =>{
      this.props.navigation.navigate('UpdateProfile');
    }

    onEditMobile = ()=>{
      this.props.navigation.navigate('Login',{update:1});
    }

    renderItem = (data) =>{
      let { item, index } = data;
      console.log("Address",item.address)
      return(

        <View>
          <View style={styles.addressHeadingView}>
              <Text >{item.address}</Text>
              <Text onPress={()=>this.addNewAddresshandler()}
              style={styles.editTextStyle}>Edit</Text>
              
          </View>

          <View style={styles.viewLineBlack}></View>
        </View>
        


      );

    }


    render(){
        return (
            <FullSCreenSpinnerAndDismissKeyboardView>
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
                      data={this.state.addresses}
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
    user: state.userdata
  }
}

export default connect(mapStateToProps,null)(ViewProfile)



const styles =  StyleSheet.create({

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
    height:height/2,
    marginTop:20

  },
  addressHeadingView:{

    flexDirection:"row",
    margin:15,
    justifyContent:"space-between"

  },
  manageAddressText:{

    lineHeight:30,
    fontSize:17,
    color:"black",
    fontWeight:"bold",
    

  },
  viewAddressText:{
    justifyContent:"space-between",
  
  },
  addAddreesText:{
    lineHeight:30,
    fontSize:15,
    color:"#FD8D45",
    fontWeight:"bold",
    justifyContent:"flex-end",
    alignContent:"flex-end",
    alignSelf:"flex-end"
  },
  viewLine:{
    backgroundColor:"#FD8D45",
    height:1,
    width:60,
  },
  viewLineBlack:{
    width:'90%',
    height:1,
    backgroundColor:"#9F9F9F",
    marginLeft:20,
    marginRight:20
  },
  editTextStyle:{
    color:"#FD8D45",
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