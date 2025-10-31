import React, { useState } from 'react'
import { IoEye, IoEyeOff } from 'react-icons/io5';
import background from '../assets/bg.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../Redux/Thunk/UserThunk';

export default function Register() {
  const { error, loading } = useSelector(s => s.user)

  const [showPassword, setShowPassword] = useState(false)
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const onChange = async (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }
  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      dispatch(register(data))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='w-full h-[100vh] bg-cover flex justify-center items-center '
      style={{ backgroundImage: `url(${background})` }} >

      <form className='w-[90%] h-[600px] max-w-[500px] bg-[#00000062] backdrop-blur-[3px] rounded-xl  shadow-lg shadow-black
       flex flex-col items-center justify-center gap-[20px] px-[20px]' onSubmit={handleRegister}>

        <h1 className='text-white text-[30px] font-semibold mb-[30px]'>Register to <span className='text-blue-400'>Virtual Assistant</span></h1>

        <input type="text" placeholder='Enter your Name' className='w-full h-[60px] outline-none border-2 border-white bg-transparent  text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' required onChange={onChange} name='name' />

        <input type="email" placeholder='Email' className='w-full h-[60px] outline-none border-2 border-white bg-transparent  text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' required onChange={onChange} name='email' />

        <div className='w-full h-[60px] border-2 border-white bg-transparent  text-white rounded-full text-[18px] relative'>

          <input type={showPassword ? "text" : "password"} placeholder='password' className='w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-[20px] py-[10px]' required onChange={onChange} name='password' />

          {!showPassword && <IoEye className='absolute top-[18px] right-[20px] w-[25px] h-[25px] text-[white] cursor-pointer' onClick={() => setShowPassword(true)} />}

          {showPassword && <IoEyeOff className='absolute top-[18px] right-[20px] w-[25px] h-[25px] text-[white] cursor-pointer' onClick={() => setShowPassword(false)} />}

        </div>
        <p className='text-red-500 text-[17px]'>{error ? error : ''}</p>

        <button className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold  bg-white rounded-full text-[19px] hover:bg-blue-400 duration-300 cursor-pointer'>{loading ? "Loading..." : "Sign Up"}</button>

        <p className='text-[white] text-[18px] cursor-pointer' onClick={() => navigate("/signin")}>Already have an account ? <span className='text-blue-400'>Sign In</span></p>
      </form>

    </div>
  )
}
