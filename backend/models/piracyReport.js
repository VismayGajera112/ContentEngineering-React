const mongoose = require('mongoose');
const connectDB = require('../config/db');

/* Creating a schema for the database. */
const reportSchema = new mongoose.Schema({
    campaignName: String,
    imageURL: String,
    links: Array,
    foundedOn: String,
},{
    timestamps:true,
});

/* Creating a model for the database. */
const piracyReport = connectDB.model('piracyreport', reportSchema);

module.exports = piracyReport;