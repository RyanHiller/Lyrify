import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()

  useEffect(() => {
    axios
      .post(`http://localhost:${process.env.PORT || 3001}/login`, { code })
      .then((res) => {
        setAccessToken(res.data.accessToken)
        setRefreshToken(res.data.refreshToken)
        setExpiresIn(res.data.expiresIn)
        window.history.pushState({}, null, '/')
      })
      .catch((err) => {
        console.log(err)
      })
  }, [code])

  useEffect(() => {
    if (!refreshToken || !expiresIn) return

    const interval = setInterval(() => {
      axios
        .post(`http://localhost:${process.env.PORT || 3001}/refresh`, { refreshToken })
        .then((res) => {
          setAccessToken(res.data.accessToken)
          setExpiresIn(res.data.expiresIn)
        })
    }, (expiresIn - 60) * 1000)

    //Ensures interval is cleared in case token expires
    return () => clearInterval(interval)
  }, [refreshToken, expiresIn])

  return accessToken
}
