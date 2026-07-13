import { useEffect, useRef } from 'react';

const DotGrid = ({
  dotSize = 2,
  dotSpacing = 28,
  inactiveColor = 'rgba(168, 85, 247, 0.25)',
  activeColor = '#EC4899',
  gradientWidth = 400,
  loopDuration = 3,
  mouseRadius = 120,
  className,
}) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    window.addEventListener('mousemove', onMouseMove);

    const draw = (time) => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, w, h);

      const cols = Math.ceil(w / dotSpacing) + 1;
      const rows = Math.ceil(h / dotSpacing) + 1;

      const diagLen = Math.sqrt(w * w + h * h);
      const t = (time * 0.001) % loopDuration;
      const sweepPos = (t / loopDuration) * (diagLen + gradientWidth) - gradientWidth;

      const mouse = mouseRef.current;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * dotSpacing + dotSpacing / 2;
          const y = row * dotSpacing + dotSpacing / 2;

          // Sweep intensity
          const dotDist = Math.sqrt(x * x + y * y);
          const sweepDist = Math.abs(dotDist - sweepPos);
          const halfW = gradientWidth / 2;
          let sweepIntensity = 1 - Math.min(sweepDist / halfW, 0.8) / 0.8;
          sweepIntensity = Math.max(0, sweepIntensity);
          sweepIntensity = sweepIntensity * sweepIntensity * (3 - 2 * sweepIntensity);

          // Mouse intensity
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const mouseDist = Math.sqrt(dx * dx + dy * dy);
          let mouseIntensity = 1 - Math.min(mouseDist / mouseRadius, 1);
          mouseIntensity = mouseIntensity * mouseIntensity;

          // Combine both
          const intensity = Math.max(sweepIntensity, mouseIntensity);

          if (intensity < 0.02) {
            ctx.fillStyle = inactiveColor;
          } else {
            const alpha = 0.3 + intensity * 0.7;
            ctx.fillStyle = `rgba(${hexToRgb(activeColor)}, ${alpha})`;
          }

          ctx.beginPath();
          ctx.arc(x, y, dotSize + intensity * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [dotSize, dotSpacing, inactiveColor, activeColor, gradientWidth, loopDuration, mouseRadius]);

  return (
    <div className={`w-full h-full overflow-hidden ${className ?? ''}`}>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default DotGrid;
