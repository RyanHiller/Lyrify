const express = require('express')
const cors = require('cors')
const SpotifyWebApi = require('spotify-web-api-node')

const app = express()
const port = process.env.PORT || 3001
app.use(cors())
app.use(express.json())
require('dotenv').config()

// Handle initial login authentication
app.post('/login', (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: 'http://localhost:3000',
  })

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresIn: data.body.expires_in,
      })

      console.log('User logged in')
    })
    .catch((err) => {
      console.log(err)
      res.sendStatus(400)
    })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
