require('dotenv').config()
const { Map } = require('immutable');
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

app.get('/nasaAPI', async (req, res) => {
    try {
      const name = req.get('name');
      const image = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${name}/latest_photos/?earth_date=${cDate}&api_key=${process.env.API_KEY}`)
        .then(res => res.json())
      res.send({ image })
    } catch (error) {
      console.log('error:', error);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))