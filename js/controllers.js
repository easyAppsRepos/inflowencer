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


  $scope.cantSelect= 3;


//ts
$scope.someModelMultiple = [];
$scope.selectables = [{nombre:'technology', id:1},
                      {nombre:'sports', id:2},
                      {nombre:'music', id:3},
                      {nombre:"men's clothes", id:4},
                      {nombre:"women's clothing", id:5},
                      {nombre:'social networking', id:6},
                      {nombre:'audio', id:7},
                      {nombre:'video', id:8},
                      {nombre:'photography', id:9},
                      {nombre:'movies', id:10},
                      {nombre:'charity', id:11},
                      {nombre:'design', id:12},];



                      $scope.someModelMultiple2 = [];
$scope.selectables2 = [{nombre:'mostly girls', id:1},
                      {nombre:'mostly guys', id:2},
                      {nombre:'young people', id:3},
                      {nombre:"adults", id:4},
                      {nombre:"kids", id:5},
                      {nombre:'old people', id:6}];




/*            <option value='1'>mostly girls</option>
        <option value='2'>mostly guys</option>
        <option value='3'>young people</option>
        <option value='4'>adults</option>
        <option value='5'>kids</option>
        <option value='6'>old people</option>
        <option value='7'>various</option> 



        <option value='1'>technology</option>
        <option value='2'>sports</option>
        <option value='3'>music</option>
        <option value='4'>men's clothes</option>
        <option value='5'>women's clothing</option>
        <option value='6'>social networking</option>
        <option value='7'>audio</option>
        <option value='8'>video</option>
        <option value='9'>photography</option>
        <option value='10'>movies</option>
        <option value='11'>charity</option>
        <option value='12'>design</option>




   


        */

//tes



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

        $scope.getterFunction = function(selectedItem){

console.log(selectedItem);
  }

        $scope.verificarCantidad = function(){

console.log('D');


  }




      $scope.seleccionado = function(newValue, oldValue){
console.log(newValue);

newValue[0] ? $scope.usuario.opcion11 = newValue[0].id : $scope.usuario.opcion11 = undefined;
newValue[1] ? $scope.usuario.opcion12 = newValue[1].id : $scope.usuario.opcion12 = undefined;
    //$state.go('instalog');
  }


        $scope.seleccionado2 = function(newValue, oldValue){

          newValue[0] ? $scope.usuario.opcion21 = newValue[0].id : $scope.usuario.opcion21 = undefined;
          newValue[1] ? $scope.usuario.opcion22 = newValue[1].id : $scope.usuario.opcion22 = undefined;

console.log(newValue)
    //$state.go('instalog');
  }

      $scope.abrirModalOpciones = function(){

    //$state.go('instalog');
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
.controller('payCtrl', function($scope, $ionicPlatform, $ionicLoading, $ionicPopup, api) {

$scope.userData = JSON.parse(window.localStorage.getItem('userInfoIF'));


  var productIds = ['com.inflowencer.app']; // <- Add your product Ids here

  var spinner = '<ion-spinner icon="dots" class="spinner-stable"></ion-spinner><br/>';

  $scope.getReceipt = function(){
      if( $scope.receip){
      $ionicLoading.show();

      api.verificarReceip({receip:$scope.receip}).then(function (data) {

        console.log(data);

        }).finally(function () {
        $ionicLoading.hide();
        });
      }
      else{console.log('reic no defined')}

  }


  $scope.verificarSuscripcion = function(palabra){
console.log('verificarSuscripcion');
      $ionicLoading.show();
      api.verificarSuscripcion({idUsuario: $scope.userData.instagramId}).then(function (data) {

        console.log(data);
        $scope.cargaTerminada = true;

        if(data.data.suscription){
          $scope.suscripcion = true;
          $scope.loadProducts(); 
        }
        else{
          $scope.suscripcion = false;
          $scope.loadProducts(); 
        }  

        }).finally(function () {
        $ionicLoading.hide();
       
        });
      

  }

$scope.verificarSuscripcion();
  $scope.loadProducts = function () {



    $ionicLoading.show({ template: spinner });
    inAppPurchase
      .getProducts(productIds)
      .then(function (products) {
        console.log(products);
        $ionicLoading.hide();
        //$scope.products = products;
        $scope.productoF = products[0];
      })
      .catch(function (err) {
        $ionicLoading.hide();
        console.log(err);
      });
  };

  //$scope.loadProducts(); 


    $scope.getRecesipt = function () {
    $ionicLoading.show({ template: spinner + 'get receip...' });
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






/*
      .then(function () {
        var alertPopup = $ionicPopup.alert({
          title: 'Purchase',
          template: 'Purchase was successful'
        });
        console.log('consume done!');
        $ionicLoading.hide();
      })*/

  $scope.buy = function (productId) {
    console.log(  $scope.productoF);
    $ionicLoading.show({ template: spinner + 'Purchasing...' });
    inAppPurchase
      .buy(productId)
      .then(function (data) {
        console.log(data);
        console.log(JSON.stringify(data));
        $scope.receip = data.receipt;

          api.insertReceip({idUsuario:$scope.userData.instagramId,receip:$scope.receip}).then(function (data) {
          console.log(data);
          }).finally(function () {
          $ionicLoading.hide();
          });

        //console.log('consuming transactionId: ' + data.transactionId);
        //return inAppPurchase.consume(data.type, data.receipt, data.signature);
      }).catch(function (err) {
        $ionicLoading.hide();
        console.log(err);
        $ionicPopup.alert({
          title: 'Ups! Something went wrong',
          template: "Sorry, we can't do this now"
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





    $scope.getTopRefresh = function(){

      console.log($scope.userData);
      $ionicLoading.show();
      api.getTop($scope.userData.instagramId).then(function (data) {
        console.log(data);
      console.log(data.data[0]);
      if(data){
      $scope.listaInfluencers = data.data[0];
      $scope.listaStores = data.data[1];
           $scope.storeRank = data.data[2][0].asStore;
                $scope.influencerRank = data.data[2][0].asInfluencer;

                                $scope.newInfluencers = data.data[3];
                $scope.newStores =data.data[4];
                      $scope.$broadcast('scroll.refreshComplete');

      }
      else{
      alert('Ha ocurrido un error');
      }
      }).finally(function () {
      $ionicLoading.hide();
      });     
    }


    $scope.getTop = function(){

      console.log($scope.userData);
      $ionicLoading.show();
      api.getTop($scope.userData.instagramId).then(function (data) {
        console.log(data);
      console.log(data.data[0]);
      if(data){
      $scope.listaInfluencers = data.data[0];
      $scope.listaStores = data.data[1];
           $scope.storeRank = data.data[2][0].asStore;
                $scope.influencerRank = data.data[2][0].asInfluencer;

                                $scope.newInfluencers = data.data[3];
                $scope.newStores =data.data[4];
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


.controller('requestInflCtrl', function($scope, $state,$stateParams, api, $ionicLoading,$ionicHistory, $ionicPopup) {

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


  $scope.showAlert = function(meesage, titu) {
   var alertPopup = $ionicPopup.alert({
     title: titu,
     template: meesage
   });

   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
 };




$scope.borrarReq=function(idRequest){

   var confirmPopup = $ionicPopup.confirm({
     title: 'Delete',
     template: 'Are you sure you want to delete this request?'
   });

   confirmPopup.then(function(res) {
     if(res) {

       console.log('You are sure');

            $ionicLoading.show();
          api.borrarRequest({id:idRequest}).then(function (data) {

        //  console.log(data.data.insertId);
        //data.data.users
        if(data.data){
          $scope.showAlert('Request has been deleted!');
          $ionicHistory.goBack(-1);
         // alert('request enviada correctamente');
          //$state.go('tab.dash');
        }
        else{
          $scope.showAlert('UPS! Something wrong happend', 'Error');
          //alert('UPS! Something wrong happend');
        }
        


        }).finally(function () {
        $ionicLoading.hide();
       
        });


     } else {
       console.log('You are not sure');
     }
   });



}





    $scope.goPerfil = function( idUsuario){

  console.log(idUsuario);
  $state.go('tab.dash-detailHome', {idUsuario: idUsuario});

  }






  $scope.enviarReq = function(){

   // newRequest.idStore = $scope.userData.instagramId;
    
    //console.log(newRequest);

          $ionicLoading.show();
          api.infoRequest({idRequest:$stateParams.idRequest}).then(function (data) {

          console.log(data.data.request[0]);
        //data.data.users
        if(data.data.request[0]){
   
          console.log(data.data.request[0].idInfluencer ==  $scope.userData.instagramId);
          $scope.request = data.data.request[0];
          //$state.go('tab.dash');
        }
        else{
          //alert('Ha ocurrido un error');
          $scope.showAlert('This request has been deleted!', 'Not Found');
          $ionicHistory.goBack(-1);

        }
        


        }).finally(function () {
        $ionicLoading.hide();
       
        });


       
  }

  $scope.enviarReq();



})

.controller('RequestCtrl', function($scope, $state,$stateParams, api, $ionicPopup, $ionicLoading,$ionicHistory) {

 $scope.userData = JSON.parse(window.localStorage.getItem('userInfoIF'));


 $scope.req = {};


  $scope.showAlert = function(meesage) {
   var alertPopup = $ionicPopup.alert({
     title: 'Success',
     template: meesage
   });

   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
 };



  $scope.enviarReq = function(newRequest){

    newRequest.idStore = $scope.userData.instagramId;
    newRequest.idInfluencer = $stateParams.idUsuario;
    console.log(newRequest);

          $ionicLoading.show();
          api.enviarReq(newRequest).then(function (data) {

          console.log(data.data.insertId);
        //data.data.users
        if(data.data.insertId){
          $scope.showAlert('Request has been sent!');
          $ionicHistory.goBack(-2);
         // alert('request enviada correctamente');
          //$state.go('tab.dash');
        }
        else{
          alert('UPS! Something wrong happend');
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
          console.log(eventss);
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

$scope.usuario = {};

 $scope.editar = false;






$scope.someModelMultiple = [];
$scope.selectables = [{nombre:'technology', id:1},
                      {nombre:'sports', id:2},
                      {nombre:'music', id:3},
                      {nombre:"men's clothes", id:4},
                      {nombre:"women's clothing", id:5},
                      {nombre:'social networking', id:6},
                      {nombre:'audio', id:7},
                      {nombre:'video', id:8},
                      {nombre:'photography', id:9},
                      {nombre:'movies', id:10},
                      {nombre:'charity', id:11},
                      {nombre:'design', id:12},];



                      $scope.someModelMultiple2 = [];
$scope.selectables2 = [{nombre:'mostly girls', id:1},
                      {nombre:'mostly guys', id:2},
                      {nombre:'young people', id:3},
                      {nombre:"adults", id:4},
                      {nombre:"kids", id:5},
                      {nombre:'old people', id:6}];





    //var token = window.localStorage.getItem('tokInfl') || undefined;
    console.log($scope.userData.instagramId);
    //console.log($stateParams.idUsuario);


$scope.getProfileUser = function(){

      $ionicLoading.show();
    api.getDataUser($scope.userData.instagramId).then(function (events) {
      console.log(events);

      $scope.dataUser = events.data.user[0];
      //$scope.chats = events.data || [];

    }).finally(function () {

        $ionicLoading.hide();

        });



}

  $scope.getProfileUser();



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


        $scope.seleccionado = function(newValue, oldValue){
console.log(newValue);

newValue[0] ? $scope.usuario.opcion11 = newValue[0].id : $scope.usuario.opcion11 = undefined;
newValue[1] ? $scope.usuario.opcion12 = newValue[1].id : $scope.usuario.opcion12 = undefined;
    //$state.go('instalog');
  }


        $scope.seleccionado2 = function(newValue, oldValue){

          newValue[0] ? $scope.usuario.opcion21 = newValue[0].id : $scope.usuario.opcion21 = undefined;
          newValue[1] ? $scope.usuario.opcion22 = newValue[1].id : $scope.usuario.opcion22 = undefined;

console.log(newValue)
    //$state.go('instalog');
  }

      $scope.editarPerfil = function(){
         $scope.editar = true;
         $scope.usuario=$scope.dataUser;
         $scope.usuario.bio = $scope.dataUser.bioApp;
    
  }


      $scope.guardarPerfil = function(){
      $scope.usuario.idUsuario = $scope.userData.instagramId;
       //  $scope.usuario=$scope.dataUser;
     //    $scope.usuario.bio = $scope.dataUser.bioApp;

     console.log($scope.usuario);
     $scope.editar = false;

     
           $ionicLoading.show();
    api.editarUsuario($scope.usuario).then(function (events) {
      console.log(events);

      //$scope.dataUser = events.data.user[0];
      //$scope.chats = events.data || [];

    }).finally(function () {

       // $ionicLoading.hide();
            $scope.editar = false;
            $scope.getProfileUser();


        });



    
  }







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




.controller('ChatsCtrl2', function($scope, api, $ionicLoading, $state ) {


  $scope.buscador={};


  $scope.filtro={};
   $scope.usuario={};
  $scope.cargaTerminada = false;

  $scope.userData = JSON.parse(window.localStorage.getItem('userInfoIF'));



  $scope.someModelMultiple = [];
$scope.selectables = [{nombre:'technology', id:1},
                      {nombre:'sports', id:2},
                      {nombre:'music', id:3},
                      {nombre:"men's clothes", id:4},
                      {nombre:"women's clothing", id:5},
                      {nombre:'social networking', id:6},
                      {nombre:'audio', id:7},
                      {nombre:'video', id:8},
                      {nombre:'photography', id:9},
                      {nombre:'movies', id:10},
                      {nombre:'charity', id:11},
                      {nombre:'design', id:12},];



                      $scope.someModelMultiple2 = [];
$scope.selectables2 = [{nombre:'mostly girls', id:1},
                      {nombre:'mostly guys', id:2},
                      {nombre:'young people', id:3},
                      {nombre:"adults", id:4},
                      {nombre:"kids", id:5},
                      {nombre:'old people', id:6}];



      $scope.getCategorias = function(numero){
console.log(numero);
       return numero == 1 ? 'technology' : numero == 2 ? 'sports' : numero == 3 ? 'music' 
       : numero == 4 ? "men's clothes" : numero == 5 ? "women's clothes" : 
       numero == 6 ? "social networking" : numero == 7 ? "audio" :  numero == 8 ? "video" :
       numero == 9 ? "photography" : numero == 10 ? "movies" :  numero == 11 ? "charity" :
       numero == 12 ? "design" : "";

    
  }


        $scope.buscar = function(numero){
  
          console.log($scope.usuario);
        $ionicLoading.show();

 
      api.busquedaAvanzada($scope.usuario).then(function (data) {

        console.log(data.data.users);
        //data.data.users

        $scope.resultados= data.data.users;


        }).finally(function () {
        $ionicLoading.hide();
       
        });


  }


    $scope.getCategorias2 = function(numero){

       return numero == 1 ? 'mostly girls' : numero == 2 ? 'mostly guys' : numero == 3 ? 'young people' 
       : numero == 4 ? "adults" : numero == 5 ? "kids" : 
       numero == 6 ? "old people" : numero == 7 ? "various" : "";

    
  }


      $scope.seleccionado = function(newValue, oldValue){
console.log(newValue);

newValue[0] ? $scope.usuario.opcion11 = newValue[0].id : $scope.usuario.opcion11 = undefined;
newValue[1] ? $scope.usuario.opcion12 = newValue[1].id : $scope.usuario.opcion12 = undefined;
    //$state.go('instalog');
  }


        $scope.seleccionado2 = function(newValue, oldValue){

          newValue[0] ? $scope.usuario.opcion21 = newValue[0].id : $scope.usuario.opcion21 = undefined;
          newValue[1] ? $scope.usuario.opcion22 = newValue[1].id : $scope.usuario.opcion22 = undefined;

console.log(newValue)
    //$state.go('instalog');
  }



  $scope.goPerfil = function( idUsuario, tipoCuenta){

  console.log(idUsuario);
  $state.go('tab.chat-detail', {idUsuario: idUsuario});

  }

  $scope.goPremium = function(){

    $state.go('tab.paymentMethod2');
  }



  $scope.verificarSuscripcion = function(palabra){
console.log('verificarSuscripcion');
      $ionicLoading.show();
      api.verificarSuscripcion({idUsuario: $scope.userData.instagramId}).then(function (data) {

        console.log(data);
        $scope.cargaTerminada = true;

        if(data.data.suscription){
          $scope.suscripcion = true;
        }
        else{
          $scope.suscripcion = false;
        }  

        }).finally(function () {
        $ionicLoading.hide();
       
        });
      

  }


  $scope.verificarSuscripcion();
   //$scope.cargaTerminada = true;
   //$scope.suscripcion = true;

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



    $scope.goFiltro = function(){
//console.log( $scope.filtro ? $scope.filtro.option1 : 'not defined');


    $state.go('tab.chat-search');

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

.controller('ChatsCtrl', function($scope, api, $ionicLoading, $state ) {


  $scope.buscador={};


  $scope.filtro={};
  $scope.cargaTerminada = false;

  $scope.userData = JSON.parse(window.localStorage.getItem('userInfoIF'));


  $scope.goPerfil = function( idUsuario, tipoCuenta){

  console.log(idUsuario);
  $state.go('tab.chat-detail', {idUsuario: idUsuario});

  }

  $scope.goPremium = function(){

    $state.go('tab.paymentMethod2');
  }



  $scope.verificarSuscripcion = function(palabra){
console.log('verificarSuscripcion');
      $ionicLoading.show();
      api.verificarSuscripcion({idUsuario: $scope.userData.instagramId}).then(function (data) {

        console.log(data);
        $scope.cargaTerminada = true;

        if(data.data.suscription){
          $scope.suscripcion = true;
        }
        else{
          $scope.suscripcion = false;
        }  

        }).finally(function () {
        $ionicLoading.hide();
       
        });
      

  }


  //$scope.verificarSuscripcion();
   $scope.cargaTerminada = true;
   $scope.suscripcion = true;

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



    $scope.goFiltro = function(){
//console.log( $scope.filtro ? $scope.filtro.option1 : 'not defined');


    $state.go('tab.chat-search');

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

.controller('AccountCtrl', function($scope, $state, $ionicHistory, $ionicLoading, $timeout, api) {


  $scope.userData = JSON.parse(window.localStorage.getItem('userInfoIF'));



  $scope.settings = {
    enableFriends: true
  };



$scope.cerrarSesion = function(){


  window.localStorage.setItem( 'tokInfl', undefined);  


      $ionicLoading.show();
    api.logoutIG().then(function (events) {
      console.log(events);
        $state.go('login');
     // $scope.dataUser = events.data.user[0];
      //$scope.chats = events.data || [];

    }).finally(function () {

          $ionicLoading.hide();
          $timeout(function () {
          $ionicHistory.clearCache();
          $ionicLoading.hide();
          }, 200);


        });



  //https://www.instagram.com/accounts/logout/
 


}








});
