import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Ai from "../assets/Ai-image/image.png";
import { useDispatch, useSelector } from "react-redux";
import { getGeminiResponse } from "../Redux/Thunk/GeminiThunk";
import { autoLogin, getUser } from "../Redux/Thunk/UserThunk";
import { Mic } from "lucide-react";
import VoiceWave from "./VoiceWave";
import TypingText from "./TypingText";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.users);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(autoLogin()).unwrap();
  }, []);

  const [speaking, setSpeaking] = useState(false);

  const username = user?.data?.userName || "User";
  const assistantName = user?.data?.assistantName || "Assistant";

  if (!username) {
    navigate("/");
  }

  const [listening, setListening] = useState(false);
  const [transcriptText, setTranscriptText] = useState("");
  const [response, setResponse] = useState("");

  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const startRecognition = () => {
    const recognition = recognitionRef.current;

    if (!recognition) return;

    try {
      recognition.start();
      setListening(true);
    } catch (err) {
      console.log("Mic already running");
    }
  };

  const stopRecognition = () => {
    const recognition = recognitionRef.current;

    if (recognition) {
      recognition.stop();
      setListening(false);
    }
  };

  const speak = (text) => {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);

    const voices = speechSynthesis.getVoices();

    const femaleVoice =
      voices.find((v) => v.name.toLowerCase().includes("female")) ||
      voices.find((v) => v.name.toLowerCase().includes("zira")) ||
      voices.find((v) => v.name.toLowerCase().includes("samantha")) ||
      voices.find((v) => v.name.toLowerCase().includes("google"));

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.lang = "en-US";

    // 👇 add here
    utterance.rate = 0.95;
    utterance.pitch = 1.15;

    utterance.onstart = () => {
      setSpeaking(true);
    };

    utterance.onend = () => {
      setSpeaking(false);
    };

    synthRef.current.cancel();
    synthRef.current.speak(utterance);
  };

  const handleCommand = (data) => {
    const { type, userInput, response } = data;

    speak(response);

    const actions = {
      // 🔎 Search
      "google-search": () =>
        window.open(
          `https://www.google.com/search?q=${encodeURIComponent(userInput)}`,
          "_blank",
        ),

      "wikipedia-search": () =>
        window.open(
          `https://en.wikipedia.org/wiki/${encodeURIComponent(userInput)}`,
          "_blank",
        ),

      // 🎥 YouTube
      "youtube-open": () => window.open("https://www.youtube.com", "_blank"),

      "youtube-search": () =>
        window.open(
          `https://www.youtube.com/results?search_query=${encodeURIComponent(userInput)}`,
          "_blank",
        ),

      "youtube-play": () =>
        window.open(
          `https://www.youtube.com/results?search_query=${encodeURIComponent(userInput)}`,
          "_blank",
        ),

      // 📱 Social Media
      "instagram-open": () =>
        window.open("https://www.instagram.com", "_blank"),

      "facebook-open": () => window.open("https://www.facebook.com", "_blank"),

      "twitter-open": () => window.open("https://twitter.com", "_blank"),

      "linkedin-open": () => window.open("https://www.linkedin.com", "_blank"),

      // 🧠 Tools
      "calculator-open": () =>
        window.open("https://www.google.com/search?q=calculator", "_blank"),

      "weather-show": () =>
        window.open(
          `https://www.google.com/search?q=weather+${encodeURIComponent(userInput)}`,
          "_blank",
        ),

      "map-open": () =>
        window.open(
          `https://www.google.com/maps/search/${encodeURIComponent(userInput)}`,
          "_blank",
        ),

      // 🛒 Shopping
      "amazon-search": () =>
        window.open(
          `https://www.amazon.in/s?k=${encodeURIComponent(userInput)}`,
          "_blank",
        ),

      "flipkart-search": () =>
        window.open(
          `https://www.flipkart.com/search?q=${encodeURIComponent(userInput)}`,
          "_blank",
        ),

      // 💻 Developer Tools
      "github-open": () => window.open("https://github.com", "_blank"),

      "stackoverflow-search": () =>
        window.open(
          `https://stackoverflow.com/search?q=${encodeURIComponent(userInput)}`,
          "_blank",
        ),

      // 📰 News
      "news-open": () => window.open("https://news.google.com", "_blank"),

      "news-search": () =>
        window.open(
          `https://news.google.com/search?q=${encodeURIComponent(userInput)}`,
          "_blank",
        ),

      // 🎵 Music
      "spotify-open": () => window.open("https://open.spotify.com", "_blank"),

      "spotify-search": () =>
        window.open(
          `https://open.spotify.com/search/${encodeURIComponent(userInput)}`,
          "_blank",
        ),

      // 📧 Gmail
      "gmail-open": () => window.open("https://mail.google.com", "_blank"),

      // 📅 Calendar
      "calendar-open": () =>
        window.open("https://calendar.google.com", "_blank"),
    };

    if (actions[type]) actions[type]();
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = true;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onresult = async (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscriptText(finalTranscript + interimTranscript);

      if (finalTranscript) {
        const cleanedTranscript = finalTranscript
          .toLowerCase()
          .replace(assistantName.toLowerCase(), "")
          .trim();

        if (!cleanedTranscript) return;

        try {
          const data = await dispatch(
            getGeminiResponse(cleanedTranscript),
          ).unwrap();

          const aiResponse =
            data?.response ||
            data?.data?.response ||
            "Sorry, I didn't understand";

          setResponse(aiResponse);

          handleCommand({
            ...data,
            response: aiResponse,
            userInput: cleanedTranscript,
          });
        } catch (err) {
          setResponse("Something went wrong");
        }
      }
    };

    recognitionRef.current = recognition;

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .catch(() => alert("Allow microphone"));

    return () => recognition.stop();
  }, [dispatch, assistantName]);

  useEffect(() => {
    const speakGreeting = () => {
      const voices = speechSynthesis.getVoices();

      // Hindi voice find
      const hindiVoice =
        voices.find((v) => v.name.includes("Google हिन्दी")) ||
        voices.find((v) => v.name.includes("Google Hindi")) ||
        voices.find((v) => v.lang === "hi-IN");

      const greeting = new SpeechSynthesisUtterance(
        `नमस्ते ${assistantName}, मैं आपकी कैसे मदद कर सकती हूँ`,
      );

      if (hindiVoice) {
        greeting.voice = hindiVoice;
      }

      greeting.lang = "hi-IN";
      greeting.rate = 0.9;
      greeting.pitch = 1.1;

      synthRef.current.speak(greeting);
    };

    // Chrome bug fix (voices load delay)
    speechSynthesis.onvoiceschanged = speakGreeting;

    speakGreeting();
  }, [assistantName]);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="relative flex items-center justify-center group">
          <div className="absolute w-[180px] h-[180px] bg-blue-500/20 blur-3xl rounded-full"></div>

          <img
            src={Ai}
            alt="AI"
            className={`relative w-[150px] h-[150px] rounded-full object-cover border-2 border-blue-400 cursor-pointer transition-all duration-500 ${
              speaking
                ? "shadow-[0_0_45px_#38bdf8] scale-105"
                : "shadow-[0_0_15px_rgba(56,189,248,0.4)] animate-pulse"
            }`}
          />
          {/* Hover tooltip */}
          <div className="absolute -bottom-9 px-3 py-1 text-xs tracking-wide bg-black/80 text-blue-300 border border-blue-500/30 rounded-md opacity-0 group-hover:opacity-100 transition">
            {assistantName}
          </div>
        </div>

        {/* Wave container (fixed height so layout won't move) */}
        <div className="relative h-[60px] flex items-center justify-center">
          <div className="absolute w-[220px] h-[50px] bg-blue-500/10 blur-2xl rounded-full"></div>
          <VoiceWave speaking={speaking} />
        </div>
      </div>

      <h1 className="mt-6 text-4xl font-bold text-white tracking-wide">
        AI{" "}
        <span className="text-blue-400">
          {assistantName?.charAt(0).toUpperCase() + assistantName?.slice(1)}
        </span>
      </h1>

      {response && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white/10 backdrop-blur-xl p-6 rounded-2xl max-w-[600px] border border-white/10 shadow-2xl text-blue-100"
        >
          <TypingText text={response} />
        </motion.div>
      )}

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          if (listening) stopRecognition();
          else startRecognition();
        }}
        className={`relative mt-10 flex items-center justify-center 
  w-16 h-16 rounded-full border border-blue-400/40 
  transition-all duration-300
  ${listening ? "bg-blue-500/20" : "bg-blue-500/10"}`}
      >
        {/* Pulsing Ring when Listening */}
        {listening && (
          <span className="absolute w-full h-full rounded-full ring-animation"></span>
        )}

        {/* Wave when Listening */}
        {listening ? (
          <div className="flex gap-[3px] items-end h-[20px] z-10">
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
          </div>
        ) : (
          <Mic size={26} className="text-blue-400 z-10" />
        )}
      </motion.button>

      <p className="mt-6 text-gray-300 max-w-[600px]">
        {transcriptText ? (
          <TypingText text={transcriptText} />
        ) : (
          "Tap the microphone and start speaking"
        )}
      </p>
    </div>
  );
}
