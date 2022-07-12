const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()

/* Connecting to the database. */
mongoose.connect("mongodb://localhost:27017/contentengineering",{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
})
.then(con => {
    console.log("Database connection: " + mongoose.connection.host + ":" + mongoose.connection.port)
})
.catch(err => console.error(err))

module.exports = mongoose