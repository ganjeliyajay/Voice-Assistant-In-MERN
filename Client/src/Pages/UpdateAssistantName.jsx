import React from 'react'
import { FaEdit } from "react-icons/fa";
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export default function UpdateAssistantName() {

    const { loading } = useSelector(s => s.users)

    const navigate = useNavigate()

    return (
        <div
            className="fixed bottom-[14%] left-6 flex gap-2 px-5 py-2.5  text-white rounded-full shadow-md backdrop-blur-md cursor-pointer hover:bg-white/20 hover:scale-105 transition-all duration-300"
        >

            {
                loading ? (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                        <div className="w-14 h-14 border-4 border-white/30 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>) : (
                    <button className=" text-[17px] font-semibold flex items-center gap-2" onClick={()=>navigate('/assistant')}>
                        <p className="hidden md:block">Update Assistant Name</p>
                        <FaEdit className="text-xl text-blue-500 group-hover:text-red-500 transition-colors duration-300" />
                    </button>
                )
            }

        </div>
    )
}
