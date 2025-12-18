import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoIosCloseCircleOutline } from "react-icons/io";


const SideBar = ({isOpenShowModal, setIsOpenShowModal, search, setSearch}) => {
  return (
    <div className={`bg-gray-500 text-white w-full fixed top-0 right-0 z-20 transform transition-transform  duration-300  p-5 h-screen ${isOpenShowModal ? "translate-x-full" : "translate-x-0"}`}>
      <div className='flex justify-end '
          onClick={() => {
            setIsOpenShowModal(!isOpenShowModal)
          }}
      >
        <IoIosCloseCircleOutline  className='text-3xl cursor-pointer'/>
      </div>
        <div className='flex flex-col mt-10'>
          <Link to={"/admin"} className='py-4  flex border-b-2 md:text-2xl' onClick={() => setIsOpenShowModal(!isOpenShowModal)}>Users</Link>
          <Link to={"/all-notes"} className='py-4 flex border-b-2 md:text-2xl' onClick={() => setIsOpenShowModal(!isOpenShowModal)}>Posts</Link>
          <form 
              className='mt-10'
              onSubmit={(e) => {
                  e.preventDefault()
                }}
                >
          
                  <div>
                    <input 
                        className="rounded-md border pl-2 py-2"
                        type="text" placeholder="Find your notes..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value) }/>
                    <button 
                        className="px-2 py-2 border rounded-md cursor-pointer">Find</button>
                  </div>
                </form>
        </div>
    </div>
  )
}

export default SideBar