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

      // Keep more points for smoother trail (last 800ms)
      const now = Date.now();
      trailPoints.current = trailPoints.current.filter(
        point => now - point.timestamp < 800
      );
    };

    const drawTrail = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (trailPoints.current.length < 2) {
        animationRef.current = requestAnimationFrame(drawTrail);
        return;
      }

      const now = Date.now();
      
      // Draw smoother trail with bezier curves
      ctx.beginPath();
      
      for (let i = 1; i < trailPoints.current.length; i++) {
        const current = trailPoints.current[i];
        const previous = trailPoints.current[i - 1];
        
        const age = now - current.timestamp;
        const opacity = Math.max(0, 1 - age / 800);
        const size = Math.max(0.5, 12 * opacity);
        
        // Create smooth gradient for each segment
        const gradient = ctx.createLinearGradient(
          previous.x, previous.y, current.x, current.y
        );
        
        // More vibrant colors with better blending
        gradient.addColorStop(0, `rgba(147, 51, 234, ${opacity * 0.4})`); // Purple
        gradient.addColorStop(0.5, `rgba(79, 70, 229, ${opacity * 0.6})`); // Indigo
        gradient.addColorStop(1, `rgba(59, 130, 246, ${opacity * 0.5})`); // Blue
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = size;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Add glow effect
        ctx.shadowColor = 'rgba(147, 51, 234, 0.6)';
        ctx.shadowBlur = size * 1.5;
        
        // Draw smooth line
        if (i === 1) {
          ctx.moveTo(previous.x, previous.y);
        }
        
        // Use quadratic curves for smoother lines
        if (i < trailPoints.current.length - 1) {
          const next = trailPoints.current[i + 1];
          const cpx = (current.x + next.x) / 2;
          const cpy = (current.y + next.y) / 2;
          ctx.quadraticCurveTo(current.x, current.y, cpx, cpy);
        } else {
          ctx.lineTo(current.x, current.y);
        }
        
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
      style={{ 
        mixBlendMode: 'screen',
        opacity: 0.9
      }}
    />
  );
};

export default MouseTrail;
