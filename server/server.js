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
        accessToken: data.body['access_token'],
        refreshToken: data.body['refresh_token'],
        expiresIn: data.body['expires_in'],
      })

      console.log('User logged in')
    })
    .catch((err) => {
      console.log('LOGIN ERROR - ', err)
      res.sendStatus(400)
    })
})

// Handle refreshing access token while logged in
app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: 'http://localhost:3000',
    refreshToken,
  })

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({ accessToken: data.body.accessToken, expiresIn: data.body.expiresIn })
      console.log('Access token refreshed')
    })
    .catch((err) => {
      console.log('REFRESH TOKEN ERROR - ', err)
      res.sendStatus(400)
    })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
