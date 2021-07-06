const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors'); // HTTP-header based mechanism that allows a server to indicate any other origins (domain, scheme, or port) than its own from which a browser should permit loading of resources
const dotenv = require('dotenv'); // loads environment variables from a .env file into process.env
const path = require('path');
//const authController=require('../js/auth');
//app.post('/auth/login',authController.login);
//const public_directory = path.join(__dirname,'client');
//app.use(express.static(public_directory))

const dbService_phone = require('./dbService_phone');
const dbService_paystruct = require('./dbService_paystruct');
const dbService_factory = require('./dbService_factory');
const dbService_employee = require('./dbService_employee');
const dbService_production = require('./dbService_production');
const dbService_employee_join = require('./dbService_employee_join');
const dbService_production_join = require('./dbService_production_join');

//const http = require('http');
//const server = http.createServer(app);
//server.listen(5000);
//const { appendFileSync } = require('node:fs');


dotenv.config();
app.use(cors());    
app.use(express.json()); 
app.use(express.urlencoded({extended:false}));

//app.set('view engine','html');
//app.set("view engine", "hbs");
//app.set("views", path.join(__dirname,'./html'));
//app.set('views',path.join(__dirname,'./css_js'));

// const publicDirectory=path.join(__dirname,'./Demo8');
// app.use(express.static(publicDirectory));

// app.get('/employee',(request,response)=>{
//     //response.sendFile(path.join(__dirname+'/employee.html'));
//     response.render("employee");
// });
// app.get('/',(request,response)=>{
//     response.render('home');
// });
// app.get('/factory',(request,response)=>{
//     response.render('factory');
// });
// app.get('/paystruct',(request,response)=>{
//     response.render('paystruct');
// });
// app.get('/phone',(request,response)=>{
//     response.render('phone');
// });
// app.get('/login',(request,response)=>{
//     response.render('login');
// });
// app.get('/production',(request,response)=>{
//     response.render('production');
// });
// app.get('/production-join',(request,response)=>{
//     response.render('production-join');
// });
// app.get('/employee-join',(request,response)=>{
//     response.render('employee-join');
// });


//create Database
app.get('/createdb',(request,response)=>{
    const db = dbService_phone.getInstance();

    const status = db.createDb();    
    status
    .then(result => {
        if(result)
            response.send("Database is created");
        else 
            response.send("Database is not created.Check terminal for error");
    });
     
});

//create table
app.get('/createtable/:table_name',(request,response)=>{
    const {table_name} = request.params;

    let db;
    if(table_name === "paystruct")
        db = dbService_paystruct.getInstance();
    else if(table_name === "employee")
        db = dbService_employee.getInstance(); 
    else if(table_name === "factory")
        db = dbService_factory.getInstance();     
    else if(table_name === "phone")
        db = dbService_phone.getInstance();
    else if(table_name === "production")
        db = dbService_production.getInstance();

    const status = db.createTable();    
    status
    .then(result => {
        if(result)
            response.send("Table is created");
        else 
            response.send("Table is not created.Check terminal for error");
    });
});


//insert
app.post('/insert/:table_name',(request,response)=>{
    const {table_name} = request.params;

    let db,result;
    if(table_name === "paystruct")
    {
        const {level_no,level_name,sal} = request.body;
        db = dbService_paystruct.getInstance();
        result = db.insertNewData(level_no,level_name,sal);
    }    
    else if(table_name === "employee")
    {
        const {eid,ename,join_date,lno,fno} = request.body;
        db = dbService_employee.getInstance();
        result = db.insertNewData(eid,ename,join_date,lno,fno);
    }
    else if(table_name === "factory")
    {
        const {fact_no,address,capacity,est} = request.body;
        db = dbService_factory.getInstance();
        result = db.insertNewData(fact_no,address,capacity,est);
    }
    else if(table_name === "production")
    {
        const {fno,pid} = request.body;
        db = dbService_production.getInstance();
        result = db.insertNewData(fno,pid);
    }
    else if(table_name==='phone'){
        const{phone_id,pname,launch,cost,proc,battery,rear_cam,front_cam}=request.body;
        db=dbService_phone.getInstance();
        result=db.insertNewPhone(phone_id,pname,launch,cost,proc,battery,rear_cam,front_cam);
    }

    result
    .then(data => response.json({data:data}))
    .catch(err => console.log("Errorapp"));
});

// app.post('/insert/phone',(request,response)=>{
//     const{phone_id,pname,launch,cost,proc,battery,rear_cam,front_cam}=request.body;
//     let db=dbService_phone.getInstance();
//     const result=db.insertNewPhone(phone_id,pname,launch,cost,proc,battery,rear_cam,front_cam);
//     result
//     .then(data=>response.json({data:data}))
//     .catch(err=>console.log(err));
// });

app.post('/constraint/:table_name',(request,response)=>{
    const {table_name} = request.params;

    if(table_name == "factory")
    {
        const {phone1,phone2,phone3} = request.body;
        db = dbService_factory.getInstance();
        result = db.constraint(phone1,phone2,phone3);
    }
    else if(table_name == "production")
    {
        const {fno} = request.body;
        db = dbService_production.getInstance();
        result = db.constraint(fno);
    }
      
    result
    .then(data => response.json({data:data}))
    .catch(err => console.log("Errorapp"));
});


//read
app.get('/getAll/:table_name',(request,response)=>{
    const {table_name} = request.params;
    
    let db;
    if(table_name === "paystruct")
        db = dbService_paystruct.getInstance();
    else if(table_name === "employee")
        db = dbService_employee.getInstance();
    else if(table_name === "factory")
        db = dbService_factory.getInstance();
    else if(table_name === "production")
        db = dbService_production.getInstance();    


    const result = db.getAllData();
    result
    .then(data => response.json({data:data}))
    .catch(err => console.log(err));
});

//delete
app.delete('/delete/:table_name/:no',(request,response)=>{
    const {table_name,no} = request.params;

    let db;
    if(table_name === "paystruct")
        db = dbService_paystruct.getInstance();
    else if(table_name === "employee")
        db = dbService_employee.getInstance();
    else if(table_name === "factory")
        db = dbService_factory.getInstance(); 


    const result = db.deleteRow(no);    
    result
    .then(data => response.json({success:data}))
    .catch(err => console.log("Error"));
})

app.delete('/deletePhone/:id',(request,response)=>{
    const{id}=request.params;
    let db=dbService_phone.getInstance();
    const result=db.deletePhoneById(id);
    result
    .then(data=>response.json({success:data}))
    .catch(err=>console.log(err));
});

//delete
app.delete('/deleteproduction',(request,response)=>{

    let db = dbService_production.getInstance(); 
    const {fno,pid} = request.body;
           
    const result = db.deleteRow(fno,pid);    
    result
    .then(data => response.json({success:data}))
    .catch(err => console.log("Error"));
})

//update
app.patch('/update/:table_name',(request,response)=>{
    const {table_name} = request.params;

    let db,result;
    if(table_name === "paystruct")
    {
        const {level_no,level_name,sal} = request.body;
        db = dbService_paystruct.getInstance();
        result = db.updateRow(level_no,level_name,sal);
    }    
    else if(table_name === "employee")
    {
        const {eid,ename,join_date,lno,fno} = request.body;
        db = dbService_employee.getInstance();
        result = db.updateRow(eid,ename,join_date,lno,fno);
    }
    else if(table_name === "factory")
    {
        const {fact_no,address,capacity,est} = request.body;
        db = dbService_factory.getInstance();
        result = db.updateRow(fact_no,address,capacity,est);
    }
    else if(table_name==="phone"){
        const {phone_id_e,pname_e,launch_e,cost_e,proc_e,battery_e,rear_cam_e,front_cam_e}=request.body;
        db=dbService_phone.getInstance();
        result=db.updatePhoneById(phone_id_e,pname_e,launch_e,cost_e,proc_e,battery_e,rear_cam_e,front_cam_e);

    }

    result
    .then(data => response.json({success:data}))
    .catch(err => console.log("Error"));
});

//search & sort
app.post('/search_sort/:table_name',(request,response)=>{
    const{table_name} = request.params;

    let db,result;
    if(table_name === "paystruct")
    {
        const {name,sort_keyword,sal_min,sal_max} = request.body;
        db = dbService_paystruct.getInstance(); 
        result = db.search_sort(name,sort_keyword,sal_min,sal_max);
    } 
    else if(table_name === "factory")
    {
        const {address,sort_keyword,capacity_min,capacity_max,est_min,est_max} = request.body;
        db = dbService_factory.getInstance(); 
        result = db.search_sort(address,sort_keyword,capacity_min,capacity_max,est_min,est_max);
    } 
    else if(table_name === "employee")
    {
        const {name,sort_keyword,join_date_min,join_date_max} = request.body;
        db = dbService_employee.getInstance(); 
        result = db.search_sort(name,sort_keyword,join_date_min,join_date_max);
    } 
    else if(table_name == "production")
    {
        const {sort_keyword} = request.body;
        db = dbService_production.getInstance(); 
        result = db.search_sort(sort_keyword);
    }   
    else if(table_name == "employee_join")
    {
        const {join_table,noInput} = request.body;
        db = dbService_employee_join.getInstance(); 
        result = db.search_sort(join_table,noInput);
    }
    else if(table_name == "production_join")
    {
        const {join_table,noInput} = request.body;
        db = dbService_production_join.getInstance(); 
        result = db.search_sort(join_table,noInput);
    }
    else if(table_name=="phones"){
        const {minCost,maxCost,rearCam,frontCam,minBat,maxBat,modelName,proc,launch,sort} = request.body;
        db=dbService_phone.getInstance(); 
        result = db.search_sort(modelName,minCost,maxCost,rearCam,frontCam,minBat,maxBat,proc,launch,sort);
    }
    

    result
    .then(data => response.json({data:data}))
    .catch(err => console.log(err));
});

// for join - get
app.post('/get/:table_name',(request,response)=>{
    const {table_name} = request.params;
    const {noInput} = request.body;

    let db;
    if(table_name === "paystruct")
        db = dbService_paystruct.getInstance();
    else if(table_name === "factory")
        db = dbService_factory.getInstance();  
    else if(table_name === "phone")
        db = dbService_phone.getInstance();          

    const result = db.getData(noInput);
    result
    .then(data => response.json({data:data}))
    .catch(err => console.log(err));
});

app.post('/Enroute',(request,response)=>{
    const{table_name}=request.body;
    let db=dbService_employee_join.getInstance();
    const result=db.Enroute(table_name);
    result
    .then(data=>response.json({data:data}))
    .catch(err=>console.log(err));
});

app.post('/getGraph',(request,response)=>{
    const{table_name,noInput}=request.body;
    let db=dbService_employee_join.getInstance();
    const result=db.getGraph(table_name,noInput);
    result
    .then(data=>response.json({data:data}))
    .catch(err=>console.log(err));
});

app.post('/others',(request,response)=>{
    const{noInput}=request.body;
    let db=dbService_employee_join.getInstance();
    const result=db.others(noInput);
    result
    .then(data=>response.json({data:data}))
    .catch(err=>console.log(err));
});

app.get('/getAllPhones',(request,response)=>{
    let db=dbService_phone.getInstance();
    const result=db.getAllPhones();
    result
    .then(data=>response.json({data:data}))
    .catch(err=>console.log(err));
});
app.post('/searchUser',(request,response)=>{
    const{username}=request.body;
    let db=dbService_phone.getInstance();
    const result=db.searchUser(username);
    result
    .then(data=>response.json({data:data}))
    .catch(err=>console.log(err));
})

class Tables{
    static  printMaterial="";
}
app.post('/addPrint',(request,response)=>{
    const {pcontent} = request.body;
    Tables.printMaterial+=pcontent;
});
app.get('/print',(request,response)=>{
    return response.json({data:Tables.printMaterial});
});
app.get('/flush',()=>{
    Tables.printMaterial="";
});


app.listen(process.env.PORT,()=>console.log('app is running'));

