import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAdminOrdersStart, getAllAdminOrdersSuccess, getAllAdminOrdersFailure } from '../../redux/slices/orderSlice';

function Order() {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.order);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalOrders, setTotalOrders] = useState(0)
    const pageSize = 10

    useEffect(() => {
        fetchAllOrders(currentPage)
        return () => {
            dispatch(getAllAdminOrdersSuccess([]))
        }
    }, [currentPage])

    const fetchAllOrders = async (page) => {
        dispatch(getAllAdminOrdersStart())
        try {
            const res = await fetch(`${import.meta.env.VITE_PORT}/api/orders/getadminorders?page=${page}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!res.ok) { throw new Error("invalid response: ", res) }
            const data = await res.json()
            dispatch(getAllAdminOrdersSuccess(data))
        } catch (error) {
            dispatch(getAllAdminOrdersFailure(error.message))
        }
    }

    const updateOrderStatus = async (orderId, status) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_PORT}/api/orders/updatestatus/${orderId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            if (!res.ok) throw new Error('Failed to update status');
            fetchAllOrders(currentPage); // refresh list
        } catch (err) {
            console.error('Error updating order status:', err);
            alert('Failed to update order status');
        }
    }

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const renderPagination = () => {
        const disableNext = currentPage * pageSize >= totalOrders;
        return (
            <div className='w-[100%] flex justify-between'>
                <button className='bg-blue-500 rounded-lg text-white px-3 py-3' onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                <span> Page {currentPage} </span>
                <button className='bg-blue-500 rounded-lg text-white px-3 py-3' onClick={nextPage} disabled={currentPage >= pageSize && disableNext} >Next</button>
            </div>
        );
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Admin Orders</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-600">Error: {error}</p>}
            {orders && orders.map((order) => {
                console.log('Admin order:', order);
                return (
                <div key={order._id} className="border rounded-lg p-4 mb-4 shadow">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <p className="font-semibold">Order ID: {order._id}</p>
                            <p>User: {order.userId?.username || 'N/A'} ({order.userId?.email || 'N/A'})</p>
                            <p>Order Date: {formatDate(order.orderDate)}</p>
                            <p className="font-semibold">Total: ₹{order.totalAmount}</p>
                            <p>Status: <span className={`font-semibold ${order.status === 'confirmed' ? 'text-green-600' : order.status === 'cancelled' ? 'text-red-600' : 'text-yellow-600'}`}>{order.status}</span></p>
                        </div>
                        {order.status === 'pending' && (
                            <div className="flex gap-2">
                                <button
                                    onClick={() => updateOrderStatus(order._id, 'confirmed')}
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => updateOrderStatus(order._id, 'cancelled')}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Reject
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-semibold">Products:</h4>
                        {order.products && order.products.map((item) => {
                            console.log('Admin order item:', item);
                            const coverIdx = item.productId?.coverImageIndex ?? 0;
                            const filename = item.productId?.image?.[coverIdx] || item.productId?.image?.[0];
                            return (
                            <div key={item._id} className="flex items-center gap-4 border-b pb-2">
                                <a href={`/products/${item.productId?._id}`} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={filename ? `${import.meta.env.VITE_PORT}/${filename}` : '/ErrorImage.png'}
                                        alt={item.productId?.name}
                                        className="w-16 h-16 object-cover rounded cursor-pointer hover:opacity-80"
                                        onError={(e) => e.target.src = '/ErrorImage.png'}
                                    />
                                </a>
                                <div>
                                    <p className="font-medium">{item.productId?.name}</p>
                                    <p>Qty: {item.quantity} × ₹{item.unitPriceAtPurchase}</p>
                                </div>
                            </div>
                        )})}
                    </div>
                </div>
            )})}
            {renderPagination()}
        </div>
    )
}

export default Order