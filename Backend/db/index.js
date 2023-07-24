const express = require('express');
// const { Router } = require('express');
const mongoose = require("mongoose");


// const [MONGO_URI] = require('../config/keys.js');
const MONGO_URI = env.MONGO_URI;


mongoose.connect(MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected!"))
    .catch(e => {
        console.error('Connection error', e.message)
    })


const db = mongoose.connection

module.exports = db
