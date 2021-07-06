const portno = 5000;

const fnoInput = document.querySelector('#fno-input');
const pidInput = document.querySelector('#pid-input');
const error_add = document.querySelector('#error_add');
const add=document.querySelector('#add');
const printer=document.querySelector('#print');
const flush=document.querySelector('#flush');
const desc=document.querySelector('#description');

const sort = document.querySelector('#sort');

var selected_fno,selected_pid,menuState=0;
var fnoInput_ok,pidInput_ok;

document.addEventListener("DOMContentLoaded", function() 
{
    fetch('http://localhost:'+portno+'/getAll/production') // link = http://localhost:5000/getAll/production
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
});

const contextMenu = document.querySelector(".context-menu");
contextMenu.addEventListener("click",function(event){
    if(event.target.className == "context-menu-delete")
        deleteRow(selected_fno,selected_pid);
    
    // else if(event.target.className == "context-menu-edit")
    //     updateRow(selected_fno);
})

document.addEventListener( "click", function(e) {
    if(menuState == 1)
    {
        menuState = 0;
        contextMenu.style.display = "none";
    }
});

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

pidInput.addEventListener("change",check_pidInput)
function check_pidInput(){
    error_add.hidden = true;

    const error_pid = document.querySelector('#error_pid');

    if(pidInput.value == "")
        pidInput_ok = false;
    else
        pidInput_ok = true;    

    if(pidInput_ok)
    {
        pidInput.style.border = "1px solid #ccc";
        error_pid.hidden = true;
    }
    else
    {
        error_pid.innerHTML = "Phone ID cannot be empty";
        error_pid.hidden = false;
        pidInput.style.border = "2px solid red"; 
    }
}

const addBtn = document.querySelector('#add-data-btn');
addBtn.onclick = function(){

    check_fnoInput();
    check_pidInput();

    if(fnoInput_ok  && pidInput_ok)
    {
        fetch('http://localhost:'+portno+'/insert/production',{
            headers:{
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                fno : fnoInput.value,
                pid : pidInput.value
            })
        })
        .then(response => response.json())
        .then(data => insertRowIntoTable(data['data']));
    }
}

sort.addEventListener('click',search_sort);


document.querySelector('#clear').addEventListener('click',function(){
    sort.value = null;
    search_sort();
})

document.querySelector('#addbtn_popup').onclick = function(){
    document.getElementById('add_popup').style.display = "block";
}

document.querySelector('#add_closeimg').addEventListener('click',add_popup_hide);
function add_popup_hide(){
    document.getElementById('add_popup').style.display = "none";

    fnoInput.value = "";
    pidInput.value = "";

    fnoInput.style.border = "1px solid #ccc";
    pidInput.style.border = "1px solid #ccc";

    document.querySelector('#error_fno').hidden = true;
    document.querySelector('#error_pid').hidden = true;

    error_add.hidden = true;
}


function insertRowIntoTable(data){
    const table = document.querySelector('table tbody');
    if (table.innerHTML === `<tr><td class="no-data" colspan="5">No data</td></tr>`)
        table.innerHTML = "";    

    if(data == `ER_DUP_ENTRY: Duplicate entry '${fnoInput.value}-${pidInput.value}' for key 'PRIMARY'`)
    {
        error_add.innerHTML = "ERROR : A record with this combination already exists"; 
        error_add.hidden = false;
    }
    else if(data == 'ER_NO_REFERENCED_ROW_2: Cannot add or update a child row: a foreign key constraint fails (`demo_db`.`production`, CONSTRAINT `FK_FACTNO` FOREIGN KEY (`fno`) REFERENCES `factory` (`fact_no`) ON DELETE CASCADE)')
    {
        error_add.innerHTML = "ERROR : A Factory with this No. does not exist"; 
        fnoInput.style.border = "2px solid red";
        error_add.hidden = false;
    }
    else if(data == 'ER_NO_REFERENCED_ROW_2: Cannot add or update a child row: a foreign key constraint fails (`demo_db`.`production`, CONSTRAINT `FK_PHONEID` FOREIGN KEY (`pid`) REFERENCES `phone` (`phone_id`) ON DELETE CASCADE)')
    {
        error_add.innerHTML = "ERROR : A Phone with this ID does not exist";
        pidInput.style.border = "2px solid red";
        error_add.hidden = false;
    }
    
    else    
    {
        add_popup_hide();

        let newrow = table.insertRow(-1);
    
        let rowHtml = "<tr>";
        rowHtml += `<td>${data.fno}</td>`;
        rowHtml += `<td>${data.pid}</td>`;
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
        table.innerHTML = "<tr><td class='no-data' colspan=2>No data</td></tr>";
        return;
    }
    table.innerHTML = "";
    let newrow; 
    let rowHtml;

    data.forEach(({fno,pid})=>{ 
        newrow = table.insertRow(-1);
        rowHtml = "<tr>";
        rowHtml += `<td>${fno}</td>`;
        rowHtml += `<td>${pid}</td>`;
        rowHtml += "</tr>";
    
        newrow.innerHTML = rowHtml;

        newrow.addEventListener('contextmenu', function(e){
            dynamicEvent(e,this)
        },false);

    });
}

function dynamicEvent(e,obj) {
    e.preventDefault();

    selected_fno = $(obj).find('td:nth-child(1)').text();
    selected_pid = $(obj).find('td:nth-child(2)').text();

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

function deleteRow(fno,pid)
{
    fetch('http://localhost:'+portno+'/constraint/production',{
        headers:{
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
                fno: fno,
        })
    }) 
    .then(response => response.json())
    .then(data => {
        if(data['data'][0].c >= 4)
        {
            fetch('http://localhost:'+portno+'/deleteproduction',{
                headers:{
                    'Content-type': 'application/json'
                },
                method: 'DELETE',
                body: JSON.stringify({
                    fno: fno,
                    pid : pid
                })
            })    
            .then(response => response.json())
            .then(data => {
                if(data.success)
                    location.reload();
                });
            }
            else
                alert("Delete Failed\nEvery Factory needs to manufacture atleast 3 Phones ");
        });  
}

function search_sort(){
    const sort_keyword = sort.value;

    fetch('http://localhost:'+portno+'/search_sort/production',{
        headers:{
                'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
                sort_keyword : sort_keyword,
        })
    })  
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}
add.onclick= function(){
    pcontent="";
    //pcontent=`<p>${desc2.value}:</p>`+document.getElementById('actual-tabl').innerHTML;
    pcontent=`<p>${desc.value}:</p>`+document.getElementById('the-table').innerHTML;
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

