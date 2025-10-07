import React, { useEffect, useState } from 'react';

// Graceful Swiper wrapper: if 'swiper' isn't installed, show a simple scrollable gallery
export default function DocsSlider({ images = [], height = 360 }) {
  const [swiperApi, setSwiperApi] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // Dynamically import React bindings to avoid hard dependency at build
        // Use @vite-ignore so Vite won't try to statically resolve optional deps
        const reactPath = 'swiper/react';
        const mod = await import(/* @vite-ignore */ reactPath);
        if (!cancelled) setSwiperApi(mod);
      } catch (e) {
        // Swiper not available; we'll use fallback
        if (!cancelled) setSwiperApi(null);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (!Array.isArray(images) || images.length === 0) {
    return <div className="rounded-lg border border-gray-200 bg-white p-4 text-gray-500">No images found.</div>;
  }

  // Fallback: simple horizontal scroll
  if (!swiperApi) {
    return (
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollSnapType: 'x mandatory' }}>
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`screenshot-${i + 1}`}
              className="rounded-lg shadow-sm border border-gray-200 flex-none"
              style={{ width: 640, height, objectFit: 'cover', scrollSnapAlign: 'start' }}
              loading="lazy"
            />
          ))}
        </div>
        <div className="mt-2 text-sm text-gray-500">Install Swiper for enhanced slider: <code>npm i swiper</code></div>
      </div>
    );
  }

  const { Swiper, SwiperSlide } = swiperApi;

  return (
    <Swiper spaceBetween={12} slidesPerView={1} loop={true} breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}>
      {images.map((src, i) => (
        <SwiperSlide key={i}>
          <img
            src={src}
            alt={`screenshot-${i + 1}`}
            className="rounded-lg shadow-sm border border-gray-200"
            style={{ width: '100%', height, objectFit: 'cover' }}
            loading="lazy"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
