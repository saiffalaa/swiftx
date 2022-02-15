import React from "react";
import "../Styles/cartPage.css";
import { Link } from "react-router-dom";

function CartPage({
  cartItems,
  subtCart,
  addCart,
  sym,
  removeCartItem,
  attrs,
  handleAttr,
}) {
  return (
    <div className="mt-3">
      <header className="w-100 ">
        <h2 className="header_font">CART</h2>
      </header>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <Link
            to={`/item/${item.id}`}
            className="d-flex justify-content-between align-items-center border-top"
          >
            <div>
              <p className="cartPageText cartPageBrand">{item?.brand}</p>
              <p className="cartPageText cartPageName">{item.name}</p>
              <p className="cart_price">
                {item.prices[sym].currency.symbol}
                {item.prices[sym].amount}
              </p>

              {attrs.find((opt) => opt.id === item.id)
                ? attrs.map((opt) => {
                    if (opt.id === item.id) {
                      return item.attributes?.map((attr, index) => (
                        <div key={index}>
                          {opt?.attr.includes(index) ? (
                            <p
                              onClick={() => handleAttr(opt, index)}
                              className="cart-type selected pointer"
                            >
                              {attr.type}
                            </p>
                          ) : (
                            <p
                              onClick={() => handleAttr(opt, index)}
                              className="cart-type pointer"
                            >
                              {attr.type}
                            </p>
                          )}
                        </div>
                      ));
                    }
                  })
                : item.attributes?.map((attr, index) => (
                    <div key={index}>
                      <p
                        onClick={() => handleAttr(attr, index)}
                        className="cart-type pointer"
                      >
                        {attr.type}
                      </p>
                    </div>
                  ))}
            </div>
            <div className="d-flex align-items-center">
              <div className="d-flex flex-column align-items-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addCart(item);
                  }}
                  className="qButton mb-1"
                >
                  +
                </button>
                <label>{item.quantity}</label>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    subtCart(item);
                  }}
                  className="qButton mt-1"
                >
                  -
                </button>
              </div>
              <figure className="image_cart_size">
                <img className="w-100" src={item.gallery[0]} alt="" />
              </figure>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeCartItem(item);
                }}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          </Link>
        ))
      ) : (
        <h2 className="center empty">No Items yet</h2>
      )}
    </div>
  );
}

export default CartPage;
