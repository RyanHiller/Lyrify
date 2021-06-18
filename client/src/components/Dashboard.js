import React from 'react'

import useAuth from '../hooks/useAuth'

export default function Dashboard({ code }) {
  const accessToken = useAuth(code)
  return <div>{code}</div>
}
