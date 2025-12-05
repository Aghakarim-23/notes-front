import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import { useAuth } from '../context/AuthContext';



const Navbar = () => {

    const {user, token, setToken, logout} = useAuth()
    const [showProfile, setShowProfile] = useState(false)

  return (
    <div className='flex justify-between h-20 px-4 items-center relative border-b'>
        <Link to={'/notes'} className='text-[20px]'>Notes</Link>
        <Link to={'/admin'} className='text-[20px]'>Admin</Link>
        <div className='flex flex-col' onClick={() => setShowProfile(prev => !prev)}>
            <div className='flex gap-2'>
              <CgProfile className='text-[22px]'/>
              <button >{user && user.username}</button>
            </div>
            {showProfile && <button className='text-red-500 absolute top-12 right-0' 
                onClick={() => logout()}
            >Logout</button>}
        </div>
    </div>
  )
}

export default Navbar