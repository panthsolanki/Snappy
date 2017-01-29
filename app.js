click("signin-button", logInUser);

// Get a reference to the database service
var database = firebase.database();
var userRef = database.ref("users");





/*
userRef.on('value',function(snapshot){
     console.log(snapshot.val());
});
//console.log(databaseRef.name);

//to add database create ref

userRef.child("1234").set({
     email: "panth@gmail.com"
});


//object in js
var user1 = {
     id: 1,
     name: "Panth",
     username: "panthsolanki",
     sayHello: function(){
          console.log("Hello " + this.name);
     }
};

var user2 = {
     id: 2,
     name: "neo",
     username: "neo_da_leo",
     sayHello: function(){
          console.log("Hello " + this.name);
     }
};

//Array in js
var users = [
     user1,
     user2
];

for(var i=0; i<users.length; i++){
     var user = users[i];
     console.log(user.sayHello());
}
//console.log(users[0]);

//console.log(user1.id, user1.name);
//user1.sayHello();

var message = new Object();
message.text="Hello";
console.log(message.text);
*/
