const express = require('express')
const app = express()
const PORT = 8000;
const { router } = require('./routes/users');
const bodyParser = require('body-Parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', router)



app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`)
})
