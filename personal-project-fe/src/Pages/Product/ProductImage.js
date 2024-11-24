import React, { useState, useEffect } from 'react';

const ProductImage = React.memo(({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleImageClick = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images]);

    return (
        <div className="text-center">
            <div className="image-container">
                <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image.url}
                            alt={`Product ${index + 1}`}
                            className="main-image"
                        />
                    ))}
                </div>
            </div>
            <div className="d-flex justify-content-center gap-2">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image.url}
                        alt={`Product thumbnail ${index + 1}`}
                        className="border rounded cursor-pointer thumbnail"
                        onClick={() => handleImageClick(index)}
                        style={{ opacity: currentIndex === index ? 1 : 0.7, width: "100px" }}
                    />
                ))}
            </div>
        </div>
    );
});

export default ProductImage;
