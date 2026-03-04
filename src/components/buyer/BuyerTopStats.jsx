export default function BuyerTopStats() {
  const stats = [
    { title: "Total Orders", value: 12 },
    { title: "Pending Orders", value: 3 },
    { title: "Completed Orders", value: 7 },
    { title: "Cancelled Orders", value: 2 },
  ];

  return (
    <div
      className="
      grid gap-4
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-4
    "
    >
      {stats.map((item, i) => (
        <div key={i} className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">{item.title}</p>
          <p className="text-3xl font-bold mt-2">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
