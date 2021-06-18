# Lyrify

Lyrify is a web app designed to provide lyrics to the music on Spotify.

## Installation

Use [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) to install Lyrify. Run one of these commands in **both** the `/client` and `/server` directories.

```bash
npm install
```

**OR**

```bash
yarn install
```

## Usage

First, create a [Spotify Developer account](https://developer.spotify.com/) and an app from the developer dashboard to acquire the app's client ID and client secret. You must also assign a trusted redirect URI (in the code this is set to `http://localhost:3000` by default) in your Spotify developer app's settings.

Next, create `.env` files in both the `/client` and `/server` directories and format them as such:

```
# /server/.env
CLIENT_ID={Your app Client ID}
CLIENT_SECRET={Your app Client Secret}
PORT={Which port the server will listen to}(Default 3001)(Optional)
```

```
# /client/.env
REACT_APP_CLIENT_ID={Your app Client ID}
```

Finally, run `npm start` in the `/client` directory, and in another terminal run `node server.js` or `nodemon server` from the `/server` directory.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
