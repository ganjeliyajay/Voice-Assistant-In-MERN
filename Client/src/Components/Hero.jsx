import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Ai from "../assets/Ai-image/image.png";
import { useDispatch, useSelector } from "react-redux";
import { getGeminiResponse } from "../Redux/Thunk/GeminiThunk";
import { getUser } from "../Redux/Thunk/UserThunk";
import { Mic, MicOff } from "lucide-react"; // 🧩 install lucide-react: npm i lucide-react

export default function Hero() {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.users);

  const username = user?.data?.userName || "User";
  const assistantName = user?.data?.assistantName || "Assistant";

  const [listening, setListening] = useState(false);
  const [transcriptText, setTranscriptText] = useState("");
  const [response, setResponse] = useState("");

  const isSpeakingRef = useRef(false);
  const recognitionRef = useRef(null);
  const synth = window.speechSynthesis;

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // 🎤 Start recognition manually
  const startRecognition = () => {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.start();
      console.log("🎧 Mic started");
    } catch (err) {
      console.warn("Mic start error:", err);
    }
  };

  // 🔇 Stop recognition manually
  const stopRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      console.log("🛑 Mic stopped");
    }
  };

  // 🗣️ Speak
  const speak = (text) => {
    if (!text) return;
    stopRecognition();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";
    const voices = synth.getVoices();
    const hindiVoice = voices.find((v) => v.lang === "hi-IN");
    if (hindiVoice) utterance.voice = hindiVoice;
    synth.cancel();
    synth.speak(utterance);
    utterance.onend = () => {
      console.log("✅ Done speaking");
    };
  };

  // 🎯 Handle Command
  const handleCommand = (data) => {
    const { type, userInput, response } = data;
    speak(response);
    const actions = {
      "google-search": () =>
        window.open(`https://www.google.com/search?q=${encodeURIComponent(userInput)}`, "_blank"),
      "calculator-open": () =>
        window.open("https://www.google.com/search?q=calculator", "_blank"),
      "instagram-open": () => window.open("https://www.instagram.com/", "_blank"),
      "facebook-open": () => window.open("https://www.facebook.com/", "_blank"),
      "weather-show": () =>
        window.open("https://www.google.com/search?q=weather", "_blank"),
      "youtube-search": () =>
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(userInput)}`, "_blank"),
      "youtube-play": () =>
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(userInput)}`, "_blank"),
    };
    if (actions[type]) actions[type]();
  };

  // 🧠 Setup speech recognition once
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognitionRef.current = recognition;

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => console.log("✅ Mic access granted"))
      .catch(() => alert("⚠️ Please allow microphone access."));

    recognition.onstart = () => {
      console.log("🎧 Listening...");
      setListening(true);
    };

    recognition.onend = () => {
      console.log("🛑 Stopped listening");
      setListening(false);
    };

    recognition.onerror = (e) => {
      console.warn("⚠️ Recognition error:", e.error);
      setListening(false);
    };

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      console.log("🎧 Heard:", transcript);
      setTranscriptText(transcript);

      if (transcript.toLowerCase().includes(assistantName.toLowerCase())) {
        stopRecognition();
        try {
          const data = await dispatch(getGeminiResponse(transcript)).unwrap();
          const aiResponse =
            data?.response ||
            data?.data?.response ||
            "Sorry, I didn’t understand that.";
          setResponse(aiResponse);
          handleCommand({ ...data, response: aiResponse, userInput: transcript });
        } catch (error) {
          console.error("Gemini error:", error);
          setResponse("Error processing your request.");
        }
      }
    };

    // 🎤 Initial greeting
    const greeting = new SpeechSynthesisUtterance(
      `Hello ${username}, I am your ${assistantName}. Tap the mic button to start speaking.`
    );
    greeting.lang = "en-IN";
    synth.speak(greeting);
  }, [assistantName, username, dispatch]);

  // 🎨 UI
  return (
    <div className="w-full flex flex-col justify-center items-center gap-6 bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-center px-4 relative min-h-screen overflow-hidden">
      {/* AI Avatar */}
      <motion.img
        src={Ai}
        alt="AI"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-[140px] h-[140px] object-cover rounded-full shadow-[0_0_30px_#38bdf8] mt-10"
      />

      <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-wider mt-4">
        Virtual <span className="text-blue-400">Assistant</span>
      </h1>

      {response && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gray-800/60 backdrop-blur-md p-4 rounded-xl mt-4 max-w-[90%] sm:max-w-[600px] text-gray-100 shadow-md"
        >
          <p className="text-base sm:text-lg leading-relaxed">{response}</p>
        </motion.div>
      )}

      {/* MIC BUTTON */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          if (listening) stopRecognition();
          else startRecognition();
        }}
        className={`mt-8 flex items-center justify-center w-16 h-16 rounded-full border-4 transition-all duration-300 ${
          listening
            ? "border-red-500 bg-red-500/30 text-red-400 shadow-[0_0_25px_#f87171]"
            : "border-blue-500 bg-blue-500/20 text-blue-400 shadow-[0_0_25px_#38bdf8]"
        }`}
      >
        {listening ? <MicOff size={32} /> : <Mic size={32} />}
      </motion.button>

      {/* Wave animation when listening */}
      {listening && (
        <motion.div
          className="flex gap-1 mt-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 sm:w-2 bg-blue-400 rounded-full"
              variants={{
                hidden: { scaleY: 0.3 },
                visible: {
                  scaleY: [0.3, 1.2, 0.5],
                  transition: {
                    repeat: Infinity,
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: "easeInOut",
                  },
                },
              }}
              style={{ height: "20px" }}
            ></motion.div>
          ))}
        </motion.div>
      )}

      <p className="text-white text-sm sm:text-base max-w-[700px] opacity-80 mt-4">
        <span className="text-blue-300">
          {transcriptText
            ? `"${transcriptText}"`
            : `Tap the mic & say "${assistantName}"`}
        </span>
      </p>
    </div>
  );
}
