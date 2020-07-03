import React ,{Component} from 'react';
import {View ,Text,StyleSheet,FlatList,TouchableOpacity,Image } from 'react-native';
import * as HOC from '../../../HOC/mainHoc';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
import {connect} from 'react-redux';
import ApiUrl from '../../../Api/ApiUrl';
import * as cartActions  from '../../../redux/store/actions/cartAction';
import TransactionProductItem from '../../ProductItem/TransactionProductItem';
import axios from 'axios';

class TransactionHistory extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: '  My Orders  ',
        headerStyle: { backgroundColor: '#FD8D45' },
        headerTitleStyle: { color: 'white',fontSize:17,flex:1 },
        headerTintColor: 'white',
       
        });

    constructor(props){
        super(props);
        this.state = {
            history:[],
            isLoading:false,
            isRefreshing:false,
            errorMsg:"",
        }
    }

    onRefresh = () =>{

          
        this.setState({isRefreshing:true})
        this.componentDidMount();
    }

    componentDidMount(){
        this.setState({isLoading:true})
        this.setState({isRefreshing:false})
        var formdata  = new FormData();
        formdata.append("user_id",this.props.user.userdata.user_id)
        axios.post(ApiUrl.baseurl +  ApiUrl.transaction_history,formdata)
        .then(response =>{
            console.log("response transaction",response.data)
           this.setState({isLoading:false})
            if(!response.data.error){
                this.setState({errorMsg:false})
                this.setState({history:response.data.data});
                
            }else{
                this.setState({errorMsg:true});
            }
           
        }).catch(error => {

            console.log("transaction history",error);
            Alert.alert(
                'Error',
                'Check Your Internet connection.',
                [
             
                {text: 'OK', onPress: () => console.log("ok")},
                
                ], 
                { cancelable: false }
                )

        });
    }

    renderItem (data) {
        let { item, index } = data;
        console.log("item==>",item);
        return(
           
                <TransactionProductItem data={item} />
           
        );


    }
    render(){
        return (
            <FullSCreenSpinnerAndDismissKeyboardView 
            onRefresh={this.onRefresh.bind(this)}
            refreshing={this.state.isRefreshing}
                spinner={this.state.isLoading} >
                {!this.state.errorMsg 
                ?
                    <FlatList
                        data={this.state.history}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderItem.bind(this)}
                        style={{marginBottom:20}}
                        />
                :
                    <Text style={{textAlign:'center',margin:10,fontFamily:'roboto-bold',fontSize:14}}>No transaction history found.</Text>
                }
               
                  

            </FullSCreenSpinnerAndDismissKeyboardView>
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