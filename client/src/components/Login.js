import React from 'react'

// Required scopes declared here
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

export default function Login() {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <a className='bg-green-500 hover:bg-green-400 rounded p-2' href={AUTH_URL}>
        Login With Spotify
      </a>
    </div>
  )
}
