const connectDB = require('../config/db');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


/* This is creating a schema for the customer model. */
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    email: String,
    contact: String,
    password: String,
}, {
    timestamps: true,
});

/* This is a middleware that is used to hash the password before saving it to the database. */
customerSchema.pre('save', function (next) {
    const salt = bcrypt.genSaltSync(10)
    if (this.password && this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, salt);
    }
    next();
})


/* Creating a model for the customer schema. */
const Customer = connectDB.model('customer', customerSchema);

module.exports = Customer;