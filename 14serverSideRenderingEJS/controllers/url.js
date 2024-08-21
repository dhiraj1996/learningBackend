const generateShortId = require('ssid');
const URL = require("../models/url");

async function handleGenerateShortUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(404).json({ err: "URL is required" });

    const getShortId = generateShortId(); //Default it generate 8 characters.

    await URL.create({
        shortId: getShortId,
        redirectURL: body.url,
        visitHistory: [],
    })
    return res.render("home", {
        id: getShortId,
    })
    // return res.send({ id: getShortId });
}

async function handleRedirectUrl(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                }
            }
        }
    );
    // res.redirect(entry.redirectURL);
    res.redirect(`${entry.redirectURL}`);
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId})
    res.send({
        clicked: result.visitHistory.length,
        time: result.visitHistory,
    })
}

module.exports = {
    handleGenerateShortUrl,
    handleRedirectUrl,
    handleGetAnalytics,
}