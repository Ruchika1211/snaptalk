angular.module('starter')
    .controller('signInCtrl', function($ionicLoading,$cordovaToast,UserService,$ionicHistory, $stateParams, helperService, $scope, $ionicPopup, $state, $cordovaStatusbar, loginService, $cordovaFacebook) {
        $scope.loginData = {};
        $scope.Newpassword = {};
        // $cordovaStatusbar.hide();
        console.log($stateParams);
        if ($stateParams.email) {
            $scope.loginData.email = $stateParams.email;
        }

        if ($stateParams.password) {
            $scope.loginData.password = $stateParams.password;
        }
        // $scope.showAlert = function() {
        //             var alertPopup = $ionicPopup.alert({
        //               title: 'Snaptalk',
        //               okType :'popupchange',
        //               template: 'Signin failed'
        //             });

        //             alertPopup.then(function(res) {
        //               console.log('Thank you for not eating my delicious ice cream cone');
        //             });
        //           };


        $scope.doLogin = function() {
            console.log("controller");
            console.log($scope.loginData);
            loginService.signIn($scope.loginData).then(function(userdata) {
                console.log(userdata);
                console.log("userdata//////////////");
                if (userdata[0] == 'ok') {                           
                    // UserService.setSelectedUserdata(userdata);
                    window.localStorage.setItem("userloggin", "sucesss");
                      var distance=userdata[3].distance;
                      var distancetype=userdata[3].distancetype;
                      var showall=userdata[3].showall;
                       if(distance){
                        window.localStorage.setItem('distance', distance);
                       }
                       if(distancetype){
                        window.localStorage.setItem('distancetype', distancetype);
                      }
                       if(showall){
                        window.localStorage.setItem('showall',showall);
                      }
                    $state.go('inside.dashboard');
                } else {
                    helperService.alertPopup($scope, "Incorrect login details. Please try again")
                }

            });

        }

       
       $scope.goback= function() {
         $state.go('signIn');
       }

        $scope.passwordReset = function() {
            loginService.forgotPassword($scope.Newpassword).then(function(userdata) {
                 if(userdata == "reject" || userdata[0] == "error")
                 {
                      helperService.alertPopup($scope, "Invalid details. Please try again");
                 }
                 else
                 {
                    $cordovaToast.showLongCenter('A new password has been sent to your email.').then(function(success) {
                    // success
                    console.log("success");
                      }, function (error) {
                        console.log("failed");
                        // error
                      });
                    $state.go('signIn');

                 }
                
            });

        }


          $scope.facebookLogin = function() {
            console.log('facebookLogin');
            $ionicLoading.show({
                template: 'Please wait...'
            });

            $cordovaFacebook.login(["public_profile", "email", "user_friends"])
                .then(function(data) {
                    $cordovaFacebook.api("me?fields=first_name,last_name,email", ["public_profile", "email", "user_friends"])
                        .then(function(success) {
                            if (success.id) {
                                 var tempdata={};
                         
                                tempdata.firstname=success.first_name;
                                tempdata.lastname=success.last_name;
                                tempdata.email=success.email;
                                tempdata.FB_Google_id=success.id;

                                loginService.socialLogin(tempdata).then(function(userdata) {
                                    console.log(userdata);
                                    console.log("userdata of fb");
                                    if (userdata == 'login sucesss') {
                                            $ionicLoading.hide();
                                           window.localStorage.setItem("userloggin", "sucesss");
                                          $state.go('inside.dashboard');
                                    } 
                                    else {
                                        $ionicLoading.hide();
                                        
                                        helperService.alertPopup($scope, "Incorrect login details. Please try again");
                                    }

                                });
                            }
                            $cordovaFacebook.logout()
                            .then(function(success) {
                                console.log("logout success");
                              // success
                            }, function (error) {
                                console.log("logout failed");
                              // error
                            });

                        }, function(error) {
                            console.log(error);
                            $ionicLoading.hide();
                        });
                },function(error) {
                            console.log(error);
                            $ionicLoading.hide();
                });

        }

        $scope.googleLogin = function() {
            console.log('googleLogin');
            //   $ionicLoading.show({
            //   template: 'Please wait...'
            // });
            window.plugins.googleplus.login({},
                function(user_data) {
                      var name=user_data.displayName.split(" ");
                    var data = {
                        email: user_data.email,
                         firstname:name[0],
                        lastname:name[1]
                    };
                   

                    loginService.socialLogin(data).then(function(userdata) {
                        console.log(userdata);
                        console.log("userdata of google");
                        window.plugins.googleplus.logout(
                            function (msg) {
                              console.log("google logout");
                            }
                        );
                            if (userdata == 'login sucesss') {
                                $ionicLoading.hide();
                                console.log("i m in if");
                              
                                window.localStorage.setItem("userloggin", "sucesss");
                                $state.go('inside.dashboard');
                            } 
                            else {
                                $ionicLoading.hide();
                                console.log("i m in else");
                                
                                helperService.alertPopup($scope, "Incorrect login details. Please try again");
                            }
                    })


                },function(error) {
                            console.log(error);
                            $ionicLoading.hide();
                });
        }




    });