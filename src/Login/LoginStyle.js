import { StyleSheet,Dimensions } from 'react-native';
const win = Dimensions.get('window');
const LoginStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#ffffff',
        marginLeft:10,
        marginRight:10,
        marginTop:40,
        justifyContent:"center"

      },
      // txtInput: {
      //   margin:15,
      //   borderColor: 'gray',
      //   borderWidth: 1,
      //   height: 40,
      //    width:'90%'
      // },
      Logintop:{
        paddingTop:45,  
        width:'100%',
        height:150,
      justifyContent: 'center',
      alignItems: 'center',
      
      },
      bottom:{
        marginTop:10,
        flex: 0.55,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20
    
      },
      LoginBtn:{
        marginTop:20,
        height:50,
        borderRadius:10,
        width:'90%',
        backgroundColor: '#48241e',
        justifyContent: 'center',
        alignItems: 'center',
        
      },
      CreateAccountBtn:{
        height: 50,
        borderRadius:10,
        width:'90%',
        backgroundColor: '#FD8D45',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#48241e'
      },
      btntxt:{
        color:'#ffffff',
        fontWeight: 'bold',
        fontSize: 17,
      }
});
export default LoginStyle;