import React from 'react';

// INDJS Image component - uses /_image endpoint for on-the-fly optimization
// Props: src (required), alt (required), width, quality, sizes, className, style, loading, decoding
// Also supports responsive: widths=[320,640,960,1200] to generate srcSet
export default function Image(props) {
  const {
    src,
    alt,
    width,
    quality = 80,
    sizes = '100vw',
    className,
    style,
    loading,
    decoding,
    widths
  } = props;

  if (!src) return null;

  const buildUrl = (w) => {
    const params = new URLSearchParams();
    params.set('src', src);
    if (w) params.set('w', String(w));
    if (quality) params.set('q', String(quality));
    return `/_image?${params.toString()}`;
  };

  let finalSrc = buildUrl(width);
  let srcSet;
  if (Array.isArray(widths) && widths.length) {
    srcSet = widths.map(w => `${buildUrl(w)} ${w}w`).join(', ');
  }

  return (
    <img
      src={finalSrc}
      alt={alt || ''}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      width={width}
      className={className}
      style={style}
      loading={loading}
      decoding={decoding}
    />
  );
}
