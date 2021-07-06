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
console.log('MySQL-employee_join-' + con.state);
}) 


class dbService_employee_join{
    static getInstance(){
        return instance ? instance: new dbService_employee_join();
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

    async search_sort(join_table,noInput){    
        try{
            const response = await new Promise((resolve,reject)=>{
                if(join_table == "")
                {
                    const query = "SELECT * from employee";
                    con.query(query,(err,results)=>{
                       if(err)
                          reject(new Error(err.message));
                        resolve(results);    
                    })                
                }
                else
                {
                    const query = "SELECT * from employee WHERE "+join_table+" = ?"
                    con.query(query,noInput,(err,results)=>{
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
    async Enroute(table_name){
        try{
            const response = await new Promise((resolve,reject)=>{
                var query;
                if(table_name == "lno")
                query = "SELECT fact_no as fno from factory order by fact_no";
                else if(table_name== 'fno')
                query = "SELECT level_no as lno from paystruct order by level_no";
                con.query(query,(err,results)=>{
                   if(err)
                    reject(new Error(err.message));
                    resolve(results);    
                    })           
            });
            return response;
        }catch(error){
            console.log(error);
        }
    }

    async getGraph(table_name,noInput){
        try{
            const response = await new Promise((resolve,reject)=>{
                var query;
                if(table_name == "lno")
                query = "SELECT fno , count(*) as pop from employee where lno=? group by fno";
                else if(table_name== 'fno')
                query = "SELECT lno , count(*) as pop from employee where fno=? group by lno";
                //SELECT lno , count(*) as pop from employee where fno=? group by lno
                con.query(query,[noInput],(err,results)=>{
                   if(err)
                    reject(new Error(err.message));
                    resolve(results);    
                    })           
            });
            return response;
        }catch(error){
            console.log(error);
        }
    }
    async others(noInput){
        try{
            const response = await new Promise((resolve,reject)=>{
                const query = "select avg(sal) as avg , min(sal) as min , max(sal) as max from employee,paystruct where lno=level_no and fno=?";
                con.query(query,[noInput],(err,results)=>{
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

module.exports = dbService_employee_join;