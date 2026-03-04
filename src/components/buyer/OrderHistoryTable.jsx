"use client";
import { useEffect, useState } from "react";
import OrderStatusBadge from "./OrderStatusBadge";

const OrderHistoryTable = () => {
  const [orders, setOrders] = useState([]); // default empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders?buyerId=B001");
        const data = await res.json();

        // Ensure data is an array
        if (Array.isArray(data)) setOrders(data);
        else if (data.orders && Array.isArray(data.orders))
          setOrders(data.orders);
        else setOrders([]); // fallback
      } catch (err) {
        console.error(err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (!orders || orders.length === 0) return <p>No orders found</p>;

  return (
    <table className="min-w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 border">Crop ID</th>
          <th className="px-4 py-2 border">Quantity</th>
          <th className="px-4 py-2 border">Status</th>
          <th className="px-4 py-2 border">Date</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td className="px-4 py-2 border">{order.cropId}</td>
            <td className="px-4 py-2 border">{order.quantity}</td>
            <td className="px-4 py-2 border">
              <OrderStatusBadge status={order.status} />
            </td>
            <td className="px-4 py-2 border">
              {order.createdAt
                ? new Date(order.createdAt).toLocaleDateString()
                : "-"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderHistoryTable;
