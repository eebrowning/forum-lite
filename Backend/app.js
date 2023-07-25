const express = require('express');
const app = express();
const port = 3000; // You can use any desired port number
const bodyParser = require('body-parser');
const cors = require('cors')

const db = require('./db');

//will need a comment route
//will need a signin route (hopefully via google api)
const commentRouter = require("./routes/api/comments-router");

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Host');
    next();
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())



// app.get('/', (req, res) => {//test connection
//     res.send('Hello, backend successfully connected!');
// });

app.use('/api/comments', commentRouter)



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
