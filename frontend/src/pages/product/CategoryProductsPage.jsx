import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductListCard from '../../components/ProductListCard';

function CategoryProductsPage() {
    const { categoryName } = useParams();
    const [categoriesLoading, setCategoriesLoading] = useState(false);
    const [productsLoading, setProductsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    const slug = useMemo(() => {
        const raw = decodeURIComponent(String(categoryName || '')).trim().toLowerCase();
        return raw
            .replace(/&/g, 'and')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }, [categoryName]);

    const findCategory = (all) => {
        const match = (name) => {
            const s = String(name || '')
                .trim()
                .toLowerCase()
                .replace(/&/g, 'and')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            return s;
        };

        const altSlug = slug.endsWith('s') ? slug.slice(0, -1) : `${slug}s`;

        return (all || []).find((c) => {
            const nameSlug = match(c?.name);
            return (
                nameSlug === slug ||
                nameSlug === altSlug ||
                String(c?._id || '') === String(categoryName || '')
            );
        }) || null;
    };

    useEffect(() => {
        const fetchCategories = async () => {
            setCategoriesLoading(true);
            setError('');
            try {
                const res = await fetch(`${import.meta.env.VITE_PORT}/api/categories/getAllcategory`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                if (!res.ok) {
                    const data = await res.json().catch(() => ({}));
                    throw new Error(data.message || 'Failed to fetch categories');
                }
                const data = await res.json();
                setCategories(Array.isArray(data) ? data : (data?.categories || []));
            } catch (e) {
                setError(e.message || 'Failed to fetch categories');
            } finally {
                setCategoriesLoading(false);
            }
        };

        fetchCategories();
    }, [slug]);

    const selectedCategory = useMemo(() => findCategory(categories), [categories, slug]);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!selectedCategory?._id) {
                setProducts([]);
                return;
            }

            setProductsLoading(true);
            setError('');
            try {
                const res = await fetch(`${import.meta.env.VITE_PORT}/api/products/getProductsByCategory/${selectedCategory._id}`);
                if (!res.ok) {
                    const data = await res.json().catch(() => ({}));
                    throw new Error(data.message || 'Failed to fetch products');
                }
                const data = await res.json();
                setProducts(Array.isArray(data) ? data : (data?.products || []));
            } catch (e) {
                setError(e.message || 'Failed to fetch products');
            } finally {
                setProductsLoading(false);
            }
        };

        fetchProducts();
    }, [selectedCategory?._id]);

    return (
        <>
            <Header />
            <div className='container mx-auto mt-8 px-4'>
                <h1 className='text-3xl font-bold mb-6'>
                    {selectedCategory?.name || (slug ? slug.replace(/-/g, ' ') : 'Category')}
                </h1>

                {(categoriesLoading || productsLoading) && <div>Loading...</div>}
                {!!error && !categoriesLoading && !productsLoading && <div>{error}</div>}

                {!categoriesLoading && !productsLoading && !error && !selectedCategory && (
                    <div>No category found</div>
                )}

                {!categoriesLoading && !productsLoading && !error && selectedCategory && products.length === 0 && (
                    <div>No products available in this category</div>
                )}

                <div className='flex flex-wrap gap-8 justify-center'>
                    {products.map((product) => (
                        <ProductListCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CategoryProductsPage;
