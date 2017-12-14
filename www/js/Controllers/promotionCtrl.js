angular.module('starter')
  .controller('promotionCtrl', function ($ionicLoading, $scope,helperService,storeService,$cordovaStatusbar,$state,transAndPromoServ,$ionicPopup,$cordovaInAppBrowser,$cordovaGeolocation ) {

  	firstload=true;
  	deviceready=true;

    // $scope.posOptions = {timeout: 10000, enableHighAccuracy: false};
    // $cordovaGeolocation
    // .getCurrentPosition($scope.posOptions)
    // .then(function (position) {
    //   $scope.lat  = position.coords.latitude;
    //   $scope.longi = position.coords.longitude;
    //   console.log($scope.lat);
    //   console.log($scope.longi);
    //   storeService.mobile_get_stores().then(function(userdata){
    //   if(userdata == "reject" || userdata[0] == "error"  )
    //         {
    //           var msg='No stores found';
    //           helperService.alertPopup($scope, msg);
    //         }
    //         else
    //         {
    //
    //            $scope.stores=userdata;
    //
    //              if($scope.stores.length == "0")
    //             {
    //
    //             }
    //             else
    //             {
    //                for(i=0;i<$scope.stores.length;i++)
    //                {
    //                    console.log("this is loop"+ i);
    //                    console.log($scope.stores[i]);
    //                    var storelat = $scope.stores[i].lat;
    //                    var storelng = $scope.stores[i].lng;
    //                    console.log(storelat);
    //                    console.log(storelng);
    //                    // var distance = 499;
    //                   var distance =  $scope.getDistanceFromLatLonInKm($scope.lat, $scope.longi,storelat,storelng);
    //                    if(distance <= 500)
    //                    {
    //                     console.log(distance);
    //                     helperService.alertPopup($scope, "User is within the radius of 500m");
    //                     // transAndPromoServ.getLoyalityPromo().then(function(userdata){
    //                     //     $ionicLoading.hide();
    //
    //                     //     if(userdata == "reject" || userdata[0] == "error")
    //                     //     {
    //                     //           var msg='No promotions found';
    //                     //           helperService.alertPopup($scope, msg);
    //                     //     }
    //                     //     else
    //                     //     {
    //
    //                     //       $scope.promobills=userdata;
    //                     //        if($scope.promobills.length == "0" || $scope.promobills.length == undefined ||$scope.promobills.length == " "|| $scope.promobills.length == "undefined" )
    //                     //         {
    //                     //           var msg='No promotions found';
    //                     //           helperService.alertPopup($scope, msg);
    //                     //         }
    //                     //     }
    //                     // });
    //
    //                     break;
    //                    }
    //                    else
    //                    {
    //                     console.log(distance);
    //                     console.log("i m in else");
    //                    }
    //
    //                }
    //
    //
    //             }
    //
    //
    //
    //         }
    //    });
    //  }, function(err) {
    //   console.log(err);
    //   console.log("geo err");
    //   // error
    // });
    //
    // $scope.getDistanceFromLatLonInKm=function(lat1, lon1, lat2, lon2) {
    //   console.log("showing all lat long of fun");
    //   console.log(lat1);
    //   console.log(lon1);
    //   console.log(lat2);
    //   console.log(lon2);
    //
    //      var radlat1 = Math.PI * lat1/180;
    //     var radlat2 = Math.PI * lat2/180;
    //     var theta = lon1-lon2;
    //     var radtheta = Math.PI * theta/180;
    //     var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    //     dist = Math.acos(dist);
    //     dist = dist * 180/Math.PI;
    //     dist = dist * 60 * 1.1515;
    //     dist = dist * 1.609344 ;
    //     console.log(dist);
    //     dist = dist*1000;
    //     console.log(dist);
    //     return dist
    // }
    //
    //  $scope.deg2rad = function(deg) {
    //   return deg * (Math.PI/180)
    // }



  	if(firstload&&deviceready)
  	{
        $ionicLoading.show({
            template: 'Please wait...'
        });
  	  transAndPromoServ.getLoyalityPromo().then(function(userdata){


            $ionicLoading.hide();

  	  	 	  if(userdata == "reject" || userdata[0] == "error")
            {
                  var msg='No promotions found';
                  helperService.alertPopup($scope, msg);
            }
            else
            {

              $scope.promobills=userdata;
               if($scope.promobills.length == "0" || $scope.promobills.length == undefined ||$scope.promobills.length == " "|| $scope.promobills.length == "undefined" )
                {
                  var msg='No promotions found';
                  helperService.alertPopup($scope, msg);
                }



            }




  	  });
  	}

    $scope.w1_active =false;
    $scope.c1_active =false;
    $scope.pro1_active =true;
    $scope.s1_active =false;
    $scope.m1_active =false;
    $scope.w1icontext_active=false;
    $scope.c1icontext_active=false;
    $scope.pro1icontext_active=true;
    $scope.s1icontext_active=false;
    $scope.m1icontext_active=false;

    $scope.w1icontext=function(){
      if ($scope.w1icontext_active)
        return "w1icontext_active";
      else
        return "w1icontext_inactive";
    }

    $scope.c1icontext=function(){
      if ($scope.c1icontext_active)
        return "c1icontext_active";
      else
        return "c1icontext_inactive";
    }

    $scope.pro1icontext=function(){
      if ($scope.pro1icontext_active)
        return "pro1icontext_active";
      else
        return "pro1icontext_inactive";
    }

    $scope.s1icontext=function(){
      if ($scope.s1icontext_active)
        return "s1icontext_active";
      else
        return "s1icontext_inactive";
    }

    $scope.m1icontext=function(){
      if ($scope.m1icontext_active)
        return "m1icontext_active";
      else
        return "m1icontext_inactive";
    }



    $scope.w1_class=function(){
        if ($scope.w1_active)
        return "w1_active";
      else
        return "w1_inactive";
     }

      $scope.c1_class=function(){
        if ($scope.c1_active)
        return "c1_active";
      else
        return "c1_inactive";
     }

      $scope.pro1_class=function(){
        if ($scope.pro1_active)
        return "pro1_active";
      else
        return "pro1_inactive";
     }

      $scope.s1_class=function(){
        if ($scope.s1_active)
        return "s1_active";
      else
        return "s1_inactive";
     }

      $scope.m1_class=function(){
        if ($scope.m1_active)
        return "m1_active";
      else
        return "m1_inactive";
     }

    $scope.w1Changed=function(){

      if ($scope.w1_active){
        // $scope.w1_active =false;
        //  $scope.w1icontext_active=false;
      }
      else
        {
          $scope.w1_active =true;
          $scope.w1icontext_active=true;
          $state.go('inside.wallet');
        }
    }

    $scope.c1Changed=function(){
      if ($scope.c1_active){
        $scope.c1_active =false;
         $scope.c1icontext_active=false;
      }
      else
        {
          $scope.c1_active =true;
          $scope.c1icontext_active=true;
          $state.go('inside.charity');
        }
     }

    $scope.pro1Changed=function(){
      if ($scope.pro1_active){
        // $scope.pro1_active =false;
        //  $scope.pro1icontext_active=false;
      }
      else
        {
          $scope.pro1_active =true;
          $scope.pro1icontext_active=true;
          $state.go('inside.promotion');
        }

    }

    $scope.s1Changed=function(){
      if ($scope.s1_active){
        $scope.s1_active =false;
         $scope.s1icontext_active=false;
      }
      else
        {
          $scope.s1_active =true;
          $scope.s1icontext_active=true;
          $state.go('inside.store');
        }

    }

    $scope.m1Changed=function(){
      if ($scope.m1_active){
        $scope.m1_active =false;
         $scope.m1icontext_active=false;
      }
      else
        {
          // $scope.m1_active =true;
          // $scope.m1icontext_active=true;
        }

    }

     $scope.promotionmodal=function(data){
      console.log(data);
      $scope.popupWindow(data);


     }
     $scope.popupButtonclick=function(){
      console.log("butfdchge");
     }
    var myPopup;
    $scope.customClosePopup=function(){
        myPopup.close();
    }

    // $scope.bc = {
    // format: 'UPC',
    // lineColor: '#000000',
    // width: 2,
    // height: 100,
    // displayValue: true,
    // fontOptions: '',
    // font: 'monospace',
    // textAlign: 'center',
    // textPosition: 'bottom',
    // textMargin: 2,
    // fontSize: 20,
    // background: '#ffffff',
    // margin: 0,
    // marginTop: undefined,
    // marginBottom: undefined,
    // marginLeft: undefined,
    // marginRight: undefined,
    // valid: function (valid) {
    // }
    //   }


      $scope.optionsS = { "format": "CODE39", "lineColor": "#000000", "width": 3, "height": 100,"quite": 10, "displayValue": true, "font": "monospace", "textAlign": "center", "textPosition": "bottom", "textMargin": 15, "fontSize": 20, "background": "#ffffff", "margin":10, "marginTop": 20, "marginBottom": 20, "marginLeft": 20, "marginRight": 20 }
      var options_url = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
    };

     $scope.takeMetoUrl=function(data){
        console.log(data);
       $cordovaInAppBrowser.open(data, '_blank', options_url)
      .then(function(event) {
        // success
        console.log('sucesssinapp');
      })
      .catch(function(event) {
        // error
        console.log('failed');
      });

     }

     $scope.popupWindow=function(data){
         $scope.image_url=data.offer_image;

          console.log(data);
          $scope.link=data.link;
           // $scope.link=null;
          $scope.linkPresent=false;


               var dataofbutton =  {
                    text: 'More',
                    type: 'button-small mybutton moreButton',
                    onTap: function(e) {

                       $cordovaInAppBrowser.open($scope.link, '_blank', options_url)
                        .then(function(event) {
                          // success
                          console.log('sucesssinapp');
                        })
                        .catch(function(event) {
                          // error
                          console.log('failed');
                        });

                    }
                }

          $scope.showBarcode=false;
          if(data.showupc=="1")
          {
             console.log("i m in if>>>>>");
            $scope.showBarcode=true;
          }
          else{
            console.log("i m in else>>>>>");
            $scope.showBarcode=false;
          }
           $scope.txt = data.upc;
           console.log($scope.txt);
          $scope.codeEan={
            name : 'EAN-13',
             type : 'ean13',
              text :$scope.txt,

               scale : { x : 5, y : 2 },
                options : 'includetext guardwhitespace' }

           if($scope.link)
           {
              myPopup = $ionicPopup.show({
              template: '<div style="position: absolute;float: right;top: -32px;right: 0px;" ng-click="customClosePopup()"><img src="img/popupcancel.png" style="width: 30px;height: 30px;"></div><div class="popupimage" style="background-image: url({{image_url}});"  ></div><div ></div><div style="text-align:center;padding: 10px 10px 0px 10px;" ng-if="showBarcode"><td-barcode config="codeEan" class="barcode"></td-barcode></div>',
              title: '',
              cssClass: 'my-custom-popup',
              scope: $scope,
              buttons: [
              dataofbutton
               // {
               //    text: 'Buy',
               //    type: ' button-small mybutton',
               //    onTap: function(e) {
               //       }
               //  },dataofbutton
              ]
            });

            myPopup.then(function(res) {
              console.log('Tapped!', res);
            });
           }
           else{

            myPopup = $ionicPopup.show({
            template: '<div style="position: absolute;float: right;top: -32px;right: 0px;" ng-click="customClosePopup()"><img src="img/popupcancel.png" style="width: 30px;height: 30px;"></div><div class="popupimage" style="background-image: url({{image_url}})"  ></div><div ></div><div style="text-align:center;padding: 10px 10px 0px 10px;" ng-if="showBarcode"><td-barcode config="codeEan" class="barcode"></td-barcode></div>',
               title: '',
              cssClass: 'my-custom-popup',
              scope: $scope,

            });

            myPopup.then(function(res) {
              console.log('Tapped!', res);
            });

           }
          // <div class="WorkSansBold" style="margin-top: 4%;color: #173866"> $46.00</div><div class="WorkSansLight" style="color: #4f4f4f;">Black Patent Leather Up Booties </div>

     }



  });
