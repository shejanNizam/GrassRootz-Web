"use client";

import Image from "next/image";
import { useState } from "react";

export default function Settings() {
  const [user, setUser] = useState({
    firstName: "Dianne",
    email: "dianneasuaul@gmail.com",
    phone: "(633) 869-0323",
    address: "4400 Hill",
    country: "United States",
    state: "Washington DC",
    zip: "20335",
  });
  console.log(setUser);

  return (
    <div className="min-h-screen bg-black text-white flex justify-center py-10">
      <div className="w-full max-w-4xl">
        {/* Account Settings */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Account Settings</h3>
            <button className="bg-yellow-500 text-black px-4 py-2 rounded-md">
              Change Password
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400">First name</label>
              <input
                type="text"
                value={user.firstName}
                className="w-full bg-gray-800 p-2 rounded-md"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-400">Email</label>
              <input
                type="email"
                value={user.email}
                className="w-full bg-gray-800 p-2 rounded-md"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-400">Phone Number</label>
              <input
                type="text"
                value={user.phone}
                className="w-full bg-gray-800 p-2 rounded-md"
                readOnly
              />
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button className="bg-yellow-500 text-black px-4 py-2 rounded-md">
              Save Changes
            </button>
            <div className="flex flex-col items-center">
              <Image
                src="/user-profile.jpg"
                alt="Profile"
                width={80}
                height={80}
                className="rounded-full"
              />
              <button className="bg-gray-700 text-white px-4 py-2 rounded-md mt-2">
                Choose Image
              </button>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Address</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400">Full name</label>
              <input
                type="text"
                value={user.firstName}
                className="w-full bg-gray-800 p-2 rounded-md"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-400">Street Address</label>
              <input
                type="text"
                value={user.address}
                className="w-full bg-gray-800 p-2 rounded-md"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-400">Country / Region</label>
              <input
                type="text"
                value={user.country}
                className="w-full bg-gray-800 p-2 rounded-md"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-400">State</label>
              <input
                type="text"
                value={user.state}
                className="w-full bg-gray-800 p-2 rounded-md"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-400">Zip Code</label>
              <input
                type="text"
                value={user.zip}
                className="w-full bg-gray-800 p-2 rounded-md"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-400">Phone</label>
              <input
                type="text"
                value={user.phone}
                className="w-full bg-gray-800 p-2 rounded-md"
                readOnly
              />
            </div>
          </div>
          <button className="mt-6 bg-yellow-500 text-black px-4 py-2 rounded-md w-full">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
