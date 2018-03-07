// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


 .constant("serverConfig", {
        //"url": "http://localhost:80",
        "url": "http://18.219.34.101:3000",
        "imageStorageURL" : 'https:'
        //"port": "80"
    })


.config(function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
 $ionicConfigProvider.tabs.position('bottom'); 
    $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};

$ionicConfigProvider.backButton.previousTitleText(false).text('');



if(localStorage.getItem('tokInfl') == null || 
            localStorage.getItem('tokInfl') == 'null' || 
            localStorage.getItem('tokInfl') == 'undefined' || 
            localStorage.getItem('tokInfl') == undefined){

        //console.log(localStorage.getItem('userInfoTS'));
      $urlRouterProvider.otherwise('/login');

        }
        else{
           // console.log(localStorage.getItem('userInfoTS'));
       $urlRouterProvider.otherwise('/tab/dash');
        // $urlRouterProvider.otherwise("/login");
        }



  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
    .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrlI'
  })

    .state('instalog', {
    url: '/instalog',
    templateUrl: 'templates/instalog.html',
    controller: 'instalogCtrl'
  })
   .state('registerLog', {
    url: '/registerLog/:tipoPerfil',
    templateUrl: 'templates/registerLog.html',
    controller: 'registerLogCtrl'
  })



    .state('newUser', {
    url: '/newUser',
    templateUrl: 'templates/newUser.html',
    controller: 'RequestCtrl'
  })

      .state('tab.request', {
      url: '/request',
      views: {
        'tab-dash': {
          templateUrl: 'templates/request.html',
          controller: 'RequestCtrl'
        }
      }
    })



  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })


    .state('tab.profile', {
    url: '/profile',
    views: {
      'tab-profile': {
        templateUrl: 'templates/tab-profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })



  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:idUsuario',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

        .state('tab.chat-detailHome', {
      url: '/home/:idUsuario',
      views: {
        'tab-home': {
          templateUrl: 'templates/chat-detailH.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

      .state('tab.newRequestHome', {
      url: '/newRequest/:idUsuario',
      views: {
        'tab-home': {
          templateUrl: 'templates/request.html',
          controller: 'RequestCtrl'
        }
      }
    })


      .state('tab.newRequest', {
      url: '/newRequest/:idUsuario',
      views: {
        'tab-chats': {
          templateUrl: 'templates/request.html',
          controller: 'RequestCtrl'
        }
      }
    })

           .state('tab.requestInfl', {
      url: '/requestInfl/:idRequest',
      views: {
        'tab-dash': {
          templateUrl: 'templates/requestInfl.html',
          controller: 'requestInflCtrl'
        }
      }
    })







  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })




     .state('tab.notis', {
      url: '/notis',
      views: {
        'tab-account': {
          templateUrl: 'templates/notis.html',
          controller: 'notisCtrl'
        }
      }
    })



     .state('tab.personal', {
      url: '/personal',
      views: {
        'tab-account': {
          templateUrl: 'templates/personal.html',
          controller: 'personalCtrl'
        }
      }
    })

          .state('tab.history', {
      url: '/history',
      views: {
        'tab-account': {
          templateUrl: 'templates/history.html',
          controller: 'historyCtrl'
        }
      }
    })


        .state('tab.paymentMethod', {
      url: '/paymentMethod',
      views: {
        'tab-account': {
          templateUrl: 'templates/paymentMethod.html',
          controller: 'payCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
 // $urlRouterProvider.otherwise('/tab/dash');

});
