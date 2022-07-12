/* This is importing the required modules. */
const express = require("express")
const dotenv = require('dotenv')
const customerRoutes = require('./routes/customerRoutes')
const addCustomerRoutes = require('./routes/addCustomerRoutes')
const bodyparser = require('body-parser');
const cors = require('cors');
const cookieParser = require("cookie-parser");

/* Loading the environment variables from the `.env` file. */
dotenv.config()

/* This is a way to set the port that the server will listen on. The `process.env.PORT` is the port
that the server will listen on if it is deployed to a server. The `5000` is the port that the server
will listen on if it is running locally. */
const PORT = process.env.PORT || 5000
// const accountSid = process.env.ACCOUNT_SID
// const authToken = process.env.AUTH_TOKEN
// const client = require('twilio')(accountSid, authToken)

// const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN
// const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN

// const smsKey = process.env.SMS_SECRET_KEY

/* Creating an instance of the express server. */
const app = express()
/* Telling the server to use the express.json() middleware. */
app.use(express.json())
/* Allowing the server to accept requests from other domains. */
// app.use(cors())
app.use(cors({origin: 'http://localhost:3000', credentials: true}))
/* A middleware that is used to parse the body of the request. */
app.use(bodyparser.urlencoded({ extended: false}));

app.use(cookieParser())


/* Telling the server to use the customerRoutes file when the url is `/api/customer/dashboard` */
app.use('/api/customer/dashboard',customerRoutes)
/* Telling the server to use the addCustomerRoutes file when the url is `/api/customer` */
app.use('/api/customer',addCustomerRoutes)

/* Telling the server to listen on the port specified in the `PORT` variable. */
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})