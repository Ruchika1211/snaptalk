angular.module('starter')
  .controller('charityCtrl', function ($ionicLoading,helperService,$cordovaInAppBrowser, $scope,$cordovaStatusbar,$state,transAndPromoServ,$ionicPopup,walletCharityServ) {


  	 var firstload;
  	var deviceready;
    $scope.moneyTotal=0;

     // $scope.loginData=UserService.getSelectedUserdata();
   var showall =  window.localStorage.getItem("showall");
   console.log(showall);

   if (showall == "1")
   {
      var firstload=true;
      var deviceready=true;
      $scope.showMe = true;
      $scope.showMeComimgSoon=false;
   }
   else{
      $scope.showMe = false;
      $scope.showMeComimgSoon=true;
      var firstload=false;
      var deviceready=false;
    

   }
     // if($scope.loginData.showall == "1")
     // {
     //     var firstload=true;
     //     var deviceready=true;
     // }
     // else
     // {
     //   var firstload=false;
     //    var deviceready=false;
     // }
  	if(firstload&&deviceready)
  	{
       $ionicLoading.show({
            template: 'Please wait...'
        });
  	  walletCharityServ.getallCharities().then(function(userdata){

          $ionicLoading.hide();

            if(userdata == "reject" || userdata[0] == "error" || userdata[1]== "0" ||userdata[1] == 0)
            {
                  var msg='No charities found';
                  helperService.alertPopup($scope, msg);
            }
            else
            {

              $scope.charities=userdata;
               $scope.transbills=userdata;
                if($scope.charities.length > 0)
                {

                  for(i=0;i<$scope.charities.length;i++)
                  {  

                    $scope.moneyTotal =parseFloat($scope.moneyTotal) + parseFloat($scope.charities[i].money_donated);
                    $scope.moneyTotal=parseFloat($scope.moneyTotal);
                  }
                 
                }
                else
                {
                   var msg='No charities found';
                  helperService.alertPopup($scope, msg);

                }
              

            }


  	  });
  	}

     var myPopup;
    $scope.customClosePopup=function(){
        myPopup.close();
    }

    

    $scope.charityPopup=function(charity){
      var res=charity.description;
      var link=charity.link;
         var options_url = {
                location: 'yes',
                clearcache: 'yes',
                toolbar: 'no'
              };
   
      myPopup = $ionicPopup.show({    
        template: '<div style="position: absolute;float: right;top: -32px;right: 0px;" ng-click="customClosePopup()"><img src="img/popupcancel.png" style="width: 30px;height: 30px;"></div><p style="max-height: 210px;" class="WorkSansExtraLight">'+res+'</p>',
         title: charity.charity_name,
         cssClass: 'my-charity-popup',
         scope: $scope,
      
         buttons: [
              {
               text: 'More',
               type: ' button-small mybutton',
               onTap: function(e) {
                  $cordovaInAppBrowser.open(link, '_blank', options_url)
                    .then(function(event) {
                      // success
                      console.log('sucesssinapp');
                    })
                    .catch(function(event) {
                      // error
                      console.log('failed');
                    });
            
                  // if (!$scope.data.model) {
                  //    //don't allow the user to close unless he enters model...
                  //    e.preventDefault();
                  // } else {
                  //    return $scope.data.model;
                  // }
               }
             },
             {
               text: 'Donate',
               type: ' button-small mybutton',
               onTap: function(e) {
            
                  // if (!$scope.data.model) {
                  //    //don't allow the user to close unless he enters model...
                  //    e.preventDefault();
                  // } else {
                  //    return $scope.data.model;
                  // }
               }
            }
         ]
      });

      myPopup.then(function(res) {
         console.log('Tapped!', res);
      });    

    }

    $scope.w1_active =false;
    $scope.c1_active =true;
    $scope.pro1_active =false;
    $scope.s1_active =false;
    $scope.m1_active =false;
    $scope.w1icontext_active=false;
    $scope.c1icontext_active=true;
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
        // $scope.c1_active =false;
        //  $scope.c1icontext_active=false;
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
    // $cordovaStatusbar.show();
  // $cordovaStatusbar.styleColor('white');

  	

  });
