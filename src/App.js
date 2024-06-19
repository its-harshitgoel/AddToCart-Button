import './App.css';
import { useState } from "react";

function Product({ product, increaseQuantity, decreaseQuantity, quantity }) {
  return (
    <div>
      <h2>{product.name}</h2>
      {quantity === 0 ? (
        <button onClick={() => increaseQuantity(product)}>Add to Cart</button>
      ) : (
        <>
          <button onClick={() => decreaseQuantity(product)}>-</button>
          <span>{quantity}</span>
          <button onClick={() => increaseQuantity(product)}>+</button>
        </>
      )}
    </div>
  );
}

function useCart() {
  const [cart, setCart] = useState({});

  const increaseQuantity = (product) => {
    setCart(prevCart => {
      const currentQty = (prevCart[product.id] && prevCart[product.id].qty) ? prevCart[product.id].qty : 0;
      // if (currentQty < 10) {
        return {
          ...prevCart,
          [product.id]: { ...product, qty: currentQty + 1 }
        };
      // }
      // return prevCart;
    });
  };

  const decreaseQuantity = (product) => {
    setCart(prevCart => {
      const currentQty = (prevCart[product.id] && prevCart[product.id].qty) ? prevCart[product.id].qty : 0;
      if (currentQty <= 1) {
        const { [product.id]: _, ...restCart } = prevCart;
        return restCart;
      }
      return {
        ...prevCart,
        [product.id]: { ...product, qty: currentQty - 1 }
      };
    });
  };

  return { cart, increaseQuantity, decreaseQuantity };
}

function App() {
  const { cart, increaseQuantity, decreaseQuantity } = useCart();
  const product = { id: 1, name: 'MacBook Pro', price: 40000 };
  const quantity = cart[product.id] ? cart[product.id].qty : 0;
  
  return (
    <div>
      <Product 
        product={product}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        quantity={quantity}
      />
    </div>
  );
}

export default App;
