import React from 'react'
import Logout from './Logout'
import Hero from '../Components/Hero'
import { useSelector } from 'react-redux';
import UpdateAssistantName from './UpdateAssistantName';

export default function Home() {

    const { user } = useSelector(s => s.users)

    const username = user?.data?.userName

    return (
        <div className="relative w-full h-[100vh] bg-gradient-to-t from-black to-blue-950 overflow-hidden">
            {/* 🌟 Stylish top-left greeting */}
            <div className="absolute top-6 left-8 z-50 sm:fixed">
                <h1 className="text-white text-2xl font-semibold tracking-wide ">
                    Hello, <span className="text-blue-400 font-bold">{username}</span>
                </h1>
            </div>

            {/* Main Content (takes rest of screen) */}
            <div className="relative z-10">
                <Hero />
                <UpdateAssistantName/>
                <Logout />
            </div>
        </div>
    );
}


