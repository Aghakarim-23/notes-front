import React, { useEffect, useState } from "react";
import api from "../api/api";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar'

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [deletingUser, setDeletingUser] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    const getAllUser = async () => {
      try {
        const { data } = await api.get("users", {
          headers: {
            Authorization: `Bearer: ${token}`,
          },
        });
        console.log(data);
        setUsers(data.data.users);
      } catch (error) {
        if (error.response?.status === 403) {
          navigate("/forbidden");
        }
        console.error(error);
      }
    };
    getAllUser();
  }, []);

  const deleteUser = async (id) => {
    setDeletingUser(id);
    setUsers((prev) => prev.filter((item) => item._id !== id));
    try {
      const res = await api.delete(`users/${id}` , {
        headers: {
            Authorization: `Bearer ${token}`
        }
      });
      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingUser(null);
    }
  };

  return (
    <div className="overflow-hidden">
      {token && <Navbar/>}
    <div className="overflow-x-auto px-5 pb-8">
      <table className="mx-auto min-w-max mt-20 overflow-x-scroll">
          <thead>
            <tr className="bg-green-400">
              <th className="border px-3 ">No</th>
              <th className="border py-3 px-3 text-white border-black">Email</th>
              <th className="border py-3 px-3 text-white border-black">
                Yaradilib
              </th>
              <th className="border py-3 px-3 text-white border-black">Role</th>
              <th className="border py-3 px-3 text-white border-black">
                Operation
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td className="border px-3 ">{index + 1}</td>
                <td className="border px-3 ">{user.email}</td>
                <td
                  className={`border px-3 ${
                    user.role === "admin" && "bg-green-200"
                  }`}
                >
                  {user.role}
                </td>
                <td className="border px-3 ">
                  {(() => {
                    const date = new Date(user.createdAt);
                    return `${date.getDate()}-${
                      date.getMonth() + 1
                    }-${date.getFullYear()}`;
                  })()}
                </td>
                <td
                  onClick={() => deleteUser(user._id)}
                  className="border px-3 text-center bg-red-500 text-white border-black cursor-pointer hover:opacity-50"
                >
                  {deletingUser === user._id ? "Silinir..." : "Sil"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
    </div>
  );
};

export default Admin;
