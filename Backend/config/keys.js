require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI
const SECRET = process.env.SECRET
module.exports = [MONGO_URI, SECRET];
