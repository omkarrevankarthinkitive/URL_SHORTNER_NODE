const express = require("express")
const router = express.Router()

const { getShortUrl, createShortUrl, getAllUrl } = require("../Controller/UrlController.js")

router.post("/", createShortUrl)
router.get("/:shortUrl", getShortUrl)
router.get("/", getAllUrl)

module.exports = router