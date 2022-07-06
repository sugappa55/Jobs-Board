import React, { useContext } from 'react'
import {useParams} from "react-router-dom"
import { Data } from '../Context/DataContext'

const Jobpage = () => {
    const {id}=useParams()
    const {jobs,user}=useContext(Data)
    let data=jobs.find(e=>e.id=== +id)
    const numberWithCommas=(x)=>{
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
 
  return (
    <div className='lg:w-[75%] md:w-[90%] sm:w-full h-screen m-auto flex flex-col gap-4 md:px-4 px-2'>
      <h1 className='text-xl'>{data?.title}</h1>
      <h2 className='text-lg'>Company: <span className='font-bold'>{data?.company}</span></h2>
      <h1 className='text-md'>Job Location:{data?.location}</h1>
      <p><span className='font-bold'>Description : </span>{data.desc}</p>
      <p><span className='font-bold'>Responsibilities : </span>{data.responsibilities}</p>
      <div className='flex flex-wrap gap-2'>Skills Required:{data.skills.map((e,i)=><p key={i} className="bg-gray-400 rounded px-3 py-1  uppercase flex items-center  ">{e}</p>)}</div>
      <h1 className='text-lg font-bold'>Salary :{"  "}{numberWithCommas(data.salary)} - {numberWithCommas(data.salary+200000)}  per Year</h1>
        <button className='w-[200px] bg-green-600 px-4 py-2 rounded my-4' onClick={()=>{
          if(!user)alert("please login to your account")
        }}>Apply Now</button>
      
    </div>
  )
}

export default Jobpage
