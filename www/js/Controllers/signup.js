angular.module('starter')
    .controller('signUpCtrl', function($ionicLoading,$cordovaToast,$scope, $cordovaStatusbar, helperService, loginService, $state, $cordovaFacebook, $ionicPopup) {

        // $cordovaStatusbar.hide();
        $scope.loginData;
        $scope.fbData;
        // $scope.showAlert = function() {
        //             var alertPopup = $ionicPopup.alert({
        //               title: 'Snaptalk',
        //               okType :'popupchange',
        //               template: 'Signup failed'
        //             });

        //             alertPopup.then(function(res) {
        //               console.log('Thank you for not eating my delicious ice cream cone');
        //             });
        //           };

         var myPopup;

        $scope.customClosePopup=function(){
            myPopup.close();
        }

        $scope.doSignUp = function() {
            $ionicLoading.show({
                template: 'Please wait...'
            });
            // var name=$scope.loginData.username.split(" ");

            // $scope.loginData.firstname=name[0];
            //  $scope.loginData.lastname=name[1];
            loginService.signup($scope.loginData).then(function(userdata) {

                console.log("userdata");


                if (userdata[0] == 'ok') {
                    // console.log($scope.loginData.email);
                    // console.log(userdata[2]);
                    // console.log('$scope.loginData.email');
                    $ionicLoading.hide();
                    var data1='Sign up successful. Please check your email for account details"';
                    $cordovaToast.showLongCenter(data1).then(function(success) {
                    // success
                    console.log("success");
                  }, function (error) {
                    console.log("failed");
                    // error
                  });
                    $state.go('signIn', {
                        email: $scope.loginData.email,
                        password: userdata[2]
                    });
                } else {
                    console.log('i m in else');
                    $ionicLoading.hide();
                    var msg='This email is already in use';
                    helperService.alertPopup($scope, msg);
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
                         $scope.tempdata={};
                        console.log("sucess fb");
                        console.log(success);
                        $scope.tempdata.firstname=success.first_name;
                            $scope.tempdata.lastname=success.last_name;
                       
                            $scope.tempdata.FB_Google_id=success.id;
                        if (success.email) {
                  
                            $scope.tempdata.email=success.email;
                          
                            loginService.socialLogin_signup($scope.tempdata).then(function(userdata) {
                                console.log(userdata);
                                 console.log("userdataLohg");
                                if (userdata == 'signup failed') {
                                    $ionicLoading.hide();
                                    var msg='signup failed';
                                    helperService.alertPopup($scope, msg);
                                }
                                else if (userdata == 'signup failed email exist') 
                                {
                                    $ionicLoading.hide();
                                    var msg='This email is already in use';
                                    helperService.alertPopup($scope, msg); 
                                } 
                                else if (userdata == 'error in signin') 
                                {
                                    $ionicLoading.hide();
                                    var msg='Incorrect login details. Please try again';
                                    helperService.alertPopup($scope, msg);
                                }
                                else 
                                {
                                    $ionicLoading.hide();
                                     window.localStorage.setItem("userloggin", "sucesss");
                                    $state.go('inside.dashboard');
                                }



                            });
                        }
                        else
                        {
                           $ionicLoading.hide();
                            // var msg='phone no linked account';
                            // helperService.alertPopup($scope, msg);
                            
                            var myPopup = $ionicPopup.show({
                            template: '<input type="email" placeholder="Email Address" ng-model="tempdata.email" style="border:1px solid #ddd;border-radius:500px;padding-left:5%" >',
                            title: 'Please enter your email',
                            cssClass: 'my-signup-popup',
                            scope: $scope,
                            buttons: [
                              { text: 'Cancel' ,
                                 type: 'button-small mybutton moreButton'},
                              {
                                text: 'Ok',
                                type: 'button-small mybutton moreButton',
                                onTap: function(e) {
                                   if($scope.tempdata.email)
                                   {

                                       loginService.socialLogin_signup($scope.tempdata).then(function(userdata) {
                                        console.log(userdata);
                                         console.log("userdataLohg");
                                        if (userdata == 'signup failed') {
                                            $ionicLoading.hide();
                                            var msg='signup failed';
                                            helperService.alertPopup($scope, msg);
                                        }
                                        else if (userdata == 'signup failed email exist') 
                                        {
                                            $ionicLoading.hide();
                                            var msg='This email is already in use';
                                            helperService.alertPopup($scope, msg); 
                                        } 
                                        else if (userdata == 'error in signin') 
                                        {
                                            $ionicLoading.hide();
                                            var msg='Incorrect login details. Please try again';
                                            helperService.alertPopup($scope, msg);
                                        }
                                        else 
                                        {
                                            $ionicLoading.hide();
                                             window.localStorage.setItem("userloggin", "sucesss");
                                            $state.go('inside.dashboard');
                                        }

     

                                    });

                                   }
                                   else
                                   {
                                     var msg='Please provide an email to login';
                                     helperService.alertPopup($scope, msg);
                                   }
                              
                             

                                 
                                }
                              }
                            ]
                            });

                              myPopup.then(function(res) {
                                console.log('Tapped!', res);
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
            }, function(error) {
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
                    console.log(user_data);
                    console.log("user_data");
                    var name=user_data.displayName.split(" ");
                   console.log(name);
                    var data = {
                        email: user_data.email,
                        firstname:name[0],
                        lastname:name[1]
                          };
                   

                    loginService.socialLogin_signup(data).then(function(userdata) {
                        console.log(userdata);
                        console.log("userdataLohg");
                        window.plugins.googleplus.logout(
                            function (msg) {
                              console.log("google logout");
                            }
                        );
                                   if (userdata == 'signup failed') {
                                        $ionicLoading.hide();
                                        var msg='Error signing up. Please try again';
                                        helperService.alertPopup($scope, msg);
                                    }
                                    else if (userdata == 'signup failed email exist') 
                                    {
                                        $ionicLoading.hide();
                                        var msg='This email is already in use';
                                        helperService.alertPopup($scope, msg); 
                                    } 
                                    else if (userdata == 'error in signin') 
                                    {
                                        $ionicLoading.hide();
                                        var msg='Incorrect login details. Please try again';
                                        helperService.alertPopup($scope, msg);
                                    }
                                    else 
                                    {
                                        $ionicLoading.hide();
                                         window.localStorage.setItem("userloggin", "sucesss");
                                        $state.go('inside.dashboard');
                                    }
                    })


                },function(error) {
                            console.log(error);
                            $ionicLoading.hide();
                });
        }

    })