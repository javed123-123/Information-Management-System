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
console.log('MySQL-production-' + con.state);
}) 


class dbService_production{
    static getInstance(){
        return instance ? instance: new dbService_production();
    }

    async createTable(){
        try{
            const response = await new Promise((resolve,reject)=>{
                const query = 'CREATE TABLE production(fno INT,pid INT,PRIMARY KEY(fno,pid),CONSTRAINT FK_FACTNO FOREIGN KEY(fno) references FACTORY(fact_no) ON DELETE CASCADE,CONSTRAINT FK_PHONEID FOREIGN KEY(pid) references PHONE(phone_id) ON DELETE CASCADE)';
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
                const query = "SELECT * from production";
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

    async insertNewData(fno,pid){
        try{
            const response = await new Promise((resolve,reject)=>{
                const query = "INSERT into production values(?,?)";
                con.query(query,[fno,pid],(err,result)=>{
                    if(err)
                       reject(err);
                    resolve(result);    
                })
            });
            //console.log(response);
            return{
                fno : fno,
                pid: pid
            };
        }
        catch(error){
            console.log("Error dbService_production = "+error.message);
            return error.message
        }
    } 

    async constraint(fno){
        try{
            //id = parseInt(id,10);
            const response = await new Promise((resolve,reject)=>{
                const query = "SELECT count(*) c from production WHERE fno = ?";
                con.query(query,[fno],(err,result)=>{
                    if(err)
                       reject(new Error(err.message));
                    resolve(result);    
                })
            });
            return response ;
        }
        catch(error){
            console.log(error);
        }
    } 

    async deleteRow(fno,pid){
        try{
            //id = parseInt(id,10);
            const response = await new Promise((resolve,reject)=>{
                const query = "DELETE from production WHERE fno = ? and pid = ?";
                con.query(query,[fno,pid],(err,result)=>{
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

    async search_sort(sort_keyword){ 
        try{
            const response = await new Promise((resolve,reject)=>{
                    const query = "SELECT * from production ORDER by "+sort_keyword ; 
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

}

module.exports = dbService_production;