const dotenv = require('dotenv')
const Customer = require('../models/Customer')
const bcrypt = require('bcryptjs');


dotenv.config()

const getUser = async (req, res) => {
    let data = await Customer.find()
    res.json({ users: data })
}

/**
 * It takes a request and a response, and then it creates a new customer object, and then it saves that
 * object to the database, and then it sends a response back to the client.
 * @param req - request
 * @param res - the response object
 */
const registerCustomer = async (req, res) => {
    /* Destructuring the request body, and then it is creating a new customer object, and then it is
    saving that object to the database, and then it is sending a response back to the client. */
    let { name, email, contact, password } = req.body
    let data = new Customer({ name, email, contact, password })
    await data.save()
    res.json({ status: 200 })
}

/**
 * It takes in an email and password from the request body, checks if the email and password are valid,
 * then checks if the email exists in the database, and if it does, it checks if the password matches
 * the password in the database.
 * @param req - request
 * @param res - response object
 */
const loginCustomer = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.json({ message: "Invalid user" })
    }

    let user = await Customer.findOne({ email: req.body.email })
    if (user) {
        var match = await bcrypt.compare(req.body.password, user.password)
        if (match) {
            res.json({ status: 200, user: user.name })
        }
        else {
            res.json({ status: 301 })
        }
    }
    else {
        res.json({ status: 404 })
    }

}


module.exports = { registerCustomer, getUser, loginCustomer }