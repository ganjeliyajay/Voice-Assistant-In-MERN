import React, { useEffect, useRef } from "react";

export default function VoiceWave({ speaking }) {
  const canvasRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!speaking) return;

    const initAudio = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();

      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.85;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;

      draw();
    };

    initAudio();

    return () => cancelAnimationFrame(animationRef.current);
  }, [speaking]);

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    const bars = 40;
    const center = bars / 2;

    const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
    gradient.addColorStop(0, "#22d3ee");
    gradient.addColorStop(0.5, "#6366f1");
    gradient.addColorStop(1, "#ec4899");

    const render = () => {
      animationRef.current = requestAnimationFrame(render);

      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      const barWidth = WIDTH / bars;

      for (let i = 0; i < bars; i++) {
        const value = dataArray[i % dataArray.length];

        const normalized = value / 255;

        // Gaussian center emphasis (single peak)
        const distance = Math.abs(center - i);
        const gaussian = Math.exp(-(distance * distance) / (2 * 40));

        const barHeight = normalized * gaussian * HEIGHT * 2;

        const x = i * barWidth;
        const y = HEIGHT / 2 - barHeight / 2;

        ctx.fillStyle = gradient;
        ctx.shadowColor = "#6366f1";
        ctx.shadowBlur = 12;

        ctx.beginPath();
        ctx.roundRect(x, y, barWidth - 4, barHeight, 6);
        ctx.fill();
      }
    };

    render();
  };

  if (!speaking) return null;

  return (
    <canvas
      ref={canvasRef}
      width={350}
      height={80}
      className="mt-4 w-[280px] sm:w-[350px] md:w-[400px] h-auto"
    />
  );
}
