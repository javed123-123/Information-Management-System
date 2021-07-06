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
console.log('MySQL-factory-' + con.state);
}) 


class dbService_factory{
    static getInstance(){
        return instance ? instance: new dbService_factory();
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
                const query = 'CREATE TABLE factory(fact_no INT,address varchar(255) NOT NULL,capacity INT NOT NULL,est DATE NOT NULL,PRIMARY KEY(fact_no))';
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
                const query = "SELECT * from factory";
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
                const query = "SELECT * from factory where fact_no = ?";
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

    async insertNewData(fact_no,address,capacity,est){
        try{
            const response = await new Promise((resolve,reject)=>{
                const query = "INSERT into factory values(?,?,?,?)";
                con.query(query,[fact_no,address,capacity,est],(err,result)=>{
                    if(err)
                       reject(err);
                    resolve(result);    
                })
            });
            return{
                fact_no : fact_no,
                address: address,
                capacity: capacity,
                est : est
            };
        }
        catch(error){
            console.log("Error dbService_factory = "+error.code);
            return error.code
        }
    }
    
    async constraint(phone1,phone2,phone3){
        try{
            const response = await new Promise((resolve,reject)=>{
                const query = "SELECT phone_id from phone where phone_id IN (?,?,?)";
                con.query(query,[phone1,phone2,phone3],(err,result)=>{
                    if(err)
                       reject(err);
                    resolve(result);    
                })
            });
            return response;
        }
        catch(error){
            console.log("Error dbService_factory = "+error.code);
            return error.code
        }
    }

    async deleteRow(no){
        try{
            //id = parseInt(id,10);
            const response = await new Promise((resolve,reject)=>{
                const query = "DELETE from factory WHERE fact_no = ?";
                con.query(query,no,(err,result)=>{
                    if(err)
                       reject(new Error(err.message));
                    else 
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

    async updateRow(fact_no,address,capacity,est){
        try{
            //id = parseInt(id,10);
            const response = await new Promise((resolve,reject)=>{
                const query = "UPDATE factory SET address = ?,capacity = ?,est = ? WHERE fact_no = ?";
                con.query(query,[address,capacity,est,fact_no],(err,result)=>{
                    if(err)
                       reject(new Error(err.message));
                    else   
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

    async search_sort(address,sort_keyword,capacity_min,capacity_max,est_min,est_max){ 
        const address_search = ("%" + address + "%");

        if(capacity_min == "")
            capacity_min = "0";
        if(est_min == "")
            est_min = "0001-01-01";
        
        try{
            const response = await new Promise((resolve,reject)=>{
                if( (capacity_max === "") && (est_max == "") )
                {
                    const query = "SELECT * from factory WHERE capacity>=? and est>=? and address LIKE ? ORDER by "+sort_keyword ; 
                    con.query(query,[capacity_min,est_min,address_search],(err,results)=>{
                        if(err)
                            reject(new Error(err.message)); 
                        resolve(results);    
                    })
                }
                else if( (capacity_max === "") && (est_max != "") )
                {
                    const query = "SELECT * from factory WHERE capacity>=? and est>=? and est<=? and address LIKE ? ORDER by "+sort_keyword ; 
                    con.query(query,[capacity_min,est_min,est_max,address_search],(err,results)=>{
                        if(err)
                            reject(new Error(err.message)); 
                        resolve(results);    
                    })
                }
                else if( (capacity_max != "")  && (est_max == ""))
                {
                    const query = "SELECT * from factory WHERE capacity>=? and capacity<=? and est>=? and address LIKE ? ORDER by "+sort_keyword ; 
                    con.query(query,[capacity_min,capacity_max,est_min,address_search],(err,results)=>{
                        if(err)
                            reject(new Error(err.message)); 
                        resolve(results);    
                    })
                } 
                else if ( (capacity_max != "") && (est_max != "")  ) 
                {
                    const query = "SELECT * from factory WHERE capacity>=? and capacity<=? and est>=? and est<=? and address LIKE ? ORDER by "+sort_keyword ; 
                    con.query(query,[capacity_min,capacity_max,est_min,est_max,address_search],(err,results)=>{
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

module.exports = dbService_factory;