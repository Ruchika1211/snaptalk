angular.module('starter')

    .service('loginService', function($q, $http, $httpParamSerializerJQLike,$ionicLoading,helperService, $ionicPopup, API_ENDPOINT,UserService, $ionicLoading) {
        // var loyality_code = ;
        // var password = ;
        // var sid = ;
        var loyaltycard =  window.localStorage.getItem("loyality_code");
        var sid =  window.localStorage.getItem("sid");
        var  userdetails={};
        userdetails.loyaltycard=loyaltycard ;
       
        userdetails.sid=sid;
        userdetails.store_id="1";
         


        var storeusercreds = function(userdata) {
            window.localStorage.setItem('loyality_code', userdata[1]);
            window.localStorage.setItem('password', userdata[2]);
            window.localStorage.setItem('sid', userdata[3]);

        }

        var signup = function(userdata) {
            console.log(userdata);

            return $q(function(resolve, reject) {

                // $http.post(API_ENDPOINT.url + '/mobile_new_loyalty_member', userdata)
                $http({
                        url: API_ENDPOINT.url + '/mobile_new_loyalty_member',
                        method: 'POST',
                        data: $httpParamSerializerJQLike(userdata), // Make sure to inject the service you choose to the controller
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
                        }
                    })
                    .success(function(result) {
                        if (result[0] == 'ok') {
                            console.log("result");
                            console.log(result);
                            // showingAlert = false;
                            window.localStorage.setItem('password', result[2]);
                            resolve(result);
                        } else {
                            console.log("rejeect");
                            resolve(result);
                        }
                    }).error(function(errMsg) {
                          console.log(errMsg);
                         console.log('errMsg');
                         $ionicLoading.hide();
                          helperService.alertPopup("dsrdr", "Error in  connection. Please try again");
                        });
                    });
        }

        var signIn = function(userSigndata) {
           

            return $q(function(resolve, reject) {
                $http({
                    url: API_ENDPOINT.url + '/mobile_login',
                    method: 'POST',
                    data: $httpParamSerializerJQLike(userSigndata), // Make sure to inject the service you choose to the controller
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
                    }
                }).success(function(result) {
                    if (result[0] == 'ok') {
                     
                        window.localStorage.setItem('loyality_code', result[1]);
                        window.localStorage.setItem('sid', result[2].member[0].sid);
                        loggedUser=true;
                        var data_dashboard=dashboardData();
                          
                        resolve(result);
                    } 
                    else {
                        resolve("reject");
                    }
                }).error(function(errMsg) {
                          console.log(errMsg);
                         console.log('errMsg');
                         $ionicLoading.hide();
                          helperService.alertPopup("dsrdr", "Error in  connection. Please try again");
                        });
                    });
        }

          var dashboardData = function() {


            
                var loyaltycarddata =  window.localStorage.getItem("loyality_code");
                var siddata =  window.localStorage.getItem("sid");
                var userCreds={};
                userCreds.sid=siddata;
                userCreds.loyaltycard=loyaltycarddata;
                
            return $q(function(resolve, reject) {

                // $http.post(API_ENDPOINT.url + '/mobile_new_loyalty_member', userdata)
                $http({
                         url: API_ENDPOINT.url + '/mobile_get_loyalty_summary',
                         method: 'POST',
                        data: $httpParamSerializerJQLike(userCreds), // Make sure to inject the service you choose to the controller
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
                        }
                    })
                    .success(function(userdata) {

                         console.log("resultofdashboard");
                            console.log(userdata);
                             if (userdata[0] == 'ok') {
                                   UserService.setSelectedUserdata(userdata);
                                   resolve(userdata);
                      
                               }
                       
                    }).error(function(errMsg) {
                          console.log(errMsg);
                         console.log('errMsg');
                         $ionicLoading.hide();
                          helperService.alertPopup("dsrdr", "Error in  connection. Please try again");
                        });
                    });
          
   
        }

        var socialLogin_signup = function(userdata) {
            
            return $q(function(resolve, reject) {

                // $http.post(API_ENDPOINT.url + '/mobile_new_loyalty_member', userdata)
                $http({
                        url: API_ENDPOINT.url + '/mobile_new_loyalty_member',
                        method: 'POST',
                        data: $httpParamSerializerJQLike(userdata), // Make sure to inject the service you choose to the controller
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
                        }
                    })
                    .success(function(result) {
                        console.log(result);
                        if (result[0] == 'ok') {
                            console.log("i m in if>>>");
                           
                             var userSigndata = {};
                                userSigndata.email = userdata.email;
                                userSigndata.password = result[2];
                                userSigndata.FB_Google_id = userdata.facebook_id;
                             $http({
                                        url: API_ENDPOINT.url + '/mobile_validated_login',
                                        method: 'POST',
                                        data: $httpParamSerializerJQLike(userSigndata), // Make sure to inject the service you choose to the controller
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
                                        }
                                    }).success(function(resultofsilentsignin) {
                                        console.log(resultofsilentsignin);
                                        if (resultofsilentsignin[0] == 'ok') {
                                            console.log("resultofsilentsignin");
                                            window.localStorage.setItem('loyality_code', resultofsilentsignin[1]);
                                            window.localStorage.setItem('sid', resultofsilentsignin[2].member[0].sid);

                                            resolve("login success");
                                        } else {
                                            resolve("error in signin");
                                        }
                                    });
                           
                        }
                        else if (result[1] == "This email is already used.") 
                        {
                            console.log("i m in else if>>>");
                            resolve("signup failed email exist");
                          
                        } else {
                            console.log("i m in else >>>");
                            resolve("signup failed");
                        }
                    }).error(function(errMsg) {
                          console.log(errMsg);
                         console.log('errMsg');
                         $ionicLoading.hide();
                          helperService.alertPopup("dsrdr", "Error in  connection. Please try again");
                        });
                    });
        }

          var socialLogin = function(userdata) {
            
            return $q(function(resolve, reject) {

                // $http.post(API_ENDPOINT.url + '/mobile_new_loyalty_member', userdata)
                $http({
                        url: API_ENDPOINT.url + '/mobile_validated_login',
                        method: 'POST',
                        data: $httpParamSerializerJQLike(userdata), // Make sure to inject the service you choose to the controller
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
                        }
                    })
                    .success(function(result) {
                        console.log(result);
                            console.log("result>>>>>>>>>>>>>>>>>");
                        if (result[0] == 'ok') {
                         
                            window.localStorage.setItem('loyality_code', result[1]);
                            window.localStorage.setItem('sid', result[2].member[0].sid);
                             var distance=result[3].distance;
                              var distancetype=result[3].distancetype;
                              var showall=result[3].showall;
                              if(distance){
                                window.localStorage.setItem('distance', distance);
                               }
                               if(distancetype){
                                window.localStorage.setItem('distancetype', distancetype);
                              }
                               if(showall){
                                window.localStorage.setItem('showall',showall);
                              }
                              
                              
                              

                            resolve("login sucesss");
                        } else {
                            
                            resolve("login failed");
                        }
                    }).error(function(errMsg) {
                          console.log(errMsg);
                         console.log('errMsg');
                         $ionicLoading.hide();
                          helperService.alertPopup("dsrdr", "Error in  connection. Please try again");
                        });
                    });
        }


     

        var forgotPassword = function(userdata) {
            console.log(userdata);

            return $q(function(resolve, reject) {

                $http
                    ({
                        url: API_ENDPOINT.url + '/mobile_forgot_password',
                        method: 'POST',
                        data: $httpParamSerializerJQLike(userdata), // Make sure to inject the service you choose to the controller
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
                        }
                    }).success(function(result) {
                        if (result) {
                            // showingAlert = false;
                            // storeusercreds(result.data);
                            resolve(result);
                        } else {
                            resolve("reject");
                        }
                    }).error(function(errMsg) {
                          console.log(errMsg);
                         console.log('errMsg');
                         $ionicLoading.hide();
                          helperService.alertPopup("dsrdr", "Error in  connection. Please try again");
                        });
                    });
        }

        var mobileGetPoints = function() {
            
             var loyaltycarddata =  window.localStorage.getItem("loyality_code");
             var siddata =  window.localStorage.getItem("sid");
             var url='/mobile_get_points?sid=' + siddata + '&loyaltycard='+loyaltycarddata ;

            // return $q(function(resolve, reject) {

                $http
                    ({
                        url: API_ENDPOINT.url + url,
                        method: 'GET',
                        // data: $httpParamSerializerJQLike(userdata), // Make sure to inject the service you choose to the controller
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
                        }
                    }).then(function(result) {
                        console.log(result);
                        if (result) {
                            // showingAlert = false;
                            // storeusercreds(result.data); 
                            return result.data ;
                           
                        } else {
                           return "error";
                        }
                    });

            // });
        }
        

        return {
            signup: signup,
            signIn: signIn,
            forgotPassword: forgotPassword,
            socialLogin: socialLogin,
            socialLogin_signup:socialLogin_signup,
            dashboardData:dashboardData,
            mobileGetPoints:mobileGetPoints
        }

    });

// .factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
//   return {
//     responseError: function (response) {
//       $rootScope.$broadcast({
//         401: AUTH_EVENTS.notAuthenticated,
//       }[response.status], response);
//       return $q.reject(response);
//     }
//   };
// })

// .config(function ($httpProvider) {
//   $httpProvider.interceptors.push('AuthInterceptor');
// });