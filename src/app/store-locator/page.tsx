"use client";

import SecondaryBanner from "@/components/Home/Banner/SecondaryBanner";
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Button, Card, Input } from "antd";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: -37.8136, // Melbourne center latitude
  lng: 144.9631, // Melbourne center longitude
};

// Store locations
const branches = [
  {
    id: 1,
    name: "Branch Name",
    lat: -37.8101,
    lng: 144.9624,
    address: "Location Here",
    phone: "(990) 23254567",
    hours: "09:00 AM / 10:00 PM",
  },
  {
    id: 2,
    name: "Branch Name",
    lat: -37.8186,
    lng: 144.9689,
    address: "Location Here",
    phone: "(990) 23254567",
    hours: "09:00 AM / 10:00 PM",
  },
  {
    id: 3,
    name: "Branch Name",
    lat: -37.82,
    lng: 144.9556,
    address: "Location Here",
    phone: "(990) 23254567",
    hours: "09:00 AM / 10:00 PM",
  },
  {
    id: 4,
    name: "Branch Name",
    lat: -37.825,
    lng: 144.9756,
    address: "Location Here",
    phone: "(990) 23254567",
    hours: "09:00 AM / 10:00 PM",
  },
  {
    id: 5,
    name: "Branch Name",
    lat: -37.83,
    lng: 144.9506,
    address: "Location Here",
    phone: "(990) 23254567",
    hours: "09:00 AM / 10:00 PM",
  },
];

export default function StoreLocator() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // Replace with your API key
  });

  return (
    <>
      <SecondaryBanner heading="Shop Locator" />
      <div className="flex h-screen bg-black text-white">
        {/* Sidebar for Store List */}
        <div className="w-full md:w-1/3 lg:w-1/4 bg-black p-4 border-r border-gray-700 overflow-y-auto">
          {/* Search Input */}
          <div className="flex mb-4">
            <Input
              placeholder="Search"
              className="bg-gray-900 text-white border-none rounded-l-lg"
            />
            <Button className="bg-yellow-500 text-black px-4 rounded-r-lg">
              <SearchOutlined />
            </Button>
          </div>

          {/* Store List */}
          {branches.map((branch) => (
            <Card
              key={branch.id}
              className="bg-gray-900 text-white mb-4 border border-gray-400"
            >
              <h4 className="text-lg font-semibold">{branch.name}</h4>
              <p className="flex items-center text-gray-400">
                <EnvironmentOutlined className="mr-2" /> {branch.address}
              </p>
              <p className="flex items-center text-gray-400">
                <ClockCircleOutlined className="mr-2" /> {branch.hours}
              </p>
              <p className="flex items-center text-gray-400">
                <PhoneOutlined className="mr-2" /> {branch.phone}
              </p>
              <Button className="bg-yellow-500 text-black w-full mt-3">
                Direction
              </Button>
            </Card>
          ))}
        </div>

        {/* Google Map Section */}
        <div className="w-[80%] md:w-2/3 lg:w-3/4">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={12}
            >
              {branches.map((branch) => (
                <Marker
                  key={branch.id}
                  position={{ lat: branch.lat, lng: branch.lng }}
                />
              ))}
            </GoogleMap>
          ) : (
            <div className="flex justify-center items-center h-full text-white">
              Loading Map...
            </div>
          )}
        </div>
      </div>
    </>
  );
}
