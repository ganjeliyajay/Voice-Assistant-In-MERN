import React, { useEffect, useState } from 'react'
import background from '../assets/bg.jpg'
import { IoEye, IoEyeOff } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { autoLogin, login } from '../Redux/Thunk/UserThunk'
import { Bounce, toast } from 'react-toastify'

export default function Login() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, user } = useSelector(s => s.users)

  const [showPassword, setShowPassword] = useState(false)
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const userId = user?.userId

  const onChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  useEffect(() => {
    dispatch(autoLogin())
  }, [dispatch])

  useEffect(() => {
    if (userId) navigate('/home')
  }, [userId, navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await dispatch(login(data)).unwrap()
      navigate('/home')
      toast.success('Login successfully', {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
        transition: Bounce,
      })
    } catch (error) {
      toast.warn(error, {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
        transition: Bounce,
      })
    }
  }

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex justify-center items-center px-4 sm:px-0"
      style={{ backgroundImage: `url(${background})` }}
    >
      <form
        onSubmit={handleLogin}
        className="w-full max-w-[400px] sm:max-w-[500px] bg-[#00000070] backdrop-blur-md rounded-2xl shadow-lg shadow-black 
        flex flex-col items-center justify-center gap-5 px-5 py-8 sm:py-10"
      >
        <h1 className="text-white text-[24px] sm:text-[30px] font-semibold mb-5 text-center">
          Login to <span className="text-blue-400">Virtual Assistant</span>
        </h1>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          name="email"
          required
          onChange={onChange}
          className="w-full h-[55px] sm:h-[60px] outline-none border border-white bg-transparent text-white placeholder-gray-300 
          px-5 rounded-full text-[16px] sm:text-[18px] focus:border-blue-400 transition-all duration-300"
        />

        {/* Password Input */}
        <div className="w-full h-[55px] sm:h-[60px] border border-white bg-transparent text-white rounded-full text-[16px] sm:text-[18px] relative flex items-center">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            required
            onChange={onChange}
            className="w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-5 pr-12"
          />
          {showPassword ? (
            <IoEyeOff
              className="absolute right-5 w-6 h-6 text-white cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <IoEye
              className="absolute right-5 w-6 h-6 text-white cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        {/* Button */}
        <button
          className="w-full sm:w-[150px] h-[50px] sm:h-[60px] mt-4 text-black font-semibold bg-white rounded-full 
          text-[17px] sm:text-[19px] hover:bg-blue-400 transition-all duration-300"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>

        <p
          className="text-white text-[16px] sm:text-[18px] mt-2 text-center cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Don’t have an account? <span className="text-blue-400">Sign Up</span>
        </p>
      </form>
    </div>
  )
}
