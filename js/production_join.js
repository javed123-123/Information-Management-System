const portno = 5000;

const join_table = document.querySelector('#join_table');
const noInput = document.querySelector('#search_no');
const error_no = document.querySelector('#error_no');
const add=document.querySelector('#add');
const printer=document.querySelector('#print');
const flush=document.querySelector('#flush');
const desc=document.querySelector('#description');
var noInput_ok;


document.addEventListener("DOMContentLoaded", function() 
{
    fetch('http://localhost:'+portno+'/getAll/production') // link = http://localhost:5000/getAll/production
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data'],2,"production"));
});

function loadHTMLTable(data,table_no,table_name){
   
    if(table_name == "phone" && table_no == 2)
    {
        document.querySelector(`#table_${table_no}`).hidden = false;
        document.querySelector(`#table_${table_no} thead`).innerHTML =  `<th>phone-id</th><th>phone-name</th><th>launch-date</th><th>cost</th><th>processor</th><th>battery</th><th>rear-cam</th><th>front-cam</th>`

        const table = document.querySelector(`#table_${table_no} tbody`);

        if(data.length == 0)
        {
            table.innerHTML = "<tr><td class='no-data' colspan=8>No data</td></tr>";
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
        });
    }

    else if(table_name == "factory" && table_no==2)
    {
        document.querySelector(`#table_${table_no}`).hidden = false;
        document.querySelector(`#table_${table_no} thead`).innerHTML =  `<th>Fact No</th><th>Address</th><th>Capacity</th><th>Establishement date</th>`;

        const table = document.querySelector(`#table_${table_no} tbody`);
               
        if(data.length == 0)
        {
            table.innerHTML = "<tr><td class='no-data' colspan=4>No data</td></tr>";
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
        });
    }

    else if(table_name == "factory" && table_no == 1)
    {
        document.querySelector('#factory_card').hidden = false;

        const card = document.querySelectorAll('#factory_card p');

        if(data.length == 0)
        {
            card[0].innerHTML = ``;
            card[1].innerHTML = ``;
            card[2].innerHTML = ``;
            card[3].innerHTML = ``;
            return;
        }

        data.forEach(({fact_no,address,capacity,est})=>{ 
            card[0].innerHTML = `${fact_no}`;
            card[1].innerHTML = `${address}`;
            card[2].innerHTML = `${capacity}`;
            card[3].innerHTML = `${est}`;
        }); 
    }

    else if(table_name == "phone" && table_no == 1)
    {
        document.querySelector('#phone_card').hidden = false;

        const card = document.querySelectorAll('#phone_card p');

        if(data.length == 0)
        {
            card[0].innerHTML = ``;
            card[1].innerHTML = ``;
            card[2].innerHTML = ``;
            card[3  ].innerHTML = ``;
            card[4].innerHTML = ``;
            card[5].innerHTML = ``;
            card[6].innerHTML = ``;
            card[7].innerHTML = ``;
            return;
        }

        data.forEach(({phone_id,pname,launch,cost,proc,battery,rear_cam,front_cam})=>{ 
            card[0].innerHTML = `${phone_id}`;
            card[1].innerHTML = `${pname}`;
            card[2].innerHTML = `${launch}`;
            card[3].innerHTML = `${cost}`;
            card[4].innerHTML = `${proc}`;
            card[5].innerHTML = `${battery}`;
            card[6].innerHTML = `${rear_cam}`;
            card[7].innerHTML = `${front_cam}`;
        });  
    }

    else if (table_name == "production")
    {
        document.querySelector(`#table_${table_no}`).hidden = false;
        document.querySelector(`#table_${table_no} thead`).innerHTML =  `<th>Factory No</th><th>Phone ID</th>`;

        const table = document.querySelector(`#table_${table_no} tbody`);
               
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

}

join_table.addEventListener('change',function(){
    if(join_table.value == "")
        document.getElementById('search_input').hidden = true;
    else 
    {
        noInput.value = 0;
        if(join_table.value == "fno")
            noInput.placeholder = "Enter Factory No";
        else
            noInput.placeholder = "Enter Model No"; 

        document.getElementById('search_input').hidden = false;
    }     
})

join_table.addEventListener('change',search_sort);
noInput.addEventListener('change',search_sort);

function search_sort(){

    noInput_check();  

    document.querySelector('#factory_card').hidden = true;
    document.querySelector('#phone_card').hidden = true;
    document.querySelector('#table_2').hidden = true;
    
    if(noInput_ok)
    {
        if(join_table.value == "fno")
        {
            fetch('http://localhost:'+portno+'/get/factory',{
                headers:{
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    noInput : noInput.value,
                })
            })  
            .then(response => response.json())
            .then(data => loadHTMLTable(data['data'],1,"factory"));

            fetch('http://localhost:'+portno+'/search_sort/production_join',{
                headers:{
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    join_table: join_table.value,
                    noInput : noInput.value,
                })
            })  
            .then(response => response.json())
            .then(data => loadHTMLTable(data['data'],2,"phone"));
        }
        else if(join_table.value == "pid")
        {
            fetch('http://localhost:'+portno+'/get/phone',{
                headers:{
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    noInput : noInput.value,
                })
            })  
            .then(response => response.json())
            .then(data => loadHTMLTable(data['data'],1,"phone"));

            fetch('http://localhost:'+portno+'/search_sort/production_join',{
                headers:{
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    join_table: join_table.value,
                    noInput : noInput.value,
                })
            })  
            .then(response => response.json())
            .then(data => loadHTMLTable(data['data'],2,"factory"));
        }
        else
        {
            fetch('http://localhost:'+portno+'/getAll/production') 
            .then(response => response.json())
            .then(data => loadHTMLTable(data['data'],2,"production"));

        }
    }
}

// noInput.addEventListener("change",noInput_check)
function noInput_check()
{
    if(join_table.value != "" && noInput.value == "")
        noInput_ok = false;
    else    
        noInput_ok = true;    

    if(noInput_ok)
    {
        noInput.style.border = "1px solid #ccc";
        error_no.hidden = true;
    }
    else
    {
        if(join_table.value == "fno")
            error_no.innerHTML = "Factory No cannot be empty";
        else
            error_no.innerHTML = "Model No cannot be empty";
        error_no.hidden = false;
        noInput.style.border = "2px solid red"; 
    }
}
add.onclick= function(){
    pcontent="";
    if(join_table.value=="null")
        pcontent=`<p>${desc.value}:</p>`+document.getElementById('actual-tabl').innerHTML+'<br><br>';
    else if(join_table.value=="fno")    
        pcontent=`<p>${desc.value}:</p>`+document.getElementById('factory_print').innerHTML+'<br><br>'+document.getElementById('actual-tabl').innerHTML+'<br><br>';
    else if(join_table.value=="pid")    
        pcontent=`<p>${desc.value}:</p>`+document.getElementById('phone_print').innerHTML+'<br><br>'+document.getElementById('actual-tabl').innerHTML+'<br><br>';
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

