import { ADD_LOCATION } from "../actions/types";





const initialState = {
    location : {},
    
}

// setting up action for location updates 
const locationReducer = (state = initialState,action) =>{

   switch(action.type){
       case ADD_LOCATION:
           return{
               ...state,
               location:action.payload
           }
           default:
                return state;
   }

}

export default locationReducer;