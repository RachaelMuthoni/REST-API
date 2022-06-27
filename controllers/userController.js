const data = require('../MOCK_DATA.json');


function home(req,res){
    res.send('Hello there...')
}

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
    res.send()
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
module.exports = {home,getUsers,getUser,login}
