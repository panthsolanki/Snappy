
function click(elementId, fn){
     var element = document.getElementById(elementId);
     if(element){
          element.addEventListener("click",fn);
     }
}

//click("signin-button", buttonClicked);


function redirect(path){
     window.location=path;
     return false;
}

function loginWithGoogle() {
     var provider = new firebase.auth.GoogleAuthProvider();

     firebase.auth().signInWithPopup(provider).then(function(result) {
       // The signed-in user info.
       var user = result.user;
       // ...
       console.log(user);

     }).catch(function(error) {
       console.log(error.message);
     });
}

function logInUser(){
     //log in with Google
     //using Firebase
     loginWithGoogle();
     //redirect("chat.html");
}
