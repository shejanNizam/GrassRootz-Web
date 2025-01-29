import RecentOrderHistory from "@/components/RecentOrderHistory/RecentOrderHistory";
import Image from "next/image";
import img from "../../../assets/profile/profile_img.png";

export default function UserProfile() {
  return (
    <div className="min-h-screen flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6  bg-black text-white ">
        {/* Profile Card */}
        <div className="bg-gray-900 p-6 rounded-lg flex flex-col items-center text-center border border-gray-700">
          <Image
            src={img}
            alt="Dianne Russell"
            className="w-20 h-20 rounded-full mb-4"
          />
          <h3 className="text-lg font-semibold">Dianne Russell</h3>
          <p className="text-gray-400">Customer</p>
        </div>

        {/* Order Address Card */}
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h4 className="text-gray-400 text-sm mb-2">ORDER ADDRESS</h4>
          <h3 className="text-lg font-semibold">Dianne Russell</h3>
          <p className="text-gray-400">
            4140 Parker Rd, Allentown, New Mexico 31134
          </p>
          <p className="text-white mt-2">dianne.russell@gmail.com</p>
          <p className="text-white">(671) 555-0110</p>
        </div>
      </div>
      {/* Recent Order History */}
      <RecentOrderHistory />
    </div>
  );
}
