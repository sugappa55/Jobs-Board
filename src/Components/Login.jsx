import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import GoogleButton from 'react-google-button';
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



export default function Login() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [creds,setCreds]=React.useState({})
  const {user,Logout,Login,loginWithGoogle}=React.useContext(Data)
  const handleChange=(e)=>{
    let {id,value}=e.target;
    setCreds({
      ...creds,
      [id]:value
    })

  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    Login(creds.email,creds.password)
  }

  return (
    <div>
    {
      user?(
        <button onClick={()=>Logout()} className='mr-5  px-4 py-1'  >Logout</button>
      ):(
       <div>
         <Button className='text-white mr-5' style={{color:"black"}}  onClick={handleOpen}>Login</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} >
          <p onClick={handleClose} className='absolute text-gray-300 top-4 right-4 cursor-pointer' ><AiOutlineClose/></p>
                     
            
              <h2 className='font-bold text-white text-2xl mb-4'>Log In</h2>
         <form onSubmit={(e)=>handleSubmit(e)} className='h-full w-full flex flex-col gap-4 '>
         <input  id="email" className="w-[100%] h-[2rem] border border-gray-50 bg-transparent   rounded    text-white"   type="email" placeholder='Enter Email' onChange={handleChange} />
           <input  id="password" className="w-[100%] h-[2rem] border border-gray-50 bg-transparent rounded text-white"  type="password" placeholder='Enter Password'  onChange={handleChange}/>
           <input  className="w-[100%] h-[2rem] border border-gray-50 bg-transparent rounded text-white cursor-pointer"  type="submit" value="Login" />
         </form>
         <p className='text-white text-center my-2'>Or</p>
         <GoogleButton onClick={()=>loginWithGoogle()} style={{width:"100%",outline:"none"}} />
          </Box>
        </Modal>
       </div>
      )
    }
    </div>
   
  );
}
