import React from 'react'
import { useAuth } from '../context/AuthContext'

const Notes = () => {
    const {name} = useAuth()
  return (
    <div>{name}</div>
  )
}

export default Notes