import React, {Component}  from 'react';
import {View ,FlatList,Text,StyleSheet,TouchableOpacity,Image} from 'react-native';
import * as HOC from '../../HOC/mainHoc';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
import axios from 'axios';
import ApiUrl from '../../Api/ApiUrl';
import ProductItem from '../ProductItem/ProductItem';
import Cartbadge from '../../CustomUI/Cart/Cartbadge';
import {connect} from 'react-redux';



class CategoryProduct extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.getParam('name'),
        headerStyle: { backgroundColor: '#FD8D45' },
        headerTitleStyle: { color: 'white' },
        headerTintColor: 'white',
        headerRight:(
            <Cartbadge count={navigation.getParam('count', '0')} />
        )
          
        
  
        });

    constructor(props){
        super(props);

        this.state= {

            isLoading:true,
            getAllProducts:[],
            cartCount:false,



        }
    }

    componentWillMount(){
        this.props.navigation.setParams({ 'count': this.props.cart.total_cart_count });
        if(this.props.cart.total_cart_count > 0){
            this.setState({cartCount:true})
        }else{
            this.setState({cartCount:false})
        }
     }

     componentDidUpdate(nextProps, nextState){
        if(this.props.navigation.getParam('count', '0') != this.props.cart.total_cart_count){
            this.props.navigation.setParams({ 'count': this.props.cart.total_cart_count })
            if(this.props.cart.total_cart_count > 0){
                this.setState({cartCount:true})
            }else{
                this.setState({cartCount:false})
            }
        }
      
    }

    componentDidMount () {


        axios.post(ApiUrl.baseurl + ApiUrl.get_categories_product+this.props.navigation.getParam('category_id'))
        .then(response => {

            this.setState({isLoading:false});
            this.setState({getAllProducts:response.data.data});


        }).catch(error => {

            console.log("on error",error);
        })

    }

    onDetailsHandler = (id) => {

        this.props.navigation.navigate("CategoryProductDetails",{"product_id":id   ,"name":this.props.navigation.getParam('name')});
    }

    renderItem(data){
        let { item, index } = data;
        return(
            <TouchableOpacity
            onPress={()=>this.onDetailsHandler(item.id)}>
                <ProductItem data={item} />
            </TouchableOpacity>
      
        );
    }

    render(){
        return(

            <FullSCreenSpinnerAndDismissKeyboardView
            style={styles.container}
            itemQuantity={this.props.cart.total_cart_count}
            itemTotalPrice={this.props.cart.totalAmount}
            cartLayout={this.state.cartCount}
            spinner={this.state.isLoading}
            >  

                <FlatList
                      
                    data={this.state.getAllProducts}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderItem.bind(this)}
                    style={{marginBottom:20}}
                    />
                

            </FullSCreenSpinnerAndDismissKeyboardView>


        );
    }



}

mapStateToProps = state =>{

    return{
        cart:state.cart
    }

}

export default connect(mapStateToProps,null)(CategoryProduct);

const styles = StyleSheet.create({

    container:{
      
        backgroundColor:'#ffffff',
       
    },
    viewCartLayout:{
        width:'100%',
        height:50,
        backgroundColor:'green',
        flexDirection:"row",
        position:"absolute",
        bottom:0,
        left:0,
        right:0,

    },
    rowLeft:{
        flexDirection:"row",
        alignItems:"center",
        margin:20,
    },
    textStyles:{
        fontSize:14,
        fontWeight:"bold",
        color:"white"
    }


});