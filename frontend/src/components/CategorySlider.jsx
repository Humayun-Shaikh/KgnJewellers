// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const CategorySlider = () => {
//     const [currentPosition, setCurrentPosition] = useState(0);

//     const categories = [
//         {
//             name: "Ring",
//             image: "/1769520110989-Ring.jpeg",
//             link: "/category/ring"
//         },
//         {
//             name: "Bracelet",
//             image: "/1769839910318-bangle1.jpeg",
//             link: "/category/bracelet"
//         },
//         {
//             name: "Earring",
//             image: "/1769521675156-Rings1.jpeg",
//             link: "/category/earring"
//         },
//         {
//             name: "Necklace",
//             image: "/1769521675157-Ring2.jpeg",
//             link: "/category/necklace"
//         }, {
//             name: "Necklace",
//             image: "/1769521675157-Ring2.jpeg",
//             link: "/category/necklace"
//         }, {
//             name: "Necklace",
//             image: "/1769521675157-Ring2.jpeg",
//             link: "/category/necklace"
//         }
//     ];

//     const slideWidth = 180; // increased width for larger cards
//     const visibleCards = 4;
//     const maxPosition = Math.max(0, categories.length - visibleCards);

//     // Auto-slide functionality
//     useEffect(() => {
//         const timer = setInterval(() => {
//             setCurrentPosition((prev) => {
//                 if (prev >= maxPosition) {
//                     return 0; // Reset to start when reaching the end
//                 }
//                 return prev + 1;
//             });
//         }, 4000); // Auto-slide every 4 seconds

//         return () => clearInterval(timer);
//     }, [maxPosition]);

//     return (
//         <div className='w-full py-8 px-4 bg-gray-50'>
//             <div className='max-w-7xl mx-auto'>
//                 <div className='text-center mb-8'>
//                     <h2 className='text-3xl font-bold text-[#e91e63] mb-2'>Find your Perfect Match</h2>
//                     <h3 className='text-xl text-gray-600 opacity-60'>Shop by Category</h3>
//                 </div>

//                 <div className='relative'>
//                     {/* Categories Container */}
//                     <div className='overflow-hidden mx-4'>
//                         <div
//                             className='flex transition-transform duration-500 ease-in-out justify-center'
//                             style={{ transform: `translateX(-${currentPosition * slideWidth}px)` }}
//                         >
//                             {categories.map((category, index) => (
//                                 <div
//                                     key={index}
//                                     className='flex-shrink-0 w-40 mx-4 cursor-pointer group'
//                                 >
//                                     <Link to={category.link} className='text-center block'>
//                                         <div className='relative overflow-hidden w-32 h-32 mx-auto rounded-full mb-3 transition-all duration-300'>
//                                             <img
//                                                 src={category.image}
//                                                 alt={category.name}
//                                                 className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
//                                             />
//                                         </div>
//                                         <h3 className='font-semibold text-base transition-all duration-300 group-hover:scale-110 group-hover:text-[#c2185b]'>
//                                             {category.name}
//                                         </h3>
//                                     </Link>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CategorySlider;

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CategorySlider = () => {
    const [currentPosition, setCurrentPosition] = useState(0);
    const [activeCategory, setActiveCategory] = useState(1);

    const categories = [
        {
            name: "Ring",
            image: "/1769520110989-Ring.jpeg",
            link: "/category/ring"
        },
        {
            name: "Bracelet",
            image: "/1769839910318-bangle1.jpeg",
            link: "/category/bracelet"
        },
        {
            name: "Earring",
            image: "/1769521675156-Rings1.jpeg",
            link: "/category/earring"
        },
        {
            name: "Necklace",
            image: "/1769521675157-Ring2.jpeg",
            link: "/category/necklace"
        }, {
            name: "Necklace",
            image: "/1769521675157-Ring2.jpeg",
            link: "/category/necklace"
        }, {
            name: "Necklace",
            image: "/1769521675157-Ring2.jpeg",
            link: "/category/necklace"
        }
    ];

    const visibleCards = 6;
    const maxPosition = Math.max(0, categories.length - visibleCards);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentPosition((prev) => {
                if (prev >= maxPosition) {
                    return 0;
                }
                return prev + 1;
            });
        }, 5000);

        return () => clearInterval(timer);
    }, [maxPosition]);

    const handlePrev = () => {
        setCurrentPosition((prev) => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setCurrentPosition((prev) => Math.min(maxPosition, prev + 1));
    };

    return (
        <div className='w-full py-12 px-4' style={{ backgroundColor: '#f5eae8' }}>
            <div className='max-w-7xl mx-auto'>
                <div className='text-center mb-12'>
                    <p className='text-sm text-gray-600 mb-1 tracking-wide'>Shop By</p>
                    <h2 className='text-5xl font-normal tracking-wide' style={{ color: '#6b2c3e' }}>
                        Category
                    </h2>
                </div>

                <div className='relative'>
                    <button
                        onClick={handlePrev}
                        disabled={currentPosition === 0}
                        className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-md hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed'
                        aria-label="Previous"
                    >
                        <ChevronLeft className='w-6 h-6 text-gray-600' />
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={currentPosition >= maxPosition}
                        className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-md hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed'
                        aria-label="Next"
                    >
                        <ChevronRight className='w-6 h-6 text-gray-600' />
                    </button>

                    <div className='overflow-hidden mx-12'>
                        <div className='flex gap-8 justify-center'>
                            {categories.map((category, index) => (
                                <div
                                    key={index}
                                    className='flex-shrink-0 cursor-pointer group'
                                    onClick={() => setActiveCategory(index)}
                                >
                                    <div className='text-center'>
                                        <div className='relative overflow-hidden w-36 h-36 mx-auto rounded-full mb-4 transition-all duration-300 group-hover:scale-105 shadow-md'>
                                            <img
                                                src={category.image}
                                                alt={category.name}
                                                className='w-full h-full object-cover'
                                            />
                                        </div>
                                        <div className='relative'>
                                            <h3
                                                className='font-normal text-base text-gray-800 transition-colors duration-300'
                                                style={{ color: activeCategory === index ? '#6b2c3e' : '#4a4a4a' }}
                                            >
                                                {category.name}
                                            </h3>
                                            {activeCategory === index && (
                                                <div
                                                    className='absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-300'
                                                    style={{
                                                        width: '60%',
                                                        backgroundColor: '#d63384'
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategorySlider;
