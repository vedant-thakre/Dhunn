import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const Array = [
    {},

  ]

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://stg.dhunjam.in/account/admin/login', {
          username: username,
          password: password,
      });
      const userData = response.data
      if (response.status === 200 && userData.data) {
          const userId = userData.data.id;
          toast.success('Login successful');
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('id', userId);
          navigate('/admin');
      } else {
          console.error('Unexpected response or missing data:', response);
          toast.error('Error during login. Please try again.');
      }
    } catch (error) {
      // Handle errors from the axios request
      console.error('Error during login:', error.message);
      toast.error('Error during login. Please try again.');
    }
};

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <div className='flex flex-col gap-12 text-center'>
          <h1 className=' text-[32px] font-extrabold'>Venue Admin Login</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 text-[16px] w-[600px] '>
              <input type="text" placeholder='Username' required
                value={username}
                onChange={(e)=> { setUsername(e.target.value)}}
                className=' bg-transparent py-4 px-3 outline-none border-[1px]
                rounded-xl ' />
             <div className='relative'>
                <input
                  type={show ? 'text' : 'password'}
                  placeholder='Password' 
                  value={password} 
                  required
                  onChange={(e) => { setPassword(e.target.value)}}
                  className='bg-transparent w-full py-4 pl-3 pr-10 outline-none border-[1px]
                   rounded-xl '
                />
                {show ? <IoMdEye onClick={() => { setShow(!show)}} className='text-3xl absolute right-2 bottom-3 cursor-pointer' /> : <IoMdEyeOff onClick={() => { setShow(!show)}} className='text-3xl absolute right-2 bottom-3 cursor-pointer' />}
              </div>
            
          <div className='flex flex-col gap-4 mt-7'>
            <button type='submit' className='font-bold w-[600px] py-4 border-none rounded-xl bg-[#6741D9]'
          >Sign in</button>
          <p className=' text-[18px] cursor-pointer'>New Registration?</p>
          </div>
          </form>
        </div>
    </div>
  )
}

export default Login;
