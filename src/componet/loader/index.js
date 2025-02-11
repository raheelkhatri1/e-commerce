import React from 'react'

const Loader = ({show}) => {
  return show && (
    <div className='text-center p-4'>
        <h1>loading....</h1>
    </div>
  )
}

export default Loader