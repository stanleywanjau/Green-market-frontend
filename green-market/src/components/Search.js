import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "react-use-cart";

const Search = () => {
  const { totalUniqueItems } = useCart();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/productslist");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // Fixed the template literal
  };

  const filteredProducts =
    searchTerm.length > 0
      ? products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  return (
    <div
      className="search-container"
      style={{ position: "relative", display: "flex", alignItems: "center" }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <a className="green" style={{ marginRight: "5px" }}>
          Green
        </a>
        <p className="market">Market</p>
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
        style={{ marginRight: "10px" }}
      />
      <AiOutlineShoppingCart size={40} className="cursor-pointer" />
      {totalUniqueItems}
      {filteredProducts.length > 0 && (
        <div
          className="suggestions-container"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              style={{
                padding: "10px",
                borderBottom: "1px solid #f0f0f0",
                cursor: "pointer",
                backgroundColor: "#f9f9f9",
                ":hover": {
                  backgroundColor: "#ececec",
                },
              }}
            >
              {product.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;