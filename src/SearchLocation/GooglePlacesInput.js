import React,{Component} from 'react';
import { Image, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { connect } from 'react-redux';
import {addLocation} from '../redux/store/actions/locationAction';
const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

class GooglePlacesInput extends Component  {

  state={
    location:{}
  }

  getPlaceDetails(){
    console.log("getPlace details");
    return this.state.details;
  }


  render(){


    return (
      <GooglePlacesAutocomplete
        placeholder='Search Location'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
        listViewDisplayed='false'    // true/false/undefined
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
           console.log("map data details",details);
  
           console.log("map data",data);
          // console.log("map details",details);
          this.props.onAdd(details)
          this.setState({details:details});

        }}
  
        getDefaultValue={() => ''}
  
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          //key: 'AIzaSyBx5f8NnFiA2kEv7ZcFJVtUs0_6TfZaMPw',
          key: 'AIzaSyDKYaLVu8NLmd8r7Ve25-UQqJf7LE-OA7k',
          language: 'en', // language of the results
          types: '(cities)' // default: 'geocode'
        }}
  
        styles={{
          textInputContainer: {
            width: '97%',
            borderRadius:7,
            alignSelf:"center",
            marginTop:10
            
          },
          description: {
            fontWeight: 'bold'
          },
          predefinedPlacesDescription: {
            color: '#1faadb'
          },
          row:{
            width:"97%"
          }
        }}
  
        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          type: 'pizza'
        }}
        
        GooglePlacesDetailsQuery={{
          // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
          fields: 'formatted_address',
        }}
  
        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        predefinedPlaces={[homePlace, workPlace]}
  
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        renderLeftButton={()  => <Image source={require('../Assets/search2.png')} style={{width:30 ,height:30,alignSelf:"center",marginLeft:5}}/>}
        // renderRightButton={() => <Text>Custom text after the input</Text>}
      />
    );

  }
 
}

const mapStateToProps = state => {
  return {
    location: state.location.location
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAdd: (name) => {
      dispatch(addLocation(name))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(GooglePlacesInput)

//export default GooglePlacesInput;