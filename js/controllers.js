var app = angular.module('myApp', []);
var values = [];

app.controller('myCtrl', function($scope) {
  if(!localStorage.getItem("hour") ){
    localStorage.setItem("title", "title");
    localStorage.setItem("hour", "00");
    localStorage.setItem("minute", "00");
  }

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
  var shared_event=[];


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

window.location.replace("/form1.html");

           }, 3000);






     }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      window.alert("Error : " + errorMessage);

      // ...
    });
  //  var dbRefUser = firebase.database().ref().child('users');


  	//var newkey = firebase.database().ref().child('users').push().key;

  };
  firebase.auth().onAuthStateChanged(function(user) {
    var ref = firebase.database().ref('/users/' +user.uid);
    ref.once("value", function(userSnapshot) {



            userSnapshot.child("events").forEach(function(eventSnapshot) {

              values.push(  eventSnapshot.val());

            });
            userSnapshot.child("dailyevents").forEach(function(eventSnapshot) {

              values.push(  eventSnapshot.val());

            });
            userSnapshot.child("sharedevents").forEach(function(eventSnapshot) {

              shared_event.push(  eventSnapshot.val());

            });
  $scope.events = values;
  $scope.shared_events = shared_event;
  $scope.read();

    });

    if (user) {

}
var d = new Date();

setInterval(function(){

  var title = localStorage.getItem("title");
  var hour = localStorage.getItem("hour");
  var minute = localStorage.getItem("minute");
  console.log();
  if( hour ==d.getHours()){
    if (minute == d.getMinutes()) {
      var audio = new Audio('bell.wav');
      audio.play();
      $scope.notification = title;
      document.getElementById("notification").style.display = "block";
      document.getElementById("notificationcore").innerHTML = $scope.notification;

      console.log("finish");

      localStorage.setItem("title", "");
      localStorage.setItem("hour", "");
      localStorage.setItem("minute", "");


    }
    else {
      $scope.match = 0;
    }
  }

}, 1000)

$scope.title="";
$scope.description="";
$scope.fromdate="";
$scope.fromtime="";
$scope.todate="";
$scope.totime="";
var valuesdaily  = [];
$scope.dailyeventArray = [];
$scope.reminder = function () {
  localStorage.setItem("title", $scope.remindertitle);
  localStorage.setItem("hour", $scope.hour);
  localStorage.setItem("minute", $scope.minute);
  console.log("done");
}
$scope.showdailyevents = function () {
  var ref = firebase.database().ref('/users/' +user.uid);
  ref.once("value", function(userSnapshot) {


          valuesdaily = []
          userSnapshot.child("dailyevents").forEach(function(eventSnapshot) {

            valuesdaily.push(  eventSnapshot.val());

          });


$scope.dailyeventArray = valuesdaily;
console.log($scope.dailyeventArray);
  });
}


$scope.addJointEvent = function(){
var usersearched = $scope.searchedname.userid;

  $scope.fromdate =$scope.fromdate.replace(",","");
  $scope.fromdate =$scope.fromdate.split(" ");
  $scope.fromtime =$scope.fromtime.replace(":", " ");
  $scope.fromtime =$scope.fromtime.split(" ");
  $scope.totime =$scope.totime.replace(":", " ");

  $scope.totime =$scope.totime.split(" ");


  var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  for (var i = 0; i <= months.length; i++) {
    if(months[i] == $scope.fromdate[0]) $scope.fromdate[0] = i+1;
    if(months[i] == $scope.todate[0]) $scope.todate[0] = i+1;
  }





      alert(usersearched);
      var dailyevent = firebase.database().ref('users/'+ user.uid +'/sharedevents');
      var dailyeventer = dailyevent.push();
      dailyeventer.set({
        title : $scope.title,
        description: $scope.description,
        fromdate: $scope.fromdate,
        fromtime : $scope.fromtime,

        totime: $scope.totime

      });


      var messageListRef = firebase.database().ref('users/'+ usersearched  +'/sharedevents');
      var newMessageRef = messageListRef.push();
      newMessageRef.set({
        title : $scope.title,
        description: $scope.description,
        fromdate: $scope.fromdate,
        fromtime : $scope.fromtime,

        totime: $scope.totime

      });


      document.getElementById("form").reset();


}






$scope.add = function(){

$scope.fromdate =$scope.fromdate.replace(",","");
$scope.fromdate =$scope.fromdate.split(" ");
$scope.fromtime =$scope.fromtime.replace(":", " ");
$scope.fromtime =$scope.fromtime.split(" ");
$scope.totime =$scope.totime.replace(":", " ");

$scope.totime =$scope.totime.split(" ");


var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
for (var i = 0; i <= months.length; i++) {
  if(months[i] == $scope.fromdate[0]) $scope.fromdate[0] = i+1;
  if(months[i] == $scope.todate[0]) $scope.todate[0] = i+1;
}



  console.log($scope.switch);
  if ($scope.switch === true) {
    alert("here1");
    var dailyevent = firebase.database().ref('users/'+ user.uid +'/dailyevents');
    var dailyeventer = dailyevent.push();
    dailyeventer.set({
      title : $scope.title,
      description: $scope.description,
      fromdate: $scope.fromdate,
      fromtime : $scope.fromtime,
      dailyRepeat  : $scope.switch,
      totime: $scope.totime

    });

  }
  else {
    var messageListRef = firebase.database().ref('users/'+ user.uid +'/events');
    var newMessageRef = messageListRef.push();
    newMessageRef.set({
      title : $scope.title,
      description: $scope.description,
      fromdate: $scope.fromdate,
      fromtime : $scope.fromtime,

      totime: $scope.totime

    });

  }

  $scope.title = "";
  $scope.description= "";
  $scope.fromdate= "";
  $scope.fromtime= "";
  $scope.totime= "";


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
  console.log( $scope.searchname);
  ref.orderByChild('/username').equalTo($scope.searchname).on("value", function(snapshot) {
    console.log(snapshot.val());
    snapshot.forEach(function(data) {
          $scope.searchedname=  data.val();
          console.log(data.val());
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
