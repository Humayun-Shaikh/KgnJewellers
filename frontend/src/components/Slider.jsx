import React, { useState, useEffect } from 'react';

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: "/1769839910318-bangle1.jpeg",
            title: "New Collection",
            subtitle: "Discover our latest designs",
            buttonText: "Shop Now"
        },
        {
            image: "/1769520110989-Ring.jpeg",
            title: "Traditional Jewellery",
            subtitle: "Timeless elegance for every occasion",
            buttonText: "Explore"
        },
        {
            image: "/1769839910327-bangle2.jpeg",
            title: "Special Offers",
            subtitle: "Up to 50% off on selected items",
            buttonText: "View Deals"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className='relative w-full h-96 overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100'>
            {/* Slides */}
            <div className='relative h-full'>
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className='w-full h-full object-cover'
                        />
                        <div className='absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center'>
                            <div className='text-center text-white'>
                                <h2 className='text-4xl font-bold mb-2'>{slide.title}</h2>
                                <p className='text-xl mb-6'>{slide.subtitle}</p>
                                <button className='bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg'>
                                    {slide.buttonText}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dots Indicator */}
            <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2'>
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentSlide
                            ? 'bg-pink-500 w-8'
                            : 'bg-white bg-opacity-50 hover:bg-pink-300'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;
