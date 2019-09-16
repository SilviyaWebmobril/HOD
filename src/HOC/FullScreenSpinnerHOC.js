// @flow
import React from 'react';
import { View, StyleSheet, ActivityIndicator} from 'react-native';
import { ScrollView} from 'react-native-gesture-handler';
import CartLayout from '../CustomUI/Cart/CartLayout';
import ScheduleModal from '../CustomUI/Modal/ScheduleModal';
import CustomSchedule from '../CustomUI/Modal/CustomSchedule';

export default(Comp: ReactClass<*>) => {
  return ({scheduleVisible,customScheduleVisible,itemQuantity , itemTotalPrice,cartLayout, spinner, children, ...props }: Object) => (
    <View style={styles.mainView}>

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
      {
        scheduleVisible  && 
        <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: 'rgba(255,255,255,0.7)', justifyContent: 'center' ,}
        ]}
      >
         <ScheduleModal/>
      </View>

      }
      {
        customScheduleVisible  && 
        <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: 'rgba(255,255,255,0.7)', justifyContent: 'center' ,}
        ]}
      >
         <CustomSchedule />
      </View>

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


