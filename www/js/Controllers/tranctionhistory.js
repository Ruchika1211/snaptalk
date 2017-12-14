angular.module('starter')
  .controller('transactionCtrl', function ($ionicLoading, $scope,$cordovaStatusbar,$state,transAndPromoServ,$ionicPopup,helperService ) {

  	firstload=true;
  	deviceready=true;
  	if(firstload&&deviceready)
  	{
  	  transAndPromoServ.getmobilebills().then(function(userdata){


         $ionicLoading.hide();
            console.log(userdata);
            console.log('userdata[1].length');
            if(userdata == "reject" || userdata[0] == "error" || userdata[1]== "0" ||userdata[1] == 0)
            {
                  var msg='No transactions found';
                  helperService.alertPopup($scope, msg);
            }
            else
            {

                $scope.transbills=userdata;
                if($scope.transbills.length == "0")
                {
                  var msg='No transactions found';
                  helperService.alertPopup($scope, msg);
                }

            console.log($scope.transbills);
            console.log("$scope.transbills");

            }

  	  });
  	}

    $scope.w1_active =false;
    $scope.c1_active =false;
    $scope.pro1_active =false;
    $scope.s1_active =false;
    $scope.m1_active =false;
    $scope.w1icontext_active=false;
    $scope.c1icontext_active=false;
    $scope.pro1icontext_active=false;
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
        $scope.w1_active =false;
         $scope.w1icontext_active=false;
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
        $scope.pro1_active =false;
         $scope.pro1icontext_active=false;
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
    var myPopup;
    $scope.customClosePopup=function(){
        myPopup.close();
    }
    $scope.viewReceipt=function(singlereceipt){
   
       var res = singlereceipt.receipt;
        myPopup = $ionicPopup.show({
          template: '<div style="position: absolute;float: right;top: -32px;right: 0px;" ng-click="customClosePopup()"><img src="img/popupcancel.png" style="width: 30px;height: 30px;"></div><pre>'+res+'</pre>',
         title: 'Snaptalk',
          cssClass: 'my-receipt-popup',
          scope: $scope,
          buttons: [
         
            {
              text: 'Print',
              type: ' button-small mybutton',
              onTap: function(e) {
                // if (!$scope.data.wifi) {
                //   //don't allow the user to close unless he enters wifi password
                //   e.preventDefault();
                // } else {
                //   return $scope.data.wifi;
                // }
              }
            }
          ]
        });

            myPopup.then(function(res) {
              console.log('Tapped!', res);
            });
    }
  
  	

  });

