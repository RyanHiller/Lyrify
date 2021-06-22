import { useState, useEffect } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

export default function Player({ accessToken, trackUri }) {
  // Used for autoplay on clicking search result
  const [play, setPlay] = useState(false)
  useEffect(() => setPlay(true), [trackUri])

  if (!accessToken) return null
  return (
    <div className='w-screen fixed bottom-0 left-0'>
      <SpotifyPlayer
        token={accessToken}
        callback={(state) => {
          if (!state.isPlaying) setPlay(false)
        }}
        play={play}
        uris={trackUri ? [trackUri] : []}
        showSaveIcon
        initialVolume={0.5}
        magnifySliderOnHover={true}
        styles={{
          color: '#1DB954',
          bgColor: '#282828',
          trackNameColor: '#EEE',
          trackArtistColor: '#999',
          sliderColor: '#1DB954',
          sliderTrackColor: '#999',
        }}
      />
    </div>
  )
}
