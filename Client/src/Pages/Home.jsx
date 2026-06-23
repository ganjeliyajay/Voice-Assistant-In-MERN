import React, { useEffect, useState } from "react";
import Logout from "./Logout";
import Hero from "../Components/Hero";
import { useDispatch, useSelector } from "react-redux";
import UpdateAssistantName from "./UpdateAssistantName";
import AiBackground from "../Components/AiBackground";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { autoLogin } from "../Redux/Thunk/UserThunk";

export default function Home() {
  const { user } = useSelector((s) => s.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const username = user?.data?.userName;

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* Background */}
      <AiBackground />

      <div className="absolute inset-0 backdrop-blur-[3px] bg-black/20">
        {/* Username */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-8 z-40">
          <h1 className="text-white text-lg sm:text-xl md:text-2xl font-semibold tracking-wide">
            Hello, <span className="text-blue-400 font-bold">{username}</span>
          </h1>
        </div>

        {/* Mobile Menu Button */}
        <div className="absolute top-4 right-4 sm:hidden z-50">
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-blue-500/20 transition"
          >
            {!menuOpen && <Menu className="text-blue-300" size={24} />}
          </button>
        </div>

        {/* Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-[260px] bg-black/80 backdrop-blur-3xl border-l border-white/10 shadow-2xl z-50 transform transition-transform duration-300 
                ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h2 className="text-white text-lg font-semibold">Menu</h2>

            <button
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-red-400 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* User Info */}
          <div className="px-4 py-3 border-b border-white/10">
            <p className="text-gray-400 text-xs">Logged in as</p>

            <p className="text-blue-400 font-semibold">{username}</p>
          </div>

          {/* Sidebar Options */}
          <div className="flex flex-col gap-3 p-4">
            <div className="p-3 rounded-lg hover:bg-blue-500/20 transition cursor-pointer">
              <UpdateAssistantName />
            </div>

            <div className="p-3 rounded-lg hover:bg-red-500/20 transition cursor-pointer">
              <Logout />
            </div>
          </div>
        </div>

        {/* Desktop Left Buttons */}
        <div className="hidden sm:flex absolute left-6 bottom-[6%] flex-col gap-4 z-50">
          <div className="group flex items-center">
            <div className=" p-3 rounded-xl cursor-pointer transition shadow-lg">
              <UpdateAssistantName />
            </div>

            <span className="ml-3 text-blue-300 text-sm opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition duration-300">
              Update Name
            </span>
          </div>

          <div className="group flex items-center">
            <div className="p-3 cursor-pointer transition shadow-lg">
              <Logout />
            </div>

            <span className="ml-3 text-red-400 text-sm opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition duration-300">
              Logout
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="flex items-center justify-center h-full relative z-10 px-4 sm:px-6">
          <Hero />
        </div>
      </div>
    </div>
  );
}
