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
console.log('MySQL-phone-' + con.state);
}) 


class dbService_phone{
    static getInstance(){
        return instance ? instance: new dbService_phone();
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
                const query = 'CREATE TABLE phone(phone_id INT,pname varchar(40) NOT NULL,launch DATE NOT NULL,cost INT NOT NULL,proc varchar(40) NOT NULL,battery INT NOT NULL,rear_cam INT NOT NULL,front_cam INT NOT NULL,PRIMARY KEY(phone_id))';
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

    async getData(pid){
        try{
            const response = await new Promise((resolve,reject)=>{
                const query = "SELECT * from phone where phone_id = ?";
                con.query(query,pid,(err,results)=>{
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

    async insertNewPhone(phone_id,pname,launch,cost,proc,battery,rear_cam,front_cam){
        try{
            const response=await new Promise((resolve,reject)=>{
                const query="insert into phone (phone_id,pname,launch,cost,proc,battery,rear_cam,front_cam) values (?,?,?,?,?,?,?,?);";
                con.query(query,[phone_id,pname,launch,cost,proc,battery,rear_cam,front_cam],(err,result)=>{
                    if(err)
                        reject(err);
                    resolve(result);
                })
            });
            return{
                phone_id:phone_id,
                pname:pname,
                launch:launch,
                cost:cost,
                proc:proc,
                battery:battery,
                rear_cam:rear_cam,
                front_cam:front_cam
            };
        }catch(error){
            console.log("Error dbService_factory = "+error.code);
            return error.code
        }
    }

    async deletePhoneById(id){
        try{
        //id=parseInt(id,10);
        const response=await new Promise((resolve,reject)=>{
            const query="delete from phone where phone_id = ?";
            con.query(query,[id],(err,result)=>{
                if(err)reject(new Error(err.message));
                resolve(result.affectedRows);
            })
        });
        return response === 1 ? true:false;
    }catch(error){
        console.log(error);
        return false;
    }
    }

    async updatePhoneById(phone_id_e,pname_e,launch_e,cost_e,proc_e,battery_e,rear_cam_e,front_cam_e){
        try{
            console.log(phone_id_e+" "+pname_e+" "+launch_e+" "+cost_e+" "+proc_e+" "+battery_e+" "+rear_cam_e+" "+front_cam_e);
        //phone_id_e=parseInt(phone_id_e,10);
        const response=await new Promise((resolve,reject)=>{
            const query="update phone set pname=?,launch=?,cost=?,proc=?,battery=?,rear_cam=?,front_cam=? where phone_id = ?";
            con.query(query,[pname_e,launch_e,cost_e,proc_e,battery_e,rear_cam_e,front_cam_e,phone_id_e],(err,result)=>{
                if(err)reject(new Error(err.message));
                resolve(result.affectedRows);
            })
        });
        return response === 1 ? true:false; 
    }catch(error){
        console.log(error);
        return false;
    }       
    }

    async search_sort(modelName,minCost,maxCost,rearCam,frontCam,minBat,maxBat,proc,launch,sort){
        console.log(modelName+'hello');
        if(minCost=="")minCost=0;
        if(rearCam=="")rearCam=0;
        if(frontCam=="")frontCam=0;
        if(minBat=="")minBat=0;
        if(maxBat=="")maxBat=8000;
        if(maxCost=="")maxCost=200000;
        if(sort=="null")sort="pname";
        console.log(modelName+" "+minCost+" "+maxCost+" "+rearCam+" "+frontCam+" "+minBat+" "+maxBat+" "+proc+" "+launch+" "+sort);
        const name=("%"+modelName+"%");
        const name1=("%"+proc+"%");
        try{
        const response = await new Promise((resolve,reject)=>{
            if(launch=="")
            {
                const query = "SELECT * from phone WHERE cost>=? and cost<=? and  rear_cam>=? and front_cam>=? and battery>=? and battery<=? and pname LIKE ? and proc like ? order by "+sort ; 
                con.query(query,[minCost,maxCost,rearCam,frontCam,minBat,maxBat,name,name1],(err,results)=>{
                    if(err)
                        reject(new Error(err.message)); 
                    resolve(results);    
                })
            } 
            else
            {
                const query = "SELECT * from phone WHERE cost>=? and cost<=? and rear_cam>=? and front_cam>=? and battery>=? and battery<=? and launch>=? and pname LIKE ? and proc like ? order by "+sort ; 
                con.query(query,[minCost,maxCost,rearCam,frontCam,minBat,maxBat,launch,name,name1],(err,results)=>{
                    if(err)
                        reject(new Error(err.message)); 
                    resolve(results);    
                })
            }
        });
        return response;
    }catch(error){
        console.log(error);
    }   
    }
    async getAllPhones(){
        try{
            const response=await new Promise((resolve,reject)=>{
                const query="select * from phone";
                con.query(query,(err,result)=>{
                    if(err)reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        }catch(error){
            console.log(error);
        }
    }

    async searchUser(username){
        try{
            const response=await new Promise((resolve,reject)=>{
                const query='select * from users where username = ?';
                con.query(query,[username],(err,result)=>{
                    if(err)reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        }catch(error){
            console.log(error);
        }
    }


}

module.exports = dbService_phone;