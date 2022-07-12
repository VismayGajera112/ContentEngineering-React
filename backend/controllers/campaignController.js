const campaigns = require('../models/createCampaign')
const piracyReport = require('../models/piracyReport')
const serpApi = require('google-search-results-nodejs')
const dotenv = require('dotenv')

dotenv.config()

// const date = new Date()

/**
 * It gets a list of campaigns from the database and returns it to the user.
 * @param req - request object
 * @param res - the response object
 * @returns the campaignsList.
 */
const getCampaignList = async (req, res) => {
    let campaignsList = await campaigns.find()
    res.json(campaignsList)
    return campaignsList
}

const addCampaign = async (req, res) => {
    // const { campaignName, startDate, endDate, medium, locations, imageURL } = req.body
    // let currentDate = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear()
    // let data = new campaigns({ campaignName, createdOn: currentDate, startDate, endDate, medium, locations, imageURL, status: 'Pending' })

    let campaignName = req.body.campaignName
    let imageURL = req.body.imageURL

    await generatePiracyReport(campaignName,imageURL)

    // await data.save()
    res.status(200).json({ "message": "success"})
}

/**
 * It takes a campaign name and an image URL, then it searches for the image URL on Google and saves
 * the results in a database.
 * </code>
 * @param campaignName - The name of the campaign that the image is from.
 * @param imageURL - https://i.imgur.com/QQQQQQQ.jpg
 */
const generatePiracyReport = async (campaignName,imageURL) => {
    const search = new serpApi.GoogleSearch("85010cdb00b516e3db4b74007c07a2bbd5d72aa3b8dcd92b8fd0ac00a3d6789c")
    const params = {
        engine: 'google_reverse_image',
        image_url: imageURL,
    }
    
    const sendResults = async (data) => {

        const newReport = {
            campaignName: campaignName,
            imageURL: imageURL,
            links: data['image_results'].map(object => object['link']),
            foundedOn: data['search_information']['total_results']
        }

        const report = new piracyReport(newReport)
        await report.save()
    }

    await search.json(params, sendResults)
}

/**
 * It takes a campaign name from the URL, finds the campaign in the database, and returns the
 * campaign's report.
 * @param req - the request object
 * @param res - the response object
 * @returns The report object
 */
const getCampaignReport = async (req,res) => {

    const name = req.params['name']
    let report = await piracyReport.findOne({campaignName:name})

    res.json(report)
    return report
}


module.exports = { getCampaignList, addCampaign, getCampaignReport }