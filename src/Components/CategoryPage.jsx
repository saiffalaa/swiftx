import React, { useState, useEffect } from "react";
import "../Styles/category.css";
import { gql, useQuery } from "@apollo/client";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
export default function CategoryPage({
  cartItems,
  addCart,
  category,
  sym,
  removeCartItem,
}) {
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
  const { data } = useQuery(query);
  const { categories } = data;
  const adding = (i) => {
    let prod = JSON.parse(JSON.stringify(categories[i].products));
    prod.map((p) => (p.isAdded = false));
    cartItems.map((item) => {
      prod.map((p) => {
        if (item.id === p.id) p.isAdded = true;
      });
    });
    return prod;
  };
  useEffect(() => {
    if (data) {
      if (category === "All") {
        const p = adding(0);
        setProducts([...p]);
      } else if (category === "Clothes") {
        const p = adding(1);
        setProducts([...p]);
      } else if (category === "Tech") {
        const p = adding(2);
        setProducts([...p]);
      }
    }
  }, [data, category, cartItems]);
  const handleCart = (e, prod) => {
    e.preventDefault();
    addCart(prod);
  };
  const handleRemove = (e, item) => {
    e.preventDefault();
    removeCartItem(item);
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
                  alt=""
                />
                {product.inStock ? (
                  ""
                ) : (
                  <div id="text__overlay">OUT OF STOCK</div>
                )}
                <div className="cart__overlay_container">
                  {!product.isAdded ? (
                    <AiOutlineShoppingCart
                      onClick={(e) => {
                        handleCart(e, product);
                      }}
                      className="cart__overlay add"
                    />
                  ) : (
                    <AiOutlineShoppingCart
                      onClick={(e) => {
                        handleRemove(e, product);
                      }}
                      className="cart__overlay remove"
                    />
                  )}
                </div>
              </figure>
              <div className="mt-1">
                <p className="m-0 name">{product.name}</p>
                <p className="m-0 mt-1 price">
                  {product.prices[sym].currency.symbol}{" "}
                  {product.prices[sym].amount}
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
