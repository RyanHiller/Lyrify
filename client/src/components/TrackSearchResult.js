import React from 'react'

export default function TrackSearchResult({ track }) {
  return (
    <div className='flex m-1 items-center cursor-pointer rounded bg-gray-400'>
      <img src={track.albumUrl} className='h-12 w-12' alt={track.title} />
      <div className='ml-3'>
        <div>{track.title}</div>
        <div className='text-gray-200'>{track.artist}</div>
      </div>
    </div>
  )
}
