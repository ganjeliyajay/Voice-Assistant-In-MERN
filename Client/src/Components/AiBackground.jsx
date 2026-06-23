import React, { useEffect, useRef } from "react";

export default function AiBackground() {

  const canvasRef = useRef(null);

  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let particles = [];
    let stars = [];
    let mouse = { x: null, y: null };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    // ⭐ Background stars
    for (let i = 0; i < 80; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5
      });
    }

    class Particle {
      constructor(x, y, dx, dy) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = Math.random() * 2 + 1;
      }

      draw() {

        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size * 5
        );

        gradient.addColorStop(0, "#3b82f6");
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {

        this.x += this.dx;
        this.y += this.dy;

        if (this.x > canvas.width || this.x < 0) this.dx *= -1;
        if (this.y > canvas.height || this.y < 0) this.dy *= -1;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          this.x -= dx * 0.02;
          this.y -= dy * 0.02;
        }

        this.draw();
      }
    }

    function init() {

      particles = [];

      for (let i = 0; i < 150; i++) {
        particles.push(
          new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            (Math.random() - 0.5) * 0.8,
            (Math.random() - 0.5) * 0.8
          )
        );
      }

    }

    function drawStars() {

      ctx.fillStyle = "rgba(255,255,255,0.2)";

      stars.forEach((star) => {

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

      });

    }

    function connect() {

      for (let a = 0; a < particles.length; a++) {

        for (let b = a; b < particles.length; b++) {

          let dx = particles[a].x - particles[b].x;
          let dy = particles[a].y - particles[b].y;

          let distance = dx * dx + dy * dy;

          if (distance < 9000) {

            ctx.strokeStyle = "rgba(59,130,246,0.18)";
            ctx.lineWidth = 1;

            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();

          }

        }

      }

    }

    function mouseGlow() {

      if (!mouse.x) return;

      const gradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        220
      );

      gradient.addColorStop(0, "rgba(59,130,246,0.25)");
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 220, 0, Math.PI * 2);
      ctx.fill();

    }

    function animate() {

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawStars();

      mouseGlow();

      particles.forEach((p) => p.update());

      connect();

      requestAnimationFrame(animate);

    }

    init();
    animate();

  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0"
    />
  );
}