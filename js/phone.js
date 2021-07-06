//const e = require("express");
const portno='5000';
const phone_id=document.querySelector('#phone_id-input');
const pname=document.querySelector('#pname-input');
const launch=document.querySelector('#launch-input');
const cost=document.querySelector('#cost-input');
const proc=document.querySelector('#proc-input');
const battery=document.querySelector('#battery-input');
const rear_cam=document.querySelector('#rear_cam-input');
const front_cam=document.querySelector('#front_cam-input');
const error_add = document.querySelector('#error_add');

const pname_e=document.querySelector('#pname-input_e');
const launch_e=document.querySelector('#launch-input_e');
const cost_e=document.querySelector('#cost-input_e');
const proc_e=document.querySelector('#proc-input_e');
const battery_e=document.querySelector('#battery-input_e');
const rear_cam_e=document.querySelector('#rear_cam-input_e');
const front_cam_e=document.querySelector('#front_cam-input_e');
const error_add_e= document.querySelector('#error_add_e');

const modelName=document.querySelector('#modelName');
const minCost=document.querySelector('#minCost');
const maxCost=document.querySelector('#maxCost');
const rearCam=document.querySelector('#rearCam');
const frontCam=document.querySelector('#frontCam');
const minBat=document.querySelector('#minBat');
const maxBat=document.querySelector('#maxBat');
const processorm=document.querySelector('#processorm');
const launchdatem=document.querySelector('#launchdatem');
const sort=document.querySelector('#sort');

const add=document.querySelector('#add');
const desc=document.querySelector('#description');
const printer=document.querySelector('#print');
const flush=document.querySelector('#flush');

var selected_id,selected_name,selected_launch,selected_cost,selected_proc,selected_battery,selected_rear,sleected_front,menuState=0;
var phone_id_ok,pname_ok,launch_ok,cost_ok,proc_ok,battery_ok,rear_cam_ok,front_cam_ok;
var pname_e_ok,launch_e_ok,cost_e_ok,proc_e_ok,battery_e_ok,rear_cam_e_ok,front_cam_e_ok,flag;

/*-------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", function() 
{
    fetch('http://localhost:5000/getAllPhones') // link = http://localhost:5000/getAll/paystruct
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
});

/*___________________________________________________________________________________________________________*/
const contextMenu = document.querySelector(".context-menu");
contextMenu.addEventListener("click",function(event){
    if(event.target.className == "context-menu-delete")
        deleteRow(selected_id);
    
    else if(event.target.className == "context-menu-edit")
        updateRow(selected_id);
});

document.addEventListener( "click", function(e) {
    if(menuState == 1)
    {
        menuState = 0;
        contextMenu.style.display = "none";
    }
});

document.querySelector('#addbtn_popup').onclick = function(){
    document.getElementById('add_popup').style.display = "block";
}

document.querySelector('#add_closeimg').addEventListener('click',add_popup_hide);
function add_popup_hide(){
    document.getElementById('add_popup').style.display = "none";

    phone_id.value = "";
    pname.value = "";
    launch.value = "";
    cost.value="";
    proc.value="";
    battery.value="";
    rear_cam.value="";
    front_cam.value="";

    phone_id.style.border = "1px solid #ccc";
    pname.style.border = "1px solid #ccc";
    launch.style.border = "1px solid #ccc";
    cost.style.border = "1px solid #ccc";
    proc.style.border = "1px solid #ccc";
    battery.style.border = "1px solid #ccc";
    rear_cam.style.border = "1px solid #ccc";
    front_cam.style.border = "1px solid #ccc";

    document.querySelector('#error_phone_id').hidden = true;
    document.querySelector('#error_pname').hidden = true;
    document.querySelector('#error_launch').hidden = true;
    document.querySelector('#error_cost').hidden = true;
    document.querySelector('#error_proc').hidden = true;
    document.querySelector('#error_battery').hidden = true;
    document.querySelector('#error_rear_cam').hidden = true;
    document.querySelector('#error_front_cam').hidden = true;

    error_add.hidden = true;
}

document.querySelector('#edit_closeimg').onclick = function(){
    document.getElementById('edit_popup').style.display = "none";

    pname_e.style.border = "1px solid #ccc";
    launch_e.style.border = "1px solid #ccc";
    cost_e.style.border = "1px solid #ccc";
    proc_e.style.border = "1px solid #ccc";
    battery_e.style.border = "1px solid #ccc";
    rear_cam_e.style.border = "1px solid #ccc";
    front_cam_e.style.border = "1px solid #ccc";

    document.querySelector('#error_pname_e').hidden = true;
    document.querySelector('#error_launch_e').hidden = true;
    document.querySelector('#error_cost_e').hidden = true;
    document.querySelector('#error_proc_e').hidden = true;
    document.querySelector('#error_battery_e').hidden = true;
    document.querySelector('#error_rear_cam_e').hidden = true;
    document.querySelector('#error_front_cam_e').hidden = true;
}

function dynamicEvent(e,obj) {
    e.preventDefault();

    selected_id = $(obj).find('td:nth-child(1)').text();
    selected_name = $(obj).find('td:nth-child(2)').text();
    selected_launch= $(obj).find('td:nth-child(3)').text();
    selected_cost= $(obj).find('td:nth-child(4)').text();
    selected_proc= $(obj).find('td:nth-child(5)').text();
    selected_battery= $(obj).find('td:nth-child(6)').text();
    selected_rear= $(obj).find('td:nth-child(7)').text();
    selected_front= $(obj).find('td:nth-child(8)').text();
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

function deleteRow(id)
{
    fetch('http://localhost:5000/deletePhone/'+id,{
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if(data.success)
           location.reload();
    });
}

function updateRow(id)
{
    pname_e.dataset.id = id;
    pname_e.value = selected_name;
    launch_e.value = selected_launch;
    cost_e.value=selected_cost;
    proc_e.value=selected_proc;
    battery_e.value=selected_battery;
    rear_cam_e.value=selected_rear;
    front_cam_e.value=selected_front;

    document.getElementById('edit_popup').style.display = "block";
}

add.onclick= function(){
    pcontent="";
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
/*__________________________________________________________________________________________________*/

phone_id.addEventListener("change",check_phone_id)
function check_phone_id(){
    error_add.hidden = true;
    const error_phone_id = document.querySelector('#error_phone_id');
    if(phone_id.value == "")
        phone_id_ok = false;
    else
        phone_id_ok = true;    

    if(phone_id_ok)
    {
        phone_id.style.border = "1px solid #ccc";
        error_phone_id.hidden = true;
    }
    else
    {
        error_phone_id.innerHTML = "id can't be empty";
        error_phone_id.hidden = false;
        phone_id.style.border = "2px solid red"; 
    }
}

pname.addEventListener("change",check_pname)
function check_pname(){
    error_add.hidden = true;
    const error_pname = document.querySelector('#error_pname');
    if(pname.value == "")
        pname_ok = false;
    else
        pname_ok = true;    

    if(pname_ok)
    {
        pname.style.border = "1px solid #ccc";
        error_pname.hidden = true;
    }
    else
    {
        error_pname.innerHTML = "name can't be empty";
        error_pname.hidden = false;
        pname.style.border = "2px solid red"; 
    }
}

launch.addEventListener("change",check_launch)
function check_launch(){
    error_add.hidden = true;
    const error_launch = document.querySelector('#error_launch');
    if(launch.value == "")
        launch_ok = false;
    else
        launch_ok = true;    

    if(launch_ok)
    {
        launch.style.border = "1px solid #ccc";
        error_launch.hidden = true;
    }
    else
    {
        error_launch.innerHTML = "date can't be empty";
        error_launch.hidden = false;
        launch.style.border = "2px solid red"; 
    }
}

cost.addEventListener("change",check_cost)
function check_cost(){
    error_add.hidden = true;
    const error_cost = document.querySelector('#error_cost');
    if(cost.value == ""){
        cost_ok=false;
        flag=1;
    }
    else if(cost.value<5000 || cost.value>200000){
        cost_ok=false;
        flag=2;
    }
    else
        cost_ok = true;

    if(cost_ok)
    {
        cost.style.border = "1px solid #ccc";
        error_cost.hidden = true;
    }
    else
    {
        if(flag==1)
        error_cost.innerHTML = "cost can't be empty";
        else
        error_cost.innerHTML = "cost should be in 5000-200000 range";
        error_cost.hidden = false;
        cost.style.border = "2px solid red"; 
    }
}

proc.addEventListener("change",check_proc)
function check_proc(){
    error_add.hidden = true;
    const error_proc = document.querySelector('#error_proc');
    if(proc.value == "")
        proc_ok = false;
    else
        proc_ok = true;    

    if(proc_ok)
    {
        proc.style.border = "1px solid #ccc";
        error_proc.hidden = true;
    }
    else
    {
        error_proc.innerHTML = "processor can't be empty";
        error_proc.hidden = false;
        proc.style.border = "2px solid red"; 
    }
}

battery.addEventListener("change",check_battery)
function check_battery(){
    error_add.hidden = true;
    const error_battery = document.querySelector('#error_battery');
    if(battery.value == "" ){
        battery_ok = false;
        flag=1;
    }
    else if(battery.value<2500 || battery.value>8000){
        battery_ok=false;
        flag=2;
    }
    else
        battery_ok = true;    

    if(battery_ok)
    {
        battery.style.border = "1px solid #ccc";
        error_battery.hidden = true;
    }
    else
    {
        if(flag==1)
        error_battery.innerHTML = "battery can't be empty";
        else
        error_battery.innerHTML = "battery should be in 2500-8000 range";
        error_battery.hidden = false;
        battery.style.border = "2px solid red"; 
    }
}

rear_cam.addEventListener("change",check_rear_cam)
function check_rear_cam(){
    error_add.hidden = true;
    const error_rear_cam = document.querySelector('#error_rear_cam');
    if(rear_cam.value == ""){
        rear_cam_ok = false;
        flag==1;
    }
    else if(rear_cam.value<5 || rear_cam.value>124){
        rear_cam_ok=false;
        flag=2;
    }
    else
        rear_cam_ok = true;    

    if(rear_cam_ok)
    {
        rear_cam.style.border = "1px solid #ccc";
        error_rear_cam.hidden = true;
    }
    else
    {
        if(flag==1)
        error_rear_cam.innerHTML = "rear camera can't be empty";
        else
        error_rear_cam.innerHTML = "rear camera should be in 5-124 range";
        error_rear_cam.hidden = false;
        rear_cam.style.border = "2px solid red"; 
    }
}

front_cam.addEventListener("change",check_front_cam)
function check_front_cam(){
    error_add.hidden = true;
    const error_front_cam = document.querySelector('#error_front_cam');
    if(front_cam.value == "")
        front_cam_ok = false;
    else
        front_cam_ok = true;    

    if(front_cam_ok)
    {
        front_cam.style.border = "1px solid #ccc";
        error_front_cam.hidden = true;
    }
    else
    {
        error_front_cam.innerHTML = "front camera can't be empty";
        error_front_cam.hidden = false;
        front_cam.style.border = "2px solid red"; 
    }
}

const addBtn = document.querySelector('#add-data-btn');
addBtn.onclick = function(){
    check_phone_id();
    check_pname();
    check_launch();
    check_cost();
    check_proc();
    check_battery();
    check_rear_cam();
    check_front_cam();
    if(phone_id_ok && pname_ok && launch_ok && cost_ok && proc_ok && battery_ok && rear_cam_ok && front_cam_ok)
    {
        //console.log(noInput.value);
        fetch('http://localhost:5000/insert/phone',{
            headers:{
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                phone_id :phone_id.value,
                pname:pname.value,
                launch:launch.value,
                cost:cost.value,
                proc:proc.value,
                battery:battery.value,
                rear_cam:rear_cam.value,
                front_cam:front_cam.value,
            })
        })
        .then(response => response.json())
        .then(data => insertRowIntoTable(data['data']));
    }
}

function insertRowIntoTable(data){
    const table = document.querySelector('table tbody');
    if (table.innerHTML === `<tr><td class="no-data" colspan="8">No data</td></tr>`)
        table.innerHTML = "";    

    if(data == 'ER_DUP_ENTRY')
    {
        error_add.innerHTML = "ERROR : A record with this Phone_id already exists"; 
        error_add.hidden = false;
    }
    else    
    {
        add_popup_hide();

        let newrow = table.insertRow(-1);
    
        let rowHtml = "<tr>";
        rowHtml += `<td>${data.phone_id}</td>`;
        rowHtml += `<td>${data.pname}</td>`;
        rowHtml += `<td>${data.launch}</td>`;
        rowHtml += `<td>${data.cost}</td>`;
        rowHtml += `<td>${data.proc}</td>`;
        rowHtml += `<td>${data.battery}</td>`;
        rowHtml += `<td>${data.rear_cam}</td>`;
        rowHtml += `<td>${data.front_cam}</td>`;
        rowHtml += "</tr>";

        newrow.innerHTML = rowHtml;

        newrow.addEventListener('contextmenu', function(e){
            dynamicEvent(e,this)
        },false);
    } 
}
/*_________________________________________________________________________________________________________*/

pname_e.addEventListener("change",check_pname_e)
function check_pname_e(){
    const error_pname_e = document.querySelector('#error_pname_e');

    if(pname_e.value == "")
        pname_e_ok = false;
    else
        pname_e_ok = true;    

    if(pname_e_ok)
    {
        pname_e.style.border = "1px solid #ccc";
        error_pname_e.hidden = true;
    }
    else
    {
        error_pname_e.innerHTML = "name can't be empty";
        error_pname_e.hidden = false;
        pname_e.style.border = "2px solid red"; 
    }
}

launch_e.addEventListener("change",check_launch_e)
function check_launch_e(){
    const error_launch_e = document.querySelector('#error_launch_e');

    if(launch_e.value == "")
        launch_e_ok = false;
    else
        launch_e_ok = true;    

    if(launch_e_ok)
    {
        launch_e.style.border = "1px solid #ccc";
        error_launch_e.hidden = true;
    }
    else
    {
        error_launch_e.innerHTML = "Date can't be empty";
        error_launch_e.hidden = false;
        launch_e.style.border = "2px solid red"; 
    }
}

cost_e.addEventListener("change",check_cost_e)
function check_cost_e(){
    const error_cost_e = document.querySelector('#error_cost_e');

    if(cost_e.value == ""){
    cost_e_ok = false;
    flag=1;
    }
    else if(cost_e.value<5000 || cost_e.value>200000){
        cost_e_ok=false;
        flag=2;
    }
    else
    cost_e_ok = true;

    if(cost_e_ok)
    {
        cost_e.style.border = "1px solid #ccc";
        error_cost_e.hidden = true;
    }
    else
    {
        if(flag==1)
        error_cost_e.innerHTML = "cost cannot be empty";
        else
        error_cost_e.innerHTML = "cost should be in 5000-200000 range";
        error_cost_e.hidden = false;
        cost_e.style.border = "2px solid red"; 
    }
}

proc_e.addEventListener("change",check_proc_e)
function check_proc_e(){
    const error_proc_e = document.querySelector('#error_proc_e');

    if(proc_e.value == "")
    proc_e_ok = false;

    else
    proc_e_ok = true;

    if(proc_e_ok)
    {
        proc_e.style.border = "1px solid #ccc";
        error_proc_e.hidden = true;
    }
    else
    {
        error_proc_e.innerHTML = "processor cannot be empty";
        error_proc_e.hidden = false;
        proc_e.style.border = "2px solid red"; 
    }
}

battery_e.addEventListener("change",check_battery_e)
function check_battery_e(){
    const error_battery_e = document.querySelector('#error_battery_e');

    if(battery_e.value == "" ){
    battery_e_ok = false;
    flag=1;
    }
    else if(battery_e.value<2500 || battery_e.value>8000){
        battery_e_ok=false;
        flag=2;
    }
    else
    battery_e_ok = true;

    if(battery_e_ok)
    {
        battery_e.style.border = "1px solid #ccc";
        error_battery_e.hidden = true;
    }
    else
    {
        if(flag==1)
        error_battery_e.innerHTML = "Battery can't be empty";
        else
        error_battery_e.innerHTML = "Battery should be in 2500-8000 range";
        error_battery_e.hidden = false;
        battery_e.style.border = "2px solid red"; 
    }
}

rear_cam_e.addEventListener("change",check_rear_cam_e)
function check_rear_cam_e(){
    const error_rear_cam_e = document.querySelector('#error_rear_cam_e');

    if(rear_cam_e.value == ""){
    flag=1;
    rear_cam_e_ok = false;
    }
    else if(rear_cam_e.value<5 || rear_cam_e.value>124){
        flag=2;
        rear_cam_e_ok=false;
    }
    else
    rear_cam_e_ok = true;

    if(rear_cam_e_ok)
    {
        rear_cam_e.style.border = "1px solid #ccc";
        error_rear_cam_e.hidden = true;
    }
    else
    {
        if(flag==1)
        error_rear_cam_e.innerHTML = "rear camera can't be empty";
        else
        error_rear_cam_e.innerHTML = "rear camera should be in 5-124 range";
        error_rear_cam_e.hidden = false;
        rear_cam_e.style.border = "2px solid red"; 
    }
}

front_cam_e.addEventListener("change",check_front_cam_e)
function check_front_cam_e(){
    const error_front_cam_e = document.querySelector('#error_front_cam_e');

    if(front_cam_e.value == "")
    front_cam_e_ok = false;
    else
    front_cam_e_ok = true;

    if(front_cam_e_ok)
    {
        front_cam_e.style.border = "1px solid #ccc";
        error_front_cam_e.hidden = true;
    }
    else
    {
        error_front_cam_e.innerHTML = "front camera cannot be empty";
        error_front_cam_e.hidden = false;
        front_cam_e.style.border = "2px solid red"; 
    }
}

const editBtn = document.querySelector('#update-row-btn');
editBtn.onclick = function(){  
    check_pname_e();
    check_launch_e();
    check_cost_e();
    check_proc_e();
    check_battery_e();
    check_rear_cam_e();
    check_front_cam_e();

    if(pname_e_ok && launch_e_ok && cost_e_ok && proc_e_ok && battery_e_ok && rear_cam_e_ok && front_cam_e_ok)
    {
        fetch('http://localhost:5000/update/phone',{
            headers:{
                'Content-type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify({
                phone_id_e:pname_e.dataset.id,
                pname_e:pname_e.value,
                launch_e:launch_e.value,
                cost_e:cost_e.value,
                proc_e:proc_e.value,
                battery_e:battery_e.value,
                rear_cam_e:rear_cam_e.value,
                front_cam_e:front_cam_e.value
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.success)
            location.reload();
        });
    }    
}
/*___________________________________________________________________________________________________________*/
minCost.addEventListener('change',search_sort);
maxCost.addEventListener('change',search_sort);
rearCam.addEventListener('change',search_sort);
frontCam.addEventListener('change',search_sort);
processorm.addEventListener('change',search_sort);
launchdatem.addEventListener('change',search_sort);
sort.addEventListener('change',search_sort);
minBat.addEventListener('change',search_sort);
maxBat.addEventListener('change',search_sort);
modelName.addEventListener('change',search_sort);
function search_sort(){
    fetch('http://localhost:5000/search_sort/phones',{
        headers:{
                'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            minCost:minCost.value,
            maxCost:maxCost.value,
            rearCam:rearCam.value,
            frontCam:frontCam.value,
            minBat:minBat.value,
            maxBat:maxBat.value,
            modelName:modelName.value,
            proc:processorm.value,
            launch:launchdatem.value,
            sort:sort.value
        })
    })
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}
/*__________________________________________________________________________________________________________*/
function loadHTMLTable(data){
    const table = document.querySelector('table tbody');
    if(data.length === 0)
    {
        table.innerHTML = `<tr><td class='no-data' colspan=8>No data</td></tr>`;
        return;
    }
    table.innerHTML = "";
    let newrow; 
    let rowHtml;
    data.forEach(({phone_id,pname,launch,cost,proc,battery,rear_cam,front_cam})=>{ 
        newrow = table.insertRow(-1);
        rowHtml = "<tr>";
        rowHtml += `<td>${phone_id}</td>`;
        rowHtml += `<td>${pname}</td>`;
        rowHtml += `<td>${launch}</td>`;
        rowHtml += `<td>${cost}</td>`;
        rowHtml += `<td>${proc}</td>`;
        rowHtml += `<td>${battery}</td>`;
        rowHtml += `<td>${rear_cam}</td>`;
        rowHtml += `<td>${front_cam}</td>`;
        rowHtml += "</tr>";
        newrow.innerHTML = rowHtml;
        newrow.addEventListener('contextmenu', function(e){
            dynamicEvent(e,this)
        },false);
    });
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
