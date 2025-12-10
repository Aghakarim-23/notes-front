import React, { use, useState } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../context/AuthContext";
import { FaBars } from "react-icons/fa6";
import SideBar from "./SideBar";

const Navbar = () => {
  const { user, token, setToken, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [isOpenShowModal, setIsOpenShowModal] = useState(true);

  return (
    <div className="flex justify-between h-24 px-4 items-center relative  ">
      <Link to={"/notes"} className="text-[20px]">
        Notes
      </Link>
      {/* <div className='space-x-4  font-light border rounded-full px-4'>
          {user?.role === "admin" && <Link to={'/admin'} className='text-[20px] hover:opacity-60 transition'>Admin</Link>}
          {user?.role === "admin" && <Link to={'/all-notes'} className='text-[20px] hover:opacity-60 transition'>All Posts</Link>}
        </div> */}
      <div
        className="flex flex-col relative"
        onClick={() => setShowProfile((prev) => !prev)}
      >
        <div className="flex gap-2">
          <CgProfile className="text-[22px]" />
          <button>{user && user.username}</button>
        </div>
          {showProfile && (
            <button
              className="bg-white text-red-600 absolute top-10 right-2  cursor-pointer  border-zinc-300 rounded-md border h-8 w-24"
              onClick={() => logout()}
            >
              Logout
            </button>
          )}
  
      </div>
      

      {user && user.role === 'admin' && (
        <div
      
        onClick={() => {
          setIsOpenShowModal(!isOpenShowModal);
        }}
      >
        <FaBars className="text-2xl cursor-pointer" />
      </div>
      )}
      


        {
          user?.role === "admin"  && 
             <SideBar
        isOpenShowModal={isOpenShowModal}
        setIsOpenShowModal={setIsOpenShowModal}
      />
        
        }
     
    </div>
  );
};

export default Navbar;
