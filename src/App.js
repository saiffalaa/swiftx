import React, { useEffect, useState } from "react";
import "./index.css";
import { gql, useQuery } from "@apollo/client";
import Navbar from "./Components/Navbar";
import CategoryPage from "./Components/CategoryPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartPage from "./Components/CartPage";
import ItemPage from "./Components/ItemPage";
function App() {
  const [blur, setBlur] = useState(false);
  const [category, setCategory] = useState("All");
  const [cartProducts, setCartProducts] = useState([]);
  const [currency, setCurrency] = useState(0);
  const handleCate = (cate) => {
    setCategory(cate);
  };
  const currencyState = (curr) => {
    setCurrency(curr);
  };
  const addCart = (product) => {
    const prod = JSON.parse(JSON.stringify(product));
    prod.isAdded = true;
    if (prod.quantity) {
      let newCartProducts = cartProducts;
      newCartProducts.map((item) => {
        if (item.id === prod.id) {
          item.quantity++;
        }
      });
      setCartProducts([...newCartProducts]);
    } else {
      prod.quantity = 1;
      setCartProducts([...cartProducts, prod]);
    }
  };
  const removeCartItem = (item) => {
    console.log(item);
    const newList = cartProducts.filter((it) => {
      return it.id !== item.id;
    });
    setCartProducts([...newList]);
  };
  const subtCart = (item) => {
    if (item.quantity - 1 === 0) {
      removeCartItem(item);
    } else {
      let newCartProducts = cartProducts;
      newCartProducts.map((it) => {
        if (it.id === item.id) {
          it.quantity--;
        }
      });
      setCartProducts([...newCartProducts]);
    }
  };
  const handleBlur = (state) => {
    setBlur(state);
  };
  useEffect(() => {
    console.log(cartProducts);
  }, [cartProducts]);
  return (
    <Router>
      <div className={`ml-start ml-end `}>
        <Navbar
          sym={currency}
          handleCurr={(current) => currencyState(current)}
          handleCate={(str) => handleCate(str)}
          subtCart={subtCart}
          addCart={addCart}
          cartItems={cartProducts}
          setBlur={(str) => handleBlur(str)}
        />
        <div className={`${blur ? "blur" : ""}`}>
          <Routes>
            <Route
              path="/"
              element={
                <CategoryPage
                  removeCartItem={removeCartItem}
                  sym={currency}
                  cartItems={cartProducts}
                  addCart={addCart}
                  category={category}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <CartPage
                  removeCartItem={removeCartItem}
                  sym={currency}
                  subtCart={subtCart}
                  addCart={addCart}
                  cartItems={cartProducts}
                />
              }
            />
            <Route
              path="/item/:id"
              element={
                <ItemPage
                  removeCartItem={removeCartItem}
                  sym={currency}
                  cartItems={cartProducts}
                  addCart={addCart}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
