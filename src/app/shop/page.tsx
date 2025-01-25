"use client";

import ProductCard from "@/components/ProductCard/ProductCard";
import CustomHeading from "@/components/utils/CustomHeading";
import { Checkbox, Slider } from "antd";
import { useState } from "react";
import shop_product_img from "../../assets/shop/shop_product_img.png";

// Mock Data with categories attached to products
const mockData = [
  {
    id: "1",
    name: "Fresh Indian Malta",
    price: "$200.00",
    image: shop_product_img,
    rating: 4.0,
    status: "Out of Stock",
    category: "Fresh Fruit",
  },
  {
    id: "2",
    name: "Fresh Indian Malta",
    price: "$200.00",
    image: shop_product_img,
    rating: 4.0,
    status: "In Stock",
    category: "Fresh Fruit",
  },
  {
    id: "3",
    name: "Chinese Cabbage",
    price: "$120.00",
    image: shop_product_img,
    rating: 4.7,
    status: "In Stock",
    category: "Vegetables",
  },
  {
    id: "4",
    name: "Green Lettuce",
    price: "$300.00",
    image: shop_product_img,
    rating: 4.3,
    status: "Out of Stock",
    category: "Vegetables",
  },
  {
    id: "5",
    name: "Eggplant",
    price: "$304.00",
    image: shop_product_img,
    rating: 4.2,
    status: "In Stock",
    category: "Vegetables",
  },
  {
    id: "6",
    name: "Big Potatoes",
    price: "$500.00",
    image: shop_product_img,
    rating: 4.4,
    status: "In Stock",
    category: "Vegetables",
  },
  {
    id: "7",
    name: "Corn",
    price: "$250.00",
    image: shop_product_img,
    rating: 4.1,
    status: "In Stock",
    category: "Vegetables",
  },
  {
    id: "8",
    name: "Fresh Cauliflower",
    price: "$120.00",
    image: shop_product_img,
    rating: 4.6,
    status: "In Stock",
    category: "Vegetables",
  },
  {
    id: "9",
    name: "Green Capsicum",
    price: "$90.00",
    image: shop_product_img,
    rating: 4.0,
    status: "In Stock",
    category: "Vegetables",
  },
  {
    id: "10",
    name: "Green Chili",
    price: "$340.00",
    image: shop_product_img,
    rating: 3.8,
    status: "In Stock",
    category: "Vegetables",
  },
  {
    id: "11",
    name: "Tomato",
    price: "$800.00",
    image: shop_product_img,
    rating: 4.3,
    status: "In Stock",
    category: "Vegetables",
  },
  {
    id: "12",
    name: "Spinach",
    price: "$250.00",
    image: shop_product_img,
    rating: 4.1,
    status: "In Stock",
    category: "Vegetables",
  },
  {
    id: "13",
    name: "Carrot",
    price: "$150.00",
    image: shop_product_img,
    rating: 4.5,
    status: "In Stock",
    category: "Vegetables",
  },
  {
    id: "14",
    name: "Bell Pepper",
    price: "$600.00",
    image: shop_product_img,
    rating: 4.2,
    status: "In Stock",
    category: "Vegetables",
  },
  {
    id: "15",
    name: "Cucumber",
    price: "$700.00",
    image: shop_product_img,
    rating: 4.4,
    status: "In Stock",
    category: "Vegetables",
  },
  {
    id: "16",
    name: "Zucchini",
    price: "$110.00",
    image: shop_product_img,
    rating: 4.0,
    status: "In Stock",
    category: "Vegetables",
  },
];

export default function Shop() {
  const [priceRange, setPriceRange] = useState([50, 1500]);
  const [selectedCategories, setSelectedCategories] = useState(["All"]);

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

  return (
    <div>
      <div className="text-center pt-32">
        <CustomHeading> Shop now </CustomHeading>
        <h4> Searchbar & Button here </h4>
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
          {mockData
            .filter(
              (product) =>
                parseFloat(product.price.slice(1)) >= priceRange[0] &&
                parseFloat(product.price.slice(1)) <= priceRange[1] &&
                (selectedCategories.includes("All") ||
                  selectedCategories.includes(product.category)) // Show all if "All" is selected
            )
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}
