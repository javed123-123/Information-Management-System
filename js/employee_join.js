const portno = 5000;

const join_table = document.querySelector('#join_table');
const noInput = document.querySelector('#search_no');
const error_no = document.querySelector('#error_no');
const desc2=document.querySelector('#desc2');
const add2=document.querySelector('#add2');
const desc3=document.querySelector('#desc3');
const add3=document.querySelector('#add3');
const flush=document.querySelector('#flush');
const printer=document.querySelector('#print');
var pcontent,i,j,n;
var noInput_ok;


document.addEventListener("DOMContentLoaded", function() 
{
    fetch('http://localhost:'+portno+'/getAll/employee') // link = http://localhost:5000/getAll/employee
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data'],"employee"));
});

function loadHTMLTable(data,table_name){
   
    if(table_name == "employee")
    {
        const table = document.querySelector('#employee_table tbody');
        document.querySelector('#employee_table').hidden = false;    

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
        });
    }

    // if(table_name == "paystruct")
    // {
    //     const table = document.querySelector('#paystruct_table tbody');
    //     document.querySelector('#paystruct_table').hidden = false;  

    //     if(data.length == 0)
    //     {
    //         table.innerHTML = "<tr><td class='no-data' colspan=5>No data</td></tr>";
    //         return;
    //     }
    
    //     table.innerHTML = "";
    //     let newrow; 
    //     let rowHtml;

    //     data.forEach(({level_no,level_name,sal})=>{ 
    //         newrow = table.insertRow(-1);
    //         rowHtml = "<tr>";
    //         rowHtml += `<td>${level_no}</td>`;
    //         rowHtml += `<td>${level_name}</td>`;
    //         rowHtml += `<td>${sal}</td>`;
    //         rowHtml += "</tr>";
        
    //         newrow.innerHTML = rowHtml;
    //     });  
    // }

    // if(table_name == "factory")
    // {
    //     const table = document.querySelector('#factory_table tbody');
    //     document.querySelector('#factory_table').hidden = false;   
        
    //     if(data.length == 0)
    //     {
    //         table.innerHTML = "<tr><td class='no-data' colspan=5>No data</td></tr>";
    //         return;
    //     }
    
    //     table.innerHTML = "";
    //     let newrow; 
    //     let rowHtml;

    //     data.forEach(({fact_no,address,capacity,est})=>{ 
    //         newrow = table.insertRow(-1);
    //         rowHtml = "<tr>";
    //         rowHtml += `<td>${fact_no}</td>`;
    //         rowHtml += `<td>${address}</td>`;
    //         rowHtml += `<td>${capacity}</td>`;
    //         rowHtml += `<td>${est}</td>`;
    //         rowHtml += "</tr>";
    
    //         newrow.innerHTML = rowHtml;
    //     });
    // }

    if(table_name == "paystruct")
    {
        document.querySelector('#paystruct_card').hidden = false;

        const card = document.querySelectorAll('#paystruct_card p');

        if(data.length == 0)
        {
            card[0].innerHTML = ``;
            card[1].innerHTML = ``;
            card[2].innerHTML = ``;
            return;
        }

        data.forEach(({level_no,level_name,sal})=>{
            card[0].innerHTML = `${level_no}`;
            card[1].innerHTML = `${level_name}`;
            card[2].innerHTML = `${sal}`;
        });  
    }

    if(table_name == "factory")
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
            noInput.placeholder = "Enter Level No";  
            
        document.getElementById('search_input').hidden = false;            
    }     
})

join_table.addEventListener('change',search_sort);
noInput.addEventListener('change',search_sort);

function search_sort(){

    noInput_check();  

    document.querySelector('#employee_table').hidden = true;
    document.querySelector('#paystruct_card').hidden = true;
    document.querySelector('#factory_card').hidden = true;
    other.hidden=true;

    if(join_table.value == "fno")
        var table_name = "factory";
    else if(join_table.value == "lno")
        var table_name = "paystruct";
    else
        var table_name = "";     
    
    if(noInput_ok)
    {
        fetch('http://localhost:'+portno+'/search_sort/employee_join',{
            headers:{
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                join_table : join_table.value,
                noInput : noInput.value,
            })
        })  
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data'],"employee"));
 
        if(table_name != "")
        {
            fetch('http://localhost:'+portno+'/get/'+table_name,{
                headers:{
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    noInput : noInput.value,
                })
            })  
            .then(response => response.json())
            .then(data => loadHTMLTable(data['data'],table_name));
        }
        if(table_name=="factory" && noInput.value!=0){
            fetch('http://localhost:'+portno+'/others',{
                headers:{
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    noInput : noInput.value,
                })
            })  
            .then(response => response.json())
            .then(data => others(data['data']));
        }

        if(join_table.value!="" && noInput.value!=0){
            if(join_table.value=='fno'){
            fetch('http://localhost:'+portno+'/Enroute',{
                headers:{
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    table_name:join_table.value
                })
            })  
            .then(response => response.json())
            .then(data => Enroute(data['data'],"factoryNo."));
        }else{
            fetch('http://localhost:'+portno+'/Enroute',{
                headers:{
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    table_name:join_table.value
                })
            })  
            .then(response => response.json())
            .then(data => Enroute(data['data'],"levelNo."));
        }
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
            error_no.innerHTML = "Level No cannot be empty";
        error_no.hidden = false;
        noInput.style.border = "2px solid red"; 
    }
}

function others(data){
    if(data.length!=0){
        console.log(data);
        document.querySelector('#avg').innerHTML=data[0].avg;
        document.querySelector('#min').innerHTML=data[0].min;
        document.querySelector('#max').innerHTML=data[0].max;
        other.hidden=false;
    }
}
function Enroute(data,name){
    
    var data1=Array.from(Array(data.length), () => new Array(2));;
    if(name=="factoryNo."){
        for(i=0;i<data.length;i++){
            data1[i][0]=data[i].lno;
            data1[i][1]=0;
        }
        fetch('http://localhost:'+portno+'/getGraph',{
                headers:{
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    table_name:join_table.value,
                    noInput : noInput.value,
                })
            })  
            .then(response => response.json())
            .then(data => loadGraph(data['data'],"levelNo.",data1));
    }else{
        for(i=0;i<data.length;i++){
            data1[i][0]=data[i].fno;
            data1[i][1]=0;
        }
        fetch('http://localhost:'+portno+'/getGraph',{
                headers:{
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    table_name:join_table.value,
                    noInput : noInput.value,
                })
            })  
            .then(response => response.json())
            .then(data => loadGraph(data['data'],"factoryNo.",data1));
    }
}
function loadGraph(data,name1,data1){
    if(data.length!=0){
        if(name1=="levelNo."){
        for(i=0;i<data.length;i++){
            j=0;
            while(data1[j][0]!=data[i].lno)
            j++;
            data1[j][1]=data[i].pop;
        }
    }
    else{
        for(i=0;i<data.length;i++){
            j=0;
            while(data1[j][0]!=data[i].fno)
            j++;
            data1[j][1]=data[i].pop;
        }
    }
    container.innerHTML=null;
    var dat = {
        header: [name1, "population"],
        rows:[]
    };
    for(i=0;i<data1.length;i++)
    dat.rows[i]=[name1+" "+data1[i][0],data1[i][1]];
        var chart= anychart.bar();
        chart.data(dat);
        chart.title(name1+" and their census");
        chart.container("container");
        chart.draw();
        document.querySelector('#contain').hidden=false;
        n=dat.rows.length*60;
        container.style.height=`${n}px`;
        add3.hidden=false;
        desc3.hidden=false;
}
}
add3.onclick= function(){
    pcontent="";
    //document.getElementById('container').style.height=`${n}px`;
    if(join_table.value=="fno")
    pcontent=`<p>${desc3.value}:</p>`+document.getElementById('contain').innerHTML+other.innerHTML;
    else
    pcontent=`<p>${desc3.value}:</p>`+document.getElementById('contain').innerHTML;
    fetch('http://localhost:'+portno+'/addPrint',{
        headers:{
            'content-type':'application/json'
        },
        method:'POST',
        body:JSON.stringify({pcontent:pcontent})
    });
}
add2.onclick= function(){
    pcontent="";
    if(join_table.value=="")
        pcontent=`<p>${desc2.value}:</p>`+document.getElementById('actual-tabl').innerHTML+'<br><br>';
    else if(join_table.value=="fno")    
        pcontent=`<p>${desc2.value}:</p>`+document.getElementById('factory_print').innerHTML+'<br><br>'+document.getElementById('actual-tabl').innerHTML+'<br><br>';
    else if(join_table.value=="lno")    
        pcontent=`<p>${desc2.value}:</p>`+document.getElementById('paystruct_print').innerHTML+'<br><br>'+document.getElementById('actual-tabl').innerHTML+'<br><br>';
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



