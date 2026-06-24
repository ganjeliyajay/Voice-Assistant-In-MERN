import React from "react";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function UpdateAssistantName() {
  const { loading } = useSelector((s) => s.users);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center w-full">
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-white/20 border-t-blue-400 rounded-full animate-spin"></div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/assistant")}
          className="
w-10 h-10
rounded-full
flex items-center justify-center
bg-cyan-500/15
border border-cyan-400/30
backdrop-blur-xl
hover:bg-cyan-500/25
transition-all duration-300
shadow-[0_0_15px_rgba(34,211,238,0.4)]
"
        >
          <FaEdit className="text-blue-400 text-xl" />
        </button>
      )}
    </div>
  );
}
