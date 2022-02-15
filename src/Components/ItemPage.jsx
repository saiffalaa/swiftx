import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import "../Styles/itemPage.css";
export default function ItemPage({
  addCart,
  cartItems,
  sym,
  removeCartItem,
  attrs,
  addAttrs,
  unSelect,
}) {
  const { id } = useParams();
  const query = gql`
    query {
      product(id: "${id}") {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          name
          type
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  `;
  const { data } = useQuery(query);
  const [prod, setProd] = useState();
  const [isAdded, setIsAdded] = useState(false);
  const [currAttr, setCurrAttr] = useState([]);
  useEffect(() => {
    if (data) {
      const { product } = data;
      setProd(product);
    }
  }, [data, cartItems]);

  useEffect(() => {
    let found = false;
    cartItems?.map((item) => {
      if (item.id === prod?.id) found = true;
    });
    setIsAdded(found);
  }, [cartItems, prod]);
  useEffect(() => {
    attrs.map((attr) => {
      if (attr?.id === prod?.id) {
        setCurrAttr(attr);
      }
    });
  }, [attrs, prod]);
  return (
    <div className="d-flex item_page">
      <div className="d-flex w-50">
        <div className="">
          {prod?.gallery.map((img, index) => (
            <figure key={index} className=" m-0 mt-1 p-0">
              <img className="side_image" src={img} alt="" />
            </figure>
          ))}
        </div>
        <figure className="main_img">
          <img className="w-100" src={prod?.gallery[0]} alt="" />
        </figure>
      </div>
      <div className="w-50 ps-4 item_page">
        <div>
          <h3 className="brand_size">{prod?.brand}</h3>
          <p className="name_size">{prod?.name}</p>
        </div>
        {prod?.attributes?.map((attr, index) => (
          <div key={index}>
            <h4>{attr?.name.toUpperCase()}:</h4>
            <p
              onClick={() => {
                currAttr.attr
                  ? addAttrs(currAttr, index)
                  : addAttrs(prod, index);
              }}
              className={`attr ${
                currAttr.attr?.includes(index) ? "selected" : ""
              }`}
            >
              {attr?.type.toUpperCase()}
            </p>
          </div>
        ))}
        <div>
          <h4 className="price-title">PRICE:</h4>
          <p className="price">
            {prod?.prices[sym].currency.symbol}
            {prod?.prices[sym].amount}
          </p>
        </div>
        <div>
          {isAdded ? (
            <button
              onClick={() => removeCartItem(prod)}
              className="cart-btn remove"
            >
              REMOVE FROM CART
            </button>
          ) : (
            <button onClick={() => addCart(prod)} className="cart-btn add">
              ADD TO CART
            </button>
          )}
        </div>
        <div
          className="description mt-1 mb-1"
          dangerouslySetInnerHTML={{ __html: `${prod?.description}` }}
        />
      </div>
    </div>
  );
}
