import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function ProductUpdate() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('productId');

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
    coverImageIndex: 0
  });

  const images = useMemo(() => product?.image || [], [product]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_PORT}/api/categories/getAllcategory`);
        if (!res.ok) throw new Error('Failed to load categories');
        const data = await res.json();
        setCategories(data || []);
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_PORT}/api/products/getbyId/${productId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || 'Failed to fetch product');
        }
        const data = await res.json();
        setProduct(data);
        setForm({
          name: data?.name || '',
          description: data?.description || '',
          price: String(data?.basePrice ?? data?.price ?? ''),
          stock: String(data?.stock ?? ''),
          categoryId: data?.categoryId?._id || data?.categoryId || data?.category || '',
          coverImageIndex: Number(data?.coverImageIndex ?? 0)
        });
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productId) return;

    const body = {};
    if (form.name) body.name = form.name;
    if (form.description) body.description = form.description;
    if (form.price !== '') body.price = Number(form.price);
    if (form.stock !== '') body.stock = Number(form.stock);
    if (form.categoryId) body.categoryId = form.categoryId;
    if (form.coverImageIndex !== '') body.coverImageIndex = Number(form.coverImageIndex);

    setSaving(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_PORT}/api/products/update/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to update product');
      }
      toast.success('Product updated');
      navigate('/dashboard?tab=products');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!productId) {
    return <div className="p-4">No product selected</div>;
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Update Product</h2>
        <button
          type="button"
          className="bg-gray-200 px-4 py-2 rounded"
          onClick={() => navigate('/dashboard?tab=products')}
        >
          Back
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="bg-white p-4 rounded shadow space-y-3">
            <h3 className="font-semibold">Images / Cover</h3>
            {images.length === 0 ? (
              <div>No images</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {images.map((filename, idx) => (
                  <button
                    type="button"
                    key={filename}
                    onClick={() => setForm((prev) => ({ ...prev, coverImageIndex: idx }))}
                    className={`border rounded overflow-hidden relative ${Number(form.coverImageIndex) === idx ? 'ring-2 ring-blue-600' : ''}`}
                  >
                    <img
                      src={`/${filename}`}
                      alt={`img-${idx}`}
                      className="w-full h-24 object-cover"
                      onError={(e) => (e.target.src = '/ErrorImage.png')}
                    />
                    {Number(form.coverImageIndex) === idx && (
                      <span className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-1 rounded">
                        Cover
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
            <h3 className="font-semibold">Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Name"
                className="border rounded p-2"
              />
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
                placeholder="Base Price"
                className="border rounded p-2"
              />
              <input
                type="number"
                value={form.stock}
                onChange={(e) => setForm((prev) => ({ ...prev, stock: e.target.value }))}
                placeholder="Stock"
                className="border rounded p-2"
              />
              <select
                value={form.categoryId}
                onChange={(e) => setForm((prev) => ({ ...prev, categoryId: e.target.value }))}
                className="border rounded p-2"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Description"
              className="border rounded p-2 w-full"
            />

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Update Product'}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default ProductUpdate;
