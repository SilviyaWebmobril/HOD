import React,{useState,forwardRef, useRef, useImperativeHandle,Component} from 'react';
import {View,TextInput,Text,StyleSheet, Dimensions } from 'react-native';
import validate from '../../utility/validation';
import DeviceInfo from 'react-native-device-info';


class CustomTextInput  extends Component {


    // In this component taking the text input value and validating the values 
    // validationRules  for the name, address, is taken under isText;

    constructor(props){
        super(props);
      
        this.state = {
            isFocused:false,
            inputTextValue:"",
            errorState:true,
            errorMsg:"",
            controls:{
                name:{
                    value: "",
                    valid:false,
                    validationRules:{
                        isText:true,
                    }
                },
                email:{
                    value: "",
                    valid:false,
                    validationRules:{
                        isEmail:true,
                    }
                },
                password:{
                    value: "",
                    valid:false,
                    validationRules:{
                        minLength:6,
                    }
                },
                confirmpassword:{
                    value: "",
                    valid:false,
                    validationRules:{
                        minLength:6,
                    }
                },
                mobile:{
                    value: "",
                    valid:false,
                    validationRules:{
                        isMobile:10,
                    }
                },
                referralCode:{
                    value: "",
                    valid:false,
                    validationRules:{
                        notRequired:true,
                    }
                },
                city:{
                    value: "",
                    valid:false,
                    validationRules:{
                        isText:true,
                    }
                },    
                street:{
                    value: "",
                    valid:false,
                    validationRules:{
                        isText:true,
                    }
                }, 
                locality:{
                    value: "",
                    valid:false,
                    validationRules:{
                        isText:true,
                    }
                },
                houseno:{
                    value: "",
                    valid:false,
                    validationRules:{
                        isText:true,
                    }
                },
                
                floorno:{
                    value: "",
                    valid:false,
                    validationRules:{
                        isText:true,
                    }
                },
                
                pincode:{
                    value: "",
                    valid:false,
                    validationRules:{
                        isValidPincode:true,
                    }
                },
                
                landmark:{
                    value: "",
                    valid:false,
                    validationRules:{
                        notRequired:true,
                    }
                },
                family:{
                    value: "",
                    valid:false,
                    validationRules:{
                        isText:true,
                    }
                },
                subject:{
                    value: "",
                    valid:false,
                    validationRules:{
                        isText:true,
                    }
                },
                message:{
                    value: "",
                    valid:false,
                    validationRules:{
                        isText:true,
                    }
                },
                family_members:{
                    value:"",
                    valid:false,
                    validationRules:{
                        isText:true
                    }
                },
                otp:{
                    value:"",
                    valid:false,
                    validationRules:{
                        isNumber:true
                    }
                },
                no:{
                    value:"",
                    valid:false,
                    validationRules:{
                        isNumber:true
                    }
                }

                
                
        

            }
        }
    }

  resetTextInput =  (type) => {

    console.log("reset text input",type);

    this.setState({inputTextValue : ""})   // saving the input value to some text


    this.setState(prevState => ({
        ...prevState, // get all the prevstate
        controls:{
            ...prevState.controls, // since conytrols is object so  get all prevState contols
            [type] : {
                ...prevState.controls[type],   //  controls having key so get all controls key
                value:"" ,
                valid: false
            }
        
        }
    
    })); 


  }

    setTextInputValue = (value,type) => {

        
        this.setState({inputTextValue : value})   // saving the input value to some text
     
        this.setState(prevState => ({
                ...prevState, // get all the prevstate
                controls:{
                    ...prevState.controls, // since conytrols is object so  get all prevState contols
                    [type] : {
                        ...prevState.controls[type],   //  controls having key so get all controls key
                        value:value ,
                        valid: validate(value , prevState.controls[type].validationRules)
                    }
                
                }
            
        }), () => {

            if(type == "name"){

                if(!this.state.controls.name.valid){
                  
                    this.setState({errorState:false})
                    this.setState({errorMsg:"Please Enter Name"});
                }else{
                    this.setState({errorState:true})
                }
                
            }else if(type == "email"){
                if(!this.state.controls.email.valid){
                    this.setState({errorState:false});
                    this.setState({errorMsg:"Please enter valid Email"});
                }else{
                    this.setState({errorState:true});
                }
            }else if(type == 'password'){
                if(!this.state.controls.password.valid){
                    this.setState({errorState:false});
                    this.setState({errorMsg:"Password length must be greater than 6 and less than 16"});
                }else{
                    this.setState({errorState:true});
                }
            }else if(type == 'confirmpassword'){
                if(!this.state.controls.confirmpassword.valid){
                    this.setState({errorState:false});
                    this.setState({errorMsg:"Password length must be greater than 6 and less than 16"});
                }else{
                    this.setState({errorState:true});
                }
            }else if(type == 'mobile'){

                if(!this.state.controls.mobile.valid){
                    this.setState({errorState:false});
                    this.setState({errorMsg:"Please enter valid Mobile No."});
                }else{
                    this.setState({errorState:true});
                }

            }else if(type == "city"){

                if(!this.state.controls.city.valid){
                    this.setState({errorState:false});
                    this.setState({errorMsg:"Please enter City"});
                }else{
                    this.setState({errorState:true});
                }
            }
            else if(type == "locality"){

                if(!this.state.controls.locality.valid){
                    this.setState({errorState:false});
                    this.setState({errorMsg:"Please enter Locality"});
                }else{
                    this.setState({errorState:true});
                }
            }else if(type == "street"){

                if(!this.state.controls.street.valid){
                    this.setState({errorState:false});
                    this.setState({errorMsg:"Please enter Street"});
                }else{
                    this.setState({errorState:true});
                }
            }else if(type == "houseno"){

                if(!this.state.controls.houseno.valid){
                    this.setState({errorState:false});
                    this.setState({errorMsg:"Please enter House No"});
                }else{
                    this.setState({errorState:true});
                }
            }else if(type == "floorno"){

                if(!this.state.controls.floorno.valid){
                    this.setState({errorState:false});
                    this.setState({errorMsg:"Please enter Floor No"});
                }else{
                    this.setState({errorState:true});
                }
            }else if(type == "pincode"){

                if(!this.state.controls.pincode.valid){
                    this.setState({errorState:false});
                    this.setState({errorMsg:"Please enter valid Pincode"});
                }else{
                    this.setState({errorState:true});
                }
            }else if(type == "family"){

                if(!this.state.controls.family.valid){
                    this.setState({errorState:false});
                    this.setState({errorMsg:"Please enter Family Members"});
                }else{
                    this.setState({errorState:true});
                }
            }else if(type == "subject"){

                
                if(!this.state.controls.subject.valid){
                    this.setState({errorState:false});
                    this.setState({errorMsg:"Please enter Subject"});
                }else{
                    this.setState({errorState:true});
                }
            }else if(type == "message"){

                if(!this.state.controls.message.valid){
                    this.setState({errorState:false});
                    this.setState({errorMsg:"Please enter Message"});
                }else{
                    this.setState({errorState:true});
                }
            }else if(type == "family_members"){
                
                if(!this.state.controls.family_members.valid){
                    this.setState({errorState:false});
                    this.setState({errorMsg:"Please enter No Of Family Members"});
                }else{
                    this.setState({errorState:true});
                }
              
            }else if(type == "otp"){
                
                if(!this.state.controls.otp.valid){
                    this.setState({errorState:false});
                    this.setState({errorMsg:"Please enter Valid OTP"});
                }else{
                    this.setState({errorState:true});
                }
              
            }else if(type == "no"){

                if(!this.state.controls.no.valid){
                    this.setState({errorState:false});
                    this.setState({errorMsg:""});

                }else{
                    this.setState({errorState:true});
                }

            }
    

        });


     
        

    }

    // validateAllStates = () =>{

      
    //     if(this.state.controls.name.value == "" || this.state.controls.password.value == "" || this.state.controls.mobile.value == ""){
    //         console.log("validating");
    //         this.setState({errorMsg:"This field is required"});
    //         this.setState({errorState:false})
    //     }
    // }

   


    // this function reurns the final value  after validation to Parent component
    getInputTextValue = (type)=> {

     
            if(type == "name"){

                if( this.state.controls.name.valid){
                    return this.state.controls.name.value;
                }else{
                    return "invalid";
                }
            
            }else if(type == "email"){

                if(this.state.controls.email.valid){
                    return this.state.controls.email.value;
                }else{
                    return "invalid";
                }
               
    
            }else if(type == "password"){

                if(this.state.controls.password.valid){
                    return this.state.controls.password.value;
                }else{
                    return "invalid";
                }
               
    
            }else if(type == "confirmpassword"){

                if(this.state.controls.confirmpassword.valid){
                    return this.state.controls.confirmpassword.value;
                }else{
                    return "invalid";
                }
               
    
            }else if(type == "mobile"){

                if(this.state.controls.mobile.valid){
                    return this.state.controls.mobile.value;
                }else{
                    return "invalid";
                }
             
    
            }else if(type == "referralCode"){

                return this.state.controls.referralCode.value;
               
               
            }else if(type == "city"){

                if(this.state.controls.city.valid){
                    return this.state.controls.city.value;
                }else{
                    return "invalid";
                }
              

            }else if( type == "street"){

                if(this.state.controls.street.valid){
                    return this.state.controls.street.value
                }else{
                    return "invalid";
                }

            }else if(type ==  "locality"){

                if(this.state.controls.locality.valid){
                    return this.state.controls.locality.value;
                }else{
                    return "invalid";
                }

            }else if(type == "landmark"){

                return this.state.controls.landmark.value;

            }else if(type == "houseno"){

                if(this.state.controls.houseno.valid){
                    return this.state.controls.houseno.value;
                }else{
                    return "invalid";
                }

            }else if(type == "floorno"){

                if(this.state.controls.floorno.valid){
                    return this.state.controls.floorno.value;

                }else{
                    return "invalid";
                }

            }else if(type == "pincode"){

                if(this.state.controls.pincode.valid){
                    return this.state.controls.pincode.value;
                }else{
                    return "invalid";
                }
            }else if(type == "subject"){

                if(this.state.controls.subject.valid){
                    return this.state.controls.subject.value;
                }else{
                    return "invalid";
                }
            }else if(type == "message"){

                if(this.state.controls.message.valid){
                    return this.state.controls.message.value;
                }else{
                    return "invalid";
                }

            }else if(type == "family_members"){

                if(this.state.controls.family_members.valid){
                    return this.state.controls.family_members.value;
                }else{
                    return "invalid";
                }

            }else if(type == "otp"){

                if(this.state.controls.otp.valid){
                    return this.state.controls.otp.value;
                }else{
                    return "invalid";
                }

            }else if(type == "no"){
                if(this.state.controls.no.valid){
                    return this.state.controls.no.value;
                }else{
                    return "invalid";
                }
            }
            
            
            
        

        
      
    }

    setText = (value)=>{
        
        this.setState({inputTextValue : value})
    } 
    
    render() {

    

        return(
            <View style={[textInput.mainView , this.props.customMainView]}>

                <View style={ [textInput.viewStyle  ,this.props.customTextInputView]}>
                <TextInput 
                    {...this.props}     
                    ref={this.props.ref} 
                    textAlignVertical={'top'}
                    onFocus={()=>this.setState({isFocused:true})}
                    onBlur={()=>this.setState({isFocused:false})}
                    style={[this.state.errorState ? this.state.isFocused ? textInput.borderFocus : textInput.borderBlur  : textInput.invalid,
                    this.props.customTxtInputStyle,]}
                    placeholder={ this.props.placeholder}
                    keyboardType={this.props.keyboardType}
                    editable={this.props.editable}
                    secureTextEntry={this.props.secureTextEntry}
                    placeholderTextColor={this.props.placeholderTextColor }
                    onChangeText={(value)=> this.setTextInputValue(value,this.props.inputType )}
                    value={this.state.inputTextValue}
                    returnKeyType={this.props.returnKeyType}
                    multiline={this.props.multiline}
                    clearButtonMode='always'
                    onSubmitEditing={this.props.onSubmitEditing}
    
                />

             

                {this.state.errorState ? 
                    <View/>
                    : 

                    (DeviceInfo.isTablet()
                    ?
                        <Text style={[textInput.errorTextStyleTablet,this.props.customErrorInputStyle]}>
                            {this.state.errorMsg}
                        </Text>
                    :
                        <Text style={[textInput.errorTextStyle,this.props.customErrorInputStyle]}>
                            {this.state.errorMsg}
                        </Text>
                    )
                    
                } 
                </View>
                
               

            </View>
            
    
        );

    }
   
    
}

export default CustomTextInput;

const textInput = StyleSheet.create({

    mainView:{
        width:Dimensions.get('window').width,marginBottom:10
    },
    viewStyle:{
        marginTop:10,alignItems:"center",
    },

    txtInput: {
        fontFamily:"Roboto-Light",
        width:'100%',
        padding:0,
        borderColor: 'gray',
        borderWidth: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
       
      },

      invalid:{
          borderColor:"red",
          width:'90%',
          padding:10,
          borderWidth: 1,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
      },
      borderFocus:{
        borderColor:"#FD8D45",
        width:'90%',
        padding:10,
        borderWidth: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
      },
      borderBlur:{
       
            borderColor:"black",
            width:'90%',
            padding:10,
            borderWidth: 1,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
      },
      errorTextStyle:{
        marginLeft:20,
        fontFamily:"Roboto-Light",
        justifyContent:'flex-start',
        alignSelf:"flex-start",
        color:'red',
        fontSize:12
      }
      ,
      errorTextStyleTablet:{
        marginLeft:40,
       
        justifyContent:'flex-start',
        alignSelf:"flex-start",
        color:'red',
        fontSize:12
      }

})

 // const [txtInputValue ,setTextInputValue] = useState('');

    // console.log("textInput ",txtInputValue);

    // useImperativeHandle(ref, () => ({

    //     getInputTextValue (){

    //         return txtInputValue;
    
    //     }

    //   }));