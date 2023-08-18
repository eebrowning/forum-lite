// const express = require('express');
// const { Router } = require('express');
const mongoose = require("mongoose");
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;
// console.log(MONGO_URI, 'mongouri')


mongoose.connect(MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected!"))
    .catch(e => {
        console.error('Connection error', e.message)
    })


const db = mongoose.connection

module.exports = db
