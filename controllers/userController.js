const data = require('../MOCK_DATA.json');
const sqlConfig = require('../config/config');
const { user } = require('../config/config');
const poolPromise = require('../config/poolPromise')
const mssql = require('mssql')

module.exports ={
    
    home:(req,res)=>{
        res.send('Hello there...')
    },

    create: async(req, res)=>{
        let {id, first_name, last_name, email, gender, Password} = req.body
            let pool = await poolPromise()
            pool.query(`insert into data 
                        VALUES('${id}', '${first_name}', '${last_name}', '${email}', '${gender}', '${Password}')`)
                        .then(results=>{
                            if(results.rowsAffected){
                                res.send("User has been added")
                                console.log("User has been added")
                            }
                        })
            
        },
        
        getUsers: async(req, res)=>{
            let pool = await poolPromise()
            pool.query(`select * FROM data`)
            .then(results=>{
                
                res.json({
                    status:200,
                    success: true,
                    message: "Here are the users existing in our database",
                    results:results.recordset
                })
            })
        },
        
        getUser: async(req, res)=>{
            const {email} = req.params
            let pool = await poolPromise()
            pool.query(`select * from data where email='${email}'`)
            .then(results=>{
                let user=results.recordset[0]
                if(user){
                    return res.status(200).json({
                        status:200,
                        success: true,
                        message: "You found the user",
                        results:user 
                    })
                }
                res.status(404).json({
                    status:404,
                    success: false,
                    message: "Could not find user",
                    results:{}
                })
                
                })
            },
            login: async (req, res)=>{
                const {email, password} = req.body
                let pool = await poolPromise()
                pool.query(`select * FROM data WHERE email='${email}'`)
                .then(results=>{
                    let user=results.recordset[0]
                    if(user){
                        let pass=user.password
                        if(password===pass){
                                return res.json({
                                    status:200,
                                    success: true,
                                    message: "Logged in successfully",
                                    results:user
                                })
        
                        }
                        res.status(404).json({
                                    status:404,
                                    success: false,
                                    message: "Couldn't login. Check your credentials",
                                    results:{}
                        })
                        }                        
                    })
            }
}
        
   
/*
function getUsers(req,res){
    const users = {
            Status:200,
            Success:true,
            Message:"Here are all the users",
            Data:data
    }
    res.send(users)
    const fail ={
        Status:400,
        Success:false,
        Message:"Could not fetch users",
        Data: []
    }
    
}

function getUser (req,res){
    const {email} = req.params
    const user = data.find(user=>user.email === email)
    if(user){
        return res.status(200).json({
            Status:200,
            Success:true,
            Message:"You found the user",
            Results:user
        })
    }
    res.status(400).json({
        Status:400,
        Success:false,
        Message:"Could not find user",
        Results:{}
    })
}

function login (req,res){
    const {email,Password} = req.body
    const user = data.find(user=>user.email===email)
    if(user && user.Password===Password){
        return res.status(200).json({
            Status:200,
            Success:true,
            Message:"Successful login",
            Results:user
        })
    }
    res.status(400).json({
        Status:400,
        Success:false,
        Message:"Could not login. Check your credentials",
        Results:{}
    })
}
module.exports = {home,getUsers,getUser,login}*/
