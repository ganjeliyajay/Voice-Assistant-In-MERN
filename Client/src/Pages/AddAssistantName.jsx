import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAssistantName, getUser } from "../Redux/Thunk/UserThunk";
import background from "../assets/bg.jpg";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { useEffect } from "react";

export default function AddAssistantName() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [assistantName, setAssistantName] = useState("");

    const { loading, error } = useSelector(s => s.users)

    const inputHandle = (e) => {
        setAssistantName(e.target.value);
    };

    const formHandle = (e) => {
        e.preventDefault();
        try {
            dispatch(addAssistantName({ assistantname: assistantName })).unwrap();
            navigate('/home')

            toast.success('Assistant name Created!', {
                position: "top-right",
                autoClose: 1000,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                transition: Bounce,
            });
        } catch (err) {
            console.log(error);
            toast.warn(error, {
                position: "top-right",
                autoClose: 1000,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                transition: Bounce,
            });
        }
    };

    return (
        <div
            className="w-full h-screen bg-cover bg-center flex justify-center items-center"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="w-[90%] h-contain max-w-[500px] bg-[#00000062] backdrop-blur-[3px] rounded-xl  shadow-lg shadow-black
               flex flex-col items-center justify-center gap-[20px] p-15 px-[20px] ">
                <h1 className="text-3xl font-bold text-white tracking-wide drop-shadow-[0_0_10px_#38bdf8]">
                    Name Your <span className="text-blue-400">Assistant</span>
                </h1>

                <form onSubmit={formHandle} className="flex flex-col gap-5 w-full">
                    <input
                        type="text"
                        name="assistantname"
                        placeholder="Enter assistant name..."
                        value={assistantName}
                        onChange={inputHandle}
                        className="w-full px-4 py-3 bg-transparent border-2 border-blue-400 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-cyan-300 transition-all duration-300"
                    />


                    <button className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold  bg-white rounded-full text-[19px] hover:bg-blue-400 duration-300 cursor-pointer'>{loading ? "Loading..." : "Save Assistant Name"}</button>
                </form>

                <p className="text-gray-300 text-sm mt-2">
                    ✨ Choose a name like <span className="text-blue-400">Luna</span>,{" "}
                    <span className="text-blue-400">Astra</span>, or{" "}
                    <span className="text-blue-400">Nova</span>!
                </p>
            </div>
        </div>
    );
}
