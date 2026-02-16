import React from 'react';
import icon1 from '../../assets/Icon1_assurance.svg';
import icon2 from '../../assets/Icon2_assurance.svg';
import icon3 from '../../assets/Icon3_assurance.svg';

const SilverwaleAssurance = () => {
    const assurances = [
        {
            icon: icon1,
            title: "Quality Craftsmanship",
            description: "Expertly crafted with precision and care"
        },
        {
            icon: icon2,
            title: "Ethically Sourced",
            description: "Responsibly sourced materials and gems"
        },
        {
            icon: icon3,
            title: "100% Transparency",
            description: "Clear pricing and honest product information"
        }
    ];

    return (
        <section className='w-full py-16 px-4 bg-gradient-to-br from-purple-50 to-pink-50'>
            <div className='max-w-7xl mx-auto'>
                <div className='text-center mb-12'>
                    <h2 className='text-4xl font-bold text-purple-800 mb-4'>Silverwale Assurance</h2>
                    <p className='text-lg text-gray-700'>Your trust is our most precious asset</p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {assurances.map((assurance, index) => (
                        <div key={index} className='text-center group'>
                            <div className='flex justify-center mb-6'>
                                <div className='w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300'>
                                    <img
                                        src={assurance.icon}
                                        alt={assurance.title}
                                        className='w-12 h-12'
                                    />
                                </div>
                            </div>
                            <h3 className='text-xl font-semibold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors'>
                                {assurance.title}
                            </h3>
                            <p className='text-gray-600 leading-relaxed'>
                                {assurance.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SilverwaleAssurance;
