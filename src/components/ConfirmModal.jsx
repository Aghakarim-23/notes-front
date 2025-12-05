import React from 'react'

const ConfirmModal = ({isOpenModal, setIsOpenModal, onConfirm}) => {
  return (
  isOpenModal && (
       <div className='fixed bg-black/60 inset-0 flex justify-center items-center'>
      <div className='bg-white flex flex-col justify-center items-center gap-10 p-10 shadow-2xl max-w-[200px] md:max-w-[600px] w-full rounded-md'>
          <p className='md:text-2xl text-center '>Are you sure to delete this user ?</p>
          <div className='flex gap-6 md:gap-14'>
              <button 
                  onClick={() => setIsOpenModal(!isOpenModal)}
                  className='bg-blue-500 text-white rounded-md px-4 md:px-8 py-2 hover:opacity-80 cursor-pointer'>No</button>
              <button 
                   onClick={() => {
                    onConfirm()
                    setIsOpenModal(!isOpenModal)
                   }}
                  className='bg-red-500 text-white rounded-md px-4 md:px-8 py-2 hover:opacity-80 cursor-pointer'>Yes</button>
          </div>
      </div>
    </div>
  )
  )
}

export default ConfirmModal