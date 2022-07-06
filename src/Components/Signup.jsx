import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Data } from '../Context/DataContext';
import {AiOutlineClose} from "react-icons/ai"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#000',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



export default function Signup() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {createAccount}=React.useContext(Data)
  const [creds,setCreds]=React.useState({})

  const handleChange=(e)=>{
    let {id,value}=e.target;
    setCreds({
      ...creds,
      [id]:value
    })

  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(creds.password!==creds.confirm){alert("both passwords must be same");return}
    createAccount(creds.email,creds.password)
  }

  return (
    <div>
      <Button style={{color:"black"}} onClick={handleOpen}>Sign Up</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
        <p onClick={handleClose} className='absolute text-gray-300 top-4 right-4 cursor-pointer' ><AiOutlineClose/></p>
            <h2 className='font-bold text-white text-2xl mb-4'>Sign Up</h2>
       <form onSubmit={(e)=>handleSubmit(e)} className='h-full w-full flex flex-col gap-4 '>
       <input   id="email"  onChange={handleChange} className="w-[90%] h-[2rem]  text-white border border-gray-50 bg-transparent   rounded"   type="email" placeholder='Enter Email'/>
         <input id="password" onChange={handleChange}  className="w-[90%] h-[2rem] text-white border border-gray-50 bg-transparent rounded"  type="password" placeholder='Enter Password'/>
         <input id="confirm" onChange={handleChange}  className="w-[90%] h-[2rem] text-white border border-gray-50 bg-transparent rounded"  type="password" placeholder='Confirm Password'/>
         <input  className="w-[90%] h-[2rem] border border-gray-50 bg-transparent rounded text-white"  type="submit" value="Signup" />
       </form>
        </Box>
      </Modal>
    </div>
  );
}
