import { StyleSheet,Dimensions } from 'react-native';

const SearchLocationStyle = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor:'#ffffff',
        margin:10,
        
      
    },
    customtxtInput: {
        marginBottom:-25,
      },
    autocompleteContainer: {
        backgroundColor: '#ffffff',
        borderWidth: 0,
        margin:20,
        width:"90%"
      },
      itemText: {
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 5,
        margin: 2,
      },
      viewLineGrey:{
          width:'100%',
          height:1,
          backgroundColor:"#ECECEC",
          marginTop:10
      },
      viewLineBlack:{
        width:'100%',
        height:1,
        backgroundColor:"#9F9F9F",
        marginTop:8,
        marginBottom:20
    }


});

export default SearchLocationStyle;