//const mysql=require('mysql');
//const jwt=require('jsonwebtoken');
//const bcrypt=require('bcryptjs');
const userName=document.querySelector('#userName');
const passWord=document.querySelector('#passWord');
const what=document.querySelector('#what');
const message=document.querySelector('#message');
const submit=document.querySelector('#submit');

// const db=mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'',
//     database:'demo_db',
//     port:'3306'
// });

document.addEventListener("DOMContentLoaded", function() 
{
    message.hidden=true;
    userName.value="";
    passWord.value="";
});

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

submit.onclick=function(){
    message.hidden=true;
    // console.log("Hello");
    // sleep(2000*1000000).then(() => { console.log("World!"); });
    if(userName.value==""){
        what.innerHTML='please provide an username!';
        message.hidden=false;
    }
    else if(passWord.value==""){
        what.innerHTML='password field cannot be empty!';
        message.hidden=false;
    }
    else{
        fetch('http://localhost:5000/searchUser',{
            headers:{
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                username:userName.value
            })
        })
        .then(response => response.json())
        .then(data => Authentication(data['data']));
    }
}

function Authentication(data){
        if(data.length==0 || !(data[0].password==passWord.value)){
            what.innerHTML='username or the password is incorrect';
            message.hidden=false;
        }
        else{
            window.location.href = "../html/employee.html";
        }
}

