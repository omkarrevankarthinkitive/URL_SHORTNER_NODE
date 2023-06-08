const mongoose = require('mongoose');
const shortid = require('shortid');




const urlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, default: shortid.generate,unique:true },

});

const UrlCollection = mongoose.model('Url', urlSchema);


module.exports = UrlCollection