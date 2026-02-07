import React from 'react';

import collage1 from '../../assets/collage_img_1.jpg';
import collage2 from '../../assets/collage_img_2.jpg';
import collage3 from '../../assets/collage_img_3.jpg';

const KGNSelections = () => {
    return (
        <section className='w-full py-12 px-4 bg-white'>
            <div className='max-w-7xl mx-auto'>
                <div className='text-center mb-10'>
                    <h2 className='text-3xl font-semibold tracking-wide text-purple-800'>KGN Selections</h2>
                    <p className='text-gray-600 mt-2'>Explore our newly launched collection</p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='rounded-2xl overflow-hidden shadow-xl h-96'>
                        <img
                            src={collage1}
                            alt='KGN Selection 1'
                            className='w-full h-full object-cover'
                        />
                    </div>

                    <div className='grid grid-rows-2 gap-6'>
                        <div className='rounded-2xl overflow-hidden shadow-xl h-44'>
                            <img
                                src={collage2}
                                alt='KGN Selection 2'
                                className='w-full h-full object-cover'
                            />
                        </div>
                        <div className='rounded-2xl overflow-hidden shadow-xl h-44'>
                            <img
                                src={collage3}
                                alt='KGN Selection 3'
                                className='w-full h-full object-cover'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default KGNSelections;
