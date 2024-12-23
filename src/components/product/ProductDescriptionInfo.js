import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductCartQuantity } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import {
    addToCart,
    deleteFromCart,
    removeFromCart,
} from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";
import { getDiscountPrice } from "../../helpers/product";
import { FaCodeCompare } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

const ProductDescriptionInfo = ({
    product,
    // discountedPrice,
    currency,
    // finalDiscountedPrice,
    // finalProductPrice,
    cartItems,
    wishlistItem,
    compareItem,
}) => {
    const [addToCartButton, setAddToCartButton] = useState(false);
    console.log(addToCartButton);
    const handdleChageButton = () => {
        const cartCheck = cartItems.find((item) => item.id === product.id);
        if (cartCheck) {
            setAddToCartButton(true);
            console.log(addToCartButton);
        } else {
            setAddToCartButton(false);
        }
    };
    const dispatch = useDispatch();
    const [selectedProductPrice, setSelectedProductPrice] = useState(
        product.variation ? product.variation[0].size[0].price : ""
    );

    const discountedPrice = getDiscountPrice(
        selectedProductPrice,
        product.discount
    );

    const finalProductPrice = +(
        selectedProductPrice * currency.currencyRate
    ).toFixed(2);

    const finalDiscountedPrice = +(
        discountedPrice * currency.currencyRate
    ).toFixed(2);
    const [selectedProductColor, setSelectedProductColor] = useState(
        product.variation ? product.variation[0].color : ""
    );
    const [selectedProductSize, setSelectedProductSize] = useState(
        product.variation ? product.variation[0].size[0].name : ""
    );
    const [productStock, setProductStock] = useState(
        product.variation ? product.variation[0].size[0].stock : product.stock
    );
    const [quantityCount, setQuantityCount] = useState(1);

    const productCartQty = getProductCartQuantity(
        cartItems,
        product,
        selectedProductColor,
        selectedProductSize
    );

    return (
        <div className="product-details-content ml-70">
            <h2>{product.name}</h2>
            <div className="product-details-price">
                {discountedPrice !== null ? (
                    <Fragment>
                        <span>
                            {currency.currencySymbol +
                                " " +
                                finalDiscountedPrice}
                        </span>
                        <span className="fw-bold">{"-"}</span>
                        <span className="old">
                            {currency.currencySymbol + " " + finalProductPrice}
                        </span>
                    </Fragment>
                ) : (
                    <span>
                        {currency.currencySymbol + " " + finalProductPrice}{" "}
                    </span>
                )}
            </div>
            {/* {product.rating && product.rating > 0 ? (
                <div className="pro-details-rating-wrap">
                    <div className="pro-details-rating">
                        <Rating ratingValue={product.rating} />
                    </div>
                </div>
            ) : (
                ""
            )} */}
            <div className="pro-details-list">
                <p>{product.shortDescription}</p>
            </div>
            {product.variation ? (
                <div className="pro-details-size-color">
                    <div className="pro-details-color-wrap">
                        <span>Color</span>
                        <div className="pro-details-color-content">
                            {product.variation.map((single, key) => {
                                return (
                                    <label
                                        className={`pro-details-color-content--single ${single.color}`}
                                        key={key}
                                    >
                                        <input
                                            type="radio"
                                            value={single.color}
                                            name="product-color"
                                            checked={
                                                single.color ===
                                                selectedProductColor
                                                    ? "checked"
                                                    : ""
                                            }
                                            onChange={() => {
                                                setSelectedProductColor(
                                                    single.color
                                                );
                                                setSelectedProductSize(
                                                    single.size[0].name
                                                );
                                                setProductStock(
                                                    single.size[0].stock
                                                );
                                                setSelectedProductPrice(
                                                    single.size[0].price
                                                );
                                                setQuantityCount(1);
                                            }}
                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                    <div className="pro-details-size">
                        <span>Size</span>
                        <div className="pro-details-size-content">
                            {product.variation &&
                                product.variation.map((single) => {
                                    return single.color === selectedProductColor
                                        ? single.size.map((singleSize, key) => {
                                              return (
                                                  <label
                                                      className={`pro-details-size-content--single`}
                                                      key={key}
                                                  >
                                                      <input
                                                          type="radio"
                                                          value={
                                                              singleSize.name
                                                          }
                                                          checked={
                                                              singleSize.name ===
                                                              selectedProductSize
                                                                  ? "checked"
                                                                  : ""
                                                          }
                                                          onChange={() => {
                                                              setSelectedProductSize(
                                                                  singleSize.name
                                                              );
                                                              setProductStock(
                                                                  singleSize.stock
                                                              );
                                                              setSelectedProductPrice(
                                                                  singleSize.price
                                                              );
                                                              setQuantityCount(
                                                                  1
                                                              );
                                                          }}
                                                      />
                                                      <span className="size-name">
                                                          {singleSize.name}
                                                      </span>
                                                  </label>
                                              );
                                          })
                                        : "";
                                })}
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
            {/* {product.affiliateLink ? (
                <div className="pro-details-quality">
                    <div className="pro-details-cart btn-hover ml-0">
                        <a
                            href={product.affiliateLink}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Buy Now
                        </a>
                    </div>
                </div>
            ) : ( */}
            <div className="pro-details-quality">
                {cartItems.find((item) => item.id === product.id) ? (
                    <div className="pro-details-cart btn-hover ">
                        <button
                            className="bg-danger rounded"
                            onClick={() =>
                                dispatch(
                                    removeFromCart({
                                        id: product.id,
                                        selectedProductColor,
                                        selectedProductSize,
                                    })
                                )
                            }
                        >
                            Remove from Cart
                        </button>

                        <button
                            className="bg-success rounded"
                            onClick={() => {
                                window.location.href =
                                    process.env.PUBLIC_URL + "/cart";
                            }}
                        >
                            Go to Cart
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="cart-plus-minus">
                            <button
                                onClick={() =>
                                    setQuantityCount(
                                        quantityCount > 1
                                            ? quantityCount - 1
                                            : 1
                                    )
                                }
                                className="dec qtybutton"
                            >
                                -
                            </button>
                            <input
                                className="cart-plus-minus-box"
                                type="text"
                                value={quantityCount}
                                readOnly
                            />
                            <button
                                onClick={() =>
                                    setQuantityCount(
                                        quantityCount <
                                            productStock - productCartQty
                                            ? quantityCount + 1
                                            : quantityCount
                                    )
                                }
                                className="inc qtybutton"
                            >
                                +
                            </button>
                        </div>
                        <div className="pro-details-cart btn-hover">
                            {productStock && productStock > 0 ? (
                                <button
                                    className="bg-dark rounded"
                                    onClick={() => {
                                        dispatch(
                                            addToCart({
                                                ...product,
                                                quantity: quantityCount,
                                                selectedProductColor:
                                                    selectedProductColor
                                                        ? selectedProductColor
                                                        : product.selectedProductColor
                                                        ? product.selectedProductColor
                                                        : null,
                                                selectedProductSize:
                                                    selectedProductSize
                                                        ? selectedProductSize
                                                        : product.selectedProductSize
                                                        ? product.selectedProductSize
                                                        : null,
                                                selectedProductPrice:
                                                    selectedProductPrice
                                                        ? selectedProductPrice
                                                        : product.selectedProductPrice
                                                        ? product.selectedProductPrice
                                                        : null,
                                            })
                                        );
                                        handdleChageButton();
                                    }}
                                    disabled={productCartQty >= productStock}
                                >
                                    {" "}
                                    Add To Cart{" "}
                                </button>
                            ) : (
                                <button disabled>Out of Stock</button>
                            )}
                        </div>
                    </>
                )}
                <div className="pro-details-wishlist">
                    <button
                        className={wishlistItem !== undefined ? "active" : ""}
                        title={
                            wishlistItem !== undefined
                                ? "Remove from wishlist"
                                : "Add to wishlist"
                        }
                        onClick={() => dispatch(addToWishlist(product))}
                    >
                        <FaHeart />
                    </button>
                </div>
                <div className="pro-details-compare">
                    <button
                        className={compareItem !== undefined ? "active" : ""}
                        title={
                            compareItem !== undefined
                                ? "Remove from compare"
                                : "Add to compare"
                        }
                        onClick={() => dispatch(addToCompare(product))}
                    >
                        <FaCodeCompare />
                    </button>
                </div>
            </div>
            {/* )} */}
            {product.category ? (
                <div className="pro-details-meta">
                    <span>Categories :</span>
                    <ul>
                        {product.category.map((single, key) => {
                            return (
                                <li key={key}>
                                    <Link
                                        to={`/shop-grid-standard?category=${single}`}
                                    >
                                        {single}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ) : (
                ""
            )}
            {/* {product.tag ? (
                <div className="pro-details-meta">
                    <span>Tags :</span>
                    <ul>
                        {product.tag.map((single, key) => {
                            return (
                                <li key={key}>
                                    <Link
                                        to={
                                            process.env.PUBLIC_URL +
                                            "/shop-grid-standard"
                                        }
                                    >
                                        {single}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ) : (
                ""
            )} */}
            {/* <div className="pro-details-social">
                <ul>
                    <li>
                        <a href="//facebook.com">
                            <i className="fa fa-facebook" />
                        </a>
                    </li>
                    <li>
                        <a href="//dribbble.com">
                            <i className="fa fa-dribbble" />
                        </a>
                    </li>
                    <li>
                        <a href="//pinterest.com">
                            <i className="fa fa-pinterest-p" />
                        </a>
                    </li>
                    <li>
                        <a href="//twitter.com">
                            <i className="fa fa-twitter" />
                        </a>
                    </li>
                    <li>
                        <a href="//linkedin.com">
                            <i className="fa fa-linkedin" />
                        </a>
                    </li>
                </ul>
            </div> */}
        </div>
    );
};

ProductDescriptionInfo.propTypes = {
    cartItems: PropTypes.array,
    compareItem: PropTypes.shape({}),
    currency: PropTypes.shape({}),
    discountedPrice: PropTypes.number,
    finalDiscountedPrice: PropTypes.number,
    finalProductPrice: PropTypes.number,
    product: PropTypes.shape({}),
    wishlistItem: PropTypes.shape({}),
};

export default ProductDescriptionInfo;
