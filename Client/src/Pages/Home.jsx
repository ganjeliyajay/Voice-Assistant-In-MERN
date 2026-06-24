import React, { useEffect, useState } from "react";
import Logout from "./Logout";
import Hero from "../Components/Hero";
import { useDispatch, useSelector } from "react-redux";
import UpdateAssistantName from "./UpdateAssistantName";
import AiBackground from "../Components/AiBackground";
import { Menu, X, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { autoLogin } from "../Redux/Thunk/UserThunk";
import HistoryPage from "../Components/HistoryPage";

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
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      {" "}
      <AiBackground />
      <div className="absolute inset-0 backdrop-blur-[3px] bg-black/20">
        {/* Username */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-8 z-40 max-w-[70%]">
          <h1 className="text-white text-base sm:text-xl md:text-2xl truncate font-semibold tracking-wide">
            Hello, <span className="text-blue-400 font-bold">{username}</span>
          </h1>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex absolute left-6 bottom-[6%] flex-col gap-4 z-50">
          <div className="group flex items-center">
            <div className="p-3 rounded-xl cursor-pointer transition shadow-lg">
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

        {/* Hero */}
        <div className="flex items-center justify-center h-full relative z-10 px-4 sm:px-6">
          <Hero openHistory={() => setShowHistory(true)} />
        </div>

        {/* Mobile Radial Menu */}
        <div className="fixed bottom-5 left-5 sm:hidden z-[999]">
          {/* Update */}
          <div
            className={`absolute transition-all duration-300 ${
              menuOpen
                ? "-translate-y-16 opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div
              className="
      w-11 h-11
      rounded-full
      bg-cyan-500/20
      backdrop-blur-xl
      border border-cyan-400/30
      shadow-[0_0_15px_rgba(34,211,238,0.4)]
      flex items-center justify-center
    "
            >
              <UpdateAssistantName />
            </div>
          </div>

          {/* Logout */}
          <div
            className={`absolute transition-all duration-300 ${
              menuOpen
                ? "-translate-y-30 opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div
              className="
      w-11 h-11
      rounded-full
      bg-red-500/20
      backdrop-blur-xl
      shadow-[0_0_15px_rgba(248,113,113,0.4)]
      flex items-center justify-center
    "
            >
              <Logout />
            </div>
          </div>

          {/* Glow */}
          <div
            className="
          absolute
          -inset-3
          rounded-full
          bg-cyan-500/20
          blur-xl
          animate-pulse
        "
          />

          {/* Main Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
    relative
    w-12 h-12
    rounded-full
    bg-transparent backdrop-blur-xl
    border border-white/20
    flex items-center justify-center
    shadow-[0_0_20px_rgba(34,211,238,0.5)]
    transition-all duration-300
    active:scale-95
  "
          >
            {menuOpen ? (
              <X size={18} className="text-white" />
            ) : (
              <Menu size={18} className="text-white" />
            )}
          </button>
        </div>
      </div>
      {showHistory && <HistoryPage setShowHistory={setShowHistory} />}
    </div>
  );
}
