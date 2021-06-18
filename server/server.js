const express = require('express')
const cors = require('cors')
const SpotifyWebApi = require('spotify-web-api-node')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3001
app.use(cors())
app.use(express.json())

// Handle initial login authentication
app.post('/login', (req, res) => {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: 'http://localhost:3000',
  })
  
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
