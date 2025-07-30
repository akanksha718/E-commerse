import React from 'react'

const UnAuthPage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      <div className='bg-white p-8 rounded-2xl shadow-lg text-center max-w-md'>
        <h1 className='text-4xl font-bold text-red-500 mb-4'>403</h1>
        <h2 className='text-xl font-semibold mb-2'>Unauthorised Access</h2>
        <p className='text-gray-600 mb-6'>You don't have permision to view this page</p>
      </div>
    </div>
  )
}

export default UnAuthPage
