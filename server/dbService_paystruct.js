const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

let instance = null;

//create MySQL connection
const con = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database 
})

//connect to MySQL
con.connect(err=>{
if(err)
    throw err;
console.log('MySQL-paystruct-' + con.state);
}) 


class dbService_paystruct{
    static getInstance(){
        return instance ? instance: new dbService_paystruct();
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
            console.log("Error");
            console.log(error);
            return false;
        }
    }

    async createTable(){
        try{
            const response = await new Promise((resolve,reject)=>{
                const query = 'CREATE TABLE paystruct(level_no INT,level_name varchar(255) NOT NULL,sal INT NOT NULL,PRIMARY KEY(level_no))';
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
                const query = "SELECT * from paystruct";
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

    async getData(noInput){
        try{
            const response = await new Promise((resolve,reject)=>{
                const query = "SELECT * from paystruct where level_no = ?";
                con.query(query,noInput,(err,results)=>{
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

    async insertNewData(level_no,level_name,sal){
        try{
            const response = await new Promise((resolve,reject)=>{
                const query = "INSERT into paystruct values(?,?,?)";
                con.query(query,[level_no,level_name,sal],(err,result)=>{
                    if(err)
                       reject(err);
                    resolve(result);    
                })
            });
            //console.log(response);
            return{
                level_no : level_no,
                level_name: level_name,
                sal: sal
            };
        }
        catch(error){
            console.log("Error dbService_paystruct = "+error.code);
            return error.code
        }
    } 

    async deleteRow(no){
        try{
            //id = parseInt(id,10);
            const response = await new Promise((resolve,reject)=>{
                const query = "DELETE from paystruct WHERE level_no = ?";
                con.query(query,no,(err,result)=>{
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

    async updateRow(no,name,sal){
        try{
            //id = parseInt(id,10);
            const response = await new Promise((resolve,reject)=>{
                const query = "UPDATE paystruct SET level_name = ?,sal=? WHERE level_no = ?";
                con.query(query,[name,sal,no],(err,result)=>{
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

    async search_sort(name,sort_keyword,sal_min,sal_max){ 
        const name_search = ("%" + name + "%");

        if(sal_min == "")
           sal_min = "0";

        try{
            const response = await new Promise((resolve,reject)=>{
                if(sal_max == "")
                {
                    const query = "SELECT * from paystruct WHERE sal>=? and level_name LIKE ? ORDER by "+sort_keyword ; 
                    con.query(query,[sal_min,name_search],(err,results)=>{
                        if(err)
                            reject(new Error(err.message)); 
                        resolve(results);    
                    })
                } 
                else
                {
                    const query = "SELECT * from paystruct WHERE sal>=? and sal<=? and level_name LIKE ? ORDER by "+sort_keyword ; 
                    con.query(query,[sal_min,sal_max,name_search],(err,results)=>{
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

module.exports = dbService_paystruct;