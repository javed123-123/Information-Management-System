const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

let instance = null;

//create MySQL connection
const con = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    dateStrings:true,
    database: process.env.database 
})

//connect to MySQL
con.connect(err=>{
if(err)
    throw err;
console.log('MySQL-employee-' + con.state);
}) 


class dbService_employee{
    static getInstance(){
        return instance ? instance: new dbService_employee();
    }

    async createDb(){
        try{
            const response = await new Promise((resolve,reject)=>{
                const query = 'CREATE DATABASE demo_db';
                con.query(query,(err,results)=>{
                    if(err)
                       reject(new Error(err.message));
                    resolve(results);    
                })
            });
            return true;
        }
        catch(error){
            console.log(error);
            return false;
        }
    }

    async createTable(){
        try{
            const response = await new Promise((resolve,reject)=>{
                const query = 'CREATE TABLE employee(eid INT ,ename varchar(255),join_date DATE,lno INT,fno INT,PRIMARY KEY(eid),CONSTRAINT FK_LNO FOREIGN KEY(lno) references PAYSTRUCT(level_no) ON DELETE SET NULL,CONSTRAINT FK_FNO FOREIGN KEY(fno) references FACTORY(fact_no) ON DELETE SET NULL)';
                con.query(query,(err,results)=>{
                    if(err)
                       reject(new Error(err.message));  
                    resolve(results);    
                })
            });
            return true;
        }
        catch(error){
            console.log(error);
            return false;
        }
    }

    async getAllData(){
        try{
            const response = await new Promise((resolve,reject)=>{
                const query = "SELECT * from employee";
                con.query(query,(err,results)=>{
                    if(err)
                       reject(new Error(err.message));
                    resolve(results);    
                })
            });
            return response;
        }
        catch(error){
            console.log(error);
        }
    }

    async insertNewData(eid,ename,join_date,lno,fno){
        try{
            const response = await new Promise((resolve,reject)=>{
                const query = "INSERT into employee values(?,?,?,?,?)";
                con.query(query,[eid,ename,join_date,lno,fno],(err,result)=>{
                    if(err)
                       reject(err);
                    resolve(result);    
                })
            });
            //console.log(response);
            return{
                eid : eid,
                ename : ename,
                join_date: join_date,
                lno: lno,
                fno: fno
            };
        }
        catch(error){
            console.log("Error dbService_employee = "+error.message);
            return error.message;
        }
    } 

    async deleteRow(eid){
        try{
            //id = parseInt(id,10);
            const response = await new Promise((resolve,reject)=>{
                const query = "DELETE from employee WHERE eid = ?";
                con.query(query,eid,(err,result)=>{
                    if(err)
                       reject(new Error(err.message));
                    resolve(result.affectedRows);    
                })
            });
            return response === 1 ? true : false;
        }
        catch(error){
            console.log(error);
            return false;
        }
    } 

    async updateRow(eid,ename,join_date,lno,fno){
        try{
            //id = parseInt(id,10);
            const response = await new Promise((resolve,reject)=>{
                const query = "UPDATE employee SET ename = ?,join_date=?,lno=?,fno=? WHERE eid = ?";
                con.query(query,[ename,join_date,lno,fno,eid],(err,result)=>{
                    if(err)
                       reject(err);  
                    else
                       resolve(result.affectedRows);    
                })
            });
            return response === 1 ? true : false;
        }
        catch(error){
            console.log(error.message);
            return error.message;
        }
    }

    async search_sort(name,sort_keyword,join_date_min,join_date_max){ 
        const name_search = ("%" + name + "%");

        if(join_date_min == "")
            join_date_min = "0001-01-01";       
        
        try{
            const response = await new Promise((resolve,reject)=>{
                if(join_date_max == "")
                {
                    const query = "SELECT * from employee WHERE join_date >=? and ename LIKE ? ORDER by "+sort_keyword ; 
                    con.query(query,[join_date_min,name_search],(err,results)=>{
                        if(err)
                            reject(new Error(err.message)); 
                        resolve(results);    
                    })
                }
                else
                {
                    const query = "SELECT * from employee WHERE join_date >=? and join_date <=? and ename LIKE ? ORDER by "+sort_keyword ;
                    con.query(query,[join_date_min,join_date_max,name_search],(err,results)=>{
                        if(err)
                            reject(new Error(err.message)); 
                        resolve(results);    
                    })
                }
            });
            return response;    
        }
        catch(error){   
            console.log(error);
        }
    }
}

module.exports = dbService_employee;