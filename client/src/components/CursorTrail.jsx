import { useEffect, useRef } from 'react';

const TRAIL_LENGTH = 8;

const CursorTrail = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const trailRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      window.dispatchEvent(new CustomEvent('cursor-move', { detail: { x: e.clientX, y: e.clientY } }));
    };

    window.addEventListener('mousemove', onMouseMove);

    const drawCursor = (x, y) => {
      const s = 1.4;

      // Standard pointer shape coordinates
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + 20 * s);
      ctx.lineTo(x + 5.5 * s, y + 15.5 * s);
      ctx.lineTo(x + 11 * s, y + 22 * s);
      ctx.lineTo(x + 14 * s, y + 20 * s);
      ctx.lineTo(x + 8.5 * s, y + 13.5 * s);
      ctx.lineTo(x + 15 * s, y + 13 * s);
      ctx.closePath();

      ctx.fillStyle = '#A855F7';
      ctx.fill();
      ctx.strokeStyle = '#7C3AED';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const mouse = mouseRef.current;
      trailRef.current.unshift({ x: mouse.x, y: mouse.y });
      if (trailRef.current.length > TRAIL_LENGTH) trailRef.current.pop();

      const trail = trailRef.current;

      // Trail dots
      for (let i = trail.length - 1; i >= 1; i--) {
        const t = 1 - i / trail.length;
        const size = 12 + t * 5;
        const alpha = t * 0.5;

        ctx.beginPath();
        ctx.arc(trail[i].x, trail[i].y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${alpha})`;
        ctx.fill();
      }

      // Main cursor
      drawCursor(mouse.x, mouse.y);

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default CursorTrail;
