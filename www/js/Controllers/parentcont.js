angular.module('starter')
  .controller('parentCtrl', function ($ionicLoading,$rootScope,$ionicSideMenuDelegate, $scope,$ionicPopup,$state,helperService,loginService,$ionicPlatform,$ionicHistory,$rootScope,UserService) {
  
  var loggedUser=window.localStorage.getItem("userloggin");
    var firstload=true;
    var deviceready=true;
   
     $scope.proActive=false;
     var currentview =$state.current.name;
   console.log(currentview);
    // if (currentview == 'inside.profile' ) {

    //   $scope.myImage='img/proActive.png';
    //   console.log("currentview if");


    // } else {
    //           $scope.myImage='img/p3.png';
    //            console.log("currentview else");

    //   }
    
  // $rootScope.$broadcast('tabClicked',"changeUrl");
    $rootScope.$on('profileClicked', function(event,data) {
           console.log("event occur");
           $scope.myImage='img/proActive.png';
         });

     $rootScope.$on('tabClicked', function(event,data) {
           console.log("tab clicked");
           $scope.myImage='img/p3.png';
         });
   
     $scope.myImage='img/p3.png';
      $scope.sidebarClosed=function()
      { 

        $ionicSideMenuDelegate.toggleLeft(false);

      }
     $scope.sidemenuClicked=function()
     {
     
        loginService.dashboardData().then(function(userdata){

         if (userdata) {
          
             
             $scope.userDetail=UserService.getSelectedUserdata();
             $ionicLoading.hide();
          
         
         }
         else{
          $ionicLoading.hide();
             
         }

      });
      

     }

    if(firstload&&deviceready&&loggedUser)
    {
       console.log("i m in if");
       $ionicLoading.show({
              template: 'Please wait...'
          });
      loginService.dashboardData().then(function(userdata){

         if (userdata) {
          
             
             $scope.userDetail=UserService.getSelectedUserdata();
             $ionicLoading.hide();
          
         
         }
         else{
          $ionicLoading.hide();
             
         }

      });
    }
    else{
        $state.go('signIn', {});
    }

    $scope.profileClicked=function(){
      console.log("profile clicked");
      $scope.myImage='img/proActive.png';
      $state.go('inside.profile');
    }

     $scope.transHistory=function(){
    
      $scope.myImage='img/p3.png';
      $state.go('inside.transactionhistory');
    }

     $scope.events=function(){
   
      $scope.myImage='img/p3.png';
          $state.go('inside.events');
      // $state.go('inside.profile');
    }
   

    $scope.stores=function(){
    
      $scope.myImage='img/p3.png';
      $state.go('inside.store');
    }
     
     $scope.charity=function(){
    
      $scope.myImage='img/p3.png';
      $state.go('inside.charity');
    }

    $scope.wallet=function(){
    
      $scope.myImage='img/p3.png';
      $state.go('inside.wallet');
    }

    $scope.dashboard=function(){
    
      $scope.myImage='img/p3.png';
      $state.go('inside.dashboard');
    }
     $scope.promotion=function(){
    
      $scope.myImage='img/p3.png';
      $state.go('inside.promotion');
    }


     
     






   //$scope.userDetail=UserService.getSelectedUserdata();

 

  var Successcallback=function(){
        window.localStorage.clear();
       $state.go('signIn');
  }

  var Exitcallback =function(){
    navigator.app.exitApp();
  }

  $ionicPlatform.registerBackButtonAction(function () {
    console.log($state.current);
    console.log("$state.current");
    // alert("ggg");
    var exitonHome =$state.current.name;
    if (exitonHome == 'signIn'||exitonHome == 'inside.dashboard' ) {

      helperService.showconfirmPopup(Exitcallback,$scope,"Are you sure you want to exit Snaptalk?");


    } else {
        $state.go('inside.dashboard',{},{reload: "inside.dashboard"});
        // $state.go("main.users",{},{reload: "main.users"})
      }
    },100);

 


   $scope.logout=function(){
     helperService.showconfirmPopup(Successcallback,$scope,"Are you sure you want to logout?");
   }

  	
  });
      