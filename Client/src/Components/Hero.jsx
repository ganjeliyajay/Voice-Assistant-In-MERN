import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Ai from "../assets/Ai-image/image.png";
import { useDispatch, useSelector } from "react-redux";
import { getGeminiResponse } from "../Redux/Thunk/GeminiThunk";
import { getUser } from "../Redux/Thunk/UserThunk";

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
  const isRecognizingRef = useRef(false);
  const synth = window.speechSynthesis;

  // 🧠 Fetch user once
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // 🗣️ Speak function (auto resume mic after finish)
  const speak = (text) => {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";

    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find((v) => v.lang === "hi-IN");
    if (hindiVoice) utterance.voice = hindiVoice;

    // Stop listening while speaking
    if (recognitionRef.current && isRecognizingRef.current) {
      recognitionRef.current.stop();
      setListening(false);
      isRecognizingRef.current = false;
      console.log("🎤 Mic paused while speaking...");
    }

    isSpeakingRef.current = true;
    synth.cancel(); // Stop any ongoing speech
    synth.speak(utterance);

    utterance.onend = () => {
      console.log("✅ AI finished speaking, restarting mic...");
      isSpeakingRef.current = false;

      // Resume recognition after 1 second
      setTimeout(() => {
        if (!isRecognizingRef.current && recognitionRef.current) {
          startRecognition();
        }
      }, 1000);
    };
  };

  // 🔊 Start recognition safely
  const startRecognition = () => {
    if (!recognitionRef.current) return;
    if (isRecognizingRef.current || isSpeakingRef.current) return;

    try {
      recognitionRef.current.start();
      console.log("🎤 Recognition started");
    } catch (err) {
      if (err.name !== "InvalidStateError")
        console.error("Recognition start failed:", err);
    }
  };

  // ⚙️ Handle command logic
  const handleCommand = (data) => {
    const { type, userInput, response } = data;
    speak(response);

    const actions = {
      "google-search": () =>
        window.open(
          `https://www.google.com/search?q=${encodeURIComponent(userInput)}`,
          "_blank"
        ),
      "calculator-open": () =>
        window.open("https://www.google.com/search?q=calculator", "_blank"),
      "instagram-open": () => window.open("https://www.instagram.com/", "_blank"),
      "facebook-open": () => window.open("https://www.facebook.com/", "_blank"),
      "weather-show": () =>
        window.open("https://www.google.com/search?q=weather", "_blank"),
      "youtube-search": () =>
        window.open(
          `https://www.youtube.com/results?search_query=${encodeURIComponent(
            userInput
          )}`,
          "_blank"
        ),
      "youtube-play": () =>
        window.open(
          `https://www.youtube.com/results?search_query=${encodeURIComponent(
            userInput
          )}`,
          "_blank"
        ),
    };

    if (actions[type]) actions[type]();
  };

  // 🎙️ Speech Recognition setup
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognitionRef.current = recognition;

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => console.log("✅ Microphone access granted"))
      .catch(() =>
        alert("⚠️ Please allow microphone access to use the assistant.")
      );

    recognition.onstart = () => {
      console.log("🎙️ Listening...");
      isRecognizingRef.current = true;
      setListening(true);
    };

    recognition.onend = () => {
      console.log("🛑 Recognition ended");
      isRecognizingRef.current = false;
      setListening(false);
      // only restart if AI not speaking
      if (!isSpeakingRef.current) {
        setTimeout(startRecognition, 1000);
      }
    };

    recognition.onerror = (e) => {
      console.warn("⚠️ Recognition error:", e.error);
      isRecognizingRef.current = false;
      setListening(false);
      if (e.error !== "aborted" && !isSpeakingRef.current) {
        setTimeout(startRecognition, 1000);
      }
    };

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      console.log("🎧 Heard:", transcript);
      setTranscriptText(transcript);

      if (transcript.toLowerCase().includes(assistantName.toLowerCase())) {
        recognition.stop();
        setListening(false);

        try {
          const data = await dispatch(getGeminiResponse(transcript)).unwrap();
          const aiResponse =
            data?.response ||
            data?.data?.response ||
            "Sorry, I didn’t understand that.";
          setResponse(aiResponse);
          handleCommand({ ...data, response: aiResponse, userInput: transcript });
        } catch (error) {
          console.error("Gemini response error:", error);
          setResponse("There was an error processing your request.");
        }
      }
    };

    // 🎤 Greeting once
    const greeting = new SpeechSynthesisUtterance(
      `Hello ${username}, I am your ${assistantName}. What can I help you with today?`
    );
    greeting.lang = "en-IN";
    synth.speak(greeting);

    // Start mic initially after greeting
    setTimeout(() => startRecognition(), 1500);

    return () => {
      recognition.stop();
      setListening(false);
    };
  }, [assistantName, dispatch, username]);

  // 🎨 UI
  return (
    <div className="w-full flex flex-col justify-center items-center gap-6 bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-center px-4 relative min-h-screen overflow-hidden">
      {/* Mic indicator */}
      <div
        className={`absolute top-5 right-5 w-4 h-4 rounded-full ${
          listening ? "bg-green-400 animate-pulse" : "bg-gray-500"
        }`}
      ></div>

      {/* AI Avatar */}
      <motion.img
        src={Ai}
        alt="AI"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-[180px] h-[180px] object-cover rounded-full shadow-[0_0_30px_#38bdf8] animate-[pulse_2s_infinite]"
      />

      <h1 className="text-4xl font-bold text-white tracking-wider mt-4 drop-shadow-[0_0_10px_#38bdf8]">
        Virtual <span className="text-blue-400">Assistant</span>
      </h1>

      {/* Response */}
      {response && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gray-800/60 backdrop-blur-md p-4 rounded-xl mt-4 max-w-[600px] text-gray-100 shadow-md"
        >
          <p className="text-lg leading-relaxed">{response}</p>
        </motion.div>
      )}

      {/* Listening Wave Animation */}
      {listening && (
        <motion.div
          className="flex gap-1 mt-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 bg-blue-400 rounded-full"
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
              style={{ height: "25px" }}
            ></motion.div>
          ))}
        </motion.div>
      )}

      {/* Transcript Hint */}
      <p className="text-white text-base max-w-[700px] opacity-80 mt-4">
        <span className="text-blue-300">
          "{transcriptText || `Say '${assistantName}' to activate me`}"
        </span>
      </p>
    </div>
  );
}
