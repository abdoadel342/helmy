import React, { useEffect, useRef } from 'react';

interface DarkVeilProps {
  hueShift?: number;
  noiseIntensity?: number;
  scanlineIntensity?: number;
  speed?: number;
  scanlineFrequency?: number;
  warpAmount?: number;
  className?: string;
}

const DarkVeil: React.FC<DarkVeilProps> = ({
  hueShift = 0,
  noiseIntensity = 0.5,
  scanlineIntensity = 0.3,
  speed = 0.5,
  scanlineFrequency = 10,
  warpAmount = 0,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeAndDraw = () => {
      const parent = canvas.parentElement;
      if (parent) {
        // Adjust canvas resolution
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    window.addEventListener('resize', resizeAndDraw);
    resizeAndDraw();

    const draw = () => {
      time += speed * 0.01;
      
      const width = canvas.width;
      const height = canvas.height;

      // Clear
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);

      // Simple gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, `hsla(${260 + hueShift}, 40%, 15%, 1)`);
      gradient.addColorStop(1, `hsla(${280 + hueShift}, 50%, 5%, 1)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Scanlines
      if (scanlineIntensity > 0 && scanlineFrequency > 0) {
        ctx.fillStyle = `rgba(0, 0, 0, ${scanlineIntensity})`;
        const numLines = height / scanlineFrequency;
        const offset = (time * 50) % scanlineFrequency;
        
        for (let i = -1; i < numLines; i++) {
          ctx.fillRect(0, i * scanlineFrequency + offset, width, scanlineFrequency * 0.5);
        }
      }

      // Add simple noise
      if (noiseIntensity > 0) {
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const noise = (Math.random() - 0.5) * 50 * noiseIntensity;
          data[i] += noise;
          data[i + 1] += noise;
          data[i + 2] += noise;
        }
        ctx.putImageData(imageData, 0, 0);
      }

      // Optional warp (simulated via scaling context for next frame or simple transform)
      // For a true warp we'd need WebGL or complex distortion
      if (warpAmount > 0) {
        const warpOffset = Math.sin(time) * warpAmount * 5;
        canvas.style.transform = `scale(${1 + warpAmount * 0.05}) translateY(${warpOffset}px)`;
      } else {
        canvas.style.transform = 'none';
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeAndDraw);
      cancelAnimationFrame(animationFrameId);
    };
  }, [hueShift, noiseIntensity, scanlineIntensity, speed, scanlineFrequency, warpAmount]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none rounded-3xl ${className}`}
      style={{ mixBlendMode: 'screen', opacity: 0.8 }}
    />
  );
};

export default DarkVeil;
