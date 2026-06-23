import React, { useEffect, useRef, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../Redux/Thunk/UserThunk";
import { Bounce, toast } from "react-toastify";

import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";
import { motion } from "framer-motion";

export default function Register() {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  const { loading } = useSelector((s) => s.users);

  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await dispatch(register(data)).unwrap();

      navigate("/assistant");

      toast.success("Register successfully", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      toast.warn(error, {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  // Vanta Background
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE: THREE,
          backgroundColor: 0x000000,
          color: 0x3b82f6,
          points: 14,
          maxDistance: 25,
          spacing: 18,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          scale: 1,
          scaleMobile: 1,
        }),
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      className="relative w-full min-h-screen flex justify-center items-center px-4"
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

      {/* Register Card */}
      <motion.form
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        onSubmit={handleRegister}
        className="register-card relative z-10
        w-full max-w-[420px]
        flex flex-col gap-6
        px-6 sm:px-10
        py-8 sm:py-12
        bg-white/10 backdrop-blur-2xl
        border border-cyan-400/40
        rounded-[24px] sm:rounded-[30px]"
      >
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-white text-[24px] sm:text-[30px] font-semibold tracking-wide">
            Create Account
          </h1>

          <p className="text-gray-300 text-xs sm:text-sm">
            Register to use{" "}
            <span className="text-cyan-400">Virtual Assistant</span>
          </p>
        </div>

        {/* Name */}
        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          required
          onChange={onChange}
          className="h-[50px] sm:h-[55px] px-4 sm:px-5 rounded-xl
          bg-black/40 border border-white/20
          text-white placeholder-gray-400
          focus:border-cyan-400 focus:shadow-[0_0_15px_cyan]
          outline-none transition-all"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          required
          onChange={onChange}
          className="h-[50px] sm:h-[55px] px-4 sm:px-5 rounded-xl
          bg-black/40 border border-white/20
          text-white placeholder-gray-400
          focus:border-cyan-400 focus:shadow-[0_0_15px_cyan]
          outline-none transition-all"
        />

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            name="password"
            required
            onChange={onChange}
            className="w-full h-[50px] sm:h-[55px] px-4 sm:px-5 pr-12 rounded-xl
            bg-black/40 border border-white/20
            text-white placeholder-gray-400
            focus:border-cyan-400 focus:shadow-[0_0_15px_cyan]
            outline-none transition-all"
          />

          {showPassword ? (
            <IoEyeOff
              className="absolute right-4 top-[14px] sm:top-[16px] text-gray-300 cursor-pointer hover:text-cyan-400 transition"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <IoEye
              className="absolute right-4 top-[14px] sm:top-[16px] text-gray-300 cursor-pointer hover:text-cyan-400 transition"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        {/* Button */}
        <button
          className="register-btn h-[50px] sm:h-[55px] rounded-xl font-semibold text-black
          bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>

        {/* Sign In */}
        <p
          className="text-gray-300 text-sm sm:text-base text-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          Already have an account?
          <span className="text-cyan-400 ml-1 hover:underline"> Sign In</span>
        </p>
      </motion.form>

      {/* Animations */}
      <style>
        {`
        .register-card{
          animation: float 6s ease-in-out infinite, glow 3s ease-in-out infinite alternate;
          box-shadow: 0 0 40px rgba(0,255,255,0.3);
        }

        .register-btn{
          background-size:200%;
          animation: shine 4s linear infinite;
        }

        @keyframes float{
          0%,100%{transform:translateY(0)}
          50%{transform:translateY(-12px)}
        }

        @keyframes glow{
          0%{box-shadow:0 0 25px rgba(0,255,255,0.3)}
          100%{box-shadow:0 0 60px rgba(0,255,255,0.9)}
        }

        @keyframes shine{
          0%{background-position:0%}
          100%{background-position:200%}
        }
        `}
      </style>
    </div>
  );
}
