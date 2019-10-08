
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
        function (result) {
  
          if (result.isCancelled) {
            console.log('Login cancelled')
          } else {
          
              AccessToken.getCurrentAccessToken().then(
             (data) => {
               let accessToken = data.accessToken
                //Alert.alert(accessToken.toString())
  
               const responseInfoCallback = (error, result) => {
                 if (error) {
                     console.log(error)
                     Alert.alert('Error fetching data: ' + error.toString());
                 } else {
                      console.log(result)
                  Alert.alert('Success fetching data: ' + JSON.stringify(result));
                 }
               }
  
               const infoRequest = new GraphRequest(
                 '/me',
                 {
                   accessToken: accessToken,
                   parameters: {
                     fields: {
                       string: 'email,name,id'
                     }
                   }
                 },
                 responseInfoCallback
               );
  
             
               //ToastAndroid.show("Result ..."+ a.toString(),ToastAndroid.LONG)
  
             }
           )
          }
  
    }.bind(this),
    function (error) {
      console.log('Login fail with error: ' + error)
    }
  )