import React, { useEffect, useState } from "react";
import api from "../api/api";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ConfirmModal from "../components/ConfirmModal";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { token, user: currentUser, updateUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getAllUser = async () => {
      try {
        const { data } = await api.get("users", {
          headers: {
            Authorization: `Bearer: ${token}`,
          },
        });

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
    setUsers((prev) => prev.filter((item) => item._id !== id));
    try {
      const res = await api.delete(`users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingUser(null);
    }
  };

  const handleEditRole = async (e, userId) => {
    const newRole = e.target.value;

    try {
      const res = await api.put(`/users/${userId}/role`, {
        role: newRole,
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );

      if (currentUser._id === userId) {
        updateUser(res.data.user);
      }
      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleEditVerifyStatus = async (e, userId) => {
    const verifyStatus = e.target.value
    try {
      const res = await api.put(`/users/${userId}/verifyStatus`, {
        isVerified: verifyStatus,
      });


      console.log(res.data)

      const tip = res.data.updatedUserVerifyStatus

      console.log("tipe bax", typeof tip )

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isVerified: verifyStatus } : user
        )
      );
      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="overflow-hidden">
      <ConfirmModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        onConfirm={() => deleteUser(selectedUserId)}
      />
      {token && <Navbar />}
      <div className="overflow-x-auto px-5 pb-8">
        <table className="mx-auto min-w-max mt-20 overflow-x-scroll">
          <thead>
            <tr className="bg-green-400">
              <th className="border px-3 text-white border-black">No</th>
              <th className="border py-3 px-3 text-white border-black">
                Username
              </th>
              <th className="border py-3 px-3 text-white border-black">
                Email
              </th>
              <th className="border py-3 px-3 text-white border-black">
                Assign Role
              </th>
              <th className="border py-3 px-3 text-white border-black">Role</th>
              <th className="border py-3 px-3 text-white border-black">
                Assgin verify
              </th>
              <th className="border py-3 px-3 text-white border-black">
                Verified status
              </th>
              <th className="border py-3 px-3 text-white border-black">
                Block status{" "}
              </th>
              <th className="border py-3 px-3 text-white border-black">
                Created{" "}
              </th>
              <th className="border py-3 px-3 text-white border-black">
                Operation
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td className="border px-3 ">{index + 1}</td>
                <td className="border px-3 ">{user.username}</td>
                <td className="border px-3 ">{user.email}</td>
                <td className="border px-3 ">
                  <select
                    value={user.role || ""}
                    onChange={(e) => {
                      handleEditRole(e, user._id)
                    }}
                  >
                    <option value="" disabled>
                      Select role
                    </option>
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td
                  className={`border px-3 ${
                    user.role === "admin" && "bg-green-200"
                  }`}
                >
                  {user.role}
                </td>
                <td className="border px-3 ">
                     <select 
                     value={user.isVerified ? "true" : "false"}
                    onChange={(e) => {
                      handleEditVerifyStatus(e, user._id)
                      console.log("nbu", typeof(e.target.value))
                    }
                    }>
                       <option value="" disabled>
                    Select verify status
                  </option>
                  <option value="true">Verified</option>
                  <option value="false">Not verified</option>
                </select>
                </td>
                <td className="border px-3 text-center">{`${
                  user.isVerified ? "✅" : "❌"
                }`}</td>
                <td className="border px-3 text-center">{`${
                  user.isBlocked ? "✅" : "❌"
                }`}</td>
                <td className="border px-3 ">
                  {(() => {
                    const date = new Date(user.createdAt);
                    return `${date.getDate()}-${
                      date.getMonth() + 1
                    }-${date.getFullYear()}`;
                  })()}
                </td>
                <td
                  onClick={() => {
                    setSelectedUserId(user._id);
                    setIsOpenModal(!isOpenModal);
                  }}
                  className="border px-3 text-center bg-red-500 text-white border-black cursor-pointer hover:opacity-50"
                >
                  Delete
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
