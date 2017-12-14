
angular.module('starter')

    .service('walletCharityServ', function($q, $http,$ionicLoading,helperService, $httpParamSerializerJQLike, $ionicPopup, API_ENDPOINT) {
    	 
     
		
        var getallCharities=function(){
          var loyality_code =  window.localStorage.getItem("loyality_code");
         var siddata =  window.localStorage.getItem("sid");
         var userdata ={};
         userdata.loyaltycard=loyality_code;
         userdata.sid=siddata;
        
         
         return $q(function(resolve, reject) {
                 
                 var charity=[];
                // $http.post(API_ENDPOINT.url + '/mobile_new_loyalty_member', userdata)
                $http({
                        url: API_ENDPOINT.url + '/mobile_get_charities',
                        method: 'POST',
                        data: $httpParamSerializerJQLike(userdata), // Make sure to inject the service you choose to the controller
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
                        }
                    })
                    .success(function(result) {
                        if (result[0] == 'ok') {
                        	
                        	for(i=0;i<result[1].length;i++)
                        	{  
                        		var storedata={};
                        		
                        		storedata.charity_id=result[1][i].charity_id ;
                        		storedata.charity_name=result[1][i].charity_name ;
                        		storedata.link=result[1][i].link ;
                        		storedata.picture=result[1][i].picture ;
                        		storedata.description=result[1][i].description;
                                storedata.money_donated=result[1][i].money_donated;
                        		
                        		
                                 charity.push(storedata);
                        	}
                        	
                            
                         
                            resolve(charity);
                        } else {
                            console.log("rejeect");
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

         var getwallets = function() {
        
         var loyaltycarddata =  window.localStorage.getItem("loyality_code");
         var siddata =  window.localStorage.getItem("sid");
         var url='/mobile_get_loyalty_wallet?sid=' + siddata + '&loyaltycard='+loyaltycarddata ;
             queryData1=[];

        return $q(function(resolve, reject) {

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
                          console.log("result");
                        if (result[0] == 'ok') {
        
                             for(i=0;i < result[1].length;i++)
                            {    
                                var mydata1={};
                                mydata1.typeofdata= result[1][i][1].type ;
                                mydata1.promo_id= result[1][i][1].promo_id ;
                                mydata1.offer_id=result[1][i][1].offer_id ;
                                mydata1.frequency= result[1][i][1].frequency ;
                                mydata1.expired= result[1][i][1].expired ;
                                mydata1.showupc= result[1][i][1].showupc ;
                                mydata1.upc= result[1][i][1].upc ;
                                mydata1.link = result[1][i][1].link ;
                                mydata1.valid_to= result[1][i][1].valid_to ;

                                var image_url=result[1][i][1].offer_image;
                                console.log(image_url)
                                
                                if(image_url)
                                {
                                  mydata1.offer_image = image_url ;
                                }
                                else{
                                 
                                   mydata1.offer_image = 'img/no-image.jpg' ;
                                }

                              
                                queryData1.push(mydata1);


                            }

                          
                            resolve(queryData1);
                        }
                        else
                        {
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

        return{
        	getallCharities:getallCharities,
            getwallets:getwallets
        }


    });