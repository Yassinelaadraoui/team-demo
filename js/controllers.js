var app = angular.module('myApp', []);
var values = [];


app.controller('myCtrl', function($scope) {
$scope.searchname = "";
$scope.searchedname= [];
  $scope.call = function(){

    var ref = firebase.database().ref('/users/' +user.uid);
    ref.once("value", function(userSnapshot) {




            userSnapshot.child("events").forEach(function(eventSnapshot) {

              values.push(  eventSnapshot.val());

            });



    });
  $scope.events = values;

  }

$scope.card=[];
  $scope.firstname = "";
  $scope.lastname = "";
  $scope.email = "John";
  $scope.username = "";
  $scope.password = "John";
  $scope.number = "3333333";
  $scope.events =[];


  $scope.signup = function(){
var firstname = $scope.firstname;
var lastname = $scope.lastname;
var email =   $scope.email;
var username = $scope.username;
var password = $scope.password;
var number = $scope.number;
var database = firebase.database();
var userid ="" ;

    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
         // Success
          userid = user.uid;
          console.log(user);






     }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      window.alert("Error : " + errorMessage);

      // ...
    });
  //  var dbRefUser = firebase.database().ref().child('users');


  	//var newkey = firebase.database().ref().child('users').push().key;
    setTimeout(function(){

      firebase.database().ref('users/' +userid).set({
        userid : userid,
        firstname: firstname,
        lastname:lastname,
        username : username,
        number:number,
        email: email,
        password: password
      });
      window.location.assign("form1.html");


     }, 3000);

  };
  firebase.auth().onAuthStateChanged(function(user) {
    var ref = firebase.database().ref('/users/' +user.uid);
    ref.once("value", function(userSnapshot) {



            userSnapshot.child("events").forEach(function(eventSnapshot) {

              values.push(  eventSnapshot.val());

            });

  $scope.events = values;
  $scope.read();

    });

    if (user) {

}
$scope.title="";
$scope.description="";
$scope.fromdate="";
$scope.fromtime="";
$scope.todate="";
$scope.totime="";

$scope.add = function(){

$scope.fromdate =$scope.fromdate.replace(",","");
$scope.fromdate =$scope.fromdate.split(" ");
$scope.fromtime =$scope.fromtime.replace(":", " ");
$scope.fromtime =$scope.fromtime.split(" ");
$scope.todate =$scope.todate.replace(",","");
$scope.totime =$scope.totime.replace(":", " ");
$scope.todate =$scope.todate.split(" ");
$scope.totime =$scope.totime.split(" ");


var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
for (var i = 0; i <= months.length; i++) {
  if(months[i] == $scope.fromdate[0]) $scope.fromdate[0] = i+1;
  if(months[i] == $scope.todate[0]) $scope.todate[0] = i+1;
}


setTimeout(function(){
  var messageListRef = firebase.database().ref('users/'+user.uid +'/events');
  var newMessageRef = messageListRef.push();
  newMessageRef.set({
    title : $scope.title,
    description: $scope.description,
    fromdate: $scope.fromdate,
    fromtime : $scope.fromtime,
    dailyRepeat  : $scope.switch,
    totime: $scope.totime

  });




}, 3000);
}



$scope.timer = function(i){


onTimer();


function onTimer() {
  document.getElementById('mycounter').innerHTML = i;
  i--;
  if (i < 0) {

    var audio = new Audio('bell.wav');
audio.play();
  }
  else {

    setTimeout(onTimer, 1000);
  }
}


}
$scope.search = function () {
  var ref = firebase.database().ref('/users');
  ref.orderByChild('/name').equalTo($scope.searchname).on("value", function(snapshot) {

    snapshot.forEach(function(data) {
          $scope.searchedname=  data.val();

    });
});

}
$scope.read = function(){



var temp= [];
for(var i = 0; i< values.length; i++){

for (var j = 0; j< values.length; j++) {

  if(values[i].fromdate[2] == values[j].fromdate[2] )
  {

    if (values[i].fromdate[0] == values[j].fromdate[0]) {
      if(values[i].fromdate[1]< values[j].fromdate[1]){
        temp= values[i];
        values[i] = values[j];
        values[j] = temp;

      }
      else if(values[i].fromdate[1] == values[j].fromdate[1]){
          if(values[i].fromtime[2] == values[j].fromtime[2]){
            if(values[i].fromtime[0] == values[j].fromtime[0]){
              if(values[i].fromtime[1] > values[j].fromtime[1]){
                temp= values[i];
                values[i] = values[j];
                values[j] = temp;
              }
            }
            if(values[i].fromtime[0] > values[j].fromtime[0]){
              temp= values[i];
              values[i] = values[j];
              values[j] = temp;
            }
          }

        /*  if(values[i].fromtime[2] =="PM" && values[j].fromtime[2] =="AM"){
            temp= values[i];
            values[i] = values[j];
            values[j] = temp;
          }*/
    }
    else if( values[i].fromdate[0] < values[j].fromdate[0]){

      temp= values[i];
      values[i] = values[j];
      values[j] = temp;

    }
  }
}
}
for (var i = 0; i < values.length; i++) {

  $scope.card.push(values[i]);
}



}
}

});
});
