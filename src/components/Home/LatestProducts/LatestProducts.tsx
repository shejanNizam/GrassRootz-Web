"use client";

import { useReducer } from "react";
import { FaEye, FaHeart, FaShoppingCart } from "react-icons/fa"; // Importing React Icons
import { intialState, reducer } from "./states";

const mockData = [
  {
    id: 1,
    name: "Fresh Indian Malta",
    price: "$20.00",
    image: "https://via.placeholder.com/150",
    rating: 4.0,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Fresh Indian Malta",
    price: "$20.00",
    image: "https://via.placeholder.com/150",
    rating: 4.0,
    status: "In Stock",
  },
  {
    id: 3,
    name: "Chinese Cabbage",
    price: "$12.00",
    image: "https://via.placeholder.com/150",
    rating: 4.7,
    status: "In Stock",
  },
  {
    id: 4,
    name: "Green Lettuce",
    price: "$9.00",
    image: "https://via.placeholder.com/150",
    rating: 4.3,
    status: "In Stock",
  },
  {
    id: 5,
    name: "Eggplant",
    price: "$34.00",
    image: "https://via.placeholder.com/150",
    rating: 4.2,
    status: "In Stock",
  },
  {
    id: 6,
    name: "Big Potatoes",
    price: "$20.00",
    image: "https://via.placeholder.com/150",
    rating: 4.4,
    status: "In Stock",
  },
  {
    id: 7,
    name: "Corn",
    price: "$20.00",
    image: "https://via.placeholder.com/150",
    rating: 4.1,
    status: "In Stock",
  },
  {
    id: 8,
    name: "Fresh Cauliflower",
    price: "$12.00",
    image: "https://via.placeholder.com/150",
    rating: 4.6,
    status: "In Stock",
  },
  {
    id: 9,
    name: "Green Capsicum",
    price: "$9.00",
    image: "https://via.placeholder.com/150",
    rating: 4.0,
    status: "In Stock",
  },
  {
    id: 10,
    name: "Green Chili",
    price: "$34.00",
    image: "https://via.placeholder.com/150",
    rating: 3.8,
    status: "In Stock",
  },
];

export default function LatestProducts() {
  const [todos, dispatch] = useReducer(reducer, intialState);

  return (
    <div>
      <h3 style={{ textAlign: "center", margin: "20px 0" }}>Latest Products</h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {mockData.map((product) => (
          <div
            key={product.id}
            style={{
              width: "240px",
              borderRadius: "10px",
              overflow: "hidden",
              backgroundColor: "#fff",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              position: "relative",
            }}
          >
            {/* Icon buttons on the top-right */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                display: "flex",
                gap: "10px",
                zIndex: 10,
              }}
            >
              <button
                onClick={() => dispatch({ type: "HeartClick" })}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: todos?.isHeartClick ? "#ff4d4d" : "#b0b0b0", // Change color on click
                }}
              >
                <FaHeart size={20} />
              </button>
              <button
                onClick={() => dispatch({ type: "eyeClicked" })}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: todos?.isEyeClick ? "#4d4dff" : "#b0b0b0", // Change color on click
                }}
              >
                <FaEye size={20} />
              </button>
            </div>

            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            />
            <div style={{ padding: "15px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h4
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    marginBottom: "10px",
                    color: "#333",
                    flexGrow: 1,
                  }}
                >
                  {product.name}
                </h4>
                <button
                  className="rounded-full"
                  onClick={() => dispatch({ type: "cartClick" })}
                  style={{
                    backgroundColor: todos?.isCartClick ? "#ff9800" : "#b0b0b0", // Change color on click
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "full",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: "14px",
                    display:
                      product.status === "Out of Stock"
                        ? "none"
                        : "inline-block",
                  }}
                >
                  <FaShoppingCart size={16} />
                </button>
              </div>
              <p
                style={{
                  fontSize: "16px",
                  color: "#888",
                  marginBottom: "10px",
                }}
              >
                {product.price}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: product.status === "Out of Stock" ? "red" : "green",
                  }}
                >
                  {product.status}
                </div>
                <div style={{ fontSize: "14px", color: "#FFD700" }}>
                  {"★".repeat(Math.floor(product.rating))}
                  {"☆".repeat(5 - Math.floor(product.rating))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
