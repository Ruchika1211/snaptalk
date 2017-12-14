angular.module('starter')

    .service('storeService', function($q, $http, $httpParamSerializerJQLike,$ionicLoading,helperService, $ionicPopup, API_ENDPOINT) {
    	 
       
        var mobile_get_stores=function(){

            var loyality_code =  window.localStorage.getItem("loyality_code");
             var siddata =  window.localStorage.getItem("sid");
           
            var userdata ={};
            userdata.loyality_code=loyality_code;
            userdata.sid=siddata;
         
         return $q(function(resolve, reject) {
                 
                 var stores=[];
                // $http.post(API_ENDPOINT.url + '/mobile_new_loyalty_member', userdata)
                $http({
                        url: API_ENDPOINT.url + '/mobile_get_stores',
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
                        		console.log(result[1][i]);
                        		console.log("result[1][i]");
                        		storedata.store_name=result[1][i].store_name ;
                        		storedata.address=result[1][i].address ;
                        		storedata.city=result[1][i].city ;
                        		storedata.country=result[1][i].country ;
                        		storedata.id=result[1][i].id ;
                        		storedata.lat=result[1][i].lat ;
                        		storedata.lng=result[1][i].lng ;
                        		storedata.phone=result[1][i].phone ;
                        		storedata.postalcode=result[1][i].postalcode ;
                        		storedata.province=result[1][i].province ;
                        		storedata.store_number=result[1][i].store_number ;
                        		console.log(storedata);
                                 stores.push(storedata);
                        	}
                        	
                            
                         
                            resolve(stores);
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

        return{
        	mobile_get_stores:mobile_get_stores,
        }


    });