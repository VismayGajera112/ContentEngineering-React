const mongoose = require('mongoose');
const connectDB = require('../config/db');

/* This is creating a schema for the database. */
const campaignSchema = new mongoose.Schema({
    campaigName: String,
    createdBy:String,
    createdOn:Date,
    startDate:Date,
    endDate:Date,
    medium:String,
    locations:Array,
    status: String,
    imageURL:String,
},{
    timestamps:true,
});

/* This is creating a model for the database. */
const campaign = connectDB.model('advertisements', campaignSchema, "advertisements");

module.exports = campaign;