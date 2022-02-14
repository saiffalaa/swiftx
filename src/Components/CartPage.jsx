import React, { useEffect, useState } from "react";
import "../Styles/cartPage.css";
import { gql, useQuery } from "@apollo/client";

function CartPage() {
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
      <header className="w-100 border-bot">
        <h2 className="header_font">CART</h2>
      </header>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <p>Brand</p>
          <p>Name</p>
          <p>Price</p>
          <p>Attributes</p>
        </div>
        <div className="d-flex align-items-center">
          <div className="d-flex flex-column align-items-center">
            <button className="qButton mb-1">+</button>
            <label>1</label>
            <button className="qButton mt-1">-</button>
          </div>
          <figure className="image_cart_size">
            <img className="w-100" src={cate[0]?.products[0].gallery[0]} />
          </figure>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
