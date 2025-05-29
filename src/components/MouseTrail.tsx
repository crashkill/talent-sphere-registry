import React, { useEffect, useRef, useState } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  timestamp: number;
}

const MouseTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailPoints = useRef<TrailPoint[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      trailPoints.current.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      });

      // Keep only recent points (last 500ms)
      const now = Date.now();
      trailPoints.current = trailPoints.current.filter(
        point => now - point.timestamp < 500
      );
    };

    const drawTrail = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (trailPoints.current.length < 2) {
        animationRef.current = requestAnimationFrame(drawTrail);
        return;
      }

      const now = Date.now();
      
      // Create gradient trail
      for (let i = 1; i < trailPoints.current.length; i++) {
        const current = trailPoints.current[i];
        const previous = trailPoints.current[i - 1];
        
        const age = now - current.timestamp;
        const opacity = Math.max(0, 1 - age / 500);
        const size = Math.max(1, 8 * opacity);
        
        ctx.beginPath();
        ctx.moveTo(previous.x, previous.y);
        ctx.lineTo(current.x, current.y);
        
        // Create gradient for each segment
        const gradient = ctx.createLinearGradient(
          previous.x, previous.y, current.x, current.y
        );
        gradient.addColorStop(0, `rgba(139, 92, 246, ${opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(59, 130, 246, ${opacity * 0.6})`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = size;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
        
        // Add glow effect
        ctx.shadowColor = '#8b5cf6';
        ctx.shadowBlur = size * 2;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
      
      animationRef.current = requestAnimationFrame(drawTrail);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    animationRef.current = requestAnimationFrame(drawTrail);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default MouseTrail;
