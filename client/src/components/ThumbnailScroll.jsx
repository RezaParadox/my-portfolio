import { useState, useRef, useEffect } from "react";

export default function ThumbnailScroll({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  // Scroll the thumbnail strip left or right
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 160; // pixels to scroll per click
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Click a thumbnail
  const handleThumbClick = (index) => {
    setActiveIndex(index);

    // Auto-scroll the active thumbnail into view (centered)
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const thumb = container.children[index];
    if (!thumb) return;

    const containerWidth = container.offsetWidth;
    const thumbLeft = thumb.offsetLeft;
    const thumbWidth = thumb.offsetWidth;

    container.scrollTo({
      left: thumbLeft - containerWidth / 2 + thumbWidth / 2,
      behavior: "smooth",
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* ───────── Main Image ───────── */}
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-lg mb-4">
        <img
          src={images[activeIndex]}
          alt={`Slide ${activeIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-500"
        />

        {/* Image counter badge */}
        <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
          {activeIndex + 1} / {images.length}
        </span>
      </div>

      {/* ───────── Thumbnail Scroll Container ───────── */}
      <div className="relative group">
        {/* Left Arrow — appears on hover */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10
                     bg-white/90 hover:bg-white text-gray-700
                     w-9 h-9 flex items-center justify-center
                     rounded-full shadow-md
                     opacity-0 group-hover:opacity-100
                     transition-opacity duration-200
                     cursor-pointer"
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow — appears on hover */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10
                     bg-white/90 hover:bg-white text-gray-700
                     w-9 h-9 flex items-center justify-center
                     rounded-full shadow-md
                     opacity-0 group-hover:opacity-100
                     transition-opacity duration-200
                     cursor-pointer"
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Thumbnail strip */}
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto px-12 py-2 scroll-smooth
                     /* ── Custom scrollbar (WebKit) ── */
                     [&::-webkit-scrollbar]:h-1.5
                     [&::-webkit-scrollbar-track]:bg-gray-100
                     [&::-webkit-scrollbar-track]:rounded-full
                     [&::-webkit-scrollbar-thumb]:bg-gray-300
                     [&::-webkit-scrollbar-thumb]:rounded-full
                     [&::-webkit-scrollbar-thumb:hover]:bg-gray-400
                     /* ── Custom scrollbar (Firefox) ── */
                     scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300"
        >
          {images.map((src, index) => (
            <button
              key={index}
              onClick={() => handleThumbClick(index)}
              className={`
                relative shrink-0 w-24 h-20 rounded-lg overflow-hidden
                cursor-pointer transition-all duration-300
                hover:scale-105 hover:shadow-md
                ${
                  activeIndex === index
                    ? "ring-2 ring-blue-500 ring-offset-2 scale-105 shadow-md"
                    : "opacity-70 hover:opacity-100"
                }
              `}
            >
              <img
                src={src}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Active indicator dot */}
              {activeIndex === index && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
