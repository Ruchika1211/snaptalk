angular.module('starter')
  .controller('dashboardCtrl', function ($ionicLoading,$ionicPopup ,helperService,$rootScope,API_ENDPOINT,$http ,$scope,$cordovaStatusbar,$state,UserService,$rootScope,loginService,$cordovaToast) {
    // $cordovaStatusbar.show();
  // $cordovaStatusbar.styleColor('white');
    $scope.loyaltycarddata =  window.localStorage.getItem("loyality_code");
    var loggedUser=window.localStorage.getItem("userloggin");
    var firstload=true;
    var deviceready=true;
    $scope.userDetail=UserService.getSelectedUserdata();

     var myPopup;
    $scope.customClosePopup=function(){
        myPopup.close();
    }

    $scope.mypromotion =function(){
        $state.go('inside.promotion');
    }

    $scope.mystore =function(){
        $state.go('inside.store');
      }

     $scope.mywallet =function(){
        $state.go('inside.wallet');
    }

    $scope.mycharity =function(){
        $state.go('inside.charity');
    }

     $scope.events =function(){
        $state.go('inside.events');
      }

      $scope.redirectToProfile =function(){
         $scope.myImage='img/proActive.png';
           $rootScope.$broadcast('profileClicked',"changeUrl");
        $state.go('inside.profile');
      }

      $scope.transhistory =function(){
        $state.go('inside.transactionhistory');
      }

      $scope.codeEan={
            name : 'EAN-13',
             type : 'ean13',
              text : $scope.loyaltycarddata,
              scale : { x : 5, y : 2 },
                options : 'includetext guardwhitespace' }

      $scope.showupcPopup=function(){


         myPopup = $ionicPopup.show({
              template: '<div style="position: absolute;float: right;top: -32px;right: 0px;" ng-click="customClosePopup()"><img src="img/popupcancel.png" style="width: 30px;height: 30px;"></div><div style="text-align:center;padding: 10px 10px 0px 10px;" ><td-barcode config="codeEan" class="barcoded"></td-barcode></div>',
              title: '',
              cssClass: 'my-dash-popup',
              scope: $scope,
             });

            myPopup.then(function(res) {
              console.log('Tapped!', res);
            });

      }



      $scope.showrewardPopup=function()
      {

          var loyaltycarddata =  window.localStorage.getItem("loyality_code");
          var siddata =  window.localStorage.getItem("sid");
          var url='/mobile_get_points?sid=' + siddata + '&loyaltycard='+loyaltycarddata ;

          $ionicLoading.show({
            template: 'Please wait...'
           });
          $http
          ({
              url: API_ENDPOINT.url + url,
              method: 'GET',
              // data: $httpParamSerializerJQLike(userdata), // Make sure to inject the service you choose to the controller
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
              }
          }).success(function(result) {
              console.log(result);
              if (result[0] != "error") {
                  $scope.totalPoints=result[1];
                  if($scope.totalPoints.length > 0)
                  {
                       $ionicLoading.hide();
                      myPopup = $ionicPopup.show({
                        template: '<div style="position: absolute;float: right;top: -32px;right: 0px;" ng-click="customClosePopup()"><img src="img/popupcancel.png" style="width: 30px;height: 30px;"></div><div style="max-height:250px" ng-repeat="tpoint in totalPoints"><div  class="row" style="padding: 0px;"><p class="col WorkSanRegular " style="margin: 0px;color:#002d63;">Name:</p><p  class="col col-67 WorkSanRegular" style="margin: 0px;color:#002d63;">{{tpoint.points_name}}</p></div><div  class="row" style="padding: 0px;" ><p class="col WorkSansLight" style="color:#002d63;">Rewards:</p><p  class="col col-67 WorkSansExtraLight" style="color:#002d63;">{{tpoint.points}}</p></div><div class="row" style="padding: 0px;"><div class="col-33"></div> <button class="col button-small redeembutton" ng-click="redeemClicked(tpoint)">Redeem</button><div class="col-33"></div></div></div>',
                        title: '',
                        cssClass: 'my-reward-popup',
                        scope: $scope,

                       });

                      myPopup.then(function(res) {
                        console.log('Tapped!', res);
                      });
                  }
                  else
                  {

                      $ionicLoading.hide();
                      myPopup = $ionicPopup.show({
                        template: '<div style="position: absolute;float: right;top: -32px;right: 0px;" ng-click="customClosePopup()"><img src="img/popupcancel.png" style="width: 30px;height: 30px;"></div><div style="height: 50px;text-align: center;margin-top: 5%;"><div>No points found.</div></div>',
                        cssClass: 'my-reward-popup',
                        scope: $scope,

                       });

                      myPopup.then(function(res) {
                        console.log('Tapped!', res);
                      });
                     console.log("do nothing")
                  }




              } else {
                       $ionicLoading.hide();

                      myPopup = $ionicPopup.show({
                        template: '<div style="position: absolute;float: right;top: -32px;right: 0px;" ng-click="customClosePopup()"><img src="img/popupcancel.png" style="width: 30px;height: 30px;"></div><div style="height: 50px;text-align: center;margin-top: 5%;"><div>No points found.</div></div>',
                        cssClass: 'my-reward-popup',
                        scope: $scope,

                       });

                      myPopup.then(function(res) {
                        console.log('Tapped!', res);
                      });
                     console.log("do nothing")
              }
          }).error(function(){
                                  $ionicLoading.hide();
                                  helperService.alertPopup($scope, "Error in connection please try again later")
                          });




      }

      $scope.redeemClicked=function(tpoint){

            $ionicLoading.show({
            template: 'Please wait...'
           });

            var point_id=tpoint.points_id;
            var loyaltycarddata =  window.localStorage.getItem("loyality_code");
            var siddata =  window.localStorage.getItem("sid");

            var pointsurl='/mobile_get_points_value?sid=' + siddata + '&loyaltycard='+loyaltycarddata + '&points_id='+point_id ;

                      $http
                          ({
                              url: API_ENDPOINT.url + pointsurl,
                              method: 'GET',
                              // data: $httpParamSerializerJQLike(userdata), // Make sure to inject the service you choose to the controller
                              // ng-class="$last ? 'redeembuttonnot' : 'redeembutton'"

                              headers: {
                                  'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
                              }
                          }).success(function(result) {
                              console.log(result);
                                 myPopup.close();
                              if (result[0] != "error") {
                                 console.log("in if");
                                 $scope.totaldenominations=result[1][0].denominations;

                                  $scope.pointId=result[1][0].points_id;

                                  if($scope.totaldenominations.length > 0)
                                  {
                                       $ionicLoading.hide();
                                       myPopup = $ionicPopup.show({
                                        template: '<div style="position: absolute;float: right;top: -32px;right: 0px;" ng-click="customClosePopup()"><img src="img/popupcancel.png" style="width: 30px;height: 30px;"></div><div style="max-height:250px" ><div class="row" style="padding: 0px;" ng-repeat="tpoint in totaldenominations" ><div class="col-33"></div><button class="col button-small " ng-click="dominationClicked({{pointId}},tpoint)" ng-class="{redeembuttonnot: $last , redeembutton: !$last}">Redeem ${{tpoint.denomination}}</button><div class="col-33"></div></div></div>',
                                        title: '',
                                        cssClass: 'my-reward-popup',
                                        scope: $scope,

                                       });

                                      myPopup.then(function(res) {
                                        console.log('Tapped!', res);
                                      });
                                  }
                                  else
                                  {
                                    console.log("in else");
                                     $ionicLoading.hide();
                                     helperService.alertPopup($scope, "Insufficient points");
                                  }




                              } else {
                                  $ionicLoading.hide();
                                  helperService.alertPopup($scope, "Error occur while redeeming please try again .")
                              }
                               $ionicLoading.hide();
                          })
                          .error(function() {
                                  $ionicLoading.hide();
                                  helperService.alertPopup($scope, "Error occur while redeeming please try again .")
                          });

         }

         $scope.dominationClicked=function(pointId,clickedone){

                var redeem_points=clickedone.points;
                var denomination=clickedone.denomination;
                var loyaltycarddata =  window.localStorage.getItem("loyality_code");
                var siddata =  window.localStorage.getItem("sid");

               var confirmPopup = $ionicPopup.confirm({

                     title: 'Snaptalk',
                     okType: 'popupchange',
                     template: '<div class="popupbutton" style="margin-left: 3%;margin-right: 3%;">Are you sure you want to redeem $'+ denomination +' ?</div>',
                     cssClass: 'my-confirmcustom-popup',
                  });

                  confirmPopup.then(function(res) {
                     if(res)
                      {
                         $ionicLoading.show({
                          template: 'Please wait...'
                         });
                         var pointsurl='/mobile_redeem_points?sid=' + siddata + '&loyaltycard='+loyaltycarddata + '&points_id='+pointId  + '&redeem_points='+redeem_points + '&denomination='+denomination;
                          //myPopup.close();


                         $http
                          ({
                              url: API_ENDPOINT.url + pointsurl,
                              method: 'GET',
                              // data: $httpParamSerializerJQLike(userdata), // Make sure to inject the service you choose to the controller
                              headers: {
                                  'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
                              }
                          }).success(function(result) {
                              console.log(result);
                                 
                              if (result[0] != "error") {
                                 console.log("in if");
                                 myPopup.close();
                                $ionicLoading.hide();
                                
                                 $state.go('inside.wallet');
                                  $cordovaToast.showShortCenter('Redeem succesful.').then(function(success) {
                                    // success
                                    console.log("success");
                                      }, function (error) {
                                        console.log("failed");
                                        // error
                                      });
                                //helperService.alertPopup($scope, "Redeemed Succesfully")


                              } else {

                                  myPopup.close();
                                  $ionicLoading.hide();
                                  helperService.alertPopup($scope, "Error occur while redeeming please try again .") ;
                              }
                          }).error(function() {
                                  myPopup.close();
                                 $ionicLoading.hide();
                                  helperService.alertPopup($scope, "Error occur while redeeming please try again .") ;

                          });
                      }
                     else {

                        confirmPopup.close();
                         myPopup.close();
                        //  $ionicLoading.hide();
                        // helperService.alertPopup($scope, "Error occur while redeeming please try again .") ;
                     }
                  });

                   $ionicLoading.hide();
               };
});
