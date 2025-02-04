package com.houseofdesi;

import android.app.Application;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;

import com.facebook.react.ReactApplication;
import com.github.wumke.RNExitApp.RNExitAppPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.razorpay.rn.RazorpayPackage;

import com.kishanjvaghela.cardview.RNCardViewPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;

import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;

import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;

import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNExitAppPackage(),
            new NetInfoPackage(),
            new RNDeviceInfo(),
            new FBSDKPackage(mCallbackManager),
            new RazorpayPackage(),
            new RNCardViewPackage(),
            new RNCWebViewPackage(),
            new RNFirebasePackage(),
            new AsyncStoragePackage(),
            new ReactVideoPackage(),
            new VectorIconsPackage(),
            new RNGestureHandlerPackage(),
            new RNFirebaseMessagingPackage(),
            new RNFirebaseNotificationsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    FacebookSdk.sdkInitialize(getApplicationContext());
    FacebookSdk.setApplicationId("462972570974215");
    AppEventsLogger.activateApp(this);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
