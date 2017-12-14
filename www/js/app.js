// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova','td.barcode'])

    .run(function($ionicPlatform, $state,$rootScope) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            var token = window.localStorage.getItem("userloggin");
            if (token) {
                $state.go('inside.dashboard');
            } else {
                $state.go('signIn');
            }
            // $rootScope.myImage='img/p3.png';
            // if (window.StatusBar) {
            //   // org.apache.cordova.statusbar required
            //   StatusBar.styleDefault();
            // }
        });
    })

   

    .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
           $ionicConfigProvider.views.maxCache(0);
           $ionicConfigProvider.views.transition('none');
           $ionicConfigProvider.views.swipeBackEnabled(false);
        $stateProvider

            .state('inside', {
                url: '/inside',
                cache:false,
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'parentCtrl'
            })
            .state('outside', {
                abstract: true,
                url: '/outside',
                cache: false,
                templateUrl: 'templates/outside.html'
            })

            // .state('outside.signUp', {
            //     url: '/signUp',
            //     templateUrl: 'templates/signUp.html',
            //     cache:false,
            //     controller: 'signUpCtrl'
            //   })
            .state('signUp', {
                url: '/signUp',

                cache: false,
                templateUrl: 'templates/signUp.html',
                controller: 'signUpCtrl'
            })
            .state('signIn', {
                url: '/signIn',
                params: {
                    email: null,
                    password: null
                },
                cache: false,
                templateUrl: 'templates/signIn.html',
                controller: 'signInCtrl'
            })
            .state('forgetpasswrd', {
                url: '/forgetpasswrd',
                cache: false,
                templateUrl: 'templates/forgetpasswrd.html',
                controller: 'signInCtrl'
            })
            .state('inside.dashboard', {
                url: '/dashboard',
                cache:false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/dashboard.html',
                        controller: 'dashboardCtrl'
                    }
                }
            })

           .state('inside.wallet', {
                url: '/wallet',
                cache:false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/wallet.html',
                        controller: 'walletCtrl'
                    }
                }
            })

            .state('inside.charity', {
                url: '/charity',
                cache:false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/charity.html',
                        controller: 'charityCtrl'
                    }
                }
            })
            .state('inside.transactionhistory', {
                url: '/transactionhistory',
                cache:false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/tranctionhistory.html',
                        controller: 'transactionCtrl'
                    }
                }
            })
              .state('inside.promotion', {
                url: '/promotion',
                cache:false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/promotion.html',
                        controller: 'promotionCtrl'
                    }
                }
            })

            .state('inside.events', {
                url: '/events',
                cache:false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/events.html',
                        controller: 'eventsCtrl'
                    }
                }
            })

            .state('inside.store', {
            url: '/store',
            cache:false,
            views: {
                'menuContent': {
                    templateUrl: 'templates/store.html',
                    controller: 'storeCtrl'
                }
              }
            })

            .state('inside.profile', {
            url: '/profile',
            cache:false,
            views: {
                'menuContent': {
                    templateUrl: 'templates/profile.html',
                    controller: 'profileCtrl'
                }
            }
            });
            
        
           
        // if none of the above states are matched, use this as the fallback
        // $urlRouterProvider.otherwise('/signUp');
    });