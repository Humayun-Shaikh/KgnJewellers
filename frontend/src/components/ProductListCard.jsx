import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductListCard = ({ product }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(product?.coverImageIndex ?? 0);
    const images = product?.image || [];

    const handleDotClick = (e, index) => {
        e.preventDefault(); // Prevent navigation when clicking dots
        e.stopPropagation();
        setCurrentImageIndex(index);
    };

    const currentImage = images[currentImageIndex] || images[0];

    return (
        <div className="group w-72 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
            <Link to={`/products/${product._id}`} className='block'>
                <div className="relative h-72 overflow-hidden">
                    <img
                        src={currentImage ? `/${currentImage}` : '/ErrorImage.png'}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => (e.target.src = '/ErrorImage.png')}
                    />

                    {/* Image Dots */}
                    {images.length > 1 && (
                        <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2 z-10 p-2">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => handleDotClick(e, index)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentImageIndex
                                            ? 'bg-pink-600 scale-110'
                                            : 'bg-white/70 hover:bg-white'
                                        }`}
                                    aria-label={`View image ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
                <div className="p-6">
                    <h2 className={`font-semibold mb-2 group-hover:text-pink-600 transition-colors ${product?.name?.length > 20 ? 'text-base' : 'text-lg'}`}>
                        {product.name}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                        <span className="text-xl font-bold text-purple-700">₹{product.price}</span>
                        <button className='bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all text-sm shadow-md opacity-90 hover:opacity-100'>
                            View Details
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductListCard;
