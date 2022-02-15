import React, { useEffect, useState } from "react";
import LOGO from "../Assets/LOGO.png";
import "../Styles/navbar.css";
import { BiDollar } from "react-icons/bi";
import { AiOutlineShoppingCart, AiFillCaretDown } from "react-icons/ai";
import CartMenu from "./CartMenu";
import { gql, useQuery } from "@apollo/client";

export default function Navbar({
  setBlur,
  cartItems,
  addCart,
  subtCart,
  handleCate,
  sym,
  handleCurr,
}) {
  const [hightlight, setHighlight] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [currOpen, setCurrOpen] = useState(false);
  const [currencyList, setCurrencyList] = useState([]);

  const query = gql`
    query {
      currencies {
        label
        symbol
      }
    }
  `;
  const { error, loading, data } = useQuery(query);
  useEffect(() => {
    if (data) {
      const { currencies } = data;
      setCurrencyList(currencies);
    }
  }, [data]);

  const handleFocus = (e) => {
    console.log(e.target.textContent);
    setHighlight(e.target.textContent);
    handleCate(e.target.textContent);
  };

  return (
    <nav className="d-flex justify-content-between align-items-center p-0 ">
      <ul className="d-flex justify-content-around p-0 categorySpace ">
        <li
          className={`${hightlight === "All" ? "green" : ""} `}
          onClick={(e) => handleFocus(e)}
        >
          All
          <div
            className={`${hightlight === "All" ? "lineAll" : ""} line_space`}
          ></div>
        </li>
        <li
          className={`${hightlight === "Clothes" ? "green" : ""} `}
          onClick={(e) => handleFocus(e)}
        >
          Clothes
          <div
            className={`${
              hightlight === "Clothes" ? "lineClothes" : ""
            } line_space`}
          ></div>
        </li>
        <li
          className={`${hightlight === "Tech" ? "green" : ""} `}
          onClick={(e) => handleFocus(e)}
        >
          Tech
          <div
            className={`${hightlight === "Tech" ? "lineTech" : ""} line_space`}
          ></div>
        </li>
      </ul>
      <figure className="p-0 m-0 logo_dim">
        <img className="w-100" src={LOGO} />
      </figure>
      <div className="d-flex">
        <div
          onClick={() => {
            setBlur(false);
            setCurrOpen(!currOpen);
            setCartOpen(false);
          }}
          className="d-flex align-items-center pointer margin"
        >
          <label className="icons_size">{currencyList[sym]?.symbol}</label>
          <AiFillCaretDown className="down_size" />
        </div>
        {currOpen ? (
          <ul className="position-curr m-0 p-0 mt-1">
            {currencyList.map((curr, index) => {
              return (
                <li
                  key={index}
                  onClick={(e) => {
                    handleCurr(index);
                    setCartOpen(false);
                    setCurrOpen(false);
                  }}
                  key={index}
                  className="ps-1 curr-item "
                >
                  {curr.symbol} {curr.label}
                </li>
              );
            })}
          </ul>
        ) : (
          <></>
        )}
        <div>
          <AiOutlineShoppingCart
            onClick={() => {
              setBlur(!cartOpen);
              setCartOpen(!cartOpen);
              setCurrOpen(false);
            }}
            className="icons_size pointer"
          />
          <label className="cart-label">{cartItems.length}</label>
        </div>
        {cartOpen ? (
          <CartMenu
            sym={sym}
            subtCart={subtCart}
            addCart={addCart}
            cartItems={cartItems}
            closeMenu={() => {
              setBlur(false);
              setCartOpen(false);
              setCurrOpen(false);
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
}
