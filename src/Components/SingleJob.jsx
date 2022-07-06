import React from 'react'
import { Link } from 'react-router-dom'


const SingleJob = ({e}) => {
  const numberWithCommas=(x)=>{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  return (
    <div key={e.id} className="w-full h-auto shadow-md px-3 py-1 bg-white rounded-lg flex justify-between ">
           <div>
           <h1 className='text-xl'> Job Title:{e.title}</h1>
            <h2 className='text-lg'>{e.company}{ "  ,"} {e.location}</h2>
            <h3><span className='font-bold'>Salary</span>  :  {numberWithCommas(e.salary)} per Year</h3>
           </div>
            
            <div className='flex items-center'><button className=' right-0 top-4 md:mr-4 sm:mr-2  border border-black rounded px-2 py-1 h-12 w-[120px]'><Link to={`/jobs/${e.id}`}>Know more</Link></button>
         </div>
             </div>
  )
}

export default SingleJob
