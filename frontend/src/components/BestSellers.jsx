import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BestSellers = () => {
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState({});

    // Sample best seller products with multiple images
    const bestSellers = [
        {
            id: 1,
            name: "Diamond Ring",
            category: "Ring",
            price: "₹45,999",
            images: [
                "/1769520110989-Ring.jpeg",
                "/1769521675156-Rings1.jpeg",
                "/1769521675157-Ring2.jpeg"
            ],
            link: "/category/ring"
        },
        {
            id: 2,
            name: "Gold Bracelet",
            category: "Bracelet",
            price: "₹32,499",
            images: [
                "/1769839910318-bangle1.jpeg",
                "/1769839910327-bangle2.jpeg",
                "/1769852061575-bangle1.jpeg"
            ],
            link: "/category/bracelet"
        },
        {
            id: 3,
            name: "Pearl Earrings",
            category: "Earring",
            price: "₹18,999",
            images: [
                "/1769521675157-Ring3.jpeg",
                "/1769521675157-Ring4.jpeg",
                "/1769520110989-Ring.jpeg"
            ],
            link: "/category/earring"
        }
    ];

    // Handle image cycling on hover
    useEffect(() => {
        if (hoveredProduct !== null) {
            const interval = setInterval(() => {
                setCurrentImageIndex(prev => ({
                    ...prev,
                    [hoveredProduct]: (prev[hoveredProduct] || 0) === 2 ? 0 : (prev[hoveredProduct] || 0) + 1
                }));
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [hoveredProduct]);

    const handleMouseEnter = (productId) => {
        setHoveredProduct(productId);
        setCurrentImageIndex(prev => ({
            ...prev,
            [productId]: 0
        }));
    };

    const handleMouseLeave = () => {
        setHoveredProduct(null);
    };

    return (
        <div className='w-full py-12 px-4 bg-white'>
            <div className='max-w-7xl mx-auto'>
                <h2 className='text-3xl font-bold text-center mb-12 text-purple-800'>Best Sellers</h2>

                <div className='flex justify-center items-end gap-12 flex-wrap'>
                    {bestSellers.map((product, index) => (
                        <div
                            key={product.id}
                            className={`group cursor-pointer transition-all duration-300 ${index === 1 ? 'transform translate-y-4' : ''
                                }`}
                            onMouseEnter={() => handleMouseEnter(product.id)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link to={product.link}>
                                <div className={`bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden w-64 ${hoveredProduct === product.id ? 'glitter-border' : ''
                                    }`}>
                                    {/* Product Images */}
                                    <div className='relative h-72 overflow-hidden'>
                                        {product.images.map((image, imgIndex) => (
                                            <img
                                                key={imgIndex}
                                                src={image}
                                                alt={`${product.name} ${imgIndex + 1}`}
                                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hoveredProduct === product.id && currentImageIndex[product.id] === imgIndex
                                                    ? 'opacity-100'
                                                    : imgIndex === 0
                                                        ? 'opacity-100'
                                                        : 'opacity-0'
                                                    }`}
                                            />
                                        ))}

                                        {/* Category Badge */}
                                        <div className='absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium'>
                                            {product.category}
                                        </div>
                                    </div>

                                    {/* Product Details */}
                                    <div className='p-6'>
                                        <h3 className='text-lg font-semibold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors'>
                                            {product.name}
                                        </h3>
                                        <div className='flex items-center justify-between'>
                                            <span className='text-xl font-bold text-purple-700'>
                                                {product.price}
                                            </span>
                                            <button className='bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all text-sm shadow-md'>
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BestSellers;
