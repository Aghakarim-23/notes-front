import React, { use, useState } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../context/AuthContext";
import { FaBars } from "react-icons/fa6";
import SideBar from "./SideBar";
import api from "../api/api";

const Navbar = ({search,setSearch}) => {
  const { user, token, setToken, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [isOpenShowModal, setIsOpenShowModal] = useState(true);

  const handleSubmit = async () => {
    try {
      const res = await api.get(`/notes/search?/search=${search}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex justify-between h-24 px-4 items-center relative  ">
      <Link to={"/notes"} className="text-[20px]">
        Notes
      </Link>
      {/* <div className='space-x-4  font-light border rounded-full px-4'>
          {user?.role === "admin" && <Link to={'/admin'} className='text-[20px] hover:opacity-60 transition'>Admin</Link>}
          {user?.role === "admin" && <Link to={'/all-notes'} className='text-[20px] hover:opacity-60 transition'>All Posts</Link>}
        </div> */}
      <form onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
      >

        <div>
          <input 
              className="rounded-md border pl-2 py-2"
              type="text" placeholder="Find your notes..." 
              value={search}
              onChange={(e) => setSearch(e.target.value) }/>
          <button 
              onClick={handleSubmit}
              className="px-2 py-2 border rounded-md cursor-pointer">Find</button>
        </div>
      </form>
      <div
        className="flex flex-col relative"
        onClick={() => setShowProfile((prev) => !prev)}
      >
        <div className="flex gap-2 cursor-pointer">
          <CgProfile className="text-[22px]" />
          <div>{user && user.username}</div>
        </div>
        {showProfile && (
          <div
            className={`flex flex-col  justify-center items-center bg-white absolute  z-20  border-zinc-300 rounded-md border ${
              user && user.role === "admin"
                ? "top-10 -left-2 w-[110px] text-[14px]"
                : "top-10 -left-9 w-[110px] text-[14px]"
            }`}
          >
            <button
              className="w-full cursor-pointer p-3  font-medium hover:opacity-60 border-b transition "
              onClick={() => logout()}
            >
              Logout
            </button>
            <Link
              to={"/change-password"}
              className="w-full text-center p-3 cursor-pointer  font-medium hover:opacity-60 transition "
            >
              Change password
            </Link>
          </div>
        )}
      </div>

      {user && user.role === "admin" && (
        <div
          onClick={() => {
            setIsOpenShowModal(!isOpenShowModal);
          }}
        >
          <FaBars className="text-2xl cursor-pointer" />
        </div>
      )}

      {user?.role === "admin" && (
        <SideBar
          isOpenShowModal={isOpenShowModal}
          setIsOpenShowModal={setIsOpenShowModal}
        />
      )}
    </div>
  );
};

export default Navbar;
