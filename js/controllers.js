angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,  $rootScope, $location, $state, $ionicLoading, api) {

 console.log(window.location.href );



 $scope.doRefresh = function() {
    getRequests();

    }





 
  $scope.userData = JSON.parse(window.localStorage.getItem('userInfoIF'));
  console.log($scope.userData.instagramId);

  var getRequests = function(){

      $ionicLoading.show();
      api.getRequests($scope.userData.instagramId).then(function (data) {

        console.log(data.data.data);
        $scope.requests = data.data.data || [];


        }).finally(function () {
        $ionicLoading.hide();
          $scope.$broadcast('scroll.refreshComplete');
       
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

          if(eventss){
            $state.go('tab.dash');
          }
        }).finally(function () {
        $ionicLoading.hide();
        
        });
    }
    else {
      $state.go('login');
    }     
  }


})
.controller('payCtrl', function($scope, $ionicPlatform, $ionicLoading, $ionicPopup) {

  var productIds = ['com.inflowencer.app']; // <- Add your product Ids here

  var spinner = '<ion-spinner icon="dots" class="spinner-stable"></ion-spinner><br/>';

  $scope.loadProducts = function () {
    $ionicLoading.show({ template: spinner + 'Loading Products...' });
    inAppPurchase
      .getProducts(productIds)
      .then(function (products) {
        console.log(products);
        $ionicLoading.hide();
        $scope.products = products;
        $scope.productoF = products[0];
      })
      .catch(function (err) {
        $ionicLoading.hide();
        console.log(err);
      });
  };


    $scope.getReceipt = function () {
    $ionicLoading.show({ template: spinner + 'Loading Products...' });
    inAppPurchase
    .getReceipt()
    .then(function (receipt) {
    console.log(receipt);
     $ionicLoading.hide();
    })
    .catch(function (err) {
    console.log(err);
     $ionicLoading.hide();
    });
  };








  $scope.buy = function (productId) {
    console.log(  $scope.productoF);
    $ionicLoading.show({ template: spinner + 'Purchasing...' });
    inAppPurchase
      .buy(productId)
      .then(function (data) {
        console.log(JSON.stringify(data));
        console.log('consuming transactionId: ' + data.transactionId);
        return inAppPurchase.consume(data.type, data.receipt, data.signature);
      })
      .then(function () {
        var alertPopup = $ionicPopup.alert({
          title: 'Purchase was successful!',
          template: 'Check your console log for the transaction data'
        });
        console.log('consume done!');
        $ionicLoading.hide();
      })
      .catch(function (err) {
        $ionicLoading.hide();
        console.log(err);
        $ionicPopup.alert({
          title: 'Something went wrong',
          template: 'Check your console log for the error details'
        });
      });

  };

  $scope.restore = function () {
    $ionicLoading.show({ template: spinner + 'Restoring Purchases...' });
    inAppPurchase
      .restorePurchases()
      .then(function (purchases) {
        $ionicLoading.hide();
        console.log(JSON.stringify(purchases));
        $ionicPopup.alert({
          title: 'Restore was successful!',
          template: 'Check your console log for the restored purchases data'
        });
      })
      .catch(function (err) {
        $ionicLoading.hide();
        console.log(err);
        $ionicPopup.alert({
          title: 'Something went wrong',
          template: 'Check your console log for the error details'
        });
      });
  };

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


  $scope.getCategorias = function(numero){
console.log(numero);
       return numero == 1 ? 'technology' : numero == 2 ? 'sports' : numero == 3 ? 'music' 
       : numero == 4 ? "men's clothes" : numero == 5 ? "women's clothes" : 
       numero == 6 ? "social networking" : numero == 7 ? "audio" :  numero == 8 ? "video" :
       numero == 9 ? "photography" : numero == 10 ? "movies" :  numero == 11 ? "charity" :
       numero == 12 ? "design" : "";

    
  }

    $scope.goPerfil = function( idUsuario){

  console.log(idUsuario);
  $state.go('tab.chat-detailHome', {idUsuario: idUsuario});

  }




    $scope.getTop = function(){

      console.log($scope.userData);
      $ionicLoading.show();
      api.getTop($scope.userData.instagramId).then(function (data) {
        console.log(data);
      console.log(data.data[0]);
      if(data){
      $scope.listaInfluencers = data.data[1];
      $scope.listaStores = data.data[0];
           $scope.storeRank = data.data[2][0].asStore;
                $scope.influencerRank = data.data[2][0].asInfluencer;
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



        $scope.marcarCompletado = function(idR){

           $ionicLoading.show();
          api.cambiarEstadoRequest({idRequest:idR, estado:3}).then(function (data) {

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

  console.log()
 if(params.code==-1004 || params.code=='-1004' || params.code=='-6' ||  params.code == -6 ){


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


.controller('historyCtrl', function($scope, $state,$stateParams, api, $ionicLoading,$ionicHistory) {
  $scope.buscador={};
  $scope.userData = JSON.parse(window.localStorage.getItem('userInfoIF'));



  var getRequests = function(){

      $ionicLoading.show();
      api.getHistory($scope.userData.instagramId).then(function (data) {

        console.log(data.data.data);
        $scope.resultados = data.data.data || [];


        }).finally(function () {
        $ionicLoading.hide();
          //$scope.$broadcast('scroll.refreshComplete');
       
        });

  }


  getRequests();





})
.controller('notisCtrl', function($scope) {})

.controller('personalCtrl', function($scope, api, $ionicLoading, $state ) {


  $scope.buscador={};
  $scope.userData = JSON.parse(window.localStorage.getItem('userInfoIF'));
  console.log($scope.userData);


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


  $scope.filtro={};

  $scope.userData = JSON.parse(window.localStorage.getItem('userInfoIF'));


  $scope.goPerfil = function( idUsuario, tipoCuenta){

  console.log(idUsuario);
  $state.go('tab.chat-detail', {idUsuario: idUsuario});

  }


  $scope.buscarPalabra = function(palabra){
//console.log( $scope.filtro ? $scope.filtro.option1 : 'not defined');
if(palabra.length > 2){      

      $ionicLoading.show();

 
      api.buscarUsuario(palabra).then(function (data) {

        console.log(data.data.users);
        //data.data.users

        $scope.resultados= data.data.users;


        }).finally(function () {
        $ionicLoading.hide();
       
        });
        }

  }


    $scope.listarTodos = function(palabra){
//console.log( $scope.filtro ? $scope.filtro.option1 : 'not defined');

      $ionicLoading.show();
      api.listarTodos().then(function (data) {
        $scope.buscador.palabra = '';
        $scope.resultados= data.data.users;
        }).finally(function () {
        $ionicLoading.hide();   
        });
        

  }




})

.controller('ChatDetailCtrl', function($scope, $stateParams, api, $state, $ionicLoading) {

 $scope.userData = JSON.parse(window.localStorage.getItem('userInfoIF'));


    var token = window.localStorage.getItem('tokInfl') || undefined;
    //console.log($scope.userData);
    //console.log($stateParams.idUsuario);
   $scope.mismoUsuario = false;
    if($scope.userData.instagramId == $stateParams.idUsuario){
      $scope.mismoUsuario = true;
    }

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

     $scope.abrirReq2 = function(){
        $state.go('tab.newRequestHome', {idUsuario: $stateParams.idUsuario});
    }



  $scope.getCategorias = function(numero){
console.log(numero);
       return numero == 1 ? 'technology' : numero == 2 ? 'sports' : numero == 3 ? 'music' 
       : numero == 4 ? "men's clothes" : numero == 5 ? "women's clothes" : 
       numero == 6 ? "social networking" : numero == 7 ? "audio" :  numero == 8 ? "video" :
       numero == 9 ? "photography" : numero == 10 ? "movies" :  numero == 11 ? "charity" :
       numero == 12 ? "design" : "";

    
  }

    $scope.getCategorias2 = function(numero){

       return numero == 1 ? 'mostly girls' : numero == 2 ? 'mostly guys' : numero == 3 ? 'young people' 
       : numero == 4 ? "adults" : numero == 5 ? "kids" : 
       numero == 6 ? "old people" : numero == 7 ? "various" : "";

    
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
