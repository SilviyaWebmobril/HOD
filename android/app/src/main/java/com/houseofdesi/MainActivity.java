package com.houseofdesi;

import android.content.Intent;

import com.facebook.react.ReactActivity;
 import com.facebook.react.ReactActivityDelegate;
 import com.facebook.react.ReactRootView;
 import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
public class MainActivity extends ReactActivity {

    @Override
    protected String getMainComponentName() {
        return "HouseOfDesi";
    }
     @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
       return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }

   @Override
    public void onNewIntent(Intent intent) {
                super.onNewIntent(intent);
                setIntent(intent);
            }
}
