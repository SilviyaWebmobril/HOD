import React,{ Component } from 'react';
import { View , Text ,StyleSheet,TouchableOpacity} from  'react-native';
import CustomTopHeader  from './CustomTopHeader';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import * as HOC from '../HOC/mainHoc';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
import axios from 'axios';
import Banners from '../Banners/Banner';
import HorizontalList from '../CustomUI/HorizontalList/HorizontalList';
import CustomTextInputWithIcon from '../CustomUI/CustomTextInput/CustomTextInputWithIcon';
import {images}  from  '../CustomUI/HorizontalList/imageUri';
import ProductItem  from './ProductItem/ProductItem';
import ApiUrl from '../Api/ApiUrl';
import {connect} from 'react-redux';
import Cartbadge from '../CustomUI/Cart/Cartbadge';



class HomeScreen extends  Component {

    constructor(props){
        super(props);
        this.state={
            images: [...images],
            isLoading:true,
            product:[],
            banners:[],
            getAllProducts:[],
        }
    }

    componentDidMount(){

        axios.post(ApiUrl.baseurl+ApiUrl.home_page+this.props.userdata.userdata.user_id).then(res => {

          
            this.setState({isLoading:false});
            this.setState({product:res.data.product_categories});
            this.setState({banners:res.data.banners});
            this.setState({getAllProducts:res.data.all_products});





        }).catch( error  => {   
            this.setState({isLoading:false});
            console.log("on error",error); 


        });

        

    }

    onDetailsHandler = (id,name) => {

        this.props.navigation.navigate("CategoryProductDetails",{"product_id":id   ,"name":name});
    }

    renderItem(data){
        let { item, index } = data;
        return(
            <TouchableOpacity
            onPress={()=>this.onDetailsHandler(item.id,item.name)}>
            <ProductItem data={item} />
            </TouchableOpacity>
        );
    }

    render(){
        return(
           
            <FullSCreenSpinnerAndDismissKeyboardView
            style={styles.container}
            spinner={this.state.isLoading}>
                <View >
                    <CustomTopHeader />
                    <Banners images={this.state.banners}/>
                    <HorizontalList products={this.state.product} />
                    <CustomTextInputWithIcon placeholder="Search for Products.."/>
                   
                    <FlatList
                      
                        data={this.state.getAllProducts}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderItem.bind(this)}
                        style={{marginBottom:20}}
                        />
                   

                    
            
                </View>


            </FullSCreenSpinnerAndDismissKeyboardView>
             
        );
    }
 }


 

const mapStateToProps = state => {
    return {
      userdata: state.userdata
    }
  }


  
const mapDispatchToProps = dispatch => {
    return {
      onUpdateUser: (userdata) => {
        dispatch(userData(userdata))
      }
    }
  }
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen)

 const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#ffffff',
      //  margin:20

    },
    

 });