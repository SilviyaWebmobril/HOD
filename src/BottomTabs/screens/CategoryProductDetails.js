import React ,{Component} from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';
import * as HOC from '../../HOC/mainHoc';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);

import axios from 'axios';
import ApiUrl from '../../Api/ApiUrl';
import IncrementDecrementButton from '../../CustomUI/CustomButton/IncrementDecremntButton';
import { WebView } from 'react-native-webview';
import CustomButton from  '../../CustomUI/CustomButton/CustomButton';
import {connect} from 'react-redux';


class CategoryProductDetails extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.getParam('name'),
        headerStyle: { backgroundColor: '#FD8D45' },
        headerTitleStyle: { color: 'white' },
        headerTintColor: 'white'
      });

      constructor(props) {
        super(props);
        this.state= {

            isLoading:true,
            details:null,
            img:"",
            old_price:0,
            new_price:0,
            offer_price:0,
            quantity:"",
            unit:"",
            description:""


        }
    }

    componentDidMount() {

        console.log("cart items",this.props.cart_product);

        axios.post(ApiUrl.baseurl +ApiUrl.get_product_details+ this.props.navigation.getParam('product_id'))
        .then(response =>{

            this.setState({isLoading:false});

            var  obj = JSON.stringify(response.data.data);
           
            this.setState({details:JSON.parse(obj)});

            this.setState({img:"http://webmobril.org/dev/hod/"+response.data.data.img})
            this.setState({old_price:response.data.data.old_price});
            this.setState({new_price:response.data.data.new_price});
            this.setState({quantity:response.data.data.quantity});
            this.setState({unit:response.data.data.unit.name});
            this.setState({productname:response.data.data.name});
            this.setState({description:response.data.data.description});



        }).catch(error => {
            this.setState({isLoading:false});


        });
    }

    render(){

      
        return(
            
            <FullSCreenSpinnerAndDismissKeyboardView
            styles={styles.container}
            spinner={this.state.isLoading}>

                <Image source={{uri:this.state.img}} width={150} height={150} style={styles.imgStyle} />
                <View style={styles.viewLineGrey}></View>
                <View style={styles.mainRow}>
                    <View style={styles.rowLeft}>
                        <Text style={styles.productname}>{this.state.productname}</Text>
                        <View style={styles.unitView}>
                            <Text style={styles.unitViewText}>1L</Text>
                        </View>
                        <View style={styles.priceView}>
                            <View style={styles.newpricetext}>
                                <Text style={styles.newpricetext}>{'\u20B9'}{this.state.new_price}</Text>
                            </View>
                            <View style={styles.oldpricetext}>
                                <Text style={styles.oldpricetext}>{'\u20B9'}{this.state.old_price}</Text>
                            </View>
                        </View>

                    </View>
                    <View style={styles.rowRight}>
                         <Text style = {styles.quantityText}>{this.state.quantity} </Text>
                     
                         {/* <IncrementDecrementButton/>  */}
                    </View>
                </View>
               
                <View style={styles.webViewStyle} pointerEvents="none">
                    <WebView
                        style={{width:900,height:150}}
                        originWhitelist={['*']}
                        source={{ html:this.state.description}}
                    />
                </View>

                <CustomButton customTextStyle={{ color:'white',}}   customButttonStyle={{marginBottom:25}}
                text="GET ONCE" />

                <CustomButton  customButttonStyle={{backgroundColor:"#FD8D45",marginBottom:40 }} customTextStyle={{ color:'brown'}} 
                text="SUBSCRIBE" />
        






            </FullSCreenSpinnerAndDismissKeyboardView>

        )
    }
}




const mapStateToProps = (state) => {
    return {
      cart_product: state.cart
    }
  }


  export default connect(mapStateToProps,null)(CategoryProductDetails)

const styles =  StyleSheet.create({

    container:{
        backgroundColor:"#fff"
    },

    imgStyle:{

        alignSelf:'center',
        margin:15,
     
    },
    viewLineGrey:{
        width:'100%',
        height:1,
        backgroundColor:"#ECECEC",
        marginTop:10
    },
    mainRow:{
       
        flexDirection:"row",
        justifyContent:"space-between"
    },
    rowLeft:{
        alignContent:"flex-start",
        alignSelf:"flex-start",
        marginLeft:10


    },
    rowRight:{
        alignContent:'flex-end',
        alignSelf:"flex-end",
        marginRight:10
        

    },
    productname:{
        fontSize:20,
        fontWeight:"bold",
        marginBottom:7
      
    },
    unitView:{
        borderColor:"grey",
        borderRadius:2,
        borderWidth:1,
        marginBottom:7,
        width:30,
        padding:7
    },
    unitViewText:{
        fontSize:12,
    },
    priceView:{
        flexDirection:"row",
        flex:3,
      
    },
    newpricetext:{
        fontSize:15,
        fontWeight:"bold",
        color:"#FD8D45",
        marginRight:5
    },
    oldpricetext:{
        fontSize:15,
        fontWeight:"bold",
        color:"grey",
        marginRight:5,
        textDecorationLine: 'line-through',
         textDecorationStyle: 'solid'
    },
    offerText:{
        fontSize:15,
        color:"#FD8D45"
    },
    quantityText:{
        fontWeight:'bold',
        color:"grey",
        fontSize:15,
        alignSelf:"flex-end"
    },
    webViewStyle:{
        margin:10
    }


});