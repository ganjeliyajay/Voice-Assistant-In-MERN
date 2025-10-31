import React from 'react';
import Ai from '../assets/Ai-image/image.png';

export default function Hero() {
    return (
        <div className="w-full h-[100vh] flex flex-col justify-center items-center gap-6 
                        bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-center px-4">

            {/* AI Avatar */}
            <img
                src={Ai}
                alt="AI"
                className="w-[180px] h-[180px] object-cover rounded-full 
                           shadow-[0_0_30px_#38bdf8] animate-[pulse_2s_infinite]"
            />

            {/* Assistant Name */}
            <h1 className="text-4xl font-bold text-white tracking-wider mt-4 
                           drop-shadow-[0_0_10px_#38bdf8]">
                Virtual <span className="text-blue-400">Assistant</span>
            </h1>

            {/* AI Response or Greeting */}
            <p className="text-gray-300 text-lg max-w-[600px] leading-relaxed 
                          animate-fade-in">
                “Hello! I’m here to help you with anything — just speak or type your command.”
            </p>

            {/* User Question */}
            <p className="text-blue-400 text-lg italic tracking-wide animate-pulse">
                Listening for your question...
            </p>

            {/* Transcript (Dynamic speech output area) */}
            <p className="text-white text-base max-w-[700px] opacity-80 mt-2">
                <span className="text-gray-400">Transcript:</span> <br />
                <span className="text-blue-300">"What’s the weather today?"</span>
            </p>
        </div>
    );
}
