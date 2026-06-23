import React, { useEffect, useState } from "react";

export default function TypingText({ text, speed = 30 }) {

    const [displayText, setDisplayText] = useState("");

    useEffect(() => {

        setDisplayText("");
        let index = 0;

        const interval = setInterval(() => {

            setDisplayText(text.slice(0, index + 1));
            index++;

            if (index === text.length) {
                clearInterval(interval);
            }

        }, speed);

        return () => clearInterval(interval);

    }, [text, speed]);

    return (
        <p className="ai-gradient-text text-lg font-semibold">
            {displayText}
        </p>
    );
}