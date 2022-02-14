import React, { useState, useEffect } from "react";
import "../Styles/cartMenu.css";
import { Link } from "react-router-dom";
export default function CartMenu({ closeMenu, cartItems, addCart, subtCart }) {
  const [total, setTotal] = useState(0);
  const calcTotal = () => {
    let sum = 0;
    cartItems.map((item) => {
      sum += item.prices[0].amount * item.quantity;
    });
    sum = Math.round(sum * 100) / 100;
    setTotal(sum);
  };
  useEffect(() => {
    calcTotal();
  }, [cartItems]);
  return (
    <div className="position background">
      {cartItems.length > 0 ? (
        <ul className="p-0 ps-1">
          {cartItems.map((item, index) => (
            <li
              className="d-flex mb-1 justify-content-between item-height pt-1"
              key={index}
            >
              <div className="d-flex flex-column justify-content-between">
                <p className="m-0 font-menu">{item.brand}</p>
                <p className="m-0 font-menu">{item.name}</p>
                <p className="m-0 font-menu">
                  {item.prices[0].currency.symbol} {item.prices[0].amount}
                </p>
                {item.attributes?.map((attr, index) => (
                  <div key={index}>
                    <p className="m-0 attr-menu">{attr.type}</p>
                  </div>
                ))}
              </div>
              <div className="d-flex align-items-center">
                <div className="d-flex flex-column align-items-center height justify-content-between">
                  <button onClick={() => addCart(item)} className="cartbtn">
                    +
                  </button>
                  <label>{item.quantity}</label>
                  <button onClick={() => subtCart(item)} className=" cartbtn">
                    -
                  </button>
                </div>
                <figure className="cart-image">
                  <img className="w-100" src={item.gallery[0]} />
                </figure>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="center">No Cart Items yet</p>
      )}
      <footer className="foot">
        <div className="d-flex justify-content-between ps-1 pe-1">
          <p className="total">Total</p>
          <p className="total total-weight">${total}</p>
        </div>
        <div className="d-flex justify-content-around w-100">
          <Link to="/cart">
            <button className="menu-btn bag" onClick={() => closeMenu()}>
              View Bag
            </button>
          </Link>
          <button className="menu-btn checkout">CHECKOUT</button>
        </div>
      </footer>
    </div>
  );
}
