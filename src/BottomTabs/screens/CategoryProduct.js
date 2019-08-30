import React, {Component}  from 'react';
import {View ,FlatList,Text,StyleSheet,TouchableOpacity} from 'react-native';
import * as HOC from '../../HOC/mainHoc';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
import axios from 'axios';
import ApiUrl from '../../Api/ApiUrl';
import ProductItem from '../ProductItem/ProductItem';


export default class CategoryProduct extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.getParam('name'),
        headerStyle: { backgroundColor: '#FD8D45' },
        headerTitleStyle: { color: 'white' },
        headerTintColor: 'white'
      });

    constructor(props){
        super(props);

        this.state= {

            isLoading:true,
            getAllProducts:[],



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

const styles = StyleSheet.create({

    container:{
      
        backgroundColor:'#ffffff',
    }


});