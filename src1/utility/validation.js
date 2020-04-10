

const validate = ( val, rules) => {

    let isValid = true;
    for(let rule  in rules ){

        switch(rule){

            case "isEmail":
                isValid = isValid && emailValidator(val);
                break;
            case "isText" :
                isValid = isValid && textValidator(val);
                break;
            case "isMobile":
                isValid = isValid && mobilevalidator(val);
                break;
            case "minLength":
                isValid = isValid && passwordValidator(val,rules[rule]);
                break;
            case "notRequired":
                isValid  = true;
                break;
            case "isValidPincode":
                isValid = isValid && pincodeValidator(val);
                break;
            case "isNumber":
                isValid = isValid && numbervalidator(val);
                break;
            default:
                isValid = true;


        }
    }

    return isValid;


};


const emailValidator = (val) => {

    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        val
        
    );
}

const textValidator = (val) => { 
   
    return val.length > 0 ;
}

const mobilevalidator =  (val) => {

  return val.length == 10;
}

const passwordValidator = (val,minLength) => {

  return val.length >= minLength && val.length <= 16;
}

const pincodeValidator = (val) => {
    console.log("i ama here on validate" );
    return /^\d{6}$/.test(val);
}

const numbervalidator = (val)=> {

   
    if(!isNaN(val)){
        console.log("is a integer",val);
        return true;
    }else{
        console.log("is a number",val);
        return false;
    }

}

export default validate;