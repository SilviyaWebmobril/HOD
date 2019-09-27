import React ,{Component} from 'react';
import {View ,Text,StyleSheet } from 'react-native';
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
        return (
            <View>
            <View style={styles.container}>
                
                <Image  source={{uri:"https://www.webmobril.org/dev/hod/"+this.props.data.product.img}} style={{width:120, height:120,borderRadius:10}}/>
                <View style={styles.sectionRow}>
                    <View style={styles.textColumnLeft}>
                        <Text style={styles.textProductname}>{this.props.data.product.name}</Text>
                        
                    </View>
                    {this.props.data.unit_id == 1 ? 
    
                    <View>
    
                        <Text>{this.props.data.weight}isLoading</Text>
                    
                    </View>
                    
                    :
                   <View/>
                
                    } 

                    <Text style={styles.textColumnLeft}>{this.props.data.price}</Text>
                
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
        flex:1,
        backgroundColor:'#ffffff',
       
    },
   

});