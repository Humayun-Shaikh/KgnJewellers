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
