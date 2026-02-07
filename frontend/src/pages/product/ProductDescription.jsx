import React, { useEffect, useState } from 'react';
import ImageDescription from '../../components/ImageDescription';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getProductByIdFailure, getProductByIdStart, getProductByIdSuccess } from '../../redux/slices/productSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addCartItemFailure, addCartItemStart, addCartItemSuccess } from '../../redux/slices/cartSlice';

function ProductDescription() {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const { productId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { currentUser } = useSelector(state => state.user);
    const [product, setProduct] = useState(null);
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    useEffect(() => {
        fetchProduct(productId);
        if (currentUser) {
            fetchCartItems(productId);
        }
        return () => {
            dispatch(getProductByIdSuccess([]));
        };
    }, [productId, currentUser]);

    const fetchProduct = async (productId) => {
        try {
            dispatch(getProductByIdStart());
            const response = await fetch(`${import.meta.env.VITE_PORT}/api/products/getbyId/${productId}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch product');
            }
            const data = await response.json();
            dispatch(getProductByIdSuccess(data));
            setProduct(data);
            setLoading(false);
        } catch (error) {
            dispatch(getProductByIdFailure(error.message));
            setLoading(false);
        }
    };

    const fetchCartItems = async (productId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_PORT}/api/cart/getcart/${currentUser._id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch cart items');
            }
            const data = await response.json();
            const isProductInCart = data.some(item => item.product._id === productId);
            setIsAddedToCart(isProductInCart);
        } catch (error) {
            console.error('Error fetching cart items:', error.message);
        }
    };

    const handleAddToCart = async (productId) => {
        if (!currentUser) {
            toast.error('Please log in to add items to the cart');
            return;
        }

        try {
            dispatch(addCartItemStart());
            const res = await fetch(`${import.meta.env.VITE_PORT}/api/cart/addToCart/${productId}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId: currentUser._id })
            });
            if (!res.ok) {
                toast.error('Something went wrong');
                throw new Error('Failed to add product to cart');
            }
            const data = await res.json();
            dispatch(addCartItemSuccess(data));
            setIsAddedToCart(true);
            toast.success('Product added to cart');
        } catch (error) {
            dispatch(addCartItemFailure(error.message));
        }
        setQuantity(1);
    };

    const handleBuyNow = async (productId) => {
        if (!currentUser) {
            toast.error('Please log in to add items to the cart');
            return;
        }

        try {
            dispatch(addCartItemStart());
            const res = await fetch(`${import.meta.env.VITE_PORT}/api/cart/addToCart/${productId}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId: currentUser._id })
            });
            if (!res.ok) {
                toast.error('Something went wrong');
                throw new Error('Failed to add product to cart');
            }
            const data = await res.json();
            dispatch(addCartItemSuccess(data));
            setIsAddedToCart(true);
            toast.success('Product added to cart');
            navigate('/cart');
        } catch (error) {
            dispatch(addCartItemFailure(error.message));
        }
        setQuantity(1);
    };

    return (
        <>
            <Header />
            <div className='flex justify-center flex-wrap content-center items-center'>
                <div className='w-full md:w-1/2 p-4'>
                    {product ? (
                        <ImageDescription images={product.image} />
                    ) : (
                        <div className="h-[500px] w-full bg-gray-100 rounded-xl animate-pulse"></div>
                    )}
                </div>
                <div className='flex m-[3vw] flex-col md:w-1/3'>
                    {product && (
                        <>
                            <p className='text-gray-500 font-medium text-sm tracking-wider uppercase mb-1'>{product.category}</p>
                            <h1 className='font-bold text-3xl mb-4 text-gray-800'>{product.name}</h1>

                            <div className="flex items-center gap-4 mb-6">
                                <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold text-xl shadow-[0_4px_0_rgb(21,128,61)] transform active:translate-y-1 active:shadow-none transition-all">
                                    ₹{product.price}
                                </button>
                                {product.price && (
                                    <del className='text-gray-400 text-lg'>₹{product.price + 200}</del>
                                )}
                            </div>


                        </>
                    )}
                    <div className="m-[2vw] w-[80vw] md:w-auto flex flex-wrap">
                        {currentUser ? (
                            currentUser.userType === 'admin' ? (
                                <p className="text-red-500">Admin cannot purchase</p>
                            ) : (
                                isAddedToCart ? (
                                    <Link to="/cart" className="bg-blue-600 text-center w-full md:w-[10vw] rounded-[30px] font-none text-white px-4 py-2">
                                        Go to Cart
                                    </Link>
                                ) : (
                                    <>
                                        <button
                                            className="bg-pink-500 hover:bg-pink-600 w-full md:w-[10vw] rounded-[30px] font-none text-white px-4 py-2 md:mr-5 transition-colors shadow-md"
                                            onClick={() => handleAddToCart(productId)}
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            onClick={() => handleBuyNow(productId)}
                                            className="md:w-[10vw] mt-5 md:mt-0 bg-fuchsia-600 hover:bg-fuchsia-700 w-full rounded-[30px] font-none text-white px-4 py-2 transition-colors shadow-md"
                                        >
                                            Buy Now
                                        </button>
                                    </>
                                )
                            )
                        ) : (
                            <p className="text-red-500">Please login to buy <br />
                                <Link to='/SignIn'>
                                    <button className='border bg-blue-500 border-white rounded-full text-white px-4 py-2'>Sign In</button>
                                </Link>
                            </p>
                        )}
                    </div>

                    {product && (
                        <div className="mt-8 mx-[2vw] w-[80vw] md:w-auto p-6 bg-pink-50 rounded-xl border border-pink-100 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-pink-400"></div>
                            <h3 className="text-pink-800 font-semibold mb-2 uppercase tracking-wide text-xs">Product Highlights</h3>
                            <div className='text-gray-700 leading-relaxed'>
                                {product.description}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProductDescription;
