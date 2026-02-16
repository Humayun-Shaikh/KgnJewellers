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
            <header className='sticky top-0 z-50 bg-white font-sans'>
                {/* Top Banner */}
                <div className='bg-black text-white text-center py-2 text-sm'>
                    BIS Hallmarked & Certified Jewellery ✨
                </div>

                {/* Main Header */}
                <div className='border-b border-gray-200 py-4 px-6'>
                    <nav className='flex justify-between items-center max-w-7xl mx-auto'>
                        {/* Left - Phone Number */}
                        <div className='text-gray-700 text-sm flex-1 hidden md:block'>
                            <span>📞 +91-900-100-1313</span>
                        </div>

                        {/* Center - Logo & Brand */}
                        <div className='flex-1 flex justify-center'>
                            <Link to='/' className='text-4xl font-light tracking-widest text-gray-900'>
                                SILVERWALE
                            </Link>
                        </div>

                        {/* Right - Search & Icons */}
                        <div className='flex-1 flex justify-end items-center space-x-6'>
                            {/* Search Bar */}
                            <div className='hidden md:flex items-center border border-gray-300 rounded px-3 py-2 w-48'>
                                <input
                                    type='text'
                                    placeholder='SEARCH'
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                                    className='flex-1 outline-none text-sm bg-transparent'
                                />
                                <button onClick={handleSearch} className='text-gray-600'>
                                    <FaSearch className='h-4 w-4' />
                                </button>
                            </div>

                            {/* Search Icon Mobile */}
                            <button
                                onClick={() => setShowSearch(!showSearch)}
                                className='md:hidden text-gray-700 hover:text-gray-900'
                            >
                                <FaSearch className='h-5 w-5' />
                            </button>

                            {/* Wishlist */}
                            {currentUser && (
                                <button className='text-gray-700 hover:text-gray-900'>
                                    <FaHeart className='h-5 w-5' />
                                </button>
                            )}

                            {/* Account */}
                            {currentUser ? (
                                <Link to='/profile' className='text-gray-700 hover:text-gray-900'>
                                    <FaRegUserCircle className='h-6 w-6' />
                                </Link>
                            ) : (
                                <Link to='/signin' className='text-gray-700 hover:text-gray-900'>
                                    <FaRegUserCircle className='h-6 w-6' />
                                </Link>
                            )}

                            {/* Cart */}
                            <li className='relative list-none'>
                                <Link to='/cart' className='text-gray-700 hover:text-gray-900'>
                                    <FaShoppingCart className='h-5 w-5' />
                                    {cartItems && cartItems.length > 0 && (
                                        <div className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs font-bold">
                                            {cartItems.length}
                                        </div>
                                    )}
                                </Link>
                            </li>
                        </div>
                    </nav>
                </div>

                {/* Navigation Menu */}
                <div className='border-b border-gray-200 hidden md:block'>
                    <nav className='flex justify-center items-center space-x-12 max-w-7xl mx-auto px-6 py-4'>
                        <Link to='/category/ring' className='text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors tracking-wide'>
                            RINGS
                        </Link>
                        <Link to='/category/earring' className='text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors tracking-wide'>
                            EARRINGS
                        </Link>
                        <Link to='/category/necklace' className='text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors tracking-wide'>
                            NECKLACES
                        </Link>
                        <Link to='/explore' className='text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors tracking-wide'>
                            BANGLES & BRACELETS
                        </Link>
                        <Link to='/explore' className='text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors tracking-wide'>
                            ENGAGEMENT & WEDDING
                        </Link>
                        <Link to='/explore' className='text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors tracking-wide'>
                            COLLECTIONS
                        </Link>
                        <Link to='/explore' className='text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors tracking-wide'>
                            GIFTS
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Mobile Search Modal */}
            {showSearch && (
                <div className='fixed inset-0 bg-black bg-opacity-50 z-40 flex items-start justify-center pt-20 md:hidden'>
                    <div className='bg-white rounded-lg w-full max-w-md mx-4 p-4'>
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
                                    placeholder="Search..."
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
