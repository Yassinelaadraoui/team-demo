// Initialize Firebase
var config = {
	apiKey: "AIzaSyDFjj3JNqOc6ZDSBESC7aSLVEhb8lqt7C8",
	authDomain: "calendar-45999.firebaseapp.com",
	databaseURL: "https://calendar-45999.firebaseio.com",
	projectId: "calendar-45999",
	storageBucket: "",
	messagingSenderId: "699162850226"
};
firebase.initializeApp(config);

function init(){
	firebase.auth().onAuthStateChanged(function(user){
  		if(user){
        	console.log(user);
        	userinfo = user;
  		}
  		else{
  			window.location.href = "login.html";
  		}
	});
}

function user(){
	alert(userinfo.uid);
}

function addUser(){
	dbRefUser = firebase.database().ref().child('users');
	// get value
	name = document.getElementsByName('name')[0].value;
	email = document.getElementsByName('email')[0].value;
	pass = document.getElementsByName('password')[0].value;

	// get key for new user
	var newkey = firebase.database().ref().child('users').push().key;

	firebase.database().ref().child('users/' + newkey).set({
		name: name,
		email: email,
		passwd: pass
	});
}

function logout(){
	firebase.auth().signOut().then(function() {
  		// Sign-out successful.
  		window.location.href = "login.html";
	}).catch(function(error) {
  		// An error happened.
	});
}
