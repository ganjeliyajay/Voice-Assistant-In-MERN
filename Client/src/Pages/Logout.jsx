import React from "react";
import { TbLogout } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Thunk/UserThunk";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export default function Logout() {

    const { loading, error } = useSelector(s => s.users)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = (e) => {
        e.preventDefault()
        try {
            dispatch(logout()).unwrap()
            navigate('/')

            //toastify a message
            toast.success('Logout successfully', {
                position: "top-right",
                autoClose: 1000,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                transition: Bounce,
            });
        } catch (error) {
            console.log(error)
            toast.warn(error, {
                position: "top-right",
                autoClose: 1000,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                transition: Bounce,
            });
        }
    }

    return (
        <div
            className="fixed bottom-6 left-6 flex gap-2 px-5 py-2.5 
                 text-white
                 rounded-full shadow-md backdrop-blur-md 
                 cursor-pointer hover:bg-white/20 hover:scale-105 
                 transition-all duration-300"
        >

            {
                loading ? (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                        <div className="w-14 h-14 border-4 border-white/30 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>) : (
                    <button onClick={handleLogout} className=" text-[17px] font-semibold flex items-center gap-2">
                       <p className="hidden md:block">Logout</p>
                        <TbLogout className="text-2xl text-red-400 group-hover:text-red-500 transition-colors duration-300" />
                    </button>
                )
            }

        </div>
    );
}
