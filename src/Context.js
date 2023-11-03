import { createContext, useContext, useState } from "react";

export const Cart = createContext();
const Context = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [AllProducts, setAllProducts] = useState([]);
  const [buyItems, setBuyItems] = useState([]);
  const [sellItems, setSellItems] = useState([]);
  return (
    <Cart.Provider
      value={{
        cart,
        setCart,
        user,
        setUser,
        filteredProducts,
        setFilteredProducts,
        AllProducts,
        setAllProducts,
        buyItems,
        setBuyItems,
        sellItems,
        setSellItems,
      }}
    >
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;
