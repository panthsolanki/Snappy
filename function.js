
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
       // to get User Detail
       //console.log(user.uid);
       //console.log(user.displayName);
       //console.log(user.email);

       //Create User
       createUser(user.uid, user.displayName, user.email);

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

function createUser(uid, uname, uemail){
     // Get a reference to the database service
     var database = firebase.database();
     var userRef = database.ref("users");
     //create objectliteral
     var user = {
          id: uid,
          name: uname,
          email: uemail
     };
     //add user object literal
     userRef.child(uid).set(user).then(function(){
          redirect("chat.html");
     });
}

function ifUserIsLoggedIn(fn){
     firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
               // User is signed in.
               //console.log(user.displayName);
               window.currentUser = {
                    id: user.uid,
                    name: user.displayName,
                    email: user.email
               };

               fn();
          } else {
          // No user is signed in.

          }
     });
}

function getElement(id){
     return document.getElementById(id);
}

function updateUserData(){
     var usernameElement = getElement("username");
     usernameElement.textContent = window.currentUser.name;
}

function loadUsers(fn){
     var database = firebase.database();
     var usersRef = database.ref("users");

     usersRef.on('value',function(snapshot){
          var users = snapshot.val();

          fn(users);
     });
}

function renderUser(user){
     var uid = user.id;
     var name = user.name;
     var html = '<div id="'+uid+'"class="member">'+name+'</div>';

     return html;
}
