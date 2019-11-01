import React ,{Component} from 'react';
import {View ,Text,StyleSheet,Image } from 'react-native';
import * as HOC from '../../HOC/mainHoc';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
import {connect} from 'react-redux';
import ApiUrl from '../../Api/ApiUrl';
import * as cartActions  from '../../redux/store/actions/cartAction';

class TransactionHistory extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Transactin History',
        headerStyle: { backgroundColor: '#FD8D45' },
        headerTitleStyle: { color: 'white' },
        headerTintColor: 'white',
       
        });

    constructor(props){
        super(props);
        this.state = {
            history:[],
        }
    }

    componentDidMount(){

       
    }

  
    render(){
        var delivered_on  =   this.props.data.created_at.split(' ');
        return (
            <View>
            <View style={styles.container}>
                
                <Image  source={{uri:"https://www.webmobril.org/dev/hod/"+this.props.data.product.img}} style={{width:120, height:120,borderRadius:10}}/>
                <View style={styles.sectionRow}>
                    <View style={{alignContent:"center",alignItems:"center"}}>
                        <Text style={{color:"black",marginBottom:10,fontWeight:"bold",alignSelf:"flex-start"}}>{this.props.data.product.name}</Text>
                        <View style={styles.unitView}>
                            <Text style={styles.unitViewText}>{parseInt(this.props.data.product.weight)}{this.props.data.product.unit.name}</Text>
                        </View>
                        {/* {this.props.data.product.unit_id  ==  1 
                         ?
                            
                                <View style={styles.unitView}>
                                    <Text style={styles.unitViewText}>{parseInt(this.props.data.product.weight)}L</Text>
                                </View>
                                
                        
                        :
                           
                            <View style={styles.unitView}>
                                <Text style={styles.unitViewText}>{parseInt(this.props.data.product.weight)} Kg</Text>
                            </View>
                        } */}
                        <View style={styles.sectionRow1}>
                            <Text style={{color:"black",fontSize:15,fontWeight:"bold",alignSelf:"center"}}>Delivered On: </Text>
                            <Text style={{color:"black",fontSize:13,alignSelf:"flex-start"}}> {delivered_on[0]}</Text>
                        </View>

                        
                       
                    </View>
                    
                    <Text style={{color:"#FD8D45",fontSize:15,alignSelf:"center"}}>{'\u20B9'}{this.props.data.price}</Text>
                    
                </View>
               

                

               
            
            </View>
          
       
            <View style={styles.viewLineGrey}></View>
        </View>
        )
    }
}


mapStateToProps = state=> {

    return {
        user: state.userdata,
        cart_products : state.cart
    }


}


mapDispatchToProps = dispatch =>{

    return{
       
        onLoading : (value) => {
            dispatch(cartActions.isLoading(value))
        },
      
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TransactionHistory);


const styles = StyleSheet.create({

    container:{
      
        flexDirection:"row",
        marginTop:10,
        marginLeft:10,
        marginRight:10,
        //backgroundColor:"red"

    }, 
    unitView:{
        borderColor:"grey",
        borderRadius:2,
        borderWidth:1,
        marginBottom:7,
        width:"auto",
        height:"auto",
        alignSelf: 'flex-start',
        padding:7
    },
    unitViewText:{
        fontSize:12,
    }, 
    sectionRow:{
        flexDirection:"row",
        justifyContent:"space-between",
        margin:10,
        width:200,
        alignItems:"center"
    
    },
    sectionRow1:{
        flexDirection:"row",
        justifyContent:"flex-start",
        margin:10,
        width:200,
        alignItems:"center"
    
    },
    textColumnLeft:{
        flexDirection:"column",
        alignSelf:"flex-start",
        flex:0.5,
        marginTop:10
        
    },
    textColumnLeft1:{
        flexDirection:"column",
        alignSelf:"flex-end",
        position:"absolute"
    },
    textColumnRight:{
        flexDirection:"column",
        alignSelf:"flex-end",
        position: 'absolute', 
        textAlign:"right",
        flex:0.5,
       
        
    },
    textProductname:{
        fontSize:15,
        fontWeight:"bold",
        color:"black",
        lineHeight:30,
    },
    textBorder:{
        // borderColor:'grey',
        // borderRadius:1,
        // borderWidth:0.5,
        textAlign:"right",
        padding:2,
        lineHeight:20,
        marginTop:10,

    },
    viewLineGrey:{
        width:'100%',
        height:1,
        backgroundColor:"#DCDCDC",
        marginTop:10,
        marginBottom:10,
       
        
    },
   

});