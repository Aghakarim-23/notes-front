import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/api'

const VerifyEmail = () => {
    const {token} = useParams()

    useEffect(() => {

        const getVerifiedUser = async () => {
            try {
                const res = await api.get(`/api/auth/verify-email/${token}`)
                console.log(res)
            } catch (error) {
                console.error(error)
            }
        }

        getVerifiedUser()
    },[])

  return (
    <div>
        {token}
    </div>
  )
}

export default VerifyEmail