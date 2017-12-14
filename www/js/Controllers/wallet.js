angular.module('starter')
  .controller('walletCtrl', function ($ionicLoading,walletCharityServ,helperService, $scope,$cordovaStatusbar,$state,transAndPromoServ,$ionicPopup,$cordovaInAppBrowser) {
   
    var firstload=true;
  	var deviceready=true;
  	$scope.mywallets=[];
  	if(firstload&&deviceready)
  	{
        $ionicLoading.show({
            template: 'Please wait...'
        });
  	  walletCharityServ.getwallets().then(function(userdata){

  	  	 $ionicLoading.hide();
            console.log(userdata);
            if(userdata == "reject" || userdata[0] == "error")
            {
                  var msg='No wallets found';
                  helperService.alertPopup($scope, msg);
            }
            else
            {

            $scope.mywallets=userdata;

            console.log($scope.promobills);
            console.log("$scope.promobills");

            }

  	  });
  	}

    $scope.w1_active =true;
    $scope.c1_active =false;
    $scope.pro1_active =false;
    $scope.s1_active =false;
    $scope.m1_active =false;
    $scope.w1icontext_active=true;
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
