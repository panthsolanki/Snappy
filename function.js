
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

function logInUser(){
     //log in with Google
     //using Firebase

     redirect("chat.html");
}
