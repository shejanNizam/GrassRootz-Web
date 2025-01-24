import React from "react";

const mockData = [
  {
    id: 1,
    name: "Green Apple",
    price: "$14.99",
    image: "https://via.placeholder.com/150",
    rating: 4.5,
    status: "Out of Stock",
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
            }}
          >
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
              <h4
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "10px",
                  color: "#333",
                }}
              >
                {product.name}
              </h4>
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
