const portno = 5000;

const idInput = document.querySelector('#eid-input');
const enameInput = document.querySelector('#ename-input');
const join_dateInput = document.querySelector('#join_date-input');
const lnoInput = document.querySelector('#lno-input');
const fnoInput = document.querySelector('#fno-input');
const error_add = document.querySelector('#error_add');

const updateNameInput = document.querySelector('#update-name-input');
const updateJoin_dateInput = document.querySelector('#update-join_date-input');
const updateLnoInput = document.querySelector('#update-lno-input');
const updateFnoInput = document.querySelector('#update-fno-input');
const error_update = document.querySelector('#error_update');

const searchinput = document.querySelector('#name-search');
const sort = document.querySelector('#sort');
const join_date_min = document.querySelector('#join_date-min');
const join_date_max = document.querySelector('#join_date-max');
const add=document.querySelector('#add');
const printer=document.querySelector('#print');
const flush=document.querySelector('#flush');
const desc=document.querySelector('#description');

var selected_eid,selected_ename,selected_joindate,selected_lno,selected_fno,menuState=0;
var idInput_ok,enameInput_ok,join_dateInput_ok,lnoInput_ok,fnoInput_ok;
var updateNameInput_ok,updateLnoInput_ok;

document.addEventListener("DOMContentLoaded", function() 
{
    fetch('http://localhost:'+portno+'/getAll/employee') // link = http://localhost:5000/getAll/employee
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
});

const contextMenu = document.querySelector(".context-menu");
contextMenu.addEventListener("click",function(event){
    if(event.target.className == "context-menu-delete")
        deleteRow(selected_eid);
    
    else if(event.target.className == "context-menu-edit")
        updateRow(selected_eid);
})

document.addEventListener( "click", function(e) {
    if(menuState == 1)
    {
        menuState = 0;
        contextMenu.style.display = "none";
    }
});

idInput.addEventListener("change",check_idInput)
function check_idInput(){
    error_add.hidden = true;

    const error_eid = document.querySelector('#error_eid');

    if(idInput.value == "")
        idInput_ok = false;
    else
        idInput_ok = true;    

    if(idInput_ok)
    {
        idInput.style.border = "1px solid #ccc";
        error_eid.hidden = true;
    }
    else
    {
        error_eid.innerHTML = "Id cannot be empty";
        error_eid.hidden = false;
        idInput.style.border = "2px solid red"; 
    }
}

enameInput.addEventListener("change",check_enameInput)
function check_enameInput(){

    const error_ename = document.querySelector('#error_ename');

    if(enameInput.value == "")
        enameInput_ok = false;
    else
        enameInput_ok = true;    

    if(enameInput_ok)
    {
        enameInput.style.border = "1px solid #ccc";
        error_ename.hidden = true;
    }
    else
    {
        error_ename.innerHTML = "Name cannot be empty";
        error_ename.hidden = false;
        enameInput.style.border = "2px solid red"; 
    }
}

join_dateInput.addEventListener("change",check_join_dateInput)
function check_join_dateInput(){

    const error_join_date = document.querySelector('#error_join_date');

    if(join_dateInput.value == "")
        join_dateInput_ok = false;
    else
        join_dateInput_ok = true;    

    if(join_dateInput_ok)
    {
        join_dateInput.style.border = "1px solid #ccc";
        error_join_date.hidden = true;
    }
    else
    {
        error_join_date.innerHTML = "Join Date cannot be empty";
        error_join_date.hidden = false;
        join_dateInput.style.border = "2px solid red"; 
    }
}

lnoInput.addEventListener("change",check_lnoInput)
function check_lnoInput(){
    error_add.hidden = true;

    const error_lno = document.querySelector('#error_lno');

    if(lnoInput.value == "")
        lnoInput_ok = false;
    else    
        lnoInput_ok = true;    

    if(lnoInput_ok)
    {
        lnoInput.style.border = "1px solid #ccc";
        error_lno.hidden = true;
    }
    else
    {
        error_lno.innerHTML = "Level No cannot be empty";
        error_lno.hidden = false;
        lnoInput.style.border = "2px solid red"; 
    }
}

fnoInput.addEventListener("change",check_fnoInput)
function check_fnoInput(){
    error_add.hidden = true;

    const error_fno = document.querySelector('#error_fno');

    if(fnoInput.value == "")
        fnoInput_ok = false;
    else    
        fnoInput_ok = true;    

    if(fnoInput_ok)
    {
        fnoInput.style.border = "1px solid #ccc";
        error_fno.hidden = true;
    }
    else
    {
        error_fno.innerHTML = "Factory No cannot be empty";
        error_fno.hidden = false;
        fnoInput.style.border = "2px solid red"; 
    }
}



const addBtn = document.querySelector('#add-data-btn');
addBtn.onclick = function(){

    check_idInput();
    check_enameInput();
    check_join_dateInput();
    check_lnoInput();
    check_fnoInput();

    if(idInput_ok && enameInput_ok && join_dateInput_ok && lnoInput_ok && fnoInput_ok)
    {
        fetch('http://localhost:'+portno+'/insert/employee',{
            headers:{
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                eid : idInput.value,
                ename : enameInput.value,
                join_date : join_dateInput.value,
                lno : lnoInput.value,
                fno : fnoInput.value
            })
        })
        .then(response => response.json())
        .then(data => insertRowIntoTable(data['data']));
    }
}

updateNameInput.addEventListener("change",check_nameUpdate)
function check_nameUpdate(){
    const error_name_update = document.querySelector('#error_name_update');

    if(updateNameInput.value == "")
        updateNameInput_ok = false;
    else
        updateNameInput_ok = true;    

    if(updateNameInput_ok)
    {
        updateNameInput.style.border = "1px solid #ccc";
        error_name_update.hidden = true;
    }
    else
    {
        error_name_update.innerHTML = "Name cannot be empty";
        error_name_update.hidden = false;
        updateNameInput.style.border = "2px solid red"; 
    }
}

updateLnoInput.addEventListener("change",check_lnoUpdate)
function check_lnoUpdate(){
    const error_lno_update = document.querySelector('#error_lno_update');

    error_update.hidden = true; 

    if( updateLnoInput.value == "" )
        updateLnoInput_ok = false;
    else
        updateLnoInput_ok = true;    

    if(updateLnoInput_ok)
    {
        updateLnoInput.style.border = "1px solid #ccc";
        error_lno_update.hidden = true;
    }
    else
    {
        if(updateLnoInput.value == "")
            error_lno_update.innerHTML = "Level No cannot be empty";
        error_lno_update.hidden = false;
        updateLnoInput.style.border = "2px solid red"; 
    }
}

updateFnoInput.addEventListener("change",check_fnoUpdate)
function check_fnoUpdate(){
    const error_fno_update = document.querySelector('#error_fno_update');

    error_update.hidden = true; 

    if( updateFnoInput.value == "" )
        updateFnoInput_ok = false;
    else
        updateFnoInput_ok = true;    

    if(updateFnoInput_ok)
    {
        updateFnoInput.style.border = "1px solid #ccc";
        error_fno_update.hidden = true;
    }
    else
    {
        if(updateFnoInput.value == "")
            error_fno_update.innerHTML = "Factory No cannot be empty";
        error_fno_update.hidden = false;
        updateFnoInput.style.border = "2px solid red"; 
    }
}

const updateBtn = document.querySelector('#update-row-btn');
updateBtn.onclick = function(){   
    //console.log(updateJoin_dateInput.value);

    check_nameUpdate();
    check_lnoUpdate();

    if(updateNameInput_ok && updateLnoInput_ok)
    {
        fetch('http://localhost:'+portno+'/update/employee',{
            headers:{
                'Content-type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify({
                eid : updateNameInput.dataset.id,
                ename : updateNameInput.value,
                join_date: updateJoin_dateInput.value,
                lno: updateLnoInput.value,
                fno: updateFnoInput.value
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.success == 'ER_NO_REFERENCED_ROW_2: Cannot add or update a child row: a foreign key constraint fails (`demo_db`.`employee`, CONSTRAINT `FK_LNO` FOREIGN KEY (`lno`) REFERENCES `paystruct` (`level_no`) ON DELETE SET NULL)')
            {
                error_update.innerHTML = "ERROR : No Level exists with the given Level no";
                error_update.hidden = false;
                updateLnoInput.style.border = "2px solid red";
            }
            else if(data.success == 'ER_NO_REFERENCED_ROW_2: Cannot add or update a child row: a foreign key constraint fails (`demo_db`.`employee`, CONSTRAINT `FK_FNO` FOREIGN KEY (`fno`) REFERENCES `factory` (`fact_no`) ON DELETE SET NULL)') 
            {
                error_update.innerHTML = "ERROR : No Factory exists with the given Factory no";
                error_update.hidden = false;
                updateFnoInput.style.border = "2px solid red";
            }  
            else if(data.success)
                location.reload();   
        });
    }    
}

searchinput.addEventListener('change',search_sort);
sort.addEventListener('click',search_sort);
join_date_min.addEventListener('change',search_sort);
join_date_max.addEventListener('change',search_sort);

document.querySelector('#clear').addEventListener('click',function(){
    searchinput.value = "";
    sort.value = null;
    join_date_min.value = "";
    join_date_max.value = "";
    search_sort();
})

document.querySelector('#addbtn_popup').onclick = function(){
    document.getElementById('add_popup').style.display = "block";
}

document.querySelector('#add_closeimg').addEventListener('click',add_popup_hide);
function add_popup_hide(){
    document.getElementById('add_popup').style.display = "none";

    idInput.value = "";
    enameInput.value = "";
    join_dateInput.value = "";
    lnoInput.value = "";
    fnoInput.value = "";

    idInput.style.border = "1px solid #ccc";
    enameInput.style.border = "1px solid #ccc";
    join_dateInput.style.border = "1px solid #ccc";
    lnoInput.style.border = "1px solid #ccc";
    fnoInput.style.border = "1px solid #ccc";

    document.querySelector('#error_eid').hidden = true;
    document.querySelector('#error_ename').hidden = true;
    document.querySelector('#error_lno').hidden = true;
    document.querySelector('#error_fno').hidden = true;
    document.querySelector('#error_join_date').hidden = true;

    error_add.hidden = true;
}

document.querySelector('#edit_closeimg').onclick = function(){
    document.getElementById('edit_popup').style.display = "none";
   
    updateNameInput.style.border = "1px solid #ccc";
    updateLnoInput.style.border = "1px solid #ccc";

    document.querySelector('#error_name_update').hidden = true;
    document.querySelector('#error_lno_update').hidden = true;
}


function insertRowIntoTable(data){
    const table = document.querySelector('table tbody');

    if (table.innerHTML === `<tr><td class="no-data" colspan="5">No data</td></tr>`)
        table.innerHTML = "";    
    
    if(data == `ER_DUP_ENTRY: Duplicate entry '${idInput.value}' for key 'PRIMARY'`)
    {
        error_add.innerHTML  = "ERROR : A record with this ID already exists";
        error_add.hidden = false;
        idInput.style.border = "2px solid red";
    }
    else if(data == 'ER_NO_REFERENCED_ROW_2: Cannot add or update a child row: a foreign key constraint fails (`demo_db`.`employee`, CONSTRAINT `FK_LNO` FOREIGN KEY (`lno`) REFERENCES `paystruct` (`level_no`) ON DELETE SET NULL)')
    {
        error_add.innerHTML = "ERROR : No Level exists with the given Level no";
        error_add.hidden = false;
        lnoInput.style.border = "2px solid red";
    }
    else if(data == 'ER_NO_REFERENCED_ROW_2: Cannot add or update a child row: a foreign key constraint fails (`demo_db`.`employee`, CONSTRAINT `FK_FNO` FOREIGN KEY (`fno`) REFERENCES `factory` (`fact_no`) ON DELETE SET NULL)') 
    {
        error_add.innerHTML = "ERROR : No Factory exists with the given Factory no";
        error_add.hidden = false;
        fnoInput.style.border = "2px solid red";
    }
    
    else
    {
        add_popup_hide();
        
        let newrow = table.insertRow(-1);
    
        let rowHtml = "<tr>";
        rowHtml += `<td>${data.eid}</td>`;
        rowHtml += `<td>${data.ename}</td>`;
        rowHtml += `<td>${data.join_date}</td>`;
        rowHtml += `<td>${data.lno}</td>`;
        rowHtml += `<td>${data.fno}</td>`;
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

    data.forEach(({eid,ename,join_date,lno,fno})=>{ 
        newrow = table.insertRow(-1);
        rowHtml = "<tr>";
        rowHtml += `<td>${eid}</td>`;
        rowHtml += `<td>${ename}</td>`;
        rowHtml += `<td>${join_date}</td>`;
        rowHtml += `<td>${lno}</td>`;
        rowHtml += `<td>${fno}</td>`;
        rowHtml += "</tr>";
    
        newrow.innerHTML = rowHtml;

        newrow.addEventListener('contextmenu', function(e){
            dynamicEvent(e,this)
        },false);

    });
}

function dynamicEvent(e,obj) {
    e.preventDefault();

    selected_eid = $(obj).find('td:nth-child(1)').text();
    selected_ename = $(obj).find('td:nth-child(2)').text();
    selected_joindate = $(obj).find('td:nth-child(3)').text();
    selected_lno = $(obj).find('td:nth-child(4)').text();
    selected_fno = $(obj).find('td:nth-child(5)').text();

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
    fetch('http://localhost:'+portno+'/delete/employee/'+no,{
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
    updateNameInput.dataset.id = no;

    updateNameInput.value = selected_ename;
    updateJoin_dateInput.value = selected_joindate;
    updateLnoInput.value = selected_lno;
    updateFnoInput.value = selected_fno;

    document.getElementById('edit_popup').style.display = "block";
}

function search_sort(){
    console.log(sort.value);
    fetch('http://localhost:'+portno+'/search_sort/employee',{
        headers:{
                'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
                name : searchinput.value,
                sort_keyword : sort.value,
                join_date_min : join_date_min.value,
                join_date_max : join_date_max.value 
        })
    })  
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}
add.onclick= function(){
    pcontent="";
    pcontent=`<p>${desc.value}:</p>`+document.getElementById('the-table').innerHTML+'<br><br>';
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

