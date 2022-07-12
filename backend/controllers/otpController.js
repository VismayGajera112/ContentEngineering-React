const crypto = require('crypto')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN

let refreshTokens = []

const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const client = require('twilio')(accountSid, authToken)

const smsKey = process.env.SMS_SECRET_KEY

const sendCode = (req, res) => {
    const phone = req.body.phone
    const otp = Math.floor(100000 + Math.random() * 900000)
    const ttl = 2 * 60 * 1000
    const expires = Date.now() + ttl
    const data = `${phone}.${otp}.${expires}`
    const hash = crypto.createHmac('sha256', smsKey).update(data).digest('hex')
    const fullhash = `${hash}.${expires}`

    // client.messages.create({
    //     body: `Your one time password for VAMS is ${otp}`,
    //     from: +19894690062,
    //     to: phone
    // })
    //     .then((message) => console.log(message))
    //     .catch(error => console.error(error))

    res.json({ phone: phone, hash: fullhash, otp: otp })
}

const verifyCode = (req, res) => {
    const phone = req.body.phone
    const hash = req.body.hash
    const otp = req.body.otp
    let [hashValue, expires] = hash.split('.')

    let now = Date.now()
    if (now > parseInt(expires)) {
        return res.status(504).json({ message: 'OTP Expired' })
    }

    const data = `${phone}.${otp}.${expires}`
    const newCalculatedHash = crypto.createHmac('sha256', smsKey).update(data).digest('hex')

    if (newCalculatedHash === hashValue) {
        const accessToken = jwt.sign({ data: phone }, JWT_AUTH_TOKEN, { expiresIn: '30s' })
        const refreshToken = jwt.sign({ data: phone }, JWT_REFRESH_TOKEN, { expiresIn: '1y' })
        refreshTokens.push(refreshToken)

        return res
            .cookie('accessToken', accessToken, { expires: new Date(new Date().getTime() + 1000 * 30), sameSite: 'strict', httpOnly: true })
            .cookie('authSession', true, { expires: new Date(new Date().getTime() + 1000 * 30) })
            .cookie('refreshToken', refreshToken, { expires: new Date(new Date().getTime() + 31536000000), sameSite: 'strict', httpOnly: true })
            .cookie('refreshTokenID', true, { expires: new Date(new Date().getTime() + 31536000000) })
            .json({ message: 'Device Verified' })
    } else {
        res.status(400).json({ verification: false, message: 'Invalid OTP' })
    }
}

const authenticateUser = async (req, res, next) => {
    const accessToken = req.cookie.accessToken

    jwt.verify(accessToken, JWT_AUTH_TOKEN, async (err, phone) => {
        if (phone) {
            req.phone = phone
            next()
        } else if (err.message === 'TokenExpiredError') {
            return res.status(403).json({ success: false, message: 'Access token expired' })
        } else {
            console.error(err.message)
            res.json({ Error: 'User not authenticated' })
        }
    })
}

const refreshToken = (req, res) => {
    const refreshToken = req.cookie.refreshToken
    if (!refreshToken) return res.status(403).json({ Error: 'Refresh token not found' })
    if (!refreshTokens.includes(refreshToken)) return res.status(403).json({ Error: 'Refresh token blocked' })

    jwt.verify(refreshToken, JWT_REFRESH_TOKEN, (err, phone) => {
        if (!err) {
            const accessToken = jwt.sign({ data: phone }, JWT_AUTH_TOKEN, { expiresIn: '30s' })
            res
                .cookie('accessToken', accessToken, { expires: new Date(new Date().getTime() + 1000 * 30), sameSite: 'strict', httpOnly: true })
                .cookie('authSession', true, { expires: new Date(new Date().getTime() + 1000 * 30) })
                .json({ previousSessionExpiry: true, success: true })
        } else {
            return res.status(403).json({ success: false, message: 'Invalid credentials' })
        }
    })
}

const logout = (req, res) => {
    res.clearCookie('refreshToken').clearCookie('accessToken').clearCookie('authSession').clearCookie('refreshTokenID').json({ message: 'User Logout' })
}


module.exports = { sendCode, verifyCode, authenticateUser, refreshToken, logout }