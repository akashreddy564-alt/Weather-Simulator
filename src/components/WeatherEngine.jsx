```
import React, { useEffect, useRef } from 'react';

const WeatherEngine = ({ weatherState }) => {
  const canvasRef = useRef(null);
  const audioCtx = useRef(null);
  const noiseNode = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Procedural Audio Initialization
    const initAudio = () => {
      if (!audioCtx.current) {
        audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
        
        // Brown noise for wind/rain
        const bufferSize = 2 * audioCtx.current.sampleRate;
        const noiseBuffer = audioCtx.current.createBuffer(1, bufferSize, audioCtx.current.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + (0.02 * white)) / 1.02;
          lastOut = output[i];
          output[i] *= 3.5; // Gain
        }

        noiseNode.current = audioCtx.current.createBufferSource();
        noiseNode.current.buffer = noiseBuffer;
        noiseNode.current.loop = true;

        const filter = audioCtx.current.createBiquadFilter();
        filter.type = 'lowpass';
        
        const gainNode = audioCtx.current.createGain();
        gainNode.gain.value = 0;

        noiseNode.current.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioCtx.current.destination);
        noiseNode.current.start();

        return { filter, gainNode };
      }
    };

    const { filter, gainNode } = initAudio() || {};

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    // Particle Engine
    const particles = [];
    const isChaos = weatherState.isChaos;
    const effectiveIntensity = isChaos ? 1.5 : weatherState.intensity;
    const effectiveWind = isChaos ? 120 : weatherState.wind;
    const particleCount = effectiveIntensity * 400;

    // Update audio based on weather
    if (gainNode) {
      gainNode.gain.setTargetAtTime(effectiveIntensity * 0.15, audioCtx.current.currentTime, 0.5);
      filter.frequency.setTargetAtTime(100 + (effectiveWind * 10), audioCtx.current.currentTime, 0.5);
    }

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speed = (Math.random() * 5 + 2) * effectiveIntensity;
        this.velX = effectiveWind / 10;
      }

      update() {
        this.y += this.speed;
        this.x += this.velX;

        if (this.y > canvas.height) {
          this.y = -10;
          this.x = Math.random() * canvas.width;
        }
        if (this.x > canvas.width) this.x = -10;
        if (this.x < -10) this.x = canvas.width;
      }

      draw() {
        ctx.fillStyle = weatherState.type === 'snow' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        if (weatherState.type === 'rain') {
          ctx.rect(this.x, this.y, 1, this.speed * 2.5);
        } else if (weatherState.type === 'snow') {
          ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
          ctx.shadowBlur = isChaos ? 15 : 5;
          ctx.shadowColor = 'white';
        } else {
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    let lightningTimer = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      if (weatherState.type === 'sunny' && !isChaos) {
        gradient.addColorStop(0, '#2193b0');
        gradient.addColorStop(1, '#6dd5ed');
      } else if (isChaos) {
        gradient.addColorStop(0, '#000000');
        gradient.addColorStop(1, '#2c3e50');
      } else if (weatherState.type === 'snow') {
        gradient.addColorStop(0, '#83a4d4');
        gradient.addColorStop(1, '#b6fbff');
      } else {
        gradient.addColorStop(0, '#141e30');
        gradient.addColorStop(1, '#243b55');
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Lightning Logic
      if (isChaos || (weatherState.type === 'rain' && effectiveIntensity > 0.8)) {
        lightningTimer++;
        if (Math.random() > 0.99) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }

      if (weatherState.type !== 'sunny' || isChaos) {
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
      className={weatherState.isChaos ? 'animate-shake' : ''}
      style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, background: 'transparent' }}
    />
  );
};


export default WeatherEngine;
```
