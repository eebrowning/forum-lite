// import mongoose from "mongoose";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//will have user creation: need to incorporate passport and oauth


const UserSchema = Schema({
    username: {
        type: String,
        minLength: 3,
        required: true,
    },
    password: {//will be hashed or handled with oAuth 
        type: String,
        minLength: 2,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        minLength: 2,
        required: true,
    },
    lastName: {
        type: String,
        minLength: 2,
        required: true,
    },

}, { timestamps: true });

const Post = mongoose.model("Users", PostSchema);

module.exports = User;
