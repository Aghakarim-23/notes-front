import React, { useEffect, useState } from 'react'
import api from '../api/api'
import BackButton from '../components/shared/BackButton'

const AllNotes = () => {
    const [getAllNotes, setGetAllNotes] = useState([])
    useEffect(() => {
          const getAllUser = async () => {
        try {
            const res = await api.get("notes/getAllNotes")
            setGetAllNotes(res.data.notes)
            console.log(res.data)
        } catch (error) {
            console.error(error.message)
        }
    }

    getAllUser()
    },[])
  return (
        <>
            <BackButton style="absolute top-6 md:top-8 left-6 rounded-full border p-2 cursor-pointer hover:bg-white transition"/>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5 mt-24'>
            {getAllNotes.map(notes => (
                <div key={notes._id}
                    className=''
                >
                    <div
                        className='max-w-[400px]  w-full gap-2 border p-3 rounded-md hover:scale-[1.02] transition'
                    >
                        <div className='flex flex-col gap-4 cursor-pointer '>
                            {/* Post owner */}
                            <div className='flex justify-between'>
                                <span className='font-medium'>{notes.userId?.username}</span>
                                <span className='font-medium text-gray-400'>{new Date(notes.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p>{notes.content}</p>
                        </div>
                    </div>
                </div>
            ))}
                </div>
        </>
  )
}

export default AllNotes