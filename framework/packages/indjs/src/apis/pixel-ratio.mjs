
// PixelRatio API

export const PixelRatio = {
    get: () => (typeof window !== 'undefined' ? window.devicePixelRatio : 1),
    getFontScale: () => 1,
    getPixelSizeForLayoutSize: (layoutSize) => {
        const ratio = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
        return Math.round(layoutSize * ratio);
    },
    roundToNearestPixel: (layoutSize) => {
        const ratio = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
        return Math.round(layoutSize * ratio) / ratio;
    }
};

export default PixelRatio;
