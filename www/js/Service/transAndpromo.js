angular.module('starter')

	.service('transAndPromoServ', function ($q, $http,$ionicLoading,helperService, $httpParamSerializerJQLike, $ionicPopup, API_ENDPOINT) {
          
       

		 var getmobilebills = function() {
           var queryData=[];
             var  userdata={};
           var loyaltycarddata =  window.localStorage.getItem("loyality_code");
           var siddata =  window.localStorage.getItem("sid");
            userdata.loyaltycard=loyaltycarddata ;
          
            userdata.sid=siddata;
            userdata.store_id="1"; 
         
         
           var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            return $q(function(resolve, reject) {

                // $http.post(API_ENDPOINT.url + '/mobile_new_loyalty_member', userdata)
                $http({
                        url: API_ENDPOINT.url + '/mobile_get_bills',
                        method: 'POST',
                        data: $httpParamSerializerJQLike(userdata), // Make sure to inject the service you choose to the controller
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
                        }
                    })
                    .success(function(result) {
                        if (result[0] == 'ok') {
                            console.log("result");
                            console.log(result);
                             for(i=0;i< result[1].length ;i++)
                            {
                                var mydata={};
                                var time=result[1][i].local_tm.split(" ");
                                var time_split=time[0].split("-");
                                var month =time_split[1];
                                var date_temp = time_split[2] +"/"+ time_split[1]+"/" + time_split[0];
                                var data = result[1][i].receipt;
                                var res = data.split("\n");
                                mydata.date=date_temp;   
                                mydata.bill_id=result[1][i].bill_id;
                                mydata.total=result[1][i].total;
                                mydata.store_id=result[1][i].store_id;
                                mydata.local_tm=result[1][i].local_tm;
                                mydata.receipt=result[1][i].receipt;
                                mydata.receipt_id=result[1][i].receipt_id;
                                mydata.store_name=result[1][i].store_name;
                                mydata.newreceipt=res;
                                queryData.push(mydata);

                            }
                    
                            
                            resolve(queryData);
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

        var getLoyalityPromo = function() {
               var queryData1=[]; 
                 var  userdata={};
               var loyaltycarddata =  window.localStorage.getItem("loyality_code");
               var siddata =  window.localStorage.getItem("sid");
                userdata.loyaltycard=loyaltycarddata ;
              
                userdata.sid=siddata;
                userdata.store_id="1";
                   
               return $q(function(resolve, reject) {

                // $http.post(API_ENDPOINT.url + '/mobile_new_loyalty_member', userdata)
                $http({
                        url: API_ENDPOINT.url + '/mobile_get_loyalty_promos ',
                        method: 'POST',
                        data: $httpParamSerializerJQLike(userdata), // Make sure to inject the service you choose to the controller
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
                        }
                    })
                    .success(function(result) {
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

		return {
			getmobilebills:getmobilebills,
            getLoyalityPromo:getLoyalityPromo
			
		}
	});