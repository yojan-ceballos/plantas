import React, { useState } from 'react';

interface GalleryProps {
    image: string;
    name: string;
    tag?: string;
}

const Gallery: React.FC<GalleryProps> = ({ image, name, tag }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Generate thumbnail variants from the main image
    const thumbnails = [image, image, image];

    return (
        <div className="pdp-gallery">
            <div className="pdp-gallery__main">
                <img
                    src={thumbnails[activeIndex]}
                    alt={name}
                    className="pdp-gallery__main-img"
                />
                {tag && (
                    <div className="pdp-gallery__badge">{tag}</div>
                )}
            </div>
            <div className="pdp-gallery__thumbs">
                {thumbnails.map((src, i) => (
                    <button
                        key={i}
                        className={`pdp-gallery__thumb ${i === activeIndex ? 'pdp-gallery__thumb--active' : ''}`}
                        onClick={() => setActiveIndex(i)}
                    >
                        <img src={src} alt={`${name} view ${i + 1}`} />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
