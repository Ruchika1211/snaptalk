angular.module('starter')

    .service('helperService', function($q, $http, $httpParamSerializerJQLike, $ionicPopup, API_ENDPOINT) {


        var showSuccessPopup = function(message, exitcallback, $scope, alternativemsg) {
            //show Failure by default or alternative message
            if (alternativemsg != undefined)
                $scope.msg = alternativemsg;
            else
                $scope.msg = "Success";

            var myPopup = $ionicPopup.show({
                template: '<div class="successWrapper" style="padding-left: 5%"><div class="successIcon" style="margin-bottom: 5%"></div><div class="successText ng-binding">{{msg}}</div></div>',
                cssClass: 'my-custom-popup',
                scope: $scope,
                buttons: [{
                    title: 'Success',
                    text: '<b>OK</b>',
                    type: 'button-positive changeBorder',
                    onTap: function(e) {
                        if (exitcallback != null)
                            exitcallback();
                    }
                }, ]
            });
            myPopup.then(function(res) {
                // console.log('Tapped!');
            });
        }

        var showFailurePopup = function(debugmessage, exitcallback, $scope, alternativemsg) {
            //show Failure by default or alternative message
            if (alternativemsg != undefined)
                $scope.msg = alternativemsg;
            else
                $scope.msg = "Failure";
            //this is a debug message that is initially hidden untill dialog tapped
            $scope.debugmessage = debugmessage;
            $scope.showDebug = false;
            $scope.doubletapped = function() {
                if (!$scope.showDebug)
                    $scope.showDebug = true;
                else
                    $scope.showDebug = false;
            }

            var myPopup = $ionicPopup.show({
                title: 'Failure',
                template: '<div on-double-tap="doubletapped()" class="failureWrapper"><div class="failureIconWrapper"><div class="failureIcon"></div></div><div class="successText">{{msg}}</div></div><div class="debugText" ng-show="showDebug">{{debugmessage}}</div>',
                scope: $scope,
                buttons: [{
                    text: '<b>OK</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (exitcallback != null)
                            exitcallback();
                    }
                }, ]
            });
            myPopup.then(function(res) {
                $scope.showDebug = true;
            });
        }

        var showconfirmPopup = function(exitcallback, $scope, alternativemsg) {

            if (alternativemsg != undefined)
                var msg = alternativemsg;
            else
                var msg = "Success";



            var confirmPopup = $ionicPopup.confirm({
                title: 'Snaptalk',
                okType: 'popupchange',
                template: '<div class="popupbutton">' + msg + ' </div>'
            });

            confirmPopup.then(function(res) {
                if (res) {
                    if (exitcallback != null)
                        exitcallback();
                } else {
                    console.log('You are not sure');
                }
            });
        }

        var alertPopup = function($scope, alternativemsg) {
            // console.log(alternativemsg);

            if (alternativemsg != undefined)
                var msg = alternativemsg;
            else
                var msg = "Success";
            // console.log( $scope.msg );
            var alertPopup = $ionicPopup.alert({
                title: 'Snaptalk',
                okType: 'popupchange',
                template: '<div class="popupbutton">' + msg + ' </div>'
            });

            alertPopup.then(function(res) {
                console.log('Thank you for not eating my delicious ice cream cone');
            });

        }




        return {
            showSuccessPopup: showSuccessPopup,
            showconfirmPopup: showconfirmPopup,
            alertPopup: alertPopup

        }
    });