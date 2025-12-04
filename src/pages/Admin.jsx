import React, { useEffect, useState } from "react";
import api from "../api/api";

const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUser = async () => {
      try {
        const {data} = await api.get("users");
        console.log(data);
        setUsers(data.data.users);
      } catch (error) {
        console.error(error);
      }
    };
    getAllUser();
  }, []);

  const deleteUser = () => {
    try {
        console.log("error")
    } catch (error) {
        console.error(error)
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <table className="">
        <thead >``
          <tr className="bg-green-400">
            <th className="border py-3 px-3 text-white border-black">Email</th>
            <th className="border py-3 px-3 text-white border-black">Yaradilib</th>
            <th className="border py-3 px-3 text-white border-black">Operation</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td className="border px-3 ">{user.email}</td>
              <td className="border px-3 ">{(
                () => {
                const date = new Date(user.createdAt)
                return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
              }
              )()}</td>
              
              <td 
                onClick={() => deleteUser()}
                className="border px-3 text-center bg-red-500 text-white border-black cursor-pointer hover:opacity-50">
                sil
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
