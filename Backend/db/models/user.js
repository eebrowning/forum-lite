// import mongoose from "mongoose";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//will have user creation: need to incorporate passport and oauth


const UserSchema = Schema({
    password: {//will be hashed or handled with oAuth, will test to prove before deploying
        type: String,
        minLength: 2,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        minLength: 2,
        required: true,
    },
    lastname: {
        type: String,
        minLength: 2,
        required: true,
    },

}, { timestamps: true });

const User = mongoose.model("Users", UserSchema);

module.exports = User;
