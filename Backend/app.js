//Note, Auth stuff crammed here, could clean up on it's own route, but there isn't much to it.
const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000; //
const bodyParser = require('body-parser');
const cors = require('cors')

const commentRouter = require("./routes/api/comments-router");
const usersRouter = require("./routes/api/users-router");
const googleRouter = require("./routes/api/google-router");

const postRouter = require("./routes/api/posts-router")
const db = require('./db');
const { restoreUser } = require('./utils/auth');


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Host');
    next();
});
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
db.on('error', console.error.bind(console, 'MongoDB connection error:'))


//base test route
app.get('/', (req, res) => {//test connection
    res.send('Hello, backend successfully connected!');
});

app.use('/auth/passport', usersRouter)
app.use('/auth/google', googleRouter)

//Comments Route
app.use('/api/comments', commentRouter)
//Posts
app.use('/api/posts', postRouter)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
