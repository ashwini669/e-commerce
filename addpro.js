let addButton = document.getElementById('addpro');
let updateButton = document.getElementById('update');
let backButton = document.getElementById('back');
let resetButton = document.getElementById('reset');

displayData();

updateButton.addEventListener("click", function()
{
  updateRecord(pid);
});

resetButton.addEventListener("click", formclear);

backButton.addEventListener("click", function(){

    window.location="/admin.html";
});


addButton.addEventListener("click", displayData);

function displayData(){

    //location.reload();

    var proName = document.getElementById('name').value;
    var proPrice = document.getElementById('price').value;
    var proImg = document.getElementById('image').value;
    var proId = document.getElementById('proid').value;

    if(proPrice!=""&&proName!=""&&proImg!=""&&proId!="")
    {
      let pro_data=localStorage.getItem("pro_table");
    if(pro_data==null)
    {
        task=[];
     }
    else{
          task=JSON.parse(pro_data);
        }
    task.push({'Product_name':proName,'Product_price':proPrice,'Image':proImg,'Product_id':proId});
    localStorage.setItem("pro_table",JSON.stringify(task));

     alert("added new product to list");
     formclear();
      }
   
      let data=[];
      data=JSON.parse(localStorage.getItem("pro_table"));
      var i=0;
      //var x=data.length;
      for(i in data)
       {
        var item=data[i];
        var table = document.getElementById("list").getElementsByTagName('tbody')[0];
        var newRow = table.insertRow(table.length);
        cell1 = newRow.insertCell(0);
        cell1.innerHTML = item.Product_id;
        cell2 = newRow.insertCell(1);
        cell2.innerHTML = item.Product_name;
        cell3 = newRow.insertCell(2);
        cell3.innerHTML = item.Product_price;
        cell4 = newRow.insertCell(3);
        cell4.innerHTML =`<img src="${item.Image}" width="80" height="100">`;
        cell5 = newRow.insertCell(4);
        cell5.innerHTML =`<a href="#" onClick="onEdit(this)" p-id="${item.Product_id}"><b>EDIT</b></a>`;
        cell6 = newRow.insertCell(5);
        cell6.innerHTML =`<a href="#" onClick="onDelete(this)" pro-id="${item.Product_id}"><b>DELETE</b></a>`;
       }
}

function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("proid").value = selectedRow.cells[0].innerText;
  document.getElementById("name").value = selectedRow.cells[1].innerText;
  document.getElementById("price").value = selectedRow.cells[2].innerText;
  document.getElementById("image").value = selectedRow.querySelector('img').getAttribute('src');
   window.pid=td.getAttribute('p-id');   
}

function updateRecord(proid) {
  if(confirm("Are you sure to update changes??"))
    {
      let Data=[];
      Data=getdata();
  selectedRow.cells[0].innerHTML = Data[0];
  selectedRow.cells[1].innerHTML = Data[1];
  selectedRow.cells[2].innerHTML = Data[2];
  selectedRow.cells[3].innerHTML = `<img src="${Data[3]}" width="80" height="100">`;;

  let m=[];
   m=getInfo();
  
   for(var i=0 in m)
   {
    var item=m[i];
    if(item.Product_id === proid)
   {
    item.Product_id=Data[0];
    item.Product_name=Data[1];
    item.Product_price=Data[2];
    item.Image=Data[3];
    break;
   }}
  
    localStorage.setItem('pro_table',JSON.stringify(m));
    alert("item updated");
    formclear();
 
}

  else{ formclear();}

}

function onDelete(td) {
  if (confirm('Are you sure to delete this record ?')) {
      row = td.parentElement.parentElement;
      document.getElementById("list").deleteRow(row.rowIndex);
      formclear();
      //var p=td.target.parentElement.parentElement;
      var pid=td.getAttribute('pro-id');
      delLocalStorage(pid);
  }
}

function delLocalStorage(data) {
        
  //localStorage.removeItem(data);
   let m=[];
   m=getInfo();

  m= m.filter(function(m,index) {
      return m.Product_id!==data
    });

     localStorage.setItem('pro_table',JSON.stringify(m));
     alert("item deleted");
     //document.getElementById("list-items").style.display = "";
 }

 function getInfo() {
  let data; 

  if(localStorage.getItem('pro_table')===null){
      data=[];
  } else{
      data= JSON.parse(localStorage.getItem('pro_table'));
  
  }
  return data;
}

function getdata(){
var proName = document.getElementById('name').value;
var proPrice = document.getElementById('price').value;
var proImg = document.getElementById('image').value;
var proId = document.getElementById('proid').value; 

var data=[proId,proName,proPrice,proImg];
return data;
}

function formclear(){
document.getElementById('proid').value=" ";
document.getElementById('name').value=" ";
document.getElementById('price').value=" ";
document.getElementById('image').value=" ";
}

