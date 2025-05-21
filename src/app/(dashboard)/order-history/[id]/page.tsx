// export default function OrderDetails() {
//   return (
//     <div>
//       <h3>OrderDetails</h3>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import TabView from "./order/TabView";

export default function OrderDetails() {
  const params = useParams();
  const orderId = params.id;

  // In real app, fetch order details by orderId here or receive from props/context

  return (
    <div className="bg-black text-white p-6 rounded-lg border border-gray-700 mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Order Details</h2>
        <Link href="/order-history" className="text-yellow-400 hover:underline">
          Back to List
        </Link>
      </div>

      <p className="text-gray-400 mb-4">
        Order ID: <span className="font-semibold">{`#${orderId}`}</span>
      </p>

      <div className="grid grid-cols-2 gap-8">
        {/* Left box: Address */}
        <div className="border border-gray-600 rounded-md p-4 space-y-3">
          <h4 className="border-b border-gray-600 pb-2 mb-3 uppercase text-sm text-gray-400">
            Address
          </h4>
          <div>
            <p className="font-semibold text-white">Dainne Russell</p>
            <p className="text-gray-400 text-sm">
              4140 Parker Rd. Allentown, New Mexico 31134
            </p>
          </div>
          <div>
            <p className="uppercase text-gray-400 text-xs mb-1">Email</p>
            <p className="text-yellow-400 text-sm">dainne.ressell@gmail.com</p>
          </div>
          <div>
            <p className="uppercase text-gray-400 text-xs mb-1">Phone No</p>
            <p className="text-yellow-400 text-sm">(671) 555-0110</p>
          </div>
        </div>

        {/* Right box: Order info */}
        <div className="border border-gray-600 rounded-md p-4 space-y-3 bg-gray-900">
          <div className="flex justify-between text-sm text-gray-400 mb-4">
            <div>
              <p className="font-semibold">ORDER ID:</p>
              <p className="text-white">{`#${orderId}`}</p>
            </div>
            <div>
              <p className="font-semibold">PAYMENT METHOD:</p>
              <p className="text-white">Paypal</p>
            </div>
          </div>

          <div className="text-gray-400 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold">$365.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold">Free</span>
            </div>
          </div>

          <div className="flex justify-between mt-6 text-green-500 font-bold text-lg">
            <span>Total</span>
            <span>$84.00</span>
          </div>
        </div>
      </div>

      {/* Tabbed View */}
      <TabView />
    </div>
  );
}
