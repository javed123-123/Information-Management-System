const portno = 5000;

const noInput = document.querySelector('#level-no-input');
const nameInput = document.querySelector('#level-name-input');
const salInput = document.querySelector('#sal-input');
const error_add = document.querySelector('#error_add');

const updateNameInput = document.querySelector('#update-name-input');
const updateSalInput = document.querySelector('#update-sal-input');

const searchinput = document.querySelector('#name-search');
const sort = document.querySelector('#sort');
const salmin = document.querySelector('#sal-min');
const salmax = document.querySelector('#sal-max');
const add=document.querySelector('#add');
const printer=document.querySelector('#print');
const flush=document.querySelector('#flush');
const desc=document.querySelector('#description');

var selected_no,selected_name,selected_sal,menuState=0;
var noInput_ok,nameInput_ok,salInput_ok,updateNameInput_ok,updatesSalInput_ok;

document.addEventListener("DOMContentLoaded", function() 
{
    fetch('http://localhost:'+portno+'/getAll/paystruct') // link = http://localhost:5000/getAll/paystruct
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
});

const contextMenu = document.querySelector(".context-menu");
contextMenu.addEventListener("click",function(event){
    if(event.target.className == "context-menu-delete")
        deleteRow(selected_no);
    
    else if(event.target.className == "context-menu-edit")
        updateRow(selected_no);
})

document.addEventListener( "click", function(e) {
    if(menuState == 1)
    {
        menuState = 0;
        contextMenu.style.display = "none";
    }
});

noInput.addEventListener("change",check_noInput)
function check_noInput(){
    error_add.hidden = true;

    const error_level_no = document.querySelector('#error_level_no');

    if(noInput.value == "")
        noInput_ok = false;
    else
        noInput_ok = true;    

    if(noInput_ok)
    {
        noInput.style.border = "1px solid #ccc";
        error_level_no.hidden = true;
    }
    else
    {
        error_level_no.innerHTML = "Level No cannot be empty";
        error_level_no.hidden = false;
        noInput.style.border = "2px solid red"; 
        // var n = 100;
        // noInput.style.height = `${n}px`;
    }
}

nameInput.addEventListener("change",check_nameInput)
function check_nameInput(){
    error_add.hidden = true;

    const error_level_name = document.querySelector('#error_level_name');

    if(nameInput.value == "")
        nameInput_ok = false;
    else
        nameInput_ok = true;    

    if(nameInput_ok)
    {
        nameInput.style.border = "1px solid #ccc";
        error_level_name.hidden = true;
    }
    else
    {
        error_level_name.innerHTML = "Level Name cannot be empty";
        error_level_name.hidden = false;
        nameInput.style.border = "2px solid red"; 
    }
}

salInput.addEventListener("change",check_salInput)
function check_salInput(){
    error_add.hidden = true;

    const error_sal = document.querySelector('#error_sal');

    if(salInput.value == "")
        salInput_ok = false;
    else
        salInput_ok = true;    

    if(salInput_ok)
    {
        salInput.style.border = "1px solid #ccc";
        error_sal.hidden = true;
    }
    else
    {
        error_sal.innerHTML = "Salary cannot be empty";
        error_sal.hidden = false;
        salInput.style.border = "2px solid red";  
    }
}

const addBtn = document.querySelector('#add-data-btn');
addBtn.onclick = function(){

    check_noInput();
    check_nameInput();
    check_salInput();

    if(noInput_ok && nameInput_ok && salInput_ok)
    {
        console.log(noInput.value);
        fetch('http://localhost:'+portno+'/insert/paystruct',{
            headers:{
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                level_no : noInput.value,
                level_name : nameInput.value,
                sal : salInput.value
            })
        })
        .then(response => response.json())
        .then(data => insertRowIntoTable(data['data']));
    }
}

updateNameInput.addEventListener("change",check_nameUpdate)
function check_nameUpdate(){
    const error_level_name_update = document.querySelector('#error_level_name_update');

    if(updateNameInput.value == "")
        updateNameInput_ok = false;
    else
        updateNameInput_ok = true;    

    if(updateNameInput_ok)
    {
        updateNameInput.style.border = "1px solid #ccc";
        error_level_name_update.hidden = true;
    }
    else
    {
        error_level_name_update.innerHTML = "Level Name cannot be empty";
        error_level_name_update.hidden = false;
        updateNameInput.style.border = "2px solid red"; 
    }
}

updateSalInput.addEventListener("change",check_salUpdate)
function check_salUpdate(){
    const error_sal_update = document.querySelector('#error_sal_update');

    if(updateSalInput.value == "")
        updateSalInput_ok = false;
    else
        updateSalInput_ok = true;    

    if(updateSalInput_ok)
    {
        updateSalInput.style.border = "1px solid #ccc";
        error_sal_update.hidden = true;
    }
    else
    {
        error_sal_update.innerHTML = "Salary cannot be empty";
        error_sal_update.hidden = false;
        updateSalInput.style.border = "2px solid red"; 
    }
}

const updateBtn = document.querySelector('#update-row-btn');
updateBtn.onclick = function(){   

    check_nameUpdate();
    check_salUpdate();

    if(updateNameInput_ok && updateSalInput_ok)
    {
        fetch('http://localhost:'+portno+'/update/paystruct',{
            headers:{
                'Content-type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify({
                level_no : updateNameInput.dataset.id,
                level_name : updateNameInput.value,
                sal: updateSalInput.value
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.success)
            location.reload();
        });
    }    
}

searchinput.addEventListener('change',search_sort);
sort.addEventListener('click',search_sort);
salmin.addEventListener('change',search_sort);
salmax.addEventListener('change',search_sort);

document.querySelector('#clear').addEventListener('click',function(){
    searchinput.value = "";
    sort.value = null;
    salmin.value = "";
    salmax.value = "";
    search_sort();
})

document.querySelector('#addbtn_popup').onclick = function(){
    document.getElementById('add_popup').style.display = "block";
}

document.querySelector('#add_closeimg').addEventListener('click',add_popup_hide);
function add_popup_hide(){
    document.getElementById('add_popup').style.display = "none";

    noInput.value = "";
    nameInput.value = "";
    salInput.value = "";

    noInput.style.border = "1px solid #ccc";
    nameInput.style.border = "1px solid #ccc";
    salInput.style.border = "1px solid #ccc";

    document.querySelector('#error_level_no').hidden = true;
    document.querySelector('#error_level_name').hidden = true;
    document.querySelector('#error_sal').hidden = true;

    error_add.hidden = true;
}

document.querySelector('#edit_closeimg').onclick = function(){
    document.getElementById('edit_popup').style.display = "none";
   
    updateNameInput.style.border = "1px solid #ccc";
    updateSalInput.style.border = "1px solid #ccc";

    document.querySelector('#error_level_name_update').hidden = true;
    document.querySelector('#error_sal_update').hidden = true;
}


function insertRowIntoTable(data){
    const table = document.querySelector('table tbody');
    if (table.innerHTML === `<tr><td class="no-data" colspan="5">No data</td></tr>`)
        table.innerHTML = "";    

    if(data == 'ER_DUP_ENTRY')
    {
        error_add.innerHTML = "ERROR : A record with this Level No already exists"; 
        error_add.hidden = false;
    }
    else    
    {
        add_popup_hide();

        let newrow = table.insertRow(-1);
    
        let rowHtml = "<tr>";
        rowHtml += `<td>${data.level_no}</td>`;
        rowHtml += `<td>${data.level_name}</td>`;
        rowHtml += `<td>${data.sal}</td>`;
        rowHtml += "</tr>";

        newrow.innerHTML = rowHtml;

        newrow.addEventListener('contextmenu', function(e){
            dynamicEvent(e,this)
        },false);
    } 
}

function loadHTMLTable(data){
    const table = document.querySelector('table tbody');

    if(data.length == 0)
    {
        table.innerHTML = "<tr><td class='no-data' colspan=5>No data</td></tr>";
        return;
    }
    table.innerHTML = "";
    let newrow; 
    let rowHtml;

    data.forEach(({level_no,level_name,sal})=>{ 
        newrow = table.insertRow(-1);
        rowHtml = "<tr>";
        rowHtml += `<td>${level_no}</td>`;
        rowHtml += `<td>${level_name}</td>`;
        rowHtml += `<td>${sal}</td>`;
        rowHtml += "</tr>";
    
        newrow.innerHTML = rowHtml;

        newrow.addEventListener('contextmenu', function(e){
            dynamicEvent(e,this)
        },false);

    });
}

function dynamicEvent(e,obj) {
    e.preventDefault();

    selected_no = $(obj).find('td:nth-child(1)').text();
    selected_name = $(obj).find('td:nth-child(2)').text();
    selected_sal = $(obj).find('td:nth-child(3)').text();

    // get actual mouse position 
    var pageX = e.pageX;
    var pageY = e.pageY;
    if (pageX === undefined) 
    {
        pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    menuState = 1; 
    contextMenu.style.display = "block";
    contextMenu.style.top = [pageY, "px"].join("");
    contextMenu.style.left = [pageX, "px"].join("");
     
    return false;
}

function deleteRow(no)
{
    fetch('http://localhost:'+portno+'/delete/paystruct/'+no,{
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if(data.success)
           location.reload();
    });
}

function updateRow(no)
{
    document.querySelector('#update-name-input').dataset.id = no;
    const updateNameInput = document.querySelector('#update-name-input');
    const updateSalInput = document.querySelector('#update-sal-input');

    updateNameInput.value = selected_name;
    updateSalInput.value = selected_sal;

    document.getElementById('edit_popup').style.display = "block";
}

function search_sort(){
    var name = searchinput.value;
    const sort_keyword = sort.value;
    //var sal_min = sal

    fetch('http://localhost:'+portno+'/search_sort/paystruct',{
        headers:{
                'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
                name : name,
                sort_keyword : sort_keyword,
                sal_min : salmin.value,
                sal_max : salmax.value
        })
    })  
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}
add.onclick= function(){
    pcontent="";
    pcontent=`<p>${desc2.value}:</p>`+document.getElementById('the-table').innerHTML+'<br><br>';
    fetch('http://localhost:'+portno+'/addPrint',{
        headers:{
            'content-type':'application/json'
        },
        method:'POST',
        body:JSON.stringify({pcontent:pcontent})
    });
}
flush.onclick=function (){
    fetch('http://localhost:'+portno+'/flush');
}
printer.onclick= function(){
    fetch('http://localhost:'+portno+'/print')
    .then(response=>response.json())
    .then(data=>finalPrint(data['data']));
}
//const store=document.body.innerHTML;
function finalPrint(data){
    document.querySelector('#secret').innerHTML=data;
    var options={
    mode:["iframe","popup"],  //printable window is either iframe or browser popup
    popHt: 500,  // popup window height
    popWd: 400, // popup window width
    popX: 500, // popup window screen X position
    popY: 600,//popup window screen Y position
    popTitle:print,// popup window title element
    popClose:[false,true],  // popup window close after printing
    strict: [undefined,true,false],
    }
    $("div#secret").printArea( [options] );
}

