const portno = 5000;

const noInput = document.querySelector('#fact_no-input');
const addressInput = document.querySelector('#address-input');
const capacityInput = document.querySelector('#capacity-input');
const estInput = document.querySelector('#est-input');
const phone1Input = document.querySelector('#phone1-input');
const phone2Input = document.querySelector('#phone2-input');
const phone3Input = document.querySelector('#phone3-input');
const error_add = document.querySelector('#error_add');

const updateAddressInput = document.querySelector('#update-address-input');
const updateCapacityInput = document.querySelector('#update-capacity-input');
const updateEstInput = document.querySelector('#update-est-input');

const searchinput = document.querySelector('#address-search');
const sort = document.querySelector('#sort');
const capacitymin = document.querySelector('#capacity-min');
const capacitymax = document.querySelector('#capacity-max');
const estmin = document.querySelector('#est-min');
const estmax = document.querySelector('#est-max');
const add=document.querySelector('#add');
const printer=document.querySelector('#print');
const flush=document.querySelector('#flush');
const desc=document.querySelector('#description');

var selected_no,selected_address,selected_capacity,selected_est,menuState=0;
var noInput_ok,addressInput_ok,capacityInput_ok,estInput_ok,phone1Input_ok,phone2Input_ok,phone3Input_ok,updateAddressInput_ok,updateCapacityInput_ok;

document.addEventListener("DOMContentLoaded", function() 
{
    fetch('http://localhost:'+portno+'/getAll/factory') // link = http://localhost:5000/getAll/factory
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

    const error_fact_no = document.querySelector('#error_fact_no');

    if(noInput.value == "")
        noInput_ok = false;
    else
        noInput_ok = true;    

    if(noInput_ok)
    {
        noInput.style.border = "1px solid #ccc";
        error_fact_no.hidden = true;
    }
    else
    {
        error_fact_no.innerHTML = "Factory No cannot be empty";
        error_fact_no.hidden = false;
        noInput.style.border = "2px solid red"; 
    }
}

addressInput.addEventListener("change",check_addressInput)
function check_addressInput(){
    error_add.hidden = true;

    const error_address = document.querySelector('#error_address');

    if(addressInput.value == "")
        addressInput_ok = false;
    else
        addressInput_ok = true;    

    if(addressInput_ok)
    {
        addressInput.style.border = "1px solid #ccc";
        error_address.hidden = true;
    }
    else
    {
        error_address.innerHTML = "Address cannot be empty";
        error_address.hidden = false;
        addressInput.style.border = "2px solid red"; 
    }
}

capacityInput.addEventListener("change",check_capacityInput)
function check_capacityInput(){
    error_add.hidden = true;

    const error_capacity = document.querySelector('#error_capacity');

    if( (capacityInput.value == "") || (capacityInput.value <= 100000) )
        capacityInput_ok = false;
    else    
        capacityInput_ok = true;    

    if(capacityInput_ok)
    {
        capacityInput.style.border = "1px solid #ccc";
        error_capacity.hidden = true;
    }
    else
    {
        if(capacityInput.value == "")
            error_capacity.innerHTML = "Capacity cannot be empty";
        else
            error_capacity.innerHTML = "Capacity should be > 100000";   
        error_capacity.hidden = false;
        capacityInput.style.border = "2px solid red"; 
    }
}

estInput.addEventListener("change",check_estInput)
function check_estInput(){
    error_add.hidden = true;

    const error_est = document.querySelector('#error_est');

    if(estInput.value == "")
        estInput_ok = false;
    else
        estInput_ok = true;    

    if(estInput_ok)
    {
        estInput.style.border = "1px solid #ccc";
        error_est.hidden = true;
    }
    else
    {
        error_est.innerHTML = "Est. Date cannot be empty";
        error_est.hidden = false;
        estInput.style.border = "2px solid red"; 
    }
}

phone1Input.addEventListener("change",check_phone1Input)
function check_phone1Input(){
    error_add.hidden = true;

    const error_phone1 = document.querySelector('#error_phone1');

    if( (phone1Input.value == "") || (phone1Input.value == phone2Input.value) || (phone1Input.value == phone3Input.value) )
        phone1Input_ok = false;
    else
        phone1Input_ok = true;    

    if(phone1Input_ok)
    {
        phone1Input.style.border = "1px solid #ccc";
        error_phone1.hidden = true;
    }
    else
    {
        if(phone1Input.value == "")
            error_phone1.innerHTML = "Phone 1 ID cannot be empty";
        else
            error_phone1.innerHTML = "Phone 1 ID should be unique";      
            
        error_phone1.hidden = false;
        phone1Input.style.border = "2px solid red"; 
    }
}

phone2Input.addEventListener("change",check_phone2Input)
function check_phone2Input(){
    error_add.hidden = true;

    const error_phone2 = document.querySelector('#error_phone2');

    if( (phone2Input.value == "") || (phone2Input.value == phone1Input.value) || (phone2Input.value == phone3Input.value) )
        phone2Input_ok = false;
    else
        phone2Input_ok = true;    

    if(phone2Input_ok)
    {
        phone2Input.style.border = "1px solid #ccc";
        error_phone2.hidden = true;
    }
    else
    {
        if(phone2Input.value == "")
            error_phone2.innerHTML = "Phone 2 ID cannot be empty";
        else
            error_phone2.innerHTML = "Phone 2 ID should be unique";
        error_phone2.hidden = false;
        phone2Input.style.border = "2px solid red"; 
    }
}

phone3Input.addEventListener("change",check_phone3Input)
function check_phone3Input(){
    error_add.hidden = true;

    const error_phone3 = document.querySelector('#error_phone3');

    if( (phone3Input.value == "") || (phone3Input.value == phone1Input.value) || (phone3Input.value == phone2Input.value) )
        phone3Input_ok = false;
    else
        phone3Input_ok = true;    

    if(phone3Input_ok)
    {
        phone3Input.style.border = "1px solid #ccc";
        error_phone3.hidden = true;
    }
    else
    {
        if(phone3Input.value == "")
            error_phone3.innerHTML = "Phone 3 ID cannot be empty";
        else
            error_phone3.innerHTML = "Phone 3 ID should be unique";
        error_phone3.hidden = false;
        phone3Input.style.border = "2px solid red"; 
    }
}

const addBtn = document.querySelector('#add-data-btn');
addBtn.onclick = function(){

    check_noInput();
    check_addressInput();
    check_capacityInput();
    check_estInput();
    check_phone1Input();
    check_phone2Input();
    check_phone3Input();

    if(noInput_ok && addressInput_ok && capacityInput_ok && estInput_ok && phone1Input_ok && phone2Input_ok && phone3Input_ok)
    {
        fetch('http://localhost:'+portno+'/constraint/factory',{
            headers:{
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                phone1 : phone1Input.value,
                phone2 : phone2Input.value,
                phone3 : phone3Input.value,
            })
        })
        .then(response => response.json())
        .then(data => checkconstraint(data['data']));
    }
}

updateAddressInput.addEventListener("change",check_addressUpdate)
function check_addressUpdate(){
    const error_address_update = document.querySelector('#error_address_update');

    if(updateAddressInput.value == "")
        updateAddressInput_ok = false;
    else
        updateAddressInput_ok = true;    

    if(updateAddressInput_ok)
    {
        updateAddressInput.style.border = "1px solid #ccc";
        error_address_update.hidden = true;
    }
    else
    {
        error_address_update.innerHTML = "Address cannot be empty";
        error_address_update.hidden = false;
        updateAddressInput.style.border = "2px solid red"; 
    }
}

updateCapacityInput.addEventListener("change",check_capacityUpdate)
function check_capacityUpdate(){
    const error_capacity_update = document.querySelector('#error_capacity_update');

    if( (updateCapacityInput.value == "") || updateCapacityInput.value <= 100000 )
        updateCapacityInput_ok = false;
    else
        updateCapacityInput_ok = true;    

    if(updateCapacityInput_ok)
    {
        updateCapacityInput.style.border = "1px solid #ccc";
        error_capacity_update.hidden = true;
    }
    else
    {
        if(updateCapacityInput.value == "")
            error_capacity_update.innerHTML = "Capacity cannot be empty";
        else
            error_capacity_update.innerHTML = "Capacity should be > 100000";
        error_capacity_update.hidden = false;
        updateCapacityInput.style.border = "2px solid red"; 
    }
}

const updateBtn = document.querySelector('#update-row-btn');
updateBtn.onclick = function(){   
    //console.log(updateEstInput.value);

    check_addressUpdate();
    check_capacityUpdate();

    if(updateAddressInput_ok && updateCapacityInput_ok)
    {
        fetch('http://localhost:'+portno+'/update/factory',{
            headers:{
                'Content-type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify({
                fact_no : updateAddressInput.dataset.id,
                address : updateAddressInput.value,
                capacity: updateCapacityInput.value,
                est: updateEstInput.value
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
sort.addEventListener('change',search_sort);
capacitymin.addEventListener('change',search_sort);
capacitymax.addEventListener('change',search_sort);
estmin.addEventListener('change',search_sort);
estmax.addEventListener('change',search_sort);

document.querySelector('#clear').addEventListener('click',function(){
    searchinput.value = "";
    sort.value = null;
    capacitymin.value = "";
    capacitymax.value = "";
    estmin.value = "";
    estmax.value = "";
    search_sort();
})

document.querySelector('#addbtn_popup').onclick = function(){
    document.getElementById('add_popup').style.display = "block";
}

document.querySelector('#add_closeimg').addEventListener('click',add_popup_hide);
function add_popup_hide(){
    document.getElementById('add_popup').style.display = "none";

    noInput.value = "";
    addressInput.value = "";
    capacityInput.value = "";
    estInput.value = "";
    phone1Input.value = "";
    phone2Input.value = "";
    phone3Input.value = "";

    noInput.style.border = "1px solid #ccc";
    addressInput.style.border = "1px solid #ccc";
    capacityInput.style.border = "1px solid #ccc";
    estInput.style.border = "1px solid #ccc";
    phone1Input.style.border = "1px solid #ccc";
    phone2Input.style.border = "1px solid #ccc";
    phone3Input.style.border = "1px solid #ccc";

    document.querySelector('#error_fact_no').hidden = true;
    document.querySelector('#error_address').hidden = true;
    document.querySelector('#error_capacity').hidden = true;
    document.querySelector('#error_est').hidden = true;
    document.querySelector('#error_phone1').hidden = true;
    document.querySelector('#error_phone2').hidden = true;
    document.querySelector('#error_phone3').hidden = true;

    error_add.hidden = true;
}

document.querySelector('#edit_closeimg').onclick = function(){
    document.getElementById('edit_popup').style.display = "none";
   
    updateAddressInput.style.border = "1px solid #ccc";
    updateCapacityInput.style.border = "1px solid #ccc";

    document.querySelector('#error_address_update').hidden = true;
    document.querySelector('#error_capacity_update').hidden = true;
}


function checkconstraint(data_phones){
   
    if(data_phones.length == 3)
    {
        fetch('http://localhost:'+portno+'/insert/factory',{
            headers:{
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                fact_no : noInput.value,
                address : addressInput.value,
                capacity : capacityInput.value,
                est : estInput.value
            })
        })
        .then(response => response.json())
        .then(data => insertRowIntoTable(data['data']));

        fetch('http://localhost:'+portno+'/insert/production',{
            headers:{
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                fno : noInput.value,
                pid : phone1Input.value
            })
        })
        fetch('http://localhost:'+portno+'/insert/production',{
            headers:{
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                fno : noInput.value,
                pid : phone2Input.value
            })
        })
        fetch('http://localhost:'+portno+'/insert/production',{
            headers:{
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                fno : noInput.value,
                pid : phone3Input.value
            })
        })
    }
    else
    {
        error_add.innerHTML = "ERROR :  Phones with these IDs do not exist"; 
        error_add.hidden = false;

        var phone1_present=false,phone2_present=false,phone3_present=false;

        data_phones.forEach(({phone_id})=>{ 
            if(phone1Input.value == phone_id)    
                phone1_present = true;
            else if(phone2Input.value == phone_id)    
                phone2_present = true;
            else if(phone3Input.value == phone_id)    
                phone3_present = true;    
        });

        if(!phone1_present)    
                phone1Input.style.border = "2px solid red";
        if(!phone2_present)    
                phone2Input.style.border = "2px solid red";
        if(!phone3_present)    
                phone3Input.style.border = "2px solid red"; 
    }
}

function insertRowIntoTable(data){
    const table = document.querySelector('table tbody');
    if (table.innerHTML === `<tr><td class="no-data" colspan="5">No data</td></tr>`)
        table.innerHTML = "";    

    if(data == 'ER_DUP_ENTRY')
    {
        error_add.innerHTML = "ERROR : A record with this Factory No already exists"; 
        error_add.hidden = false;
    }
    else    
    {
        add_popup_hide();

        let newrow = table.insertRow(-1);
    
        let rowHtml = "<tr>";
        rowHtml += `<td>${data.fact_no}</td>`;
        rowHtml += `<td>${data.address}</td>`;
        rowHtml += `<td>${data.capacity}</td>`;
        rowHtml += `<td>${data.est}</td>`;
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

    data.forEach(({fact_no,address,capacity,est})=>{ 
        newrow = table.insertRow(-1);
        rowHtml = "<tr>";
        rowHtml += `<td>${fact_no}</td>`;
        rowHtml += `<td>${address}</td>`;
        rowHtml += `<td>${capacity}</td>`;
        rowHtml += `<td>${est}</td>`;
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
    selected_address = $(obj).find('td:nth-child(2)').text();
    selected_capacity = $(obj).find('td:nth-child(3)').text();
    selected_est = $(obj).find('td:nth-child(4)').text();

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
    fetch('http://localhost:'+portno+'/delete/factory/'+no,{
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
    document.querySelector('#update-address-input').dataset.id = no;

    updateAddressInput.value = selected_address;
    updateCapacityInput.value = selected_capacity;
    updateEstInput.value = selected_est;

    document.getElementById('edit_popup').style.display = "block";
}

function search_sort()
{
    fetch('http://localhost:'+portno+'/search_sort/factory',{
        headers:{
                'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
                address : searchinput.value,
                sort_keyword : sort.value,
                capacity_min : capacitymin.value,
                capacity_max : capacitymax.value,
                est_min : estmin.value,
                est_max : estmax.value 
        })
    })  
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}
add.onclick= function(){
    pcontent="";
    pcontent=`<p>${desc.value}:</p>`+document.getElementById('the-table').innerHTML+"<br><br>";
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

