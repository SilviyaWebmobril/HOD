import React, {Component} from 'react';
import {Alert,View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import * as HOC from '../HOC/mainHoc';
import CustomTextInput from '../CustomUI/CustomTextInput/CustomTextInput';
import CustomButtonWithIcon from '../CustomUI/CustomButton/CustomButtonWithIcon';
import Autocomplete from 'react-native-autocomplete-input';
import axios from 'axios';
import SearchLocationStyle from './SearchLocationStyle';
import CustomButton from '../CustomUI/CustomButton/CustomButton';
import { ScrollView } from 'react-native-gesture-handler';

const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);

const API = 'https://swapi.co/api';
export default class SearchLocation extends Component {


    static navigationOptions = ({ navigation }) => ({
        title: 'Search Location',
        headerStyle: {
            height: 60,
            backgroundColor: '#FD8D45',
        },
        headerTitleStyle: {
            color: 'white',
            alignSelf: 'center',
            textAlign: 'center',
            flex: 1,
            fontSize: 17,
        },
        headerTintColor: 'white',
        headerRight: (<View></View>)
    });


    constructor(props){
        super(props);

        this.state ={
            films: [],
            query: '',
            focusedName:false,
            focusedCity:false,
            focusedLocality:false,
            focusedStreet:false,



        }
    }

    componentDidMount() {

      fetch(`${API}/films/`)
      .then(res => res.json())
      .then(json => {
        const { results: films } = json;
        this.setState({ films });
        //setting the data in the films state
      });
      
     
    }

      
      findFilm(query) {
        //method called everytime when we change the value of the input
        if (query === '') {
          //if the query is null then return blank
          return [];
        }
     
        const { films } = this.state;
        //making a case insensitive regular expression to get similar value from the film json
        const regex = new RegExp(`${query.trim()}`, 'i');
        //return the filtered film array according the query from the input
        const titles = films.filter(film => film.title)
        console.log("filtering",titles);
        return films.filter(film => film.title);
    }

      continueButtonHandler = () =>{
       
        this.props.navigation.navigate('SearchLocationContinue');
      }
     

    render() {

         const { query } = this.state;
         const films = this.findFilm(query);
         console.log("films",films);
        // const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
     
        return(

            <FullSCreenSpinnerAndDismissKeyboardView style={SearchLocationStyle.container}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{  justifyContent: 'center',alignItems: 'center',marginBottom:20}}>
                  <Autocomplete
                      autoCapitalize="none"
                      autoCorrect={false}
                      containerStyle={SearchLocationStyle.autocompleteContainer}
                      //data to show in suggestion
                      data={films}
                      //default value if you want to set something in input
                      defaultValue={query}
                      /*onchange of the text changing the state of the query which will trigger
                      the findFilm method to show the suggestions*/
                      onChangeText={text => this.setState({ query: text })}
                      placeholder="Search Location"
                      renderItem={({ title, release_date }) => (
                          //you can change the view you want to show in suggestion from here
                          <TouchableOpacity onPress={() => this.setState({ query: title })}>
                          <Text style={SearchLocationStyle.itemText}>
                              {title} ({release_date})
                          </Text>
                          </TouchableOpacity>
                      )}
                      />
                 
                  <View style={SearchLocationStyle.viewLineGrey}></View>
                  <CustomButtonWithIcon       
                    type="mat"
                    iconName="crosshairs-gps"
                    iconColor="black"
                    iconSize={20}
                    customText="Current Location (GPS)"
                    customViewIconStyle= {{backgroundColor:"#ffffff",borderTopLeftRadius: 5,borderBottomLeftRadius: 5,}}
                    customButttonStyle ={{padding:10,backgroundColor:"#ffffff"}}
                    customViewTextStyle={{ borderBottomRightRadius: 5,borderTopRightRadius: 5,fontSize:15}}
                    custombtnText={{color:'grey',fontWeight:'bold',alignSelf:'flex-start'}}
                    />

                  <View style={SearchLocationStyle.viewLineBlack}></View>

                  <View style={{width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',marginLeft:0}}>
                      <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                          Name*
                      </Text>
                  </View>
                  <CustomTextInput 
                      onFocus={()=>this.setState({isFocusedName:true})}
                      onBlur={()=>this.setState({isFocusedName:false})}
                      customTxtInputStyle={[{
                          borderColor: this.state.isFocusedName
                              ? '#FD8D45'
                              : 'black',
                          borderWidth: this.state.isFocusedName
                          ? 1.5 
                          : 1,
                          marginBottom:-25,
                          }]}
                      placeholder="Enter Name" placeholderTextColor='#898785'
                      returnKeyType = { "next" }
                      ///onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                  />
                  
                  <View style={{marginLeft:0,width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                      <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                          City*
                      </Text>
                  </View>
                  <CustomTextInput 
                      onFocus={()=>this.setState({isFocusedCity:true})}
                      onBlur={()=>this.setState({isFocusedCity:false})}
                      customTxtInputStyle={[{
                          borderColor: this.state.isFocusedCity
                              ? '#FD8D45'
                              : 'black',
                          borderWidth: this.state.isFocusedCity
                          ? 1.5 
                          : 1,
                          marginBottom:-25,
                          }]}
                      placeholder="Enter City" placeholderTextColor='#898785'
                      returnKeyType = { "next" }
                     // onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                  />

                  <View style={{marginLeft:0,width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                      <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                          Locality*
                      </Text>
                  </View>
                  <CustomTextInput 
                      onFocus={()=>this.setState({isFocusedLocalaity:true})}
                      onBlur={()=>this.setState({isFocusedLocality:false})}
                      customTxtInputStyle={[{
                          borderColor: this.state.isFocusedLocalaity
                              ? '#FD8D45'
                              : 'black',
                          borderWidth: this.state.isFocusedLocalaity
                          ? 1.5 
                          : 1,
                          marginBottom:-25,

                          }]}
                      placeholder="Enter Locality" placeholderTextColor='#898785'
                      returnKeyType = { "next" }
                     // onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                  />

                  <View style={{marginLeft:0,width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                      <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                          Street*
                      </Text>
                  </View>
                  <CustomTextInput 
                      onFocus={()=>this.setState({isFocusedStreet:true})}
                      onBlur={()=>this.setState({isFocusedStreet:false})}
                      customTxtInputStyle={[SearchLocationStyle.customtxtInput,{
                          borderColor: this.state.isFocusedStreet
                              ? '#FD8D45'
                              : 'black',
                          borderWidth: this.state.isFocusedStreet
                          ? 1.5 
                          : 1,
                          marginBottom:0,
                          }]}
                      placeholder="Enter Street" placeholderTextColor='#898785'
                      returnKeyType = { "next" }
                   //   onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                  />
                  <CustomButton 
                    onPressHandler={()=> this.continueButtonHandler()}
                    customButttonStyle={{backgroundColor:"#FD8D45", }}
                    customTextStyle={{ color:'#48241e'}} 
                    text="CONTINUE"
                  />
                  
                  

                  </View>
                </ScrollView>   
             </FullSCreenSpinnerAndDismissKeyboardView>
        
        );
    }




}


