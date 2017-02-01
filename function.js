window.prevActiveChat = "abc";
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
       console.log(user.profilepic);
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
     var chat_id = getChatId(window.currentUser.id, uid);
     var name = user.name;
     var html = '<div id="'+chat_id+'"class="member">'+name+'</div>';

     return html;
}

function getChatId(id1, id2) {
     if(id1 > id2){
          return id1+""+id2;
     }
     return id2+""+id1;
}

function onClickMultiple(className, func) {
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains(className)) {
            func(event.target);
        }
    });
}

function loadMessages(chat_id, fn) {
     var database = firebase.database();
     var chatRef = database.ref("chats");

     chatRef.child(chat_id).on('value',function(snapshot){
          var messages = snapshot.val();

          fn(messages);
     });
}

function renderMessage(message) {
     var text = message.text;
     var msgClass = "message";

     if(message.sender_id == window.currentUser.id){
          msgClass = "message by-user";
     }

     var html = '<div class="'+ msgClass +'">'+text+'</div>';
     return html;
}

function sendMessage(chat_id, text) {
     var message = {
          text: text,
          sender_id: window.currentUser.id
     };

     var database = firebase.database();
     var chatsRef = database.ref("chats");
     var chat = chatsRef.child(chat_id);
     var newMessageId = chatsRef.push().key;

     chat.child(newMessageId).set(message);

}

function activeMember(chat_id){
     activeMemberSidebar(chat_id);

     var selected_id = removeChat(chat_id);
     var selected_member ='';
     var database = firebase.database();
     var usersRef = database.ref('/users/');

     usersRef.on("value", function(snapshot) {
         snapshot.forEach(function(childSnapshot) {
             var childData = childSnapshot.val();
             if(selected_id == childData.id){
                  selected_member = childData.name;
             }
         });
     });

     var chat_title = getElement("selected-member");
     chat_title.textContent = selected_member;
     //console.log(selected_member);
}

function removeChat(chat_id){
     var host = window.currentUser.id;
     var replace = '';
     var clicked_member = chat_id.replace(host,replace);
     return clicked_member;
}

function activeMemberSidebar(chat_id) {
     //document.getElementById(chat_id).className = "member active";
}
