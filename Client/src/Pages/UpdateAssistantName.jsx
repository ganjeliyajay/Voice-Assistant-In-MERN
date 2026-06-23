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
          className="flex items-center justify-center sm:justify-start gap-2 w-full
                        px-3 sm:px-4 py-2 sm:py-3 rounded-xl
                        bg-white/10 backdrop-blur-md border border-cyan-400/30
                        text-white hover:bg-cyan-500/20
                        transition-all duration-300
                        shadow-[0_0_12px_rgba(34,211,238,0.35)]"
        >
          <FaEdit className="text-blue-400 text-xl" />

          {/* Title only mobile */}
          <span className="text-sm font-medium sm:hidden">Update Name</span>
        </button>
      )}
    </div>
  );
}
