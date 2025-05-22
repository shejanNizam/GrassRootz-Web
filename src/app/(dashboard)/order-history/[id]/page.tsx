// // export default function OrderDetails() {
// //   return (
// //     <div>
// //       <h3>OrderDetails</h3>
// //     </div>
// //   );
// // }

// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
// import TabView from "./order/TabView";

// export default function OrderDetails() {
//   const params = useParams();
//   const orderId = params.id;

//   // In real app, fetch order details by orderId here or receive from props/context

//   return (
//     <div className="bg-black text-white p-6 rounded-lg border border-gray-700 mx-auto mt-8">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-bold">Order Details</h2>
//         <Link href="/order-history" className="text-yellow-400 hover:underline">
//           Back to List
//         </Link>
//       </div>

//       <p className="text-gray-400 mb-4">
//         Order ID: <span className="font-semibold">{`#${orderId}`}</span>
//       </p>

//       <div className="grid grid-cols-2 gap-8">
//         {/* Left box: Address */}
//         <div className="border border-gray-600 rounded-md p-4 space-y-3">
//           <h4 className="border-b border-gray-600 pb-2 mb-3 uppercase text-sm text-gray-400">
//             Address
//           </h4>
//           <div>
//             <p className="font-semibold text-white">Dainne Russell</p>
//             <p className="text-gray-400 text-sm">
//               4140 Parker Rd. Allentown, New Mexico 31134
//             </p>
//           </div>
//           <div>
//             <p className="uppercase text-gray-400 text-xs mb-1">Email</p>
//             <p className="text-yellow-400 text-sm">dainne.ressell@gmail.com</p>
//           </div>
//           <div>
//             <p className="uppercase text-gray-400 text-xs mb-1">Phone No</p>
//             <p className="text-yellow-400 text-sm">(671) 555-0110</p>
//           </div>
//         </div>

//         {/* Right box: Order info */}
//         <div className="border border-gray-600 rounded-md p-4 space-y-3 bg-gray-900">
//           <div className="flex justify-between text-sm text-gray-400 mb-4">
//             <div>
//               <p className="font-semibold">ORDER ID:</p>
//               <p className="text-white">{`#${orderId}`}</p>
//             </div>
//             <div>
//               <p className="font-semibold">PAYMENT METHOD:</p>
//               <p className="text-white">Paypal</p>
//             </div>
//           </div>

//           <div className="text-gray-400 space-y-2">
//             <div className="flex justify-between">
//               <span>Subtotal:</span>
//               <span className="font-semibold">$365.00</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Shipping</span>
//               <span className="font-semibold">Free</span>
//             </div>
//           </div>

//           <div className="flex justify-between mt-6 text-green-500 font-bold text-lg">
//             <span>Total</span>
//             <span>$84.00</span>
//           </div>
//         </div>
//       </div>

//       {/* Tabbed View */}
//       <TabView />
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

  return (
    <div className="bg-black text-white p-4 sm:p-6 rounded-lg border border-gray-700 mx-2 sm:mx-auto mt-4 sm:mt-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
        <h2 className="text-lg sm:text-xl font-bold">Order Details</h2>
        <Link
          href="/order-history"
          className="text-yellow-400 hover:underline text-sm sm:text-base"
        >
          Back to List
        </Link>
      </div>

      <p className="text-gray-400 mb-4 text-sm sm:text-base">
        Order ID: <span className="font-semibold">{`#${orderId}`}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {/* Left box: Address */}
        <div className="border border-gray-600 rounded-md p-3 sm:p-4 space-y-2 sm:space-y-3">
          <h4 className="border-b border-gray-600 pb-2 mb-2 sm:mb-3 uppercase text-xs sm:text-sm text-gray-400">
            Address
          </h4>
          <div>
            <p className="font-semibold text-white text-sm sm:text-base">
              Dainne Russell
            </p>
            <p className="text-gray-400 text-xs sm:text-sm">
              4140 Parker Rd. Allentown, New Mexico 31134
            </p>
          </div>
          <div>
            <p className="uppercase text-gray-400 text-xs mb-1">Email</p>
            <p className="text-yellow-400 text-xs sm:text-sm">
              dainne.ressell@gmail.com
            </p>
          </div>
          <div>
            <p className="uppercase text-gray-400 text-xs mb-1">Phone No</p>
            <p className="text-yellow-400 text-xs sm:text-sm">(671) 555-0110</p>
          </div>
        </div>

        {/* Right box: Order info */}
        <div className="border border-gray-600 rounded-md p-3 sm:p-4 space-y-2 sm:space-y-3 bg-gray-900">
          <div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4 gap-2 sm:gap-0">
            <div className="mb-2 sm:mb-0">
              <p className="font-semibold">ORDER ID:</p>
              <p className="text-white">{`#${orderId}`}</p>
            </div>
            <div>
              <p className="font-semibold">PAYMENT METHOD:</p>
              <p className="text-white">Paypal</p>
            </div>
          </div>

          <div className="text-gray-400 space-y-1 sm:space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold">$365.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold">Free</span>
            </div>
          </div>

          <div className="flex justify-between mt-4 sm:mt-6 text-green-500 font-bold text-base sm:text-lg">
            <span>Total</span>
            <span>$84.00</span>
          </div>
        </div>
      </div>

      {/* Tabbed View - Make sure TabView component is also responsive */}
      <div className="mt-6">
        <TabView />
      </div>
    </div>
  );
}
