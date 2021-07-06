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
console.log('MySQL-production_join-' + con.state);
}) 


class dbService_production_join{
    static getInstance(){
        return instance ? instance: new dbService_production_join();
    }
   

    async search_sort(join_table,noInput){    
        try{
            const response = await new Promise((resolve,reject)=>{
                if(join_table == "fno")
                {
                    const query = "SELECT * from phone where phone_id IN (SELECT pid from production where fno = ?)";
                    con.query(query,noInput,(err,results)=>{
                       if(err)
                          reject(new Error(err.message));
                        resolve(results);    
                    })                
                }
                else
                {
                    const query =  "SELECT * from factory where fact_no IN (SELECT fno from production where pid = ?)";
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
}

module.exports = dbService_production_join;