require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI
const SECRET = process.env.SECRET
const { SESSION_SECRET, CLIENT_SECRET, CLIENT_ID } = process.env;
module.exports = [MONGO_URI, SECRET, SESSION_SECRET, CLIENT_SECRET, CLIENT_ID];
