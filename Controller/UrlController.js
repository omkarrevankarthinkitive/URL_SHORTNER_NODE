

const UrlCollection = require("../Model/UrlModel.js")

const MAX_UNIQUE_URLS = 1000000;

async function createShortUrl(req, res) {
    const { originalUrl } = req.body;

    try {
        const totalUniqueUrls = await UrlCollection.distinct('originalUrl').countDocuments();
     
        if (totalUniqueUrls >= MAX_UNIQUE_URLS) {
            const url = await UrlCollection.findOne({ originalUrl });
            if (url) {
                res.json(url);
            } else {
                res.status(400).json({ error: 'Maximum limit reached' });
            }
        } else {
            const url = await UrlCollection.findOne({ originalUrl });

            if (url) {
                res.json(url);
            } else {
                const newUrl = new UrlCollection({ originalUrl });
                await newUrl.save();
                res.json(newUrl);
            }
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getShortUrl(req, res) {
    const { shortUrl } = req.params;

    try {
        const url = await UrlCollection.findOne({ shortUrl });

        if (url) {
            
            res.redirect(url.originalUrl);

        } else {
            res.status(404).json({ error: 'URL not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


async function getAllUrl(req, res) {
    
    try {
        const urlAll = await UrlCollection.find();

        if (urlAll) {
            res.send(urlAll);
        } 
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = { createShortUrl, getShortUrl ,getAllUrl}

