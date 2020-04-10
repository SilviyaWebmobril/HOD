// @flow
import React from 'react';
import { View, StyleSheet, ActivityIndicator,RefreshControl,KeyboardAvoidingView} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ScrollView} from 'react-native-gesture-handler';
import CartLayout from '../CustomUI/Cart/CartLayout';
import ScheduleModal from '../CustomUI/Modal/ScheduleModal';
import CustomSchedule from '../CustomUI/Modal/CustomSchedule';
import AlertModal from '../CustomUI/Modal/AlertModal';
import { KeyboardAwareHOC } from './mainHoc';
import AddressModal from '../CustomUI/Modal/AddressModal';
import VerifyUserDetails from '../CustomUI/Modal/VerifyUserDetails';
import TimerModal from '../CustomUI/Modal/TimerModal';

export default(Comp: ReactClass<*>) => {
  return ({contentContainerStyle,alertVisible,refreshing,
    onRefresh,scheduleVisible,schedule_product_id,schedule_product_price,itemQuantity , 
    itemTotalPrice,cartLayout, spinner,addressModal,
    cancelCallback,changeAddressCallback,verifyConfirmDetailsToCheckout,userDetails,
    timerModal,cancelTimerInterVal, children, ...props }: Object) => (

   
      // <KeyboardAwareScrollView >
        <View  style={styles.mainView} >
        <ScrollView
            
            refreshControl ={
              <RefreshControl
              refreshing ={refreshing}
              onRefresh = {onRefresh}
              
              />} > 

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
                <ActivityIndicator size="large"  color="#48241e"/>
              </View>}


        {addressModal && 
          <View 
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center' ,alignItems:"center"}
          ]}>
            <AddressModal cancelCallback={cancelCallback}/>
          </View>
        }

      {userDetails && 
          <View 
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center' ,alignItems:"center"}
          ]}>
            <VerifyUserDetails cancelCallback={cancelCallback} changeAddressCallback={changeAddressCallback} verifyConfirmDetailsToCheckout={verifyConfirmDetailsToCheckout}/>
          </View>
        }

        {timerModal  && 
          <View 
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center' ,alignItems:"center"}
          ]}>
            <TimerModal cancelTimerInterVal={cancelTimerInterVal}/>
          </View>
        }



        </View>

          
      // </KeyboardAwareScrollView>
        
    
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


