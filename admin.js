let addButton = document.getElementById('addpro');
let listButton = document.getElementById('listpro');
const logout=document.querySelector('#log');

url=document.URL;
console.log(url);
if(url==="http://127.0.0.1:5500/admin.html"){
  if(localStorage.getItem('session_table')!==null){
    //alert('no');
    //window.location='/app.html';
  }
  else{
    window.location='/main.html';
    
    
  }
}

logout.addEventListener('click',sessionlogout);

addButton.addEventListener("click", function(){

    window.location="/addpro.html";

});


// listButton.addEventListener("click", function(){

//     window.location="/listpro.html";

// });


function sessionlogout(e){
    
    alert("logged out successfully");
    localStorage.removeItem('session_table');
    window.location='/main.html';
   
}
