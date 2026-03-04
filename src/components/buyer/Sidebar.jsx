"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BuyerSidebar() {
  const pathname = usePathname();

  const linkClass = (path) =>
    `block px-4 py-2 rounded-md transition ${
      pathname === path
        ? "bg-teal-600 text-white"
        : "text-gray-700 hover:bg-teal-100"
    }`;

  return (
    <aside className="
      w-64 bg-white border-r hidden
      md:block
    ">
      <div className="p-6 font-bold text-xl text-teal-600">
        Buyer Panel
      </div>

      <nav className="space-y-2 px-4">
        <Link href="/buyer" className={linkClass("/buyer")}>
          🏠 Overview
        </Link>

        <Link
          href="/buyer/place-order"
          className={linkClass("/buyer/place-order")}
        >
          ➕ Place Order
        </Link>

        <Link
          href="/buyer/orders"
          className={linkClass("/buyer/orders")}
        >
          📦 My Orders
        </Link>
      </nav>
    </aside>
  );
}




