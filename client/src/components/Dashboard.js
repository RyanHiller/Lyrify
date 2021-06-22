import { useState, useEffect } from 'react'
import axios from 'axios'
import SpotifyWebApi from 'spotify-web-api-node'

import useAuth from '../hooks/useAuth'
import Player from './Player'
import TrackSearchResult from './TrackSearchResult'

const spotifyApi = new SpotifyWebApi({ clientId: process.env.REACT_APP_CLIENT_ID })

export default function Dashboard({ code }) {
  const accessToken = useAuth(code)
  const [currentTrack, setCurrentTrack] = useState()
  const [lyrics, setLyrics] = useState('')
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])

  function chooseTrack(track) {
    setCurrentTrack(track)
    setSearch('')
    setLyrics('')
  }

  useEffect(() => {
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  // Search handler
  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImg = track.album.images.reduce((smallest, image) => {
            if (image.height < smallest.height) return image
            return smallest
          }, track.album.images[0])

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImg.url,
          }
        })
      )
    })
  }, [search, accessToken])

  // Lyrics handler
  useEffect(() => {
    if (!currentTrack) return

    axios
      .get('http://localhost:3001/lyrics', {
        params: {
          track: currentTrack.title,
          artist: currentTrack.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [currentTrack])

  return (
    <div className='flex flex-col items-center min-h-screen w-screen p-6 bg-gray-800 text-center text-white overflow-x-hidden'>
      <h1 className='text-4xl mb-3'>Lyrify</h1>
      <p className='m-6'>
        Lyrify lets you sing along to your favorite Spotify songs by giving you the lyrics with the
        music!
      </p>

      {/* Search */}
      <input
        type='search'
        placeholder='Enter a track'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='h-16 w-full md:w-1/2 px-4 bg-spotify text-lg placeholder-gray-100 rounded-sm'
      />

      {/* Search Results */}
      <div className='flex-grow mt-4 mb-40 overflow-y-auto overflow-x-hidden text-left w-full md:w-1/2'>
        {searchResults.slice(0, 5).map((track) => {
          return <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack} />
        })}

        {/* Lyrics */}
        {searchResults.length === 0 && (
          <div className='text-center whitespace-pre-wrap w-full'>{lyrics}</div>
        )}
      </div>

      {/* Player */}
      <Player accessToken={accessToken} trackUri={currentTrack?.uri} />
    </div>
  )
}
