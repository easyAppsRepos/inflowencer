angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,  $rootScope, $location) {

 console.log(window.location.href );

 
  var userData = JSON.parse(window.localStorage.getItem('userInfoIF'));
console.log(userData);
  $scope.usuarioInfo.id = userData.idUsuario;


})


.controller('registerLogCtrl', function($scope,  $state, $rootScope, $location, api,  $ionicLoading) {

  $scope.usuario={};
 
  var token = window.localStorage.getItem('tokInfl') || undefined;
console.log(token);
    api.getDataInstagram(token).then(function (events) {
      console.log(events.data.data);

      $scope.dataUser = events.data.data;
      //$scope.chats = events.data || [];

    }).finally(function () {

        $ionicLoading.hide();

        });

      $scope.goInstalog = function(){

    $state.go('instalog');
  }


  $scope.registrarUsuario = function(usuario){


// instagramId, tipoCuenta, bio,opcion11, opcion12, opcion21, opcion22

    if(token){
        $ionicLoading.show();
        usuario.instagramId = $scope.dataUser.id;
         usuario.tipoCuenta = 1;

        console.log(usuario);

        api.registrarUsuario(usuario).then(function (eventss) {
          console.log('ds2');
          console.log(eventss);
        }).finally(function () {
        $ionicLoading.hide();
        $state.go('tab.dash');
        });
    }
    else {
      $state.go('login');
    }     
  }


})

.controller('instalogCtrl', function($scope,$state) {

$scope.cuenta={};

  $scope.goLogin = function(){

    $state.go('login');
  }


  $scope.goRegister = function(tipo){
    console.log(tipo);

    if(tipo == 1){$state.go('registerLog');}
    else if(tipo == 2){$state.go('registerLog');}
    else{
      alert(debes seleccionar un tipo de perfil);
    }



    
  }

})
.controller('HomeCtrl', function($scope) {})
.controller('RequestCtrl', function($scope) {})
.controller('loginCtrlI', function($scope, $state, api, $ionicLoading) {


var refff;

function loadStartCallBack() {
 
 console.log('her');
 console.log(window.location.href );
   // $('#status-message').text("loading please wait ...");
 
}


function loadStopCallBack() {
 
 console.log('her2');
 console.log(window.location.href );
   // $('#status-message').text("loading please wait ...");
 
}


function loadErrorCallBack(params) {
 
     console.log('her5');
 console.log(window.location.href );
  console.log(params);
 

 if(params.code==-1004 || params.code=='-1004'){


    var str = params.url;
    var res = str.split("=");

    var accesT=res[1];
    window.localStorage.setItem( 'tokInfl', accesT);
    refff.close();
    refff = undefined;


    //$state.go('tab.dash');

    $ionicLoading.show();

    api.getDataInstagram(accesT).then(function (events) {
      console.log(events);
      //$scope.chats = events.data || [];

        api.verificarLog(events.data.data).then(function (eventss) {

          if(!eventss){

            console.log('error');
          }
            else{

               console.log(eventss.data.user);
        window.localStorage.setItem( 'userInfoIF', JSON.stringify(eventss.data.user));  
        //$scope.chats = events.data || [];

        if(eventss.data.user.tipoCuenta == 0){
           $state.go('instalog');
        }
        else{
           $state.go('tab.dash');
        }

       
            }

       




        }).finally(function () {

        $ionicLoading.hide();

        });




    });

 }
 else{

  
      var scriptErrorMesssage =
       "alert('Sorry we cannot open that page. Message from the server is : "
       + params.message + "');"
 
    refff.executeScript({ code: scriptErrorMesssage }, executeScriptCallBack);
 
    refff.close();
 
    refff = undefined;


 }




 
}


function executeScriptCallBack(params) {
 
  console.log('her4');
 console.log(window.location.href );

    if (params[0] == null) {
 
       console.log('4s3');
    }
 
}
 



    $scope.openPage = function(link){

  if(link == null || link == 'null' || link == 'undefinded'){console.log('nolink')}

  else{
    //  window.open(link, '_blank', 'location=yes'); return false;
      refff = cordova.InAppBrowser.open(link, '_blank', 'location=no');
      refff.addEventListener('loadstart', loadStartCallBack);
      refff.addEventListener('loadstop', loadStopCallBack);
      refff.addEventListener('loaderror', loadErrorCallBack);



  }  
}


})
.controller('ProfileCtrl', function($scope) {})
.controller('paymentMethodCtrl', function($scope) {})
.controller('personalCtrl', function($scope) {})
.controller('historyCtrl', function($scope) {})
.controller('notisCtrl', function($scope) {})



.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $state, $ionicHistory, $ionicLoading, $timeout) {
  $scope.settings = {
    enableFriends: true
  };



$scope.cerrarSesion = function(){
$ionicLoading.show();

  window.localStorage.setItem( 'tokInfl', undefined);  
  $state.go('login');
  $timeout(function () {
          $ionicHistory.clearCache();
          $ionicLoading.hide();
      }, 200)  


}








});
