angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,  $rootScope, $location, $state, $ionicLoading, api) {

 console.log(window.location.href );

 
  $scope.userData = JSON.parse(window.localStorage.getItem('userInfoIF'));
  console.log($scope.userData.instagramId);

  var getRequests = function(){

      $ionicLoading.show();
      api.getRequests($scope.userData.instagramId).then(function (data) {

        console.log(data.data.data);
        $scope.requests = data.data.data || [];


        }).finally(function () {
        $ionicLoading.hide();
       
        });

  }

  getRequests();
/*  if(userData){

    $scope.usuarioInfo.id = userData.idUsuario;

  }
  else{$state.go('login');}
  */


})


.controller('registerLogCtrl', function($scope,  $state, $rootScope, $stateParams, $location, api,  $ionicLoading) {

  $scope.usuario={};
  $scope.tipoProfile = $stateParams.tipoPerfil;
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
         usuario.tipoCuenta = $stateParams.tipoPerfil;

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

.controller('instalogCtrl', function($scope,$state,$ionicPopup, $ionicLoading) {

$scope.cuenta={};

  $scope.goLogin = function(){

    $state.go('login');
  }



 $scope.showAlert = function(message) {
   var alertPopup = $ionicPopup.alert({
     title: 'ooops!',
     template: message
   });

   alertPopup.then(function(res) {
     console.log('okm');
   });
 };



  $scope.goRegister = function(tipo){
    console.log(tipo);

    if(tipo == 1){
   
             $state.go('registerLog', {tipoPerfil : tipo});

    }
    else if(tipo == 2){   $state.go('registerLog', {tipoPerfil : tipo});}
    else{
      $scope.showAlert('You must select a profile type');
    }



    
  }

})
.controller('HomeCtrl', function($scope, $state,$stateParams, api, $ionicLoading,$ionicHistory) {

$scope.userData = JSON.parse(window.localStorage.getItem('userInfoIF'));


    $scope.getTop = function(){
      $ionicLoading.show();
      api.getTop().then(function (data) {
      console.log(data.data[0]);
      if(data){
      $scope.listaInfluencers = data.data[0];
      $scope.listaStores = data.data[1];
      }
      else{
      alert('Ha ocurrido un error');
      }
      }).finally(function () {
      $ionicLoading.hide();
      });     
    }

  $scope.getTop();


})


.controller('requestInflCtrl', function($scope, $state,$stateParams, api, $ionicLoading,$ionicHistory) {

 $scope.userData = JSON.parse(window.localStorage.getItem('userInfoIF'));

 

  $scope.aceptarP = function(idR){

           $ionicLoading.show();
          api.cambiarEstadoRequest({idRequest:idR, estado:1}).then(function (data) {

          console.log(data);
        //data.data.users
        if(data){
   
          console.log('listo');
         $scope.enviarReq();
          //$state.go('tab.dash');
        }
        else{
          alert('Ha ocurrido un error');
        }
        }).finally(function () {
        $ionicLoading.hide();
        });
      } 

  $scope.rechazarP = function(idR){

               $ionicLoading.show();
          api.cambiarEstadoRequest({idRequest:idR, estado:2}).then(function (data) {

          console.log(data);
        //data.data.users
        if(data){
   
          console.log('listo');
          $scope.enviarReq();
          //$state.go('tab.dash');
        }
        else{
          alert('Ha ocurrido un error');
        }
        }).finally(function () {
        $ionicLoading.hide();
        });


  } 



  $scope.enviarReq = function(){

   // newRequest.idStore = $scope.userData.instagramId;
    
    //console.log(newRequest);

          $ionicLoading.show();
          api.infoRequest({idRequest:$stateParams.idRequest}).then(function (data) {

          console.log(data.data.request[0]);
        //data.data.users
        if(data){
   
          console.log(data.data.request[0].idInfluencer ==  $scope.userData.instagramId);
          $scope.request = data.data.request[0];
          //$state.go('tab.dash');
        }
        else{
          alert('Ha ocurrido un error');
        }
        


        }).finally(function () {
        $ionicLoading.hide();
       
        });


       
  }

  $scope.enviarReq();



})

.controller('RequestCtrl', function($scope, $state,$stateParams, api, $ionicLoading,$ionicHistory) {

 $scope.userData = JSON.parse(window.localStorage.getItem('userInfoIF'));


 $scope.req = {};

  $scope.enviarReq = function(newRequest){

    newRequest.idStore = $scope.userData.instagramId;
    newRequest.idInfluencer = $stateParams.idUsuario;
    console.log(newRequest);

          $ionicLoading.show();
          api.enviarReq(newRequest).then(function (data) {

          console.log(data.data.insertId);
        //data.data.users
        if(data.data.insertId){
          $ionicHistory.goBack(-2);
          alert('request enviada correctamente');
          //$state.go('tab.dash');
        }
        else{
          alert('Ha ocurrido un error');
        }
        


        }).finally(function () {
        $ionicLoading.hide();
       
        });


       
  }





})
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

.controller('ProfileCtrl', function($scope, $stateParams, api, $state, $ionicLoading) {

 $scope.userData = JSON.parse(window.localStorage.getItem('userInfoIF'));


    //var token = window.localStorage.getItem('tokInfl') || undefined;
    console.log($scope.userData.instagramId);
    //console.log($stateParams.idUsuario);

    $ionicLoading.show();
    api.getDataUser($scope.userData.instagramId).then(function (events) {
      console.log(events);

      $scope.dataUser = events.data.user[0];
      //$scope.chats = events.data || [];

    }).finally(function () {

        $ionicLoading.hide();

        });

})

.controller('paymentMethodCtrl', function($scope) {})
.controller('personalCtrl', function($scope) {})
.controller('historyCtrl', function($scope) {})
.controller('notisCtrl', function($scope) {})



.controller('ChatsCtrl', function($scope, api, $ionicLoading, $state ) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
/*
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };*/

  $scope.buscador={};
  $scope.userData = JSON.parse(window.localStorage.getItem('userInfoIF'));


  $scope.goPerfil = function( idUsuario, tipoCuenta){

  console.log(idUsuario);
  $state.go('tab.chat-detail', {idUsuario: idUsuario});

  }


  $scope.buscarPalabra = function(palabra){

if(palabra.length > 2){      $ionicLoading.show();


      api.buscarUsuario(palabra).then(function (data) {

        console.log(data.data.users);
        //data.data.users

        $scope.resultados= data.data.users;


        }).finally(function () {
        $ionicLoading.hide();
       
        });
        }

  }


})

.controller('ChatDetailCtrl', function($scope, $stateParams, api, $state, $ionicLoading) {

 $scope.userData = JSON.parse(window.localStorage.getItem('userInfoIF'));


    var token = window.localStorage.getItem('tokInfl') || undefined;
    console.log(token);
    console.log($stateParams.idUsuario);

    $ionicLoading.show();
    api.getDataUser($stateParams.idUsuario).then(function (events) {
      console.log(events);

      $scope.dataUser = events.data.user[0];
      //$scope.chats = events.data || [];

    }).finally(function () {

        $ionicLoading.hide();

        });

      
    $scope.abrirReq = function(){
        $state.go('tab.newRequest', {idUsuario: $stateParams.idUsuario});
    }




  
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
