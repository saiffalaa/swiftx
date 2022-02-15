import React, { useState } from "react";
import "./index.css";
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
  const [selectedAttrs, setSelectedAttr] = useState([]);
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
        return 0;
      });
      setCartProducts([...newCartProducts]);
    } else {
      prod.quantity = 1;
      setCartProducts([...cartProducts, prod]);
    }
  };
  const removeCartItem = (item) => {
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
        return 0;
      });
      setCartProducts([...newCartProducts]);
    }
  };
  const handleBlur = (state) => {
    setBlur(state);
  };
  const unSelect = (p, index) => {
    let prod = JSON.parse(JSON.stringify(selectedAttrs));
    prod.map((item) => {
      if (item.id === p.id) {
        const i = item.attr.indexOf(index);
        item.attr?.splice(i, 1);
      }
      return 0;
    });
    setSelectedAttr([...prod]);
  };
  const handleAttr = (p, index) => {
    const prod = JSON.parse(JSON.stringify(p));
    let prod2 = JSON.parse(JSON.stringify(selectedAttrs));

    if (!prod.attr) prod.attr = [];
    if (prod.attr.includes(index)) unSelect(p, index);
    else {
      let exist = false;
      prod2.map((it) => {
        if (it?.id === prod.id) {
          exist = true;
          it.attr.push(index);
        }
        return 0;
      });
      if (exist) {
        setSelectedAttr([...prod2]);
      } else {
        prod.attr.push(index);
        setSelectedAttr([...selectedAttrs, prod]);
      }
    }
  };

  return (
    <Router>
      <div className={`ml-start ml-end `}>
        <Navbar
          attrs={selectedAttrs}
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
                  handleAttr={handleAttr}
                  attrs={selectedAttrs}
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
                  unSelect={unSelect}
                  attrs={selectedAttrs}
                  addAttrs={handleAttr}
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
