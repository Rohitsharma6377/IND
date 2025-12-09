import React from 'react';
import StyleSheet from '../apis/style-sheet.mjs';

// INDJS Image component - uses /_image endpoint for on-the-fly optimization
// Props: src (required), alt (required), width, quality, sizes, className, style, loading, decoding
// Also supports responsive: widths=[320,640,960,1200] to generate srcSet
export default function Image(props) {
  const {
    src,
    source,
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
    priority = false,
    resizeMode = 'cover',
    onError,
    onLoad,
    ...rest
  } = props;

  // React Native 'source' prop support
  const realSrc = src || (source && source.uri) || '';
  if (!realSrc) return null;

  const buildUrl = (w) => {
    // If it's a remote URL or data URI, we might not want to optimize it via our local API unless configured
    // For now we assume local optimization if it fits the pattern
    if (realSrc.startsWith('data:') || realSrc.startsWith('blob:')) return realSrc;

    // Simplistic check: if it is external, maybe valid
    const params = new URLSearchParams();
    params.set('src', realSrc);
    if (w) params.set('w', String(w));
    if (quality) params.set('q', String(quality));
    return `/_image?${params.toString()}`;
  };

  const objectFitMap = {
    contain: 'contain',
    cover: 'cover',
    stretch: 'fill',
    center: 'none',
    repeat: 'none', // Not fully supported via object-fit
  };

  const imageStyle = {
    objectFit: objectFitMap[resizeMode] || 'cover',
    width: width || '100%',
    height: height || '100%',
    ...StyleSheet.flatten(style)
  };

  // If unoptimized, pass through original src
  if (unoptimized || realSrc.startsWith('data:')) {
    return (
      <img
        src={realSrc}
        alt={alt || ''}
        width={width}
        height={height}
        className={className}
        style={imageStyle}
        loading={priority ? 'eager' : loading}
        decoding={decoding}
        fetchPriority={priority ? 'high' : undefined}
        onError={onError}
        onLoad={onLoad}
        {...rest}
      />
    );
  }

  // Optimized path
  let finalSrc = buildUrl(width);
  let srcSet;
  if (Array.isArray(widths) && widths.length) {
    const unique = Array.from(new Set(widths.filter(Boolean).map(Number))).sort((a, b) => a - b);
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
      style={imageStyle}
      loading={priority ? 'eager' : loading}
      decoding={decoding}
      fetchPriority={priority ? 'high' : undefined}
      onError={onError}
      onLoad={onLoad}
      {...rest}
    />
  );
}


