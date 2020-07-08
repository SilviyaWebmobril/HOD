import React ,{Component} from 'react';
import {View, Text, FlatList, Image,StyleSheet,Platform,ScrollView,ActivityIndicator} from 'react-native';
import Axios from 'axios';
import ApiUrl from '../../Api/ApiUrl';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default class Partners extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading:false,
            product_category:[]
        }
    }

    componentDidMount() {

        this.setState({isLoading:true});
        Axios.post(ApiUrl.baseurl+ApiUrl.product_category)
        .then(response => {
            this.setState({isLoading:false});

            console.log(response.data);
            if(!response.data.error){

                this.setState({product_category:response.data.categories})
            }

        })
        .catch(error => {
            console.log(error);
            this.setState({isLoading:false});
        })
    }

    updateProductList = (product_id,quantity) => {

    }


    renderCategoryItem = (item) => {

        return(
            <TouchableOpacity onPress={()=>{ this.props.navigation.navigate("CategoryProduct",{"category_id":item.id,"name":item.name,
            updateProductList:(product_id, quantity)=>this.updateProductList(product_id,quantity)
            } )}}>
            <>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-start" ,padding:5,marginBottom:10}}>
                <Image source={{uri:ApiUrl.image_url+item.cat_img}} style={{width:80,height:80}} />
                <Text style={{color:"grey",fontFamily:"roboto-bold",fontSize:15,marginLeft:10}}>{item.name}</Text>
              
            </View>
            <View style={{width:"100%",height:1,backgroundColor:'#dcdcdc'}} />
           
              </>
              </TouchableOpacity>
        )

    }


    render(){
        return(
            <View style={styles.container}>
            <View  style={styles.headerView}>
               <Text style={styles.headertextStyle}>Partners</Text>
           </View>
           <ScrollView >
               <View  style={{margin:5}}>   

               <FlatList
               data={this.state.product_category}
               renderItem={({item})=>{
                  return  this.renderCategoryItem(item)
               }}/>
               
               
               </View>
               
           </ScrollView>
           {this.state.isLoading &&
               <View
               style={[
                   StyleSheet.absoluteFill,
                   { backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center',flex:1 }
               ]}
               >
               <ActivityIndicator size="large" />
               </View>}

       </View>

        )
    }
}




const styles =  StyleSheet.create({
   
    container:{
        flex:1,
        backgroundColor:'#fff',
       
    },
    headerView:{
        backgroundColor:"#FD8D45",
        paddingTop:Platform.OS == 'android' ? 0 : 40,
        height:Platform.OS == 'android' ? 60 : 80,
        width:"100%",
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        alignContent:"center",
        justifyContent:"center"

    },
    headertextStyle:{
        fontFamily:'roboto-bold',
        fontSize:20,
        color:"white",
        alignSelf:"center",
        textAlign:"center",   
    },
    textStyle:{
        fontFamily:'roboto-bold',
        fontSize:20,
        color:"white",
        alignSelf:"center",
        textAlign:"center",
    },
    buttonView:{
        width:"100%",
        padding:20,
        flexDirection:"row",
        alignContent:"flex-start",
        alignItems:"flex-start",
        justifyContent:"flex-start",
       
        
    },
    btnTextStyle:{
        fontFamily:'roboto-bold',
        //fontWeight:"bold",
        color:"grey",
        fontSize:17
    },
    viewLineBlack:{
        width:'100%',
        height:1,
        backgroundColor:"#ececec",
        marginBottom:2,
       
        
    },

});

