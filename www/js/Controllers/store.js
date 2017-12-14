angular.module('starter')
  .controller('storeCtrl', function ($ionicLoading, $scope,$cordovaStatusbar,$state,storeService,helperService) {
   firstload=true;
  	deviceready=true;
  	if(firstload&&deviceready)
  	{
      $ionicLoading.show({
          template: 'Please wait...'
      });
  	  storeService.mobile_get_stores().then(function(userdata){
        $ionicLoading.hide();
        if(userdata == "reject" || userdata[0] == "error"  )
            {
                  var msg='No stores found';
                  helperService.alertPopup($scope, msg);
            }
            else
            {

               $scope.stores=userdata;
                 if($scope.stores.length == "0")
                {
                  var msg='No stores found';
                  helperService.alertPopup($scope, msg);
                }

              console.log($scope.stores);
              console.log("$scope.stores");

            }

  	  

  	  });
  	}

    $scope.w1_active =false;
    $scope.c1_active =false;
    $scope.pro1_active =false;
    $scope.s1_active =true;
    $scope.m1_active =false;
    $scope.w1icontext_active=false;
    $scope.c1icontext_active=false;
    $scope.pro1icontext_active=false;
    $scope.s1icontext_active=true;
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
        // $scope.s1_active =false;
        //  $scope.s1icontext_active=false;
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
  	

  });
