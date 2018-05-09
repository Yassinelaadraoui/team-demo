(function (){

// get element
const preObject = document.getElementById('object');

// Get a reference to the database service
var dbRefObject = firebase.database().ref().child('users');


firebase.auth().onAuthStateChanged(function(user){
  if(user){
    document.body.innerHTML += '<h1>Congratz '+ user.displayName +'!</h1> It\'t your email: ' + user.email +'.';
    
	dbRefObject.on('value', snap => {
		res = snap.val();
		console.log(res);
	});

    dbRefObject.child(user.uid).set({
    	name: user.displayName,
    	email: user.email
    });
  }
});

}());
