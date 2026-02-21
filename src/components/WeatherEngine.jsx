import React, { useEffect, useRef } from 'react';

const WeatherEngine = ({ weatherState }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        // Particle Engine
        const particles = [];
        const particleCount = weatherState.intensity * 200;

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speed = (Math.random() * 5 + 2) * weatherState.intensity;
                this.velX = weatherState.wind / 10;
            }

            update() {
                this.y += this.speed;
                this.x += this.velX;

                if (this.y > canvas.height) {
                    this.y = -10;
                    this.x = Math.random() * canvas.width;
                }
            }

            draw() {
                ctx.fillStyle = weatherState.type === 'snow' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.4)';
                ctx.beginPath();
                if (weatherState.type === 'rain') {
                    ctx.rect(this.x, this.y, 1, this.speed * 2.5);
                } else if (weatherState.type === 'snow') {
                    ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
                    // Add subtle glow to snow
                    ctx.shadowBlur = 5;
                    ctx.shadowColor = 'white';
                } else {
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                }
                ctx.fill();
                ctx.shadowBlur = 0; // Reset shadow for next draw
            }
        }

        const init = () => {
            particles.length = 0; // Clear existing
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Background Sky Gradient based on weather
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            if (weatherState.type === 'sunny') {
                gradient.addColorStop(0, '#2193b0');
                gradient.addColorStop(1, '#6dd5ed');
            } else if (weatherState.type === 'snow') {
                gradient.addColorStop(0, '#83a4d4');
                gradient.addColorStop(1, '#b6fbff');
            } else {
                gradient.addColorStop(0, '#141e30');
                gradient.addColorStop(1, '#243b55');
            }
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            if (weatherState.type !== 'sunny') {
                particles.forEach(p => {
                    p.update();
                    p.draw();
                });
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [weatherState]);

    return (
        <canvas
            ref={canvasRef}
            style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}
        />
    );
};

export default WeatherEngine;
