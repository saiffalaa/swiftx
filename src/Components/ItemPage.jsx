import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import "../Styles/itemPage.css";
export default function ItemPage() {
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
  const { error, loading, data } = useQuery(query);
  const [prod, setProd] = useState();
  useEffect(() => {
    if (data) {
      const { product } = data;
      console.log(product);
      setProd(product);
    }
  }, [data]);
  return (
    <div className="d-flex item_page">
      <div className="d-flex w-50">
        <div className="">
          {prod?.gallery.map((img, index) => (
            <figure className=" m-0 mt-1 p-0">
              <img key={index} className="side_image" src={img} />
            </figure>
          ))}
        </div>
        <figure className="main_img">
          <img className="w-100" src={prod?.gallery[0]} />
        </figure>
      </div>
      <div className="w-50 ps-4 item_page">
        <div>
          <h3 className="brand_size">{prod?.brand}</h3>
          <p className="name_size">{prod?.name}</p>
        </div>
        {prod?.attributes.map((attr, index) => (
          <div key={index}>
            <h4>{attr.name.toUpperCase()}:</h4>
            <p className="attr">{attr?.type.toUpperCase()}</p>
          </div>
        ))}
        <div>
          <h4 className="price-title">PRICE:</h4>
          <p className="price">
            {prod?.prices[0].currency.symbol}
            {prod?.prices[0].amount}
          </p>
        </div>
        <div>
          <button className="cart-btn">ADD TO CART</button>
        </div>
        <div
          className="description mt-1 mb-1"
          dangerouslySetInnerHTML={{ __html: `${prod?.description}` }}
        />
      </div>
    </div>
  );
}
