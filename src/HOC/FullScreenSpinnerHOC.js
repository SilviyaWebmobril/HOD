// @flow
import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default (Comp: ReactClass<*>) => {
  return ({ spinner, children, ...props }: Object) => (
    <View style={{ flex: 1 }}>

      <ScrollView>

          <Comp {...props}>
            {children}
          </Comp>
          {spinner &&
            <View
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }
              ]}
            >
              <ActivityIndicator size="large" />
            </View>}
      

      </ScrollView>
   
      
    </View>
  );
};