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
          <div className="w-8 h-8 border-4 border-white/20  rounded-full animate-spin"></div>
        </div>
      ) : (
        <button
          onClick={handleLogout}
          className="
w-10 h-10
rounded-full
flex items-center justify-center
bg-red-500/15
border border-red-400/30
backdrop-blur-xl
hover:bg-red-500/25
transition-all duration-300
shadow-[0_0_15px_rgba(248,113,113,0.4)]
"
        >
          <TbLogout className="text-xl text-red-400" />
        </button>
      )}
    </div>
  );
}
