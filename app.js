const express = require('express')
const cors = require('cors');
require('dotenv').config()

const app = express()
const port = process.env.PORT;
const { router } = require('./routes/users');

const bodyParser = require('body-Parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', router)



app.use((req, res, next)=>{
    const error = new Error("Not found");
    error.status = 404
    next(error)
})

app.use((err, req, res, next)=>{
    res.json({
        status:err.status,
        success: false,
        message: err.message
    })
})

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`)
})
