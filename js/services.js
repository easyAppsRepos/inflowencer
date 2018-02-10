angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})




.factory('api', function($http, $q, $window, serverConfig) {

    return {

    
            getDataInstagram:function(token){  
            return  $http.get('https://api.instagram.com/v1/users/self/?access_token='+token)
            .then(function(response) {
            //console.log(response);
            return response;
            }, function(response) {
            // something went wrong
             console.log('error');
             //console.log(response);
            return response;
            });
        },
            verificarLogs:function(user){  
            return  $http.post(serverConfig.url+'/verificarLog',user)
            .then(function(response) {
            console.log(response);
            return response;
            }, function(response) {
            // something went wrong
            console.log('error');
             console.log(response);

            return response;
            });
        },

                registrarUsuario:function(user){  
        //  var dusuario = {body:JSON.stringify({usuario})};
            return  $http.post(serverConfig.url+'/registrarUsuario', user,{headers:{'Content-Type': 'application/json'}})
            .then(function(response) {
            return response;
            }, function(response) {
            // something went wrong
            console.log('error');
            return undefined;
            });
        },

           verificarLog:function(userInsta){  
        //  var dusuario = {body:JSON.stringify({usuario})};
            return  $http.post(serverConfig.url+'/verificarLog', userInsta,{headers:{'Content-Type': 'application/json'}})
            .then(function(response) {
            return response;
            }, function(response) {
            // something went wrong
            console.log('error');
            return undefined;
            });
        }

        


        }
      });
