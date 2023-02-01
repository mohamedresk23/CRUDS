let title = document.getElementById("title");
let price = document.getElementById("price");
let discount = document.getElementById("discount");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submet = document.getElementById("submet");

let mood = "create";
let tmp;

let dataPro=[];

if(localStorage.getItem("prodact")){
  dataPro = JSON.parse(localStorage.getItem("prodact"));
}
  

// getTotal
function getTotal(){
  if(price.value != ""){
    let result = (+price.value + +taxes.value + +ads.value )- +discount.value;

    total.innerHTML = result;
    total.style.backgroundColor = "#040";
  }else{
    total.innerHTML = "";
    total.style.backgroundColor = "#610101";
  }
}

submet.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    discount: discount.value,
    taxes: taxes.value,
    ads: ads.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  }

  if(title.value != ""&& price.value !="" && category.value!="" && newPro.count<=100){
    if(mood === "create"){
      if(newPro.count>1){
        for(let i=0;i<newPro.count;i++){
          dataPro.push(newPro);
        }
      } else {dataPro.push(newPro);}
    }else {
      dataPro[tmp] = newPro;
      mood = "create";
      count.style.display = "block";
      submet.innerHTML="Create";
    }
    cleareData()
  }


  

  window.localStorage.setItem("prodact",JSON.stringify(dataPro));

  addElementsToPage();

}

function cleareData(){
  title.value = "" ;
  price.value = "" ;
  discount.value = "" ;
  taxes.value = "" ;
  ads.value = "";
  count.value = "" ;
  category.value = "" ;
  total.innerHTML = "" ;
}

function addElementsToPage() {
  
  

  let tBody = document.getElementById("tBody");
  let table= "";

  for(let i=0 ;i<dataPro.length;i++){
    table += `<tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
              </tr>`
  }

  tBody.innerHTML = table;


  let divDeleteAll = document.querySelector(".deleteAll");
  deleteAll.innerHTML="Delete All";

  if(dataPro.length > 0){
    divDeleteAll.innerHTML = `<button onclick="deleteAll()" >Delete All [ ${dataPro.length} ]</button>`;
  }else{
    divDeleteAll.innerHTML="";
  }

  getTotal();

}

addElementsToPage();

function deleteData(i) {
  dataPro.splice(i,1);
  localStorage.prodact = JSON.stringify(dataPro);
  addElementsToPage()
}

function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  addElementsToPage();
}

function updateData(i){
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value =dataPro[i].ads;
  discount.value = dataPro[i].discount;
  category.value = dataPro[i].category;
  getTotal();
  count.style.display = "none";
  submet.innerHTML="Update";

  mood = "update";
  tmp = i;

  scroll({
    top:0,
    behavior:'smooth',
  })

}

// search 
let searchMood = "Title";
function getSearchMood(id){
  let search = document.getElementById("search");
  if(id == "searchTitle"){
    searchMood = "Title";
  }else{
    searchMood = "Category";
  }

  search.placeholder = "Search By " + searchMood ;
  search.focus();
  search.value = "";
  addElementsToPage();
}

function searchData(value){
  let tBody = document.getElementById("tBody");
  let table= "";
  for(let i=0 ; i<dataPro.length;i++){
    if(searchMood === "Title"){
      
        if(dataPro[i].title.includes(value.toLowerCase())){
          table += `<tr>
                  <td>${i}</td>
                  <td>${dataPro[i].title}</td>
                  <td>${dataPro[i].price}</td>
                  <td>${dataPro[i].taxes}</td>
                  <td>${dataPro[i].ads}</td>
                  <td>${dataPro[i].discount}</td>
                  <td>${dataPro[i].total}</td>
                  <td>${dataPro[i].category}</td>
                  <td><button onclick="updateData(${i})" id="update">update</button></td>
                  <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`
        }
      
    }else{
      
        if(dataPro[i].category.includes(value.toLowerCase())){
          
          table += `<tr>
                  <td>${i}</td>
                  <td>${dataPro[i].title}</td>
                  <td>${dataPro[i].price}</td>
                  <td>${dataPro[i].taxes}</td>
                  <td>${dataPro[i].ads}</td>
                  <td>${dataPro[i].discount}</td>
                  <td>${dataPro[i].total}</td>
                  <td>${dataPro[i].category}</td>
                  <td><button onclick="updateData(${i})" id="update">update</button></td>
                  <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`
        }
      
    }
  }
  tBody.innerHTML = table;
}