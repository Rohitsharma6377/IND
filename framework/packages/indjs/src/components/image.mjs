import React from 'react';

// INDJS Image component - uses /_image endpoint for on-the-fly optimization
// Props: src (required), alt (required), width, quality, sizes, className, style, loading, decoding
// Also supports responsive: widths=[320,640,960,1200] to generate srcSet
export default function Image(props) {
  const {
    src,
    alt,
    width,
    height,
    quality = 80,
    sizes = '100vw',
    className,
    style,
    loading = 'lazy',
    decoding = 'async',
    widths,
    unoptimized = false,
    // When priority is true, hint browser to fetch with higher priority and avoid lazy-loading
    priority = false,
  } = props;

  if (!src) return null;

  const buildUrl = (w) => {
    const params = new URLSearchParams();
    params.set('src', src);
    if (w) params.set('w', String(w));
    if (quality) params.set('q', String(quality));
    return `/_image?${params.toString()}`;
  };

  // If unoptimized, pass through original src and attributes
  if (unoptimized) {
    return (
      <img
        src={src}
        alt={alt || ''}
        width={width}
        height={height}
        className={className}
        style={style}
        loading={priority ? 'eager' : loading}
        decoding={decoding}
        fetchPriority={priority ? 'high' : undefined}
      />
    );
  }

  let finalSrc = buildUrl(width);
  let srcSet;
  if (Array.isArray(widths) && widths.length) {
    const unique = Array.from(new Set(widths.filter(Boolean).map(Number))).sort((a,b)=>a-b);
    if (unique.length) srcSet = unique.map(w => `${buildUrl(w)} ${w}w`).join(', ');
  }

  return (
    <img
      src={finalSrc}
      alt={alt || ''}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      width={width}
      height={height}
      className={className}
      style={style}
      loading={priority ? 'eager' : loading}
      decoding={decoding}
      fetchPriority={priority ? 'high' : undefined}
    />
  );
}


