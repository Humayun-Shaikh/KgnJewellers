import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CategorySlider = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [activeCategory, setActiveCategory] = useState(null);

    const visibleCards = 6;

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_PORT}/api/categories/getAllcategory`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data);
                if (data.length > 0) {
                    setActiveCategory(data[0]._id);
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleNext = () => {
        if (currentPosition < categories.length - visibleCards) {
            setCurrentPosition(currentPosition + 1);
        }
    };

    const handlePrev = () => {
        if (currentPosition > 0) {
            setCurrentPosition(currentPosition - 1);
        }
    };

    return (
        <div className='w-full py-12 px-4' style={{ backgroundColor: '#f5e6e8' }}>
            <div className='max-w-7xl mx-auto'>
                <div className='text-center mb-10'>
                    <p className='text-sm text-gray-600 mb-1'>Shop By</p>
                    <h2 className='text-5xl font-semibold' style={{ color: '#7d2843' }}>Category</h2>
                </div>

                <div className='relative flex items-center justify-center'>
                    <button
                        onClick={handlePrev}
                        disabled={currentPosition === 0}
                        className='absolute left-0 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed'
                        style={{ color: '#7d2843' }}
                    >
                        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                        </svg>
                    </button>

                    <div className='overflow-hidden mx-16' style={{ maxWidth: '1000px' }}>
                        <div
                            className='flex transition-transform duration-500 ease-in-out'
                            style={{ transform: `translateX(-${currentPosition * (100 / visibleCards)}%)` }}
                        >
                            {loading ? (
                                <div className='w-full text-center py-8'>Loading...</div>
                            ) : (
                                categories.map((category, index) => (
                                    <div
                                        key={index}
                                        className='flex-shrink-0 px-4 cursor-pointer'
                                        style={{ width: `${100 / visibleCards}%` }}
                                        onClick={() => setActiveCategory(category._id)}
                                    >
                                        <Link to={`/category/${category._id}`} className='text-center block group'>
                                            <div className='relative overflow-hidden w-32 h-32 mx-auto rounded-full mb-4 bg-white shadow-md transition-all duration-300 group-hover:shadow-xl'>
                                                <img
                                                    src={category.image[0] || '/ErrorImage.png'}
                                                    alt={category.name}
                                                    className='w-full h-full object-cover p-2'
                                                    onError={(e) => { e.target.src = '/ErrorImage.png' }}
                                                />
                                            </div>
                                            <h3 className='font-medium text-base text-gray-800 mb-2'>
                                                {category.name}
                                            </h3>
                                            {activeCategory === category._id && (
                                                <div
                                                    className='w-24 h-1 mx-auto rounded-full'
                                                    style={{ backgroundColor: '#c2185b' }}
                                                ></div>
                                            )}
                                        </Link>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={currentPosition >= categories.length - visibleCards}
                        className='absolute right-0 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed'
                        style={{ color: '#7d2843' }}
                    >
                        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategorySlider;
