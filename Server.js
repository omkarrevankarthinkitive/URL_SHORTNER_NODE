const express = require('express')
const colors = require("colors")
const connectDB = require("./Config/db.js")
const PORT = 3000;

const UrlRoute = require("./Routes/UrlRoutes.js")


connectDB()
const app = express()
app.use(express.json())



app.get('/', (req, res) => {
    res.send('Welcome to the URL shortener API!');
});

app.use('/api', UrlRoute)



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});