import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, Clock3, Search, MessageSquare, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchHistory } from "../Redux/Thunk/HistoryThunk";

export default function HistoryPage({ setShowHistory }) {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const { history = [], loading } = useSelector((s) => s.history);

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const query = search.toLowerCase();

      return (
        item?.userMessage?.toLowerCase().includes(query) ||
        item?.assistantResponse?.toLowerCase().includes(query)
      );
    });
  }, [history, search]);

  const groupedHistory = useMemo(() => {
    const grouped = {};

    filteredHistory.forEach((item) => {
      const date = new Date(item.createdAt);

      const today = new Date();

      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);

      let section = "";

      if (date.toDateString() === today.toDateString()) {
        section = "Today";
      } else if (date.toDateString() === yesterday.toDateString()) {
        section = "Yesterday";
      } else {
        section = date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
      }

      if (!grouped[section]) {
        grouped[section] = [];
      }

      grouped[section].push(item);
    });

    return grouped;
  }, [filteredHistory]);

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md"
        onClick={() => setShowHistory(false)}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ x: 500 }}
          animate={{ x: 0 }}
          exit={{ x: 500 }}
          transition={{ duration: 0.35 }}
          className="
          fixed
          top-0
          right-0
          h-screen
          
          w-full sm:w-[440px] md:w-[480px] lg:w-[520px] xl:w-[600px]
          bg-[#090909]
          border-l
          border-white/10
          backdrop-blur-3xl
          shadow-[-20px_0_80px_rgba(0,0,0,0.7)]
          flex
          flex-col
          overflow-hidden
        "
        >
          {/* GLOW */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

          {/* HEADER */}
          <div className="relative z-10 p-5 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-white text-xl sm:text-2xl font-bold">
                  History
                </h1>

                <p className="text-gray-400 text-sm mt-1">
                  Previous conversations
                </p>
              </div>

              <button
                onClick={() => setShowHistory(false)}
                className="
                w-10
                h-10
                rounded-xl
                bg-white/5
                border
                border-white/10
                hover:bg-red-500
                hover:border-red-500
                transition-all
                duration-300
                flex
                items-center
                justify-center
              "
              >
                <X size={18} className="text-white" />
              </button>
            </div>

            {/* SEARCH */}
            <div className="relative mt-5">
              <Search
                size={18}
                className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-500
              "
              />

              <input
                type="text"
                placeholder="Search conversations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                w-full
                pl-11
                pr-4
                py-3
                rounded-2xl
                bg-white/[0.04]
                border
                border-white/10
                text-white
                outline-none
                focus:border-cyan-500
                transition-all
              "
              />
            </div>
          </div>

          {/* BODY */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {loading && (
              <div className="h-full flex justify-center items-center">
                <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {!loading && filteredHistory.length === 0 && (
              <div className="h-full flex flex-col justify-center items-center text-center">
                <div
                  className="
                  w-20
                  h-20
                  rounded-full
                  bg-white/5
                  border
                  border-white/10
                  flex
                  items-center
                  justify-center
                  mb-4
                "
                >
                  <MessageSquare size={34} className="text-cyan-400" />
                </div>

                <h2 className="text-white text-2xl font-bold">
                  No History Found
                </h2>

                <p className="text-gray-400 mt-2">
                  Start chatting with your assistant
                </p>
              </div>
            )}

            {Object.entries(groupedHistory).map(([section, items]) => (
              <div key={section}>
                {/* DATE HEADER */}
                <div
                  className="
                  sticky
                  top-[-20px]
                  z-10
                  mb-4
                  py-2
                  backdrop-blur-xl
                "
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-[1px] bg-white/10" />

                    <span
                      className="
                      text-[10px]
                      uppercase
                      tracking-[4px]
                      text-gray-500
                    "
                    >
                      {section}
                    </span>

                    <div className="flex-1 h-[1px] bg-white/10" />
                  </div>
                </div>

                <div className="space-y-3">
                  {items.map((item, index) => (
                    <motion.div
                      key={item._id}
                      initial={{
                        opacity: 0,
                        x: 30,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: index * 0.04,
                      }}
                      className="
                      group
                      bg-white/[0.03]
                      border
                      border-white/5
                      rounded-3xl
                      p-4
                      hover:bg-white/[0.05]
                      hover:border-cyan-500/30
                      hover:shadow-[0_0_30px_rgba(34,211,238,0.12)]
                      transition-all
                      duration-300
                      cursor-pointer
                    "
                    >
                      {/* TIME */}
                      <div className="flex justify-between items-center mb-4">
                        <div
                          className="
                          flex
                          items-center
                          gap-2
                          text-gray-500
                          text-xs
                        "
                        >
                          <Clock3 size={13} />

                          {new Date(item.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>

                      {/* USER */}
                      <div className="flex gap-3 mb-4">
                        <div
                          className="
                          w-9
                          h-9
                          rounded-full
                          bg-blue-500
                          flex
                          items-center
                          justify-center
                          shrink-0
                        "
                        >
                          <User size={16} className="text-white" />
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-blue-400 text-sm font-medium mb-1">
                            You
                          </h3>

                          <p className="text-white text-xs sm:text-sm line-clamp-2 break-words">
                            {item.userMessage}
                          </p>
                        </div>
                      </div>

                      {/* AI */}
                      <div className="flex gap-3">
                        <div
                          className="
                          w-9
                          h-9
                          rounded-full
                          bg-cyan-500
                          flex
                          items-center
                          justify-center
                          shrink-0
                        "
                        >
                          <Bot size={16} className="text-black" />
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-cyan-400 text-sm font-medium mb-1">
                            Assistant
                          </h3>

                          <p className="text-gray-400 text-xs sm:text-sm line-clamp-3 break-words">
                            {item.assistantResponse}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
