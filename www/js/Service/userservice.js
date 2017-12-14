angular.module('starter')

	.service('UserService', function ($q, $http,$ionicLoading,helperService, $httpParamSerializerJQLike, $ionicPopup, API_ENDPOINT, $ionicLoading) {

		


		var selectedUserdata ;
		var userdata={};

		 var getSelectedUserdata=function(){
		 	
		 	    if(selectedUserdata)
		 	    {
                  // userdata.code=selectedUserdata[1];
                  userdata.firstname=selectedUserdata[1].member[0].firstname;
                  userdata.lastname=selectedUserdata[1].member[0].lastname;
                  userdata.email=selectedUserdata[1].member[0].email;
                   userdata.gender=selectedUserdata[1].member[0].gender;
                  userdata.donations=selectedUserdata[1].member[0].donations;
                  userdata.points=selectedUserdata[1].member[0].points;
                  userdata.points_intotal=selectedUserdata[1].member[0].points_intotal;
                  userdata.city=selectedUserdata[1].member[0].city;
                  userdata.country=selectedUserdata[1].member[0].country;
                  userdata.province=selectedUserdata[1].member[0].province;
                   userdata.dob=selectedUserdata[1].member[0].dob;
                  userdata.mob=selectedUserdata[1].member[0].mob;
                  userdata.postalcode=selectedUserdata[1].member[0].postalcode;
                  userdata.homephone=selectedUserdata[1].member[0].homephone;
                  userdata.address=selectedUserdata[1].member[0].address;
                  // userdata.distance=selectedUserdata[2].distance;
                  // userdata.distancetype=selectedUserdata[2].distancetype;
                  // userdata.showall=selectedUserdata[2].showall;
		 	    }
                 console.log(userdata);

				return userdata;
		 }

		 var updateProfile=function(allUserdata)
		 {
            console.log("rallUserdata????????????");
                            console.log(allUserdata);
                // var loyaltycarddata =  window.localStorage.getItem("loyality_code");
                // var siddata =  window.localStorage.getItem("sid");
                // var user={};
                // allUserdata.loyaltycard=loyaltycarddata;
                // allUserdata.sid=siddata;
                return $q(function(resolve, reject) {

                // $http.post(API_ENDPOINT.url + '/mobile_new_loyalty_member', userdata)
                $http({
                        url: API_ENDPOINT.url + '/mobile_update_loyalty_member',
                        method: 'POST',
                        data: $httpParamSerializerJQLike(allUserdata), // Make sure to inject the service you choose to the controller
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
                        }
                    })
                    .success(function(result) {
                    	console.log("result????????????");
                            console.log(result);
                            resolve(result);
                     
                    }).error(function(errMsg) {
                          console.log(errMsg);
                         console.log('errMsg');
                         $ionicLoading.hide();
                          helperService.alertPopup("dsrdr", "Error in  connection. Please try again");
                        });
                    });
		 }

	var changepassword=function(allUserdata)
		 {
            console.log("rallUserdata????????????");
                            console.log(allUserdata);
                // var loyaltycarddata =  window.localStorage.getItem("loyality_code");
                // var siddata =  window.localStorage.getItem("sid");
                // var user={};
                // allUserdata.loyaltycard=loyaltycarddata;
                // allUserdata.sid=siddata;
                return $q(function(resolve, reject) {

                // $http.post(API_ENDPOINT.url + '/mobile_new_loyalty_member', userdata)
                $http({
                        url: API_ENDPOINT.url + '/mobile_update_password ',
                        method: 'POST',
                        data: $httpParamSerializerJQLike(allUserdata), // Make sure to inject the service you choose to the controller
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
                        }
                    })
                    .success(function(result) {
                    	console.log("result????????????");
                            console.log(result);
                            resolve(result);
                        // if (result[0] == 'ok') {
                            
                        //     // showingAlert = false;
                        //     window.localStorage.setItem('password', result[2]);
                        //     resolve(result);
                        // } else {
                        //     console.log("rejeect");
                        //     resolve(result);
                        // }
                    }).error(function(errMsg) {
                          console.log(errMsg);
                         console.log('errMsg');
                         $ionicLoading.hide();
                          helperService.alertPopup("dsrdr", "Error in  connection. Please try again");
                        });
                    });
		 }

		return {
			getSelectedUserdata: getSelectedUserdata,
			setSelectedUserdata: function (item) {
				
				selectedUserdata = item;
				
			},
			updateProfile:updateProfile,
			changepassword:changepassword,
		}
	});