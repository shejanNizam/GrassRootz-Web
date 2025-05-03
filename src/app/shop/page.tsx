"use client";

import ProductCard from "@/components/ProductCard/ProductCard";
import CustomHeading from "@/components/utils/CustomHeading";
import { Checkbox, Input, Slider } from "antd"; // Import Input from antd
import { useState } from "react";
import shop_product_img from "../../assets/shop/shop_product_img.png";

// Mock Data with categories attached to products
const mockData = [
  {
    _id: "1", // Changed from 'id' to '_id'
    images: [
      {
        id: "1",
        publicFileURL: shop_product_img, // Assuming 'shop_product_img' is the image URL
      },
    ],
    name: "Fresh Indian Malta",
    price: "200.00", // Changed to string format
    avgRating: 4.0, // Changed from 'rating' to 'avgRating'
    stockStatus: "out-of-stock", // Changed to 'stockStatus' and lowercase
    category: "Fresh Fruit",
  },
  {
    _id: "2",
    images: [
      {
        id: "2",
        publicFileURL: shop_product_img,
      },
    ],
    name: "Fresh Indian Malta",
    price: "200.00",
    avgRating: 4.0,
    stockStatus: "in-stock",
    category: "Fresh Fruit",
  },
  {
    _id: "3",
    images: [
      {
        id: "3",
        publicFileURL: shop_product_img,
      },
    ],
    name: "Chinese Cabbage",
    price: "120.00",
    avgRating: 4.7,
    stockStatus: "in-stock",
    category: "Vegetables",
  },
  {
    _id: "4",
    images: [
      {
        id: "4",
        publicFileURL: shop_product_img,
      },
    ],
    name: "Green Lettuce",
    price: "300.00",
    avgRating: 4.3,
    stockStatus: "out-of-stock",
    category: "Vegetables",
  },
  {
    _id: "5",
    images: [
      {
        id: "5",
        publicFileURL: shop_product_img,
      },
    ],
    name: "Eggplant",
    price: "304.00",
    avgRating: 4.2,
    stockStatus: "in-stock",
    category: "Vegetables",
  },
  {
    _id: "6",
    images: [
      {
        id: "6",
        publicFileURL: shop_product_img,
      },
    ],
    name: "Big Potatoes",
    price: "500.00",
    avgRating: 4.4,
    stockStatus: "in-stock",
    category: "Vegetables",
  },
  {
    _id: "7",
    images: [
      {
        id: "7",
        publicFileURL: shop_product_img,
      },
    ],
    name: "Corn",
    price: "250.00",
    avgRating: 4.1,
    stockStatus: "in-stock",
    category: "Vegetables",
  },
  {
    _id: "8",
    images: [
      {
        id: "8",
        publicFileURL: shop_product_img,
      },
    ],
    name: "Fresh Cauliflower",
    price: "120.00",
    avgRating: 4.6,
    stockStatus: "in-stock",
    category: "Vegetables",
  },
  {
    _id: "9",
    images: [
      {
        id: "9",
        publicFileURL: shop_product_img,
      },
    ],
    name: "Green Capsicum",
    price: "90.00",
    avgRating: 4.0,
    stockStatus: "in-stock",
    category: "Vegetables",
  },
  {
    _id: "10",
    images: [
      {
        id: "10",
        publicFileURL: shop_product_img,
      },
    ],
    name: "Green Chili",
    price: "340.00",
    avgRating: 3.8,
    stockStatus: "in-stock",
    category: "Vegetables",
  },
  {
    _id: "11",
    images: [
      {
        id: "11",
        publicFileURL: shop_product_img,
      },
    ],
    name: "Tomato",
    price: "800.00",
    avgRating: 4.3,
    stockStatus: "in-stock",
    category: "Vegetables",
  },
  {
    _id: "12",
    images: [
      {
        id: "12",
        publicFileURL: shop_product_img,
      },
    ],
    name: "Spinach",
    price: "250.00",
    avgRating: 4.1,
    stockStatus: "in-stock",
    category: "Vegetables",
  },
  {
    _id: "13",
    images: [
      {
        id: "13",
        publicFileURL: shop_product_img,
      },
    ],
    name: "Carrot",
    price: "150.00",
    avgRating: 4.5,
    stockStatus: "in-stock",
    category: "Vegetables",
  },
  {
    _id: "14",
    images: [
      {
        id: "14",
        publicFileURL: shop_product_img,
      },
    ],
    name: "Bell Pepper",
    price: "600.00",
    avgRating: 4.2,
    stockStatus: "in-stock",
    category: "Vegetables",
  },
  {
    _id: "15",
    images: [
      {
        id: "15",
        publicFileURL: shop_product_img,
      },
    ],
    name: "Cucumber",
    price: "700.00",
    avgRating: 4.4,
    stockStatus: "in-stock",
    category: "Vegetables",
  },
  {
    _id: "16",
    images: [
      {
        id: "16",
        publicFileURL: shop_product_img,
      },
    ],
    name: "Zucchini",
    price: "110.00",
    avgRating: 4.0,
    stockStatus: "in-stock",
    category: "Vegetables",
  },
];

export default function Shop() {
  const [priceRange, setPriceRange] = useState([50, 1500]);
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Handle the slider change
  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  // Handle category filter change
  const handleCategoryChange = (checkedValues: string[]) => {
    setSelectedCategories(checkedValues);
  };

  // Reset price to default value
  const resetPrice = () => {
    setPriceRange([50, 1500]);
  };

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter products based on search query, price range, and category
  const filteredProducts = mockData.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPrice =
      parseFloat(product.price.slice(1)) >= priceRange[0] &&
      parseFloat(product.price.slice(1)) <= priceRange[1];
    const matchesCategory =
      selectedCategories.includes("All") ||
      selectedCategories.includes(product.category);

    return matchesSearch && matchesPrice && matchesCategory;
  });

  return (
    <div className="mb-20">
      <div className="text-center pt-32">
        <CustomHeading> Shop now </CustomHeading>
        {/* Replace static text with Ant Design Input */}
        <div className="mt-4">
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
            style={{ width: 300 }} // Adjust width as needed
          />
        </div>
      </div>

      <div className="pt-20 bg-black container flex gap-6 z-20">
        {/* Sidebar for Filters */}
        <div className="w-1/4 p-8 text-white rounded-lg shadow-lg sticky top-20 max-h-screen overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Filters</h2>

          {/* Categories Filter using Ant Design Checkbox */}
          <div className="mb-6">
            <h3 className="font-medium text-lg mb-3 text-white">
              All Categories
            </h3>
            <Checkbox.Group
              value={selectedCategories}
              onChange={handleCategoryChange}
            >
              <ul className="space-y-2">
                <li>
                  <Checkbox value="Fresh Fruit">
                    <span className="text-white"> Fresh Fruit (25) </span>
                  </Checkbox>
                </li>
                <li>
                  <Checkbox value="Vegetables">
                    <span className="text-white"> Vegetables (150) </span>
                  </Checkbox>
                </li>
                <li>
                  <Checkbox value="Cooking">
                    <span className="text-white"> Cooking (54) </span>
                  </Checkbox>
                </li>
                <li>
                  <Checkbox value="Snacks">
                    <span className="text-white"> Snacks (47) </span>
                  </Checkbox>
                </li>
                <li>
                  <Checkbox value="Beverages">
                    <span className="text-white"> Beverages (43) </span>
                  </Checkbox>
                </li>
                <li>
                  <Checkbox value="Beauty & Health">
                    <span className="text-white"> Beauty & Health (38) </span>
                  </Checkbox>
                </li>
                <li>
                  <Checkbox value="Bread & Bakery">
                    <span className="text-white"> Bread & Bakery (15) </span>
                  </Checkbox>
                </li>
              </ul>
            </Checkbox.Group>
          </div>

          {/* Price Range Slider using Ant Design */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3 text-primary ">Price</h3>
            <Slider
              range
              min={50} // Minimum price is 50
              max={2000}
              step={1}
              value={priceRange}
              onChange={handlePriceChange}
              tipFormatter={(value) => `$${value}`}
              trackStyle={[{ backgroundColor: "yellow" }]}
              handleStyle={[
                { backgroundColor: "yellow", borderColor: "yellow" },
                { backgroundColor: "yellow", borderColor: "yellow" },
              ]}
              style={{ marginBottom: 20 }}
            />
            <div className="flex justify-between mt-3">
              <span>
                Price: ${priceRange[0]} — ${priceRange[1]}
              </span>
            </div>
          </div>

          {/* Reset Price Button */}
          <button
            onClick={resetPrice}
            className="w-full mt-6 bg-primary text-white py-3 px-6 rounded-full shadow-md hover:bg-red-400 transition-all duration-200"
          >
            Reset Price
          </button>
        </div>

        {/* Product Grid */}
        <div className="w-3/4 flex flex-wrap gap-6 justify-center">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
