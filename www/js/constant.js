angular.module('starter')

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated'
})

.constant('USER_IMAGE_ENDPOINT', {

  // url: 'http://192.168.1.119:8080/userphotos/'   //local
   // url:'https://rbouts.herokuapp.com/userphotos/'  //heroko
    //url:'http://s3-us-west-2.amazonaws.com/rbprofile/'
    url:'http://s3.us-east-2.amazonaws.com/rbouts-profile/'
 //url: 'http://127.0.0.1:5000/userphotos' //locally hosted heroko
})

.constant('SEARCH_TYPE', {
    date: "date",
     event: "event",
      location: "location"
})

.constant('RELATIONSHIP_STATE', {
    connected: 2,
    pending: 1,
    notconnected: 0
})
//set to 1 second
.constant('REFRESH_TIMER', {
    pulse: 1000
})

.constant('API_ENDPOINT', {
  //xcode simulator
    // url: 'http://127.0.0.1:8100/api' //
  //safari
  //  url: 'http://127.0.0.1:5000/api'  //locally hosted heroko
    //device ip in system preferences network
    // url:'https://rbouts.herokuapp.com/api'
     url:'https://goshoptalk.ca/snapretail',
     // url:'http://giantcommunications.ca/snapretail',
   // url:'http://192.168.1.214:8080/api'
   // url:'http://192.168.1.120:8080/api'
// url: 'http://192.168.1.119:8080/api'
// url:'http://172.16.128.63:8080/api'
//  url: 'http://10.0.0.66:8080/api'
  //url: 'http://10.0.0.77:8080/api'
});