import { StyleSheet,Dimensions } from 'react-native';
const win = Dimensions.get('window');
const Create_AccountStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#ffffff',
        margin:10,
      },
      customtxtInput: {
        marginBottom:-25,
      },
      Create_Accounttop:{
      marginTop:25,
          width:'100%',
          height:150,
        justifyContent: 'center',
        alignItems: 'center',
      },
      Create_Accountbottom:{
        marginTop:15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20
      },
      ContinueBtn:{
        height:50,
        borderRadius:10,
        width:'100%',
        backgroundColor: '#48241e',
        justifyContent: 'center',
        alignItems: 'center',
      },
      LoginBtn:{
        height: 50,
        borderRadius:10,
        width:'100%',
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
export default Create_AccountStyle;