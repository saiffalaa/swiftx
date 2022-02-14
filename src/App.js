import React, { useEffect, useState } from "react";
import "./index.css";
import { gql, useQuery } from "@apollo/client";
import Navbar from "./Components/Navbar";
import CategoryPage from "./Components/CategoryPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CartPage from "./Components/CartPage";
import ItemPage from "./Components/ItemPage";
function App() {
  const [blur, setBlur] = useState(false);
  // const query = gql`
  //   query {
  //     categories {
  //       name
  //     }
  //   }
  // `;
  // const { error, loading, data } = useQuery(query);
  // const [cate, setCate] = useState([]);
  // useEffect(() => {
  //   const { categories } = data;
  //   // console.log(categories);
  //   setCate(categories);
  // }, [data]);
  const [category, setCategory] = useState("All");
  const [cartProducts, setCartProducts] = useState([]);
  const addCart = (product) => {
    const prod = JSON.parse(JSON.stringify(product));
    if (prod.quantity) {
      let newCartProducts = cartProducts;
      // console.log(newCartProducts);
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
  const subtCart = (item) => {
    if (item.quantity - 1 === 0) {
      const newList = cartProducts.filter((it) => {
        return it.id !== item.id;
      });
      setCartProducts([...newList]);
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
                  subtCart={subtCart}
                  addCart={addCart}
                  cartItems={cartProducts}
                />
              }
            />
            <Route
              path="/item/:id"
              element={<ItemPage cartItems={cartProducts} addCart={addCart} />}
            />
            {/* <CategoryPage category={category} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
