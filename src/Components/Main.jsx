import { Pagination } from '@mui/material'
import axios from 'axios'
import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Data } from '../Context/DataContext'
import SingleJob from './SingleJob'

const Main = () => {
  const {jobs,setjobs,getData}=useContext(Data)
  const ref=useRef()
  const [result,setResult]=useState([])
  const [page,setPage]=useState(1)

  const handleSort=(payload)=>{
    console.log(payload);
      setjobs([...jobs.sort((a,b)=>a[payload]>b[payload]?1:a[payload]<b[payload]?-1:0)])
  }

  const navigate=useNavigate()

const handleSearch=(e)=>{
    axios.get(`https://my-jobs-board-project.herokuapp.com/jobs?q=${e}`).then(({data})=>setResult(data))
}

  const handleFilter=(payload)=>{
    setjobs([...jobs.filter(e=>{
      var arr=e.skills.map(e=>e.toUpperCase())
      console.log(arr);
      return arr.includes(payload.toUpperCase())
    })])
  }


  const debounce=(fun,delay,e)=>{
    if(ref.current)clearTimeout(ref.current);
    ref.current=setTimeout(()=>{fun(e.target.value)},delay)
    }
  return (
    <div className='w-full  flex flex-col '>
      <div className='  lg:w-[75%] md:w-[90%] sm:w-full  md:h-16 h-12 m-auto mt-1'>
        <input type="text" placeholder='Search jobs,companies,location,skills ' className='w-full border rounded md:h-full sm:h-12 border-gray-400 pl-4' onChange={(e)=>debounce(handleSearch,1000,e)}  />
        {/* <button className='px-3 py-1 text-xl rounded  w-auto bg-gray-600 hidden md:block'>Search</button>
        <BsSearch className='md:hidden sm:block px-3 py-1 text-xl rounded h-12 w-auto bg-gray-600'/> */}
       <div className=' bg-gray-300 z-10 h-auto absolute lg:w-[75%] md:w-[90%] sm:w-full flex flex-col gap-2 top-30 m-auto'>
       {
          result?.map(e=>(
            <div key={e.id} className="flex justify-around">
              <p>{e.title}</p>
              <button className='border px-2 py-1 border-black rounded mt-1' onClick={()=>navigate(`/jobs/${e.id}`)}>View job</button>
            </div>

          ))
        }
       </div>
      </div>
      <div className='flex lg:w-[75%] md:w-[90%] sm:w-full  md:h-12 h-10 m-auto mt-1 gap-4 justify-center flex-wrap'>
        <select onChange={(e)=>handleSort(e.target.value)} className='bg-gray-300 rounded-lg'>
          <option value="salary">Salary </option>
          <option value="title">Title</option>
          <option value="company">Company Name</option>
        </select>

        <select onChange={(e)=>handleFilter(e.target.value)} className='bg-gray-300 rounded-lg'>
          <option value="React">React </option>
          <option value="css">Css3</option>
          <option value="html">Html5</option>
          <option value="Redux">Redux</option>
          <option value="Git">Git</option>
          <option value="Node">Node</option>
          <option value="Rust">Rust</option>
          <option value="Python">Python</option>
          <option value="Ruby">Ruby</option>
        </select>

        <button className='bg-gray-300 rounded-md px-3 ' onClick={()=>getData()}>Reset All </button>
      </div>
      <div className='lg:w-[75%] md:w-[90%] sm:w-[95%] m-auto  mt-2 flex flex-col gap-2'>
        {jobs?.slice((page-1)*10,page*10).map(e=>(
         <SingleJob e={e} key={e.id}/>
        ))}
      </div>
      <Pagination onChange={(_,num)=>{setPage(num)
      window.scroll(0,60,{behaviour:"smooth"})
      }} className='w-full justify-center flex my-2 ' count={Math.ceil(jobs?.length/10)}/>
    </div>
  )
}

export default Main
