import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import { useAuth } from '../context/AuthContext';



const Navbar = () => {

    const {user, token, setToken, logout} = useAuth()
    const [showProfile, setShowProfile] = useState(false)

  return (
    <div className='flex justify-between h-24 px-4 items-center relative border-b '>
        <Link to={'/notes'} className='text-[20px]'>Notes</Link>
        {user?.role === "admin" && <Link to={'/admin'} className='text-[20px]'>Admin</Link>}
        {user?.role === "admin" && <Link to={'/all-notes'} className='text-[20px]'>All Posts</Link>}
        <div className='flex flex-col' onClick={() => setShowProfile(prev => !prev)}>
            <div className='flex gap-2'>
              <CgProfile className='text-[22px]'/>
              <button >{user && user.username}</button>
            </div>
            <div className=''>
              {showProfile && <button className='text-red-600 absolute top-16 right-4 cursor-pointer hover:opacity-70 border-zinc-300 rounded-md border px-2'
                  onClick={() => logout()}
              >Logout</button>}
            </div>
        </div>
    </div>
  )
}

export default Navbar