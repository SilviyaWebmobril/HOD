// @flow
import React from 'react';
import { View, StyleSheet, ActivityIndicator} from 'react-native';
import { ScrollView} from 'react-native-gesture-handler';
import CartLayout from '../CustomUI/Cart/CartLayout';

export default(Comp: ReactClass<*>) => {
  return ({itemQuantity , itemTotalPrice,cartLayout, spinner, children, ...props }: Object) => (
    <View style={{ flex: 1,}}>

      <ScrollView 
       contentContainerStyle={{ 
        flexGrow: 1,
     
      }}>

          <Comp {...props}>
            {children}
           
          
          </Comp>

         
      

      </ScrollView> 
      {cartLayout

       ?
          <CartLayout quantity={itemQuantity} price={itemTotalPrice}/>
        :
        <View/>
      }
      {spinner &&
            <View
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }
              ]}
            >
              <ActivityIndicator size="large" />
            </View>}
   
      
    </View>
  );
};





