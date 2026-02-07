import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductListCard from '../../components/ProductListCard';

function ProductListPage() {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_PORT}/api/products/getProductsByCategory/${categoryId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products')
                }
                const data = await response.json();
                setProducts(data.products);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId]);

    return (
        <>
            <Header />
            <div className="container mx-auto mt-8">
                <h1 className="text-3xl font-bold mb-4">Products in this Category</h1>
                {loading && <div>Loading...</div>}
                {!loading && products.length === 0 && (
                    <div>No products available in this category</div>
                )}
                <div className='flex flex-wrap gap-8 justify-center'>
                    {products.map(product => (
                        <ProductListCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProductListPage;
