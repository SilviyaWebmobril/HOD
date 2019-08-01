import { StyleSheet,Dimensions} from 'react-native';
const win = Dimensions.get('window');

const After_SplashStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff',
   // margin:10
    
  },
  after_splash_top:{
    flex: 0.45,
    width: win.width,
    height: win.height,

  
  },
  after_splash_bottom:{
    flex: 0.55,
    marginTop:60,
    justifyContent: 'center',
    alignItems: 'center',

  },
  LoginBtn:{
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
export default After_SplashStyle;