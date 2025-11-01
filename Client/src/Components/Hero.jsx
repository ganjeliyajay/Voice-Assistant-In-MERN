import React, { useEffect, useRef, useState } from "react";
import Ai from "../assets/Ai-image/image.png";
import { useDispatch } from "react-redux";
import { getGeminiResponse } from "../Redux/Thunk/GeminiThunk";

export default function Hero() {
    const dispatch = useDispatch();
    const [listening, setListening] = useState(false);
    const [transcriptText, setTranscriptText] = useState("");
    const [aiResponse, setAiResponse] = useState("");
    const [response, setResponse] = useState('')



    const synth = window.speechSynthesis;
    const recognitionRef = useRef(null);
    const isSpeakingRef = useRef(false);
    const isRecognizingRef = useRef(false);
    const keepAliveInterval = useRef(null);

    /* 🗣️ Speak in Hindi Voice Only */
    const speak = (text) => {
        if (!text) return;

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "hi-IN";
        utterance.rate = 1.05;
        utterance.pitch = 1;
        utterance.volume = 1;

        const voices = synth.getVoices();
        const preferredVoice =
            voices.find((v) => v.lang === "hi-IN") ||
            voices.find((v) => v.name.toLowerCase().includes("google hindi")) ||
            voices.find((v) => v.lang === "en-IN") ||
            voices[0];

        if (preferredVoice) utterance.voice = preferredVoice;

        isSpeakingRef.current = true;
        synth.cancel();
        synth.speak(utterance);

        utterance.onend = () => {
            isSpeakingRef.current = false;
            setAiResponse("");
            setTimeout(() => startListening(), 400);
        };
    };

    /* 🎯 Handle Commands */
    const handleCommand = (data) => {
        const { type, userInput, response } = data;
        speak(response);

        if (type === "google-search") {
            const query = encodeURIComponent(userInput);
            window.open(`https://www.google.com/search?q=${query}`, "_blank");
        } else if (type === "calculator-open") {
            window.open(`https://www.google.com/search?q=calculator`, "_blank");
        } else if (type === "instagram-open") {
            window.open(`https://www.instagram.com/`, "_blank");
        } else if (type === "facebook-open") {
            window.open(`https://www.facebook.com/`, "_blank");
        } else if (type === "weather-show") {
            window.open(`https://www.google.com/search?q=weather`, "_blank");
        } else if (type === "youtube-search" || type === "youtube-play") {
            const query = encodeURIComponent(userInput);
            window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank");
        }
    };

    /* 🎙️ Start Listening */
    const startListening = () => {
        const recognition = recognitionRef.current;
        if (!recognition) return;

        // ✅ Prevent double starts
        if (isSpeakingRef.current || isRecognizingRef.current) return;

        try {
            console.log("🎧 Starting recognition...");
            recognition.start();
            isRecognizingRef.current = true;
        } catch (error) {
            if (error.name !== "InvalidStateError") {
                console.error("Recognition start error:", error);
            }
        }
    };

    /* ⚙️ Setup Speech Recognition */
    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then(() => console.log("🎤 Microphone permission granted"))
            .catch(() => alert("कृपया माइक्रोफोन की अनुमति दें।"));

        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech recognition not supported. Use Chrome browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognitionRef.current = recognition;

        recognition.onstart = () => {
            isRecognizingRef.current = true;
            setListening(true);
            console.log("🎧 Listening started...");
        };

        recognition.onend = () => {
            isRecognizingRef.current = false;
            setListening(false);

            // ✅ Restart only if not speaking
            if (!isSpeakingRef.current) {
                setTimeout(() => {
                    if (!isRecognizingRef.current && !isSpeakingRef.current) {
                        console.log("🔄 Restarting after end...");
                        startListening();
                    }
                }, 20000);
            }
        };

        recognition.onerror = (event) => {
            console.warn("Recognition error:", event.error);
            isRecognizingRef.current = false;
            setListening(false);

            if (event.error !== "aborted" && !isSpeakingRef.current) {
                setTimeout(() => {
                    if (!isRecognizingRef.current && !isSpeakingRef.current) {
                        console.log("⚠️ Restarting after error...");
                        startListening();
                    }
                }, 1200);
            }
        };

        recognition.onresult = async (e) => {
            const transcript =
                e.results[e.results.length - 1][0].transcript.trim();
            console.log("🗣️ Heard:", transcript);
            setTranscriptText(transcript);

            if (transcript.toLowerCase().includes("assistant")) {
                recognition.stop();
                setListening(false);

                const res = await dispatch(getGeminiResponse(transcript));
                const data = res.payload;
                setResponse(data.response)
                if (data) handleCommand(data);
            }
        };

        // 👋 Greet the user once
        const greet = new SpeechSynthesisUtterance(
            "नमस्ते! मैं आपकी वर्चुअल असिस्टेंट हूँ। मैं आपकी कैसे मदद कर सकती हूँ?"
        );
        greet.lang = "hi-IN";
        synth.speak(greet);

        // ✅ Start listening initially
        startListening();

        // ♻️ Keep-alive check (every 15s)
        keepAliveInterval.current = setInterval(() => {
            if (!isRecognizingRef.current && !isSpeakingRef.current) {
                console.log("♻️ Auto restarting recognition...");
                startListening();
            }
        }, 15000);

        // 🧹 Cleanup on unmount
        window.onbeforeunload = () => {
            recognition.stop();
            synth.cancel();
        };

        return () => {
            recognition.stop();
            synth.cancel();
            clearInterval(keepAliveInterval.current);
            setListening(false);
        };
    }, []);

    /* 🎨 UI */
    return (
        <div className="w-full flex flex-col justify-center items-center gap-6 bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-center px-4 relative min-h-screen">
            {/* Listening Indicator */}
            <div
                className={`absolute top-5 right-5 w-4 h-4 rounded-full ${listening
                    ? "bg-green-400 animate-pulse"
                    : "bg-gray-500"
                    }`}
            ></div>

            {/* AI Avatar */}
            <img
                src={Ai}
                alt="AI"
                className="w-[180px] h-[180px] object-cover rounded-full shadow-[0_0_30px_#38bdf8] animate-[pulse_2s_infinite]"
            />

            {/* Assistant Name */}
            <h1 className="text-4xl font-bold text-white tracking-wider mt-4 drop-shadow-[0_0_10px_#38bdf8]">
                Virtual <span className="text-blue-400">Assistant</span>
            </h1>

            {/* AI Response */}
            <p className="text-gray-300 text-lg max-w-[600px] leading-relaxed animate-fade-in">
                {aiResponse ||
                    "“Hello! I’m here to help you — just speak your command.”"}
            </p>

            {/* Listening Status */}
            <p className="text-blue-400 text-lg italic tracking-wide animate-pulse">
                {/* {listening ? "Listening..." : "Not Listening"} */}
                {listening ? (
                    <div className="flex gap-2 mt-4">
                        <span className="w-3 h-3 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
                        <span className="w-3 h-3 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.1s]"></span>
                        <span className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></span>
                    </div>
                ) : "Not Listening"}
            </p>


            {/* Transcript */}
            <p className="text-white text-base max-w-[700px] opacity-80 mt-2">
                {/* <span className="text-gray-400">Transcript:</span> <br /> */}
                <span className="text-blue-300">
                    "{transcriptText || "Say 'Assistant' to activate me"}"
                    
                        <p className="mt-3 text-blue-200 text-mg leading-relaxed">
                            {response}
                        </p>
                    
                </span>
            </p>
        </div>
    );
}
