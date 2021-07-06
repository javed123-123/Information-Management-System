document.addEventListener('DOMContentLoaded',function(){
    fetch('http://localhost:5000/getAllPhones')
    .then(response=>response.json())
    .then(data=>loadHTMLTable(data['data']));
});
var n;
const searchBtn=document.querySelector('#button_addon2');
searchBtn.onclick= function(){
    const modelName=document.querySelector('#modelName').value;
    const minCost=document.querySelector('#minCost').value;
    const maxCost=document.querySelector('#maxCost').value;
    const rearCam=document.querySelector('#rearCam').value;
    const frontCam=document.querySelector('#frontCam').value;
    const minBat=document.querySelector('#minBat').value;
    const maxBat=document.querySelector('#maxBat').value;
    const processor=document.querySelector('#processorm');
    const launchdate=document.querySelector('#launchdatem');
    const sort=document.querySelector('#sort');
    console.log(maxBat);
    console.log(modelName);

    fetch('http://localhost:5000/search_sort/phones',{
        headers:{
                'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
                modelName : modelName,
                minCost : minCost,
                maxCost : maxCost,
                rearCam : rearCam,
                frontCam : frontCam,
                minBat : minBat,
                maxBat : maxBat,
                proc:processor.value,
                launch:launchdate.value,
                sort:sort.value
        })
    })  
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));

    /*fetch('http://localhost:5000/Models/'+searchValue)
    .then(response=>response.json())
    .then(data=>loadHTMLTable(data['data']));*/
}

function loadHTMLTable(data) {
    const table = document.querySelector('#cards');

    if(data.length==0){
        table.innerHTML = "<p> no data</p>";
        return;
    }
    let tableHtml = "";
    data.forEach(function ({phone_id, pname, launch,cost,proc,battery,rear_cam,front_cam}) {
        // tableHtml+=`<div class="col-3">`;
        // tableHtml+=`<div class="card">`;
        // tableHtml+=`<img src="../imgs/vi19.jpg" class="card-img-top" alt="VIVO19">`;
        // tableHtml+=`<div class="card-body">`;
        // tableHtml+=`<h5 class="card-title">${pname}</h5>`;
        // tableHtml+=`<p class="card-text">Starting from ₹${cost}, launch on ${new Date(launch).toLocaleString()}</p><hr></hr>`;
        // tableHtml+='<ul class="space-out"';
        // tableHtml+=`<li><img class="icon1" src="../imgs/processor.jpg"> <span>${proc}</span></li><br>`;
        // tableHtml+='</ul>';
        // tableHtml+='<ul class="space-out"';
        // tableHtml+=`<li><img class="icon2" src="../imgs/battery.jpg"> <span>${battery}MHZ</span></li><br>`;
        // tableHtml+='</ul>';
        // tableHtml+='<ul class="space-out"';
        // tableHtml+=`<li><img class="icon3" src="../imgs/camera.png"> <span>${rear_cam}mp</span></li><br>`;
        // tableHtml+='</ul>';
        // tableHtml+='<ul class="space-out"';
        // tableHtml+=`<li><img class="icon4" src="../imgs/camera.png"> <span>${front_cam}mp</span></li><br>`;
        // tableHtml+='</ul>';
        // tableHtml+=`</div>`;
        // /*tableHtml+=`<div class="card-footer">`;
        // tableHtml+=`<small class="text-muted">Last updated 3 mins ago</small>`;
        // tableHtml+=`</div>`;*/
        // tableHtml+=`</div>`;
        // tableHtml+=`</div>`;
    n=phone_id%10;
    tableHtml+=`<div class="col-3 p-1">`;
    tableHtml+=`<div class="card">`;
    tableHtml+=`<img src="../imgs/samsung_${n}.jpg" class="card-img-top" alt="VIVO19">`;
    tableHtml+=`<div class="card-body">`;
    tableHtml+=`<h4 class="card-title">${pname}</h4>`;
    tableHtml+=`<p class="card-text">Starting from ₹${cost}, launched on ${launch}</p><hr><br>`;
    tableHtml+='<ul class="space-out"';
    tableHtml+=`<li><img class="icon1" src="../imgs/processor.jpg"><span>${proc}</span></li><br>`;
    tableHtml+='</ul>';
    tableHtml+='<ul class="space-out"';
    tableHtml+=`<li><img class="icon2" src="../imgs/battery.jpg"><span>${battery} MHZ</span></li><br>`;
    tableHtml+='</ul>';
    tableHtml+='<ul class="space-out"';
    tableHtml+=`<li><img class="icon3" src="../imgs/camera.png"><span>${rear_cam} MP / ${front_cam} MP</span></li><br>`;
    tableHtml+='</ul>';
    // tableHtml+='<ul class="space-out"';
    // tableHtml+=`<li><img class="icon4" src="../imgs/camera.png"><span>${front_cam} MP</span></li><br>`;
    //tableHtml+='</ul>';
    tableHtml+=`</div>`;
    tableHtml+=`</div>`;
    tableHtml+=`</div>`;
    });

    table.innerHTML = tableHtml;
}