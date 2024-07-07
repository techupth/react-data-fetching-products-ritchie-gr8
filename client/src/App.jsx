import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const baseURL = `http://localhost:4001`;
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState(false);

  const getProductsList = async () => {
    try {
      setIsFetching(true);
      const productsList = await axios.get(`${baseURL}/products`);
      setProducts(productsList.data.data);
      setIsFetching(false);
    } catch (error) {
      setIsError(true);
    }
  };

  const handleDeleteProduct = async (id) => {
    await axios.delete(`${baseURL}/products/${id}`);
    await getProductsList();
  };

  useEffect(() => {
    getProductsList();
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      {isFetching && (
        <h1 className="loading-txt">
          {isError ? "Fetching Error..." : "Loading..."}
        </h1>
      )}
      {!isFetching && (
        <div className="product-list">
          {products.map((product) => (
            <div className="product" key={product.id}>
              <div className="product-preview">
                <img
                  src={product.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {product.name}</h1>
                <h2>Product price: {product.price} Baht</h2>
                <p>Product description: {product.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => handleDeleteProduct(product.id)}
              >
                x
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
