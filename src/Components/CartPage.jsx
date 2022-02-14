import React, { useEffect, useState } from "react";
import "../Styles/cartPage.css";
import { gql, useQuery } from "@apollo/client";

function CartPage({ cartItems, subtCart, addCart, sym }) {
  const query = gql`
    query {
      categories {
        name
        products {
          name
          gallery
          inStock
          prices {
            currency {
              label
              symbol
            }
            amount
          }
        }
      }
    }
  `;
  const { error, loading, data } = useQuery(query);
  const [cate, setCate] = useState("");
  useEffect(() => {
    if (data) {
      const { categories } = data;
      console.log(categories);
      setCate(categories);
    }
  }, [data]);
  return (
    <div className="mt-3">
      <header className="w-100 ">
        <h2 className="header_font">CART</h2>
      </header>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div className="d-flex justify-content-between align-items-center border-top">
            <div>
              <p className="cartPageText cartPageBrand">{item?.brand}</p>
              <p className="cartPageText cartPageName">{item.name}</p>
              <p className="cart_price">
                {item.prices[sym].currency.symbol}
                {item.prices[sym].amount}
              </p>

              {item.attributes?.map((attr) => (
                <div>
                  <p className="cart-type">{attr.type.toUpperCase()}</p>
                </div>
              ))}
            </div>
            <div className="d-flex align-items-center">
              <div className="d-flex flex-column align-items-center">
                <button onClick={() => addCart(item)} className="qButton mb-1">
                  +
                </button>
                <label>{item.quantity}</label>
                <button onClick={() => subtCart(item)} className="qButton mt-1">
                  -
                </button>
              </div>
              <figure className="image_cart_size">
                <img className="w-100" src={item.gallery[0]} />
              </figure>
            </div>
          </div>
        ))
      ) : (
        <h2 className="center empty">No Items yet</h2>
      )}
    </div>
  );
}

export default CartPage;
