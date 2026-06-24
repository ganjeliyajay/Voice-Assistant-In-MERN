import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAssistantName } from "../Redux/Thunk/UserThunk";
import background from "../assets/bg.jpg";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import Particles from "react-tsparticles";

export default function AddAssistantName() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [assistantName, setAssistantName] = useState("");

  const { loading, error } = useSelector((s) => s.users);

  const inputHandle = (e) => {
    setAssistantName(e.target.value);
  };

  const formHandle = (e) => {
    e.preventDefault();

    let finalName = assistantName.trim();

    if (finalName === "") {
      finalName = "assistant";
    }

    // capitalize first letter
    finalName = finalName.charAt(0).toUpperCase() + finalName.slice(1);

    try {
      dispatch(addAssistantName({ assistantname: finalName })).unwrap();

      navigate("/home");

      toast.success("Assistant name Created!", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
        transition: Bounce,
      });
    } catch (err) {
      toast.warn(error, {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center flex justify-center items-center overflow-hidden"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Particle Animation */}
      <Particles
        className="absolute inset-0"
        options={{
          fullScreen: false,

          fpsLimit: 60,

          particles: {
            number: {
              value: 80,
              density: { enable: true, area: 800 },
            },

            color: { value: ["#00ffff", "#38bdf8", "#3b82f6"] },

            size: {
              value: { min: 2, max: 4 },
            },

            move: {
              enable: true,
              speed: 1.5,
              direction: "none",
              outModes: {
                default: "bounce",
              },
            },

            links: {
              enable: true,
              distance: 140,
              color: "#00ffff",
              opacity: 0.4,
              width: 1,
            },

            opacity: {
              value: 0.6,
            },
          },

          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: ["grab", "attract"],
              },
              onClick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },

            modes: {
              grab: {
                distance: 160,
                links: {
                  opacity: 0.8,
                },
              },

              attract: {
                distance: 200,
                duration: 0.4,
              },

              push: {
                quantity: 5,
              },
            },
          },

          detectRetina: true,
        }}
      />

      {/* blur overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[3px]"></div>

      {/* card */}
      <div
        className="assistant-card relative z-10 w-[92%] sm:w-[90%] max-w-[420px]
flex flex-col items-center gap-5 sm:gap-6
px-5 sm:px-10 py-8 sm:py-12
                bg-white/10 backdrop-blur-xl
                border border-cyan-400/40
                rounded-[30px]"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white text-center tracking-wide">
          Name Your <span className="text-cyan-400">Assistant</span>
        </h1>

        <form onSubmit={formHandle} className="flex flex-col gap-5 w-full">
          <input
            type="text"
            name="assistantname"
            placeholder="Enter assistant name..."
            value={assistantName}
            onChange={inputHandle}
            className="w-full h-[50px] sm:h-[55px] px-5 rounded-xl
                        bg-black/40 border border-white/20
                        text-white placeholder-gray-400
                        focus:border-cyan-400 focus:shadow-[0_0_15px_cyan]
                        outline-none transition-all"
          />

          <button
            className="assistant-btn h-[55px] rounded-xl font-semibold text-black
                        bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
          >
            {loading ? "Loading..." : "Save Assistant Name"}
          </button>
        </form>

        <p className="text-gray-300 text-sm text-center">
          ✨ Choose a name like <span className="text-cyan-400">Luna</span>,{" "}
          <span className="text-cyan-400">Astra</span>,{" "}
          <span className="text-cyan-400">Nova</span>
        </p>
      </div>

      {/* Card Animations */}
      <style>
        {`
                .assistant-card{
                  animation: float 6s ease-in-out infinite, glow 3s ease-in-out infinite alternate;
                  box-shadow: 0 0 40px rgba(0,255,255,0.3);
                }

                .assistant-btn{
                  background-size:200%;
                  animation: shine 4s linear infinite;
                }

                @keyframes float{
                  0%,100%{transform:translateY(0)}
                  50%{transform:translateY(-14px)}
                }

                @keyframes glow{
                  0%{box-shadow:0 0 20px rgba(0,255,255,0.3)}
                  100%{box-shadow:0 0 70px rgba(0,255,255,0.9)}
                }

                @keyframes shine{
                  0%{background-position:0%}
                  100%{background-position:200%}
                }
                `}
      </style>
    </div>
  );
}
