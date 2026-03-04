"use client";

const statusColors = {
  pending: "bg-yellow-200 text-yellow-800",
  approved: "bg-blue-200 text-blue-800",
  completed: "bg-green-200 text-green-800",
};

const OrderStatusBadge = ({ status }) => {
  if (!status) return null;
  return (
    <span className={`px-2 py-1 rounded ${statusColors[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default OrderStatusBadge;
