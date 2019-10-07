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
        title: 'Transaction History',
        headerStyle: { backgroundColor: '#FD8D45' },
        headerTitleStyle: { color: 'white' },
        headerTintColor: 'white',
       
        });

    constructor(props){
        super(props);
        this.state = {
            history:[],
            isLoading:true,
        }
    }

    componentDidMount(){

       
        var formdata  = new FormData();
        formdata.append("user_id",this.props.user.userdata.user_id)
        axios.post(ApiUrl.baseurl +  ApiUrl.transaction_history,formdata)
        .then(response =>{
           this.setState({isLoading:false})
            this.setState({history:response.data.data});
        }).catch(error => {

            console.log("transaction history",error);

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
                spinner={this.state.isLoading} >

                <FlatList
                      
                      data={this.state.history}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={this.renderItem.bind(this)}
                      style={{marginBottom:20}}
                      />
                  

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