import React, { useEffect, useState } from 'react'
import { FaBars, FaHamburger, FaHeart, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { FaRegUserCircle } from "react-icons/fa";
import { MdAccountCircle } from 'react-icons/md'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
function Header({ onSearch }) {
    const { currentUser } = useSelector((state) => state.user);
    const cartItems = useSelector(state => state.cart.cartItems);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [query, setQuery] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const dispatch = useDispatch()

    const handleSearch = (e) => {
        e.preventDefault()
        const searchString = encodeURIComponent(String(query).trim())
        if (searchString) {
            window.location.href = `/search?q=${searchString}`
        }
    }

    useEffect(() => {
        setIsLoggedIn(currentUser !== null)
    }, [currentUser])
    return (
        <>
            <header className='sticky bg-white p-3 font-sans text-black top-0 z-10 border-b-2 border-pink-200'>
                <nav className='flex justify-between items-center'>
                    <ul className='flex items-center space-x-8'>
                        <li className='flex items-center'>
                            <img src="..\assets\KGN_logo.png" alt="" className='h-8 w-auto md:h-10 md:w-auto' />
                        </li>
                        <li>
                            <Link to='/' className='cursor-pointer'><div className='cursor-pointer font-semibold text-xl text-purple-800'>KGN Jewellery</div></Link>
                        </li>
                    </ul>

                    {/* Navigation Menu */}
                    <ul className='hidden lg:flex items-center space-x-6 text-sm'>
                        {/* <li><Link to='/new-arrivals' className='hover:text-gray-600'>New Arrivals</Link></li> */}
                        <li><Link to='/category/earring' className='hover:text-pink-600 transition-colors'>Earrings</Link></li>
                        <li><Link to='/category/necklace' className='hover:text-pink-600 transition-colors'>Necklace</Link></li>
                        <li><Link to='/category/ring' className='hover:text-pink-600 transition-colors'>Rings</Link></li>
                        {/* <li><Link to='/bangles' className='hover:text-gray-600'>Bangles</Link></li>
                        <li><Link to='/anklets' className='hover:text-gray-600'>Anklets / Ankle Kada</Link></li>
                        <li><Link to='/mens-collection' className='hover:text-gray-600'>Men's Collection</Link></li> */}
                        <li><Link to='/explore' className='hover:text-pink-600 transition-colors'>Explore More Categories</Link></li>
                    </ul>

                    {/* Right Side Icons */}
                    <ul className='flex items-center space-x-6'>
                        <li><button onClick={() => setShowSearch(!showSearch)} className='hover:text-gray-600'><FaSearch className='h-6 w-6' /></button></li>
                        {currentUser ? (
                            <>
                                <li><button className='hover:text-gray-600'><FaHeart className='h-6 w-6' /></button></li>
                                <li><Link to='/profile' className='hover:text-gray-600'><FaRegUserCircle className='h-6 w-6' /></Link></li>
                                <li className='relative'>
                                    <Link to='/cart' className='hover:text-gray-600'>
                                        <FaShoppingCart className='h-6 w-6' />
                                        {cartItems && cartItems.length > 0 && (
                                            <div className="absolute -top-2 -right-2 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs">
                                                {cartItems.length}
                                            </div>
                                        )}
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <Link to='/signin'>
                                <button className='px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors'>
                                    Sign In
                                </button>
                            </Link>
                        )}
                    </ul>
                </nav>
            </header>

            {/* Search Modal */}
            {showSearch && (
                <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20'>
                    <div className='bg-white rounded-lg w-full max-w-2xl mx-4 p-4'>
                        <div className='flex items-center justify-between mb-4'>
                            <h3 className='text-lg font-semibold'>Search</h3>
                            <button
                                onClick={() => setShowSearch(false)}
                                className='text-gray-500 hover:text-gray-700'
                            >
                                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleSearch} className='flex items-center'>
                            <div className='flex-1 flex items-center border border-gray-300 rounded-lg'>
                                <input
                                    className='flex-1 px-4 py-2 outline-none text-black'
                                    type="text"
                                    placeholder="Search for products..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    autoFocus
                                />
                                <button type='submit' className='px-4 py-2 text-gray-600 hover:text-gray-800'>
                                    <FaSearch className="h-5 w-5" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default Header
