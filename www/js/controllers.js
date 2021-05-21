angular.module('starter.controllers', [])


.controller('DashCtrl', function ($scope, $interval, $ionicSlideBoxDelegate,  $window, $rootScope) {

  $scope.getPosition = function () {
    var onSuccess = function (position) {
      console.log('Latitude: ' + position.coords.latitude + '\n' +
        'Longitude: ' + position.coords.longitude
      );
      nativegeocoder.reverseGeocode(success, failure, position.coords.latitude, position.coords.longitude, { useLocale: true, maxResults: 1 });

      function success(result) {
        var firstResult = result[0];
        console.log("First Result: " + firstResult.areasOfInterest[0]);
        $rootScope.location = firstResult.areasOfInterest[0];
       // $rootScope.location = firstResult.areasOfInterest[0] + "," + firstResult.throughfare + "," + firstResult.sublocality;

      }

      function failure(err) {
        console.log(err);
      }
    };

    navigator.geolocation.getCurrentPosition(onSuccess);

  }

  var index = 0;
  $scope.myInterval = 3000;
  $scope.images = [
    { Photo: "img/sand.jpeg" },
    { Photo: "img/fruitsalad.jpeg" },
    { Photo: "img/5.jpeg" },
    { Photo: "img/fast2.jpeg" }
  ];
  setTimeout(function () {
    $ionicSlideBoxDelegate.slide(0);
    $ionicSlideBoxDelegate.update();
    $scope.$apply();
  });

})
.controller('CategoryCtrl', function ($scope, Categories, $stateParams, $window,$rootScope, $state,$ionicPopup, $cordovaSQLite, $ionicPlatform) {
  $scope.categories = Categories.all();
  $scope.item = Categories.get($stateParams.categoryId);

  $scope.add = function (category) {
    category.qnt += 1;
  }
  $scope.del = function (category) {
    category.qnt -= 1;
    if (category.qnt < 0) {
      category.qnt = 0;

    }
  }
  let itemsCart = [];
  $scope.addCart = function (category) {
    console.log(category);

    let cartDataNull = localStorage.getItem('localCart');
    if (cartDataNull == null) {
      let storeDataGet = [];
      storeDataGet.push(category);
       localStorage.setItem('localCart',JSON.stringify(storeDataGet));
    }
    else {
      var id = category.prodId;
      let index = -1;
      itemsCart = JSON.parse(localStorage.getItem('localCart'));
      for (let i = 0; i < itemsCart.length;i++) {
        if (parseInt(id) === parseInt(itemsCart[i].prodId)) {
          itemsCart[i].qnt = category.qnt;
          index = i;
          break;
        }
      }
      if (index == -1) {
        itemsCart.push(category);
        localStorage.setItem('localCart', JSON.stringify(itemsCart));
      }
      else {
        localStorage.setItem('localCart', JSON.stringify(itemsCart));
      }

    }
  }
  $scope.cartLoad=function(){
    if(localStorage.getItem('localCart')){
   $rootScope.items = JSON.parse(localStorage.getItem('localCart'));
   $rootScope.total=0;
   $rootScope.quantity=0;
   $rootScope.ordername=0;
   $rootScope.orderid=0;
   $rootScope.class1="";
  // $rootScope.total=$rootScope.items[i]
  for(var i=0;i<$rootScope.items.length;i++){
    $rootScope.quantity +=($rootScope.items[i].qnt);
    $rootScope.total +=($rootScope.items[i].price*$rootScope.items[i].qnt);
    $rootScope.ordername=($rootScope.items[i].names);
    $rootScope.orderId=($rootScope.items[i].prodId);
     //console.log(  $rootScope.ordername);
  }
  }
}

// $scope.payment=function(){
//   alert("payment successful");
//   $rootScope.items=localStorage.removeItem('localCart');
// }

$scope.removeAll=function(){
$rootScope.items= localStorage.removeItem('localCart');
console.log(localStorage.getItem('localCart'));
$rootScope.total =localStorage.removeItem('localCart');
$rootScope.quantity =localStorage.removeItem('localCart');
$rootScope.qnt=localStorage.setItem()
}
function removeallitems()
{
$scope.items = JSON.parse(localStorage.getItem('localCart'));
for(let i=0; i<$scope.items.length; i++){
  $scope.items.splice(i);
}
$scope.items[i].qnt =0;

}
$scope.removeItem=function(itm)
{
console.log(itm);
if(localStorage.getItem('localCart')){
$scope.items = JSON.parse(localStorage.getItem('localCart'));
for(let i=0; i<$scope.items.length; i++){
if
($scope.items[i].prodId === itm){
$scope.items.splice(i, 1);
localStorage.setItem('localCart', JSON.stringify($scope.items));
   }

  }
}
$scope.cartLoad();
}

$scope.editProduct=function(){
$state.go('tab.cartEdit')
}
$scope.decreaseProduct=function(prodId,qnt){
for(let i=0; i<$scope.items.length;i++){
  if($scope.items[i].prodId  === prodId){
  if(qnt != 1)
  $scope.items[i].qnt = parseInt(qnt) - 1;
  }

  }
  localStorage.setItem('localCart', JSON.stringify($scope.items));
  $scope.cartLoad();
}
$scope.increaseProduct=function(prodId,qnt){
for(let i=0;i<$scope.items.length;i++){
  if($scope.items[i].prodId   === prodId){
  $scope.items[i].qnt= parseInt(qnt) + 1;
  }
  }
  localStorage.setItem('localCart', JSON.stringify($scope.items));
  $scope.cartLoad();
}




$scope.backCart=function(){
$state.go('tab.cart');
}

$scope.button={};
$scope.button.disabled=false;

// $scope.payment = function() {


var options = {
  description: 'Credits towards consultation',
  image: 'https://i.imgur.com/3g7nmJC.png',
  currency: 'INR',
  key: 'rzp_test_1DP5mmOlF5G5ag',
  amount: '5000',
  name: 'foo',
  prefill: {
    email: 'pooja@razorpay.com',
    contact: '9146384185',
    name: 'Pooja Somwanshi'
  },
  theme: {
    color: '#F37254'
  }
};

// `ng-click` is triggered twice on ionic. (See https://github.com/driftyco/ionic/issues/1022).
// This is a dirty flag to hack around it
var called = false

var successCallback = function(payment_id) {
  //alert('payment_id: ' + payment_id);
  called = false
  var date=new Date().toJSON().slice(0,10);
  //date.setHours(0,0,0,0);
    var alertPopup = $ionicPopup.alert({
      title: 'payment_id: ' + payment_id,
    });    

    alertPopup.then(function(res) { 
      $scope.items =(localStorage.getItem('localCart'));
      // console.log($scope.items);
            var query = "INSERT INTO product (items,quantity,total,date) VALUES (?,?,?,?)";
            console.log($scope.items);
            $cordovaSQLite.execute(db, query, [$scope.items, $rootScope.quantity, $rootScope.total,date])
            .then(function(res) {
  
                console.log("INSERT ID -> " + res.insertId);
  
                $scope.removeAll();
                $scope.button.disabled=true;

            }, function (err) {
                console.error(err);
            });
       
      console.log('Payment Successful');
      $rootScope.class1="dis-none" ;

    });

  $state.go('tab.dash');


};
var cancelCallback = function(error) {
  alert(error.description + ' (Error ' + error.code + ')');
  called = false
  console.log("payment failed !!!");
  $state.go('tab.dash');

};

$ionicPlatform.ready(function(){
  $scope.payment = function() {
    if (!called) {
      RazorpayCheckout.open(options, successCallback, cancelCallback);
      called = true
    }
  }

});



})

.controller('CategoryDetailCtrl', function($scope, $stateParams,Categories ) {
  $scope.category= Categories.get($stateParams.categoryId);
})

.controller('AccountCtrl', function ($scope,$state,$rootScope) {


  let userarray=[];

  $rootScope.storedemail=window.localStorage.getItem("email");
  $rootScope.storedpassword=window.localStorage.getItem("password");
 let Email=$rootScope.storedemail;
let  Password=$rootScope.storedpassword;
  userarray.push(Email );
  userarray.push(Password);
   if(Email==null && Password==null){
    $rootScope.warn="You are not a user please register..";
     $state.go('tab.register');

   }

  $scope.onSubmit=function(em,pas){    
  $rootScope.storedemail=window.localStorage.getItem("email");
  $rootScope.storedpassword=window.localStorage.getItem("password");
  
  $rootScope.userName=window.localStorage.getItem("username");
  $rootScope.mobileNumber=window.localStorage.getItem("phone");
   
    if($rootScope.storedemail !=em && $rootScope.storedpassword!=pas && $rootScope.storedemail==null && $rootScope.storedpassword==null){
    
      console.log("please register");
      $scope.message="Please enter correct email and password...Don't have account then please register.. ";
      $state.go('tab.register');
    }
    else{
userCall();
      $state.go('tab.account');

    }
  }

  $scope.register=function(username,phone,email,password){
    window.localStorage.setItem("username",username);
    window.localStorage.setItem("phone",phone);
    window.localStorage.setItem("email",email);
    window.localStorage.setItem("password",password);
   
  
    if(username!=null && phone!=null && email!=null && password!=null ){
      console.log(username);
      console.log(phone);
      console.log(email);
      $scope.message="";
      $scope.messages="";
      userCall();
      $state.go('tab.login');
    }
    else{
      $scope.message="Please enter  email and password";  
    }
  }
  
  function userCall(email,password,phone,username)
  {
  this.userName=username;
  this.mobileNumber=phone;
  this.storedemail=email;
  this.storedpassword=password;
  $rootScope.userName=window.localStorage.getItem("username");
  $rootScope.mobileNumber=window.localStorage.getItem("phone");
  $rootScope.storedemail=window.localStorage.getItem("email");
  $rootScope.storedpassword=window.localStorage.getItem("password");
  $scope.messages="";
  
  }
 
  
  $scope.logout=function(){
    $rootScope.userName =localStorage.removeItem('username');
    $rootScope.mobileNumber =localStorage.removeItem('phone');
    $rootScope.storedemail =localStorage.removeItem('email');
    $rootScope.storedpassword =localStorage.removeItem('password');
  
  $state.go('tab.login');
  }
  
  
   })
    .controller('orderCtrl', function ($scope, Categories,$rootScope,$cordovaSQLite,$state,$stateParams) {
      $scope.item = Categories.get($stateParams.categoryId);
     
     
      
function order(id,items,qnt,price,date){
  this.id=id;
  this.items=items;
  this.quantity=qnt;
  this.total=price;
  this.date=date;

          }
         
          var placedOrders=[];
          $scope.items =(localStorage.getItem('localCart'));

$scope.user=function(){
  var query = "SELECT id,items, quantity, total,date FROM product";
  $cordovaSQLite.execute(db, query).then(function(res) {
    console.log(res);
      if(res.rows.length > 0) {
        for(var v=0;v<res.rows.length;v++){
          // console.log("SELECTED -> " + res.rows.item(v).id +" " + res.rows.item(v).items+ " " + res.rows.item(v).quantity+ " " + res.rows.item(v).total);
     var ordobj=new order(res.rows.item(v).id,JSON.parse(res.rows.item(v).items),res.rows.item(v).quantity,res.rows.item(v).total,res.rows.item(v).date );
    placedOrders.push(ordobj); 

    }  
               $scope.PlacedOrders=placedOrders;

    } else {
          console.log("No results found");
      }
    }, function (err) {
      console.error(err);
    });
  }
document.addEventListener("deviceready",onDeviceReady,false);
function onDeviceReady(){
  if(localStorage.getItem("email")!=null && localStorage.getItem("email")!=null){
    console.log(localStorage.getItem("email"));
    console.log("working....");

$scope.user();
  }else{
    console.log("you are not logged in...to see orders please login..");

    $state.go('tab.login');
  }

  
}
            


  
        
          $scope.continue=function(){
            $state.go('tab.dash');
          }
  
    })
   

.config(['$ionicConfigProvider', function ($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom'); // other values: top
}]);