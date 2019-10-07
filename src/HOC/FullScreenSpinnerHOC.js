// @flow
import React from 'react';
import { View, StyleSheet, ActivityIndicator} from 'react-native';
import { ScrollView} from 'react-native-gesture-handler';
import CartLayout from '../CustomUI/Cart/CartLayout';
import ScheduleModal from '../CustomUI/Modal/ScheduleModal';
import CustomSchedule from '../CustomUI/Modal/CustomSchedule';
import AlertModal from '../CustomUI/Modal/AlertModal';

export default(Comp: ReactClass<*>) => {
  return ({contentContainerStyle,alertVisible,scheduleVisible,schedule_product_id,schedule_product_price,itemQuantity , itemTotalPrice,cartLayout, spinner, children, ...props }: Object) => (
    <View style={styles.mainView}>

      <ScrollView>

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
      {
        scheduleVisible  && 
        <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: 'rgba(255,255,255,0.7)', justifyContent: 'center' ,}
        ]}
      >
         <ScheduleModal product_id={schedule_product_id} price={schedule_product_price} />
      </View>

      }
      {/* {
        alertVisible 
        ?
        <AlertModal alertVisible={alertVisible}/>
        :
        <View/>
      } */}
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


const styles = StyleSheet.create({

  mainView:{
    flex:1,
  },
  mainCardFlex:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    opacity:0.1
  }
})


