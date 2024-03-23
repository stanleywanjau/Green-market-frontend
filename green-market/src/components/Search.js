import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "react-use-cart";


const Search = () => {
  const { totalUniqueItems } = useCart();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name"); // Default to search by name
  const [showSuggestions, setShowSuggestions] = useState(false); // State to control visibility of suggestions container
  const navigate = useNavigate();

  // function navigatecart() {
  //   navigate(`/cart`); 
  // }


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://green-market-backend-2es1.onrender.com/productslist"); // Adjust this URL based on your backend setup
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
    setShowSuggestions(true); // Show suggestions when typing
  };
  const handleCartClick = () => {
    
    navigate('/cart'); // Navigate to the cart page
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // Fix the navigate function call
    setShowSuggestions(false); // Close suggestions container after clicking an item
  };

  const filteredProducts = products.filter((product) => {
    if (searchType === "name") {
      return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchType === "category") {
      return product.category.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  return (
    <div className="search-container" style={{ position: "relative", display: "flex", alignItems: "center" }}>
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
      <select value={searchType} onChange={handleSearchTypeChange}  className="search-select">
        <option value="name">Name</option>
        <option value="category">Category</option>
      </select>
      <AiOutlineShoppingCart size={40} className="cursor-pointer m-3" onClick={handleCartClick} />
      {totalUniqueItems}
      {showSuggestions && filteredProducts.length > 0 && (
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
              }}
              className="hover-style"
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
