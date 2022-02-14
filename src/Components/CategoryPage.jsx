import React, { useState, useEffect } from "react";
import "../Styles/category.css";
import { gql, useQuery } from "@apollo/client";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
export default function CategoryPage({ cartItems, addCart, category }) {
  // category = !category ? "All" : category;
  const query = gql`
    query {
      categories {
        name
        products {
          id
          name
          gallery
          inStock
          brand
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
        }
      }
    }
  `;
  const [products, setProducts] = useState([]);
  const { error, loading, data } = useQuery(query);

  useEffect(() => {
    if (data) {
      const { categories } = data;
      console.log(data, categories, category);
      if (category === "All") setProducts(categories[0].products);
      if (category === "Clothes") setProducts(categories[1].products);
      if (category === "Tech") setProducts(categories[2].products);
    }
  }, [data, category]);
  const handleCart = (e, prod) => {
    e.preventDefault();
    console.log(prod);
    addCart(prod);
  };
  return (
    <div className="mt-3">
      <header>
        <h2 className="header_font">{category}</h2>
      </header>
      <div className="d-flex flex-wrap justify-content-around align-items-center">
        {products.map((product, index) => {
          return (
            <Link
              key={index}
              className="item_width d-flex flex-column item p-1"
              to={`item/${product.id}`}
            >
              <figure className=" mt-1 m-0 image">
                <img
                  className="img1 background-image image__img"
                  src={product.gallery[0]}
                />
                {product.inStock ? (
                  ""
                ) : (
                  <div id="text__overlay">OUT OF STOCK</div>
                )}
                <AiOutlineShoppingCart
                  onClick={(e) => {
                    let exist = false;
                    cartItems.map((item) => {
                      if (item.id === product.id) {
                        exist = true;
                        handleCart(e, item);
                      }
                    });
                    !exist && handleCart(e, product);
                  }}
                  className="cart__overlay"
                />
              </figure>
              <div className="mt-1">
                <p className="m-0 name">{product.name}</p>
                <p className="m-0 mt-1 price">
                  {product.prices[0].currency.symbol} {product.prices[0].amount}
                </p>
              </div>
            </Link>
            // </Link>
          );
        })}
      </div>
    </div>
  );
}
