firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.



  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function() {
       // Success
       console.log(firebaseUser);

   }).catch(function(error) {
  
window.location.replace('/form1.html');


    // ...
  });

}

function logout(){
  console.log("firebaseUser");
  firebase.auth().signOut();
}
