import { useState, useRef, useEffect } from "react";

/**
 * Variant 2 — No arrows, drag-to-scroll, hidden scrollbar.
 * Perfect for product image galleries.
 */

const images = [
  "https://picsum.photos/id/1015/800/600",
  "https://picsum.photos/id/1016/800/600",
  "https://picsum.photos/id/1018/800/600",
  "https://picsum.photos/id/1020/800/600",
  "https://picsum.photos/id/1024/800/600",
  "https://picsum.photos/id/1025/800/600",
  "https://picsum.photos/id/1035/800/600",
  "https://picsum.photos/id/1040/800/600",
];

export default function ThumbnailScrollMinimal() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // ── Drag-to-scroll (mouse) ──
  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });

  // ── Scroll-snap: auto-detect active thumbnail ──
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const center = container.scrollLeft + container.offsetWidth / 2;

    let closestIndex = 0;
    let closestDist = Infinity;

    Array.from(container.children).forEach((child, i) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const dist = Math.abs(center - childCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = i;
      }
    });

    setActiveIndex(closestIndex);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* ───────── Main Image ───────── */}
      <div className="w-full aspect-4/3 rounded-2xl overflow-hidden bg-gray-100 shadow-lg mb-4">
        <img
          src={images[activeIndex]}
          alt={`Slide ${activeIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-500"
        />
      </div>

      {/* ───────── Thumbnail Strip (no arrows, hidden scrollbar) ───────── */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        className={`
          flex gap-3 overflow-x-auto px-1 py-3
          scroll-smooth snap-x snap-mandatory
          ${isDragging ? "cursor-grabbing select-none" : "cursor-grab"}

          /* ── Hide scrollbar (WebKit) ── */
          [&::-webkit-scrollbar]:hidden
          /* ── Hide scrollbar (Firefox) ── */
          scrollbar-none
          /* ── Hide scrollbar (IE/Edge) ── */
          [-ms-overflow-style:none]
        `}
      >
        {images.map((src, index) => (
          <div
            key={index}
            onClick={() => {
              setActiveIndex(index);
              // scroll into view
              const container = scrollRef.current;
              if (!container) return;
              const thumb = container.children[index];
              if (!thumb) return;
              const containerWidth = container.offsetWidth;
              const thumbLeft = thumb.offsetLeft;
              const thumbWidth = thumb.offsetWidth;
              container.scrollTo({
                left: thumbLeft - containerWidth / 2 + thumbWidth / 2,
                behavior: "smooth",
              });
            }}
            className={`
              relative shrink-0
              w-28 h-24 rounded-xl overflow-hidden
              snap-center
              transition-all duration-300 ease-out
              ${
                activeIndex === index
                  ? "ring-2 ring-blue-500 ring-offset-2 scale-105 shadow-lg opacity-100"
                  : "opacity-50 hover:opacity-80 hover:scale-105"
              }
            `}
          >
            <img
              src={src}
              alt={`Thumb ${index + 1}`}
              className="w-full h-full object-cover pointer-events-none"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* ── Dot indicators ── */}
      <div className="flex justify-center gap-1.5 mt-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`
              rounded-full transition-all duration-300
              ${activeIndex === i ? "w-6 h-2 bg-blue-500" : "w-2 h-2 bg-gray-300 hover:bg-gray-400"}
            `}
          />
        ))}
      </div>
    </div>
  );
}
