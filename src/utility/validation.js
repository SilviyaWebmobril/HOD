
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
            case "isReferralCode":
                isValid  = true;
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

  return val.length >= minLength;
}

export default validate;