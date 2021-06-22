import React from 'react'

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track)
  }

  return (
    <div
      className='flex my-1 items-center cursor-pointer rounded bg-spotify-dark hover:bg-spotify-light truncate w-full'
      onClick={handlePlay}
    >
      <img src={track.albumUrl} className='h-12 w-12' alt={track.title} />
      <div className='ml-3'>
        <div>{track.title}</div>
        <div className='text-gray-200'>{track.artist}</div>
      </div>
    </div>
  )
}
