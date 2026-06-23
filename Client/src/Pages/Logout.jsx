import React from "react";
import { TbLogout } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Thunk/UserThunk";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export default function Logout() {
  const { loading } = useSelector((s) => s.users);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();

    try {
      dispatch(logout()).unwrap();
      navigate("/");

      toast.success("Logout successfully", {
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

  return (
    <div className="flex items-center justify-center w-full">
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-white/20 border-t-red-400 rounded-full animate-spin"></div>
        </div>
      ) : (
        <button
          onClick={handleLogout}
          className="flex items-center justify-center sm:justify-start gap-2 w-full
                        px-3 sm:px-4 py-2 sm:py-3 rounded-xl
                        bg-white/10 backdrop-blur-md border border-red-400/30
                        text-white hover:bg-red-500/20
                        transition-all duration-300
                        shadow-[0_0_12px_rgba(248,113,113,0.35)]"
        >
          <TbLogout className="text-xl text-red-400" />

          {/* Title only mobile */}
          <span className="text-sm font-medium sm:hidden">Logout</span>
        </button>
      )}
    </div>
  );
}
