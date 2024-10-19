
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  weight: number;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]); 
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]); 

  useEffect(() => {
    axios.get('http://127.0.0.1:3000/api/v1/getAllProduct')
      .then(response => {
        setProducts(response.data); 
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  const handleSelectProduct = (productId: number) => {
    setSelectedProductIds(prevSelected => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter(id => id !== productId);
      } else {
        return [...prevSelected, productId];
      }
    });
  };

  const handlePlaceOrder = () => {
    if (selectedProductIds.length === 0) {
      alert("Please select some products before placing an order.");
      return;
    }

    const selectedProducts = products.filter(product => selectedProductIds.includes(product.id));

    axios.post('http://127.0.0.1:3000/api/v1/placeOrder', selectedProducts)
      .then(response => {
        console.log('Order placed successfully:', response.data);
      })
      .catch(error => {
        console.error("There was an error placing the order!", error);
      });
  };

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <input
              type="checkbox"
              checked={selectedProductIds.includes(product.id)} 
              onChange={() => handleSelectProduct(product.id)} 
            />
            {product.name} - ${product.price} - {product.weight}g
          </li>
        ))}
      </ul>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default ProductList;

