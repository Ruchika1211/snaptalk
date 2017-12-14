angular.module('starter')
  .controller('profileCtrl', function ($ionicLoading,UserService,helperService, $rootScope, $scope,$cordovaStatusbar,$state,transAndPromoServ,$ionicPopup) {

  	var firstload=true;
  	var deviceready=true;
    $scope.loginData=UserService.getSelectedUserdata();
    console.log($scope.loginData);
    console.log("$scope.loginData ");
    $scope.loginData.username=$scope.loginData.firstname + " " +$scope.loginData.lastname;
    $scope.loginData.homephone=parseInt($scope.loginData.homephone);
    $scope.loginData.postalcode=parseInt($scope.loginData.postalcode);
    //$scope.loginData.yob=parseInt($scope.loginData.yob);
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
    $scope.monthname=[
   {
    "month_name":"January",
    "order":"1",
   },
    {
    "month_name":"February",
    "order":"2",
   },
    {
    "month_name":"March",
    "order":"3",
   },
    {
    "month_name":"April",
    "order":"4",
   },
    {
    "month_name":"May",
    "order":"5",
   },
    {
    "month_name":"June",
    "order":"6",
   },
    {
    "month_name":"July",
    "order":"7",
   },
    {
    "month_name":"August",
    "order":"8",
   }, {
    "month_name":"September",
    "order":"9",
   },
    {
    "month_name":"October",
    "order":"10",
   },
    {
    "month_name":"November",
    "order":"11",
   },
    
    {
    "month_name":"December",
    "order":"12",
   },
   ];
  $scope.birthday=[
    {"date":"1","prefix":"st"},
    {"date":"2","prefix":"nd"},
    {"date":"3","prefix":"rd"},
    {"date":"4","prefix":"th"},
    {"date":"5","prefix":"th"},
    {"date":"6","prefix":"th"},
    {"date":"7","prefix":"th"},
    {"date":"8","prefix":"th"},
    {"date":"9","prefix":"th"},
    {"date":"10","prefix":"th"},
    {"date":"11","prefix":"th"},
    {"date":"12","prefix":"th"},
    {"date":"13","prefix":"th"},
    {"date":"14","prefix":"th"},
    {"date":"15","prefix":"th"},
    {"date":"16","prefix":"th"},
    {"date":"17","prefix":"th"},
    {"date":"18","prefix":"th"},
    {"date":"19","prefix":"th"},
    {"date":"20","prefix":"th"},
    {"date":"21","prefix":"st"},
    {"date":"22","prefix":"nd"},
    {"date":"23","prefix":"rd"},
    {"date":"24","prefix":"th"},
    {"date":"25","prefix":"th"},
    {"date":"26","prefix":"th"},
    {"date":"27","prefix":"th"},
    {"date":"28","prefix":"th"},
    {"date":"29","prefix":"th"},
    {"date":"30","prefix":"th"},
    {"date":"31","prefix":"st"} ];
    if($scope.loginData.dob)
    {
      console.log($scope.loginData.dob);
       console.log("if $scope.loginData.dob");
    }
    else
    {
       $scope.loginData.dob=$scope.birthday[0]['date'] ;
      console.log($scope.loginData.dob);
       console.log("else $scope.loginData.dob");
      // $scope.loginData.dob=$scope.birthday[0].date + $scope.birthday[0]["prefix"];
      // console.log($scope.loginData.dob);
      //  console.log("else $scope.loginData.dob");
    };

    $scope.state_name=[
    {
        "name": "Alabama",
        "abbreviation": "AL"
    },
    {
        "name": "Alaska",
        "abbreviation": "AK"
    },
    {
        "name": "American Samoa",
        "abbreviation": "AS"
    },
    {
        "name": "Arizona",
        "abbreviation": "AZ"
    },
    {
        "name": "Arkansas",
        "abbreviation": "AR"
    },
    {
        "name": "California",
        "abbreviation": "CA"
    },
    {
        "name": "Colorado",
        "abbreviation": "CO"
    },
    {
        "name": "Connecticut",
        "abbreviation": "CT"
    },
    {
        "name": "Delaware",
        "abbreviation": "DE"
    },
    {
        "name": "District Of Columbia",
        "abbreviation": "DC"
    },
    {
        "name": "Federated States Of Micronesia",
        "abbreviation": "FM"
    },
    {
        "name": "Florida",
        "abbreviation": "FL"
    },
    {
        "name": "Georgia",
        "abbreviation": "GA"
    },
    {
        "name": "Guam",
        "abbreviation": "GU"
    },
    {
        "name": "Hawaii",
        "abbreviation": "HI"
    },
    {
        "name": "Idaho",
        "abbreviation": "ID"
    },
    {
        "name": "Illinois",
        "abbreviation": "IL"
    },
    {
        "name": "Indiana",
        "abbreviation": "IN"
    },
    {
        "name": "Iowa",
        "abbreviation": "IA"
    },
    {
        "name": "Kansas",
        "abbreviation": "KS"
    },
    {
        "name": "Kentucky",
        "abbreviation": "KY"
    },
    {
        "name": "Louisiana",
        "abbreviation": "LA"
    },
    {
        "name": "Maine",
        "abbreviation": "ME"
    },
    {
        "name": "Marshall Islands",
        "abbreviation": "MH"
    },
    {
        "name": "Maryland",
        "abbreviation": "MD"
    },
    {
        "name": "Massachusetts",
        "abbreviation": "MA"
    },
    {
        "name": "Michigan",
        "abbreviation": "MI"
    },
    {
        "name": "Minnesota",
        "abbreviation": "MN"
    },
    {
        "name": "Mississippi",
        "abbreviation": "MS"
    },
    {
        "name": "Missouri",
        "abbreviation": "MO"
    },
    {
        "name": "Montana",
        "abbreviation": "MT"
    },
    {
        "name": "Nebraska",
        "abbreviation": "NE"
    },
    {
        "name": "Nevada",
        "abbreviation": "NV"
    },
    {
        "name": "New Hampshire",
        "abbreviation": "NH"
    },
    {
        "name": "New Jersey",
        "abbreviation": "NJ"
    },
    {
        "name": "New Mexico",
        "abbreviation": "NM"
    },
    {
        "name": "New York",
        "abbreviation": "NY"
    },
    {
        "name": "North Carolina",
        "abbreviation": "NC"
    },
    {
        "name": "North Dakota",
        "abbreviation": "ND"
    },
    {
        "name": "Northern Mariana Islands",
        "abbreviation": "MP"
    },
    {
        "name": "Ohio",
        "abbreviation": "OH"
    },
    {
        "name": "Oklahoma",
        "abbreviation": "OK"
    },
    {
        "name": "Oregon",
        "abbreviation": "OR"
    },
    {
        "name": "Palau",
        "abbreviation": "PW"
    },
    {
        "name": "Pennsylvania",
        "abbreviation": "PA"
    },
    {
        "name": "Puerto Rico",
        "abbreviation": "PR"
    },
    {
        "name": "Rhode Island",
        "abbreviation": "RI"
    },
    {
        "name": "South Carolina",
        "abbreviation": "SC"
    },
    {
        "name": "South Dakota",
        "abbreviation": "SD"
    },
    {
        "name": "Tennessee",
        "abbreviation": "TN"
    },
    {
        "name": "Texas",
        "abbreviation": "TX"
    },
    {
        "name": "Utah",
        "abbreviation": "UT"
    },
    {
        "name": "Vermont",
        "abbreviation": "VT"
    },
    {
        "name": "Virgin Islands",
        "abbreviation": "VI"
    },
    {
        "name": "Virginia",
        "abbreviation": "VA"
    },
    {
        "name": "Washington",
        "abbreviation": "WA"
    },
    {
        "name": "West Virginia",
        "abbreviation": "WV"
    },
    {
        "name": "Wisconsin",
        "abbreviation": "WI"
    },
    {
        "name": "Wyoming",
        "abbreviation": "WY"
    }
  ];

    if($scope.loginData.gender)
    {
      console.log("do nothing");
    }
    else
    {
      $scope.loginData.gender="m";
    }

    if($scope.loginData.country)
    {
      console.log("do nothing");
    }
    else
    {
      $scope.loginData.country ="USA";
    }
    


    if($scope.loginData.mob)
    {
      console.log("do nothing");
    }
    else
    {
      console.log($scope.monthname[0].order);
      console.log($scope.monthname[0]["order"]);
      $scope.loginData.mob=$scope.monthname[0].order;
    }

    if($scope.loginData.province)
    {
      console.log("do nothing");
    }
    else
    {
      $scope.loginData.province="default";
      console.log($scope.loginData.province);
    }

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
       $rootScope.$broadcast('tabClicked',"changeUrl");
     
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
       $rootScope.$broadcast('tabClicked',"changeUrl");
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
       $rootScope.$broadcast('tabClicked',"changeUrl");
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
      $rootScope.$broadcast('tabClicked',"changeUrl");
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
       $rootScope.$broadcast('tabClicked',"changeUrl");
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

  $scope.doprofileupdate=function(){
    console.log($scope.loginData.dob);
    console.log($scope.loginData.mob);
    if(($scope.loginData.dob=="31" && ($scope.loginData.mob=="2"||$scope.loginData.mob=="6" || $scope.loginData.mob=="4"|| $scope.loginData.mob=="9"|| $scope.loginData.mob=="11"))||($scope.loginData.dob=="30" && $scope.loginData.mob=="2") )
      {
         var msg='You have entered an invalid birthday';
         helperService.alertPopup($scope, msg);
      }
      else
      {
          $ionicLoading.show({
                template: 'Please wait...'
          });
            console.log($scope.loginData);
            console.log("$scope.loginData submit");
             var loyaltycarddata =  window.localStorage.getItem("loyality_code");
              var siddata =  window.localStorage.getItem("sid");
              var user={};
              $scope.loginData.loyaltycard=loyaltycarddata;
              $scope.loginData.sid=siddata;
            UserService.updateProfile($scope.loginData).then(function(userdata){
              $ionicLoading.hide();
                if (userdata[0] == 'ok') {
                  var msg=' Your Profile Has Been Successfully Updated';
                   helperService.alertPopup($scope, msg);

                }
                else
                {
                  var msg='Error: ' + userdata[1];
                   helperService.alertPopup($scope, msg);

                }

              });
       }
}

  $scope.changepass=function(){
    
    if( $scope.loginData.newpass== $scope.loginData.repeatpass)
    {
       $ionicLoading.show({
                template: 'Please wait...'
            });
      $scope.loginData.password=$scope.loginData.repeatpass;
       var loyaltycarddata =  window.localStorage.getItem("loyality_code");
      var siddata =  window.localStorage.getItem("sid");
      var user={};
      $scope.loginData.loyaltycard=loyaltycarddata;
      $scope.loginData.sid=siddata;
      UserService.changepassword($scope.loginData).then(function(userdata){
      $ionicLoading.hide();
        if (userdata[0] == 'ok') {
          var msg='Your password has been successfully updated';
           $scope.loginData.newpass="";
           $scope.loginData.repeatpass="";
           helperService.alertPopup($scope, msg);

        }
        else
        {
          var msg='Error: ' + userdata[1];
           helperService.alertPopup($scope, msg);

        }
       

      });
    }
    else
    {
      var msg='Repeat password and New password do not match';
      helperService.alertPopup($scope, msg);
    }

      

  }


  
  	

  });

