import { StyleSheet,Dimensions } from 'react-native';
const win = Dimensions.get('window');
var WidthofCircle=win.width/3;
var RadiusofCircle = win.width/6;
const OTPStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#ffffff',
        margin:10
      },
      Timertxt:{
        color:'#FD8D45',
        fontWeight: 'bold',
        fontSize: 30,
      },
      txtInput: {
        marginTop:15,
        borderColor: 'gray',
        borderWidth: 1,
        height: 40,
         width:'90%'
      },
      circle:{
        height:WidthofCircle,
        width:WidthofCircle,
        borderRadius:RadiusofCircle,
          borderWidth:2,
          borderColor:'#FD8D45',
          justifyContent: 'center',
          alignItems: 'center',
      },
      Logintop:{
        paddingTop:45,
        width:'100%',
        height:150,
      justifyContent: 'center',
      alignItems: 'center',

      
      },
      bottom:{
        marginTop:0,
        justifyContent: 'center',
        alignItems: 'center',
    
      },
     
});
export default OTPStyle;