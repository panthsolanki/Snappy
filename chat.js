ifUserIsLoggedIn(function(){
     //console.log(window.currentUser);

     // update the user data
     updateUserData();

     loadUsers(function(users){
          //To display all users
          //console.log(users);

          var usersList="";

          for(var uid in users){
               var user = users[uid];
               //to remove signined user
               if(window.currentUser.id != uid){
                    usersList += renderUser(user);
               }
          }

          getElement("members").innerHTML = usersList;
     });
});
