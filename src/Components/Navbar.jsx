import React, { useContext } from 'react'
import Signup from './Signup' 
import Login from './Login' 
import { Data } from '../Context/DataContext'
import { Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const {user}=useContext(Data)
  const navigate=useNavigate()
  return (
    <div className='w-full h-16 bg-gray-600  flex items-center px-4'>
        <h1 className='flex-1 cursor-pointer text-xl font-bold' onClick={()=>navigate("/")}>JOB POINT</h1>
          <Login/>
          {user?(<Avatar 
                  className='mr-4'
                  src={user.photoURL}
                  alt={user.displayName||user.email}
                  />) : <Signup/>}
    </div>
  )
}

export default Navbar
