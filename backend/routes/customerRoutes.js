const express = require('express');
const campaignCtrl = require('../controllers/campaignController')
const bodyparser = require('body-parser');

/* Creating a new router object. */
const router = express.Router();

/* A middleware that parses the body of the request and makes it available in the request object. */
router.use(bodyparser.urlencoded({ extended: false}));

/* A route handler. It is a function that will be called when the user navigates to the `/` route. */
router.get('/', campaignCtrl.getCampaignList)

/* A route handler. It is a function that will be called when the user navigates to the `/addCampaign`
route. */
router.post('/addCampaign', campaignCtrl.addCampaign)

/* This is a route handler. It is a function that will be called when the user navigates to the
`/campaignReport/:name` route. */
router.get('/campaignReport/:name', campaignCtrl.getCampaignReport)


module.exports = router;