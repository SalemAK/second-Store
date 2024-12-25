import { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import Rating from "../../components/product/sub-components/ProductRating";
import { addToCart } from "../../store/slices/cart-slice";
import { deleteFromCompare } from "../../store/slices/compare-slice";
import { compile } from "sass";
import Product from "../shop-product/Product";

const Compare = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const currency = useSelector((state) => state.currency);
    const { compareItems } = useSelector((state) => state.compare);
    const { cartItems } = useSelector((state) => state.cart);

    const [selectedCategory, setSelectedCategory] = useState("");

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    // Extract and deduplicate categories
    const uniqueCategories = [
        ...new Set(compareItems.flatMap((single) => single.category)),
    ];

    // Filter products by selected category
    const filteredProducts = selectedCategory
        ? compareItems.filter((item) =>
              item.category.includes(selectedCategory)
          )
        : compareItems;

    return (
        <Fragment>
            <SEO
                titleTemplate="Compare"
                description="Compare page of flone react minimalist eCommerce template."
            />
            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb
                    pages={[
                        { label: "Home", path: process.env.PUBLIC_URL + "/" },
                        {
                            label: "Compare",
                            path: process.env.PUBLIC_URL + pathname,
                        },
                    ]}
                />
                <div className="compare-main-area pt-90 pb-100">
                    <div className="container">
                        {compareItems && compareItems.length >= 1 ? (
                            <div className="row">
                                {/* Category Filter */}
                                <h3>Select the Category</h3>
                                <select
                                    className="form-select mb-2"
                                    aria-label="Default select example"
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                >
                                    <option value="" disabled>
                                        Select a category
                                    </option>
                                    {uniqueCategories.map((item, index) => (
                                        <option value={item} key={index}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                                {selectedCategory && (
                                    <p className="mt-2">
                                        Selected Category:{" "}
                                        <strong>{selectedCategory}</strong>
                                    </p>
                                )}
                                {/* Filtered Products */}
                                <div className="col-lg-12">
                                    <div className="compare-page-content">
                                        <div className="compare-table table-responsive">
                                            <table className="table table-bordered mb-0">
                                                <tbody>
                                                    {/* Product Info */}
                                                    <tr>
                                                        <th className="title-column">
                                                            Product Info
                                                        </th>
                                                        {filteredProducts.map(
                                                            (product) => {
                                                                const cartItem =
                                                                    cartItems.find(
                                                                        (
                                                                            item
                                                                        ) =>
                                                                            item.id ===
                                                                            product.id
                                                                    );
                                                                return (
                                                                    <td
                                                                        className="product-image-title"
                                                                        key={
                                                                            product.id
                                                                        }
                                                                    >
                                                                        <div className="compare-remove border-bottom">
                                                                            <button
                                                                                onClick={() =>
                                                                                    dispatch(
                                                                                        deleteFromCompare(
                                                                                            product.id
                                                                                        )
                                                                                    )
                                                                                }
                                                                            >
                                                                                <i className="pe-7s-trash" />
                                                                            </button>
                                                                        </div>
                                                                        <Link
                                                                            to={`process
                                                                                            .env
                                                                                            .PUBLIC_URL +
                                                                                        "/product/" +
                                                                                        ${product.id}`}
                                                                            className="image"
                                                                        >
                                                                            <img
                                                                                className="img-fluid"
                                                                                src={`${process.env.PUBLIC_URL}${product.image[0]}`}
                                                                                alt={
                                                                                    product.name
                                                                                }
                                                                            />
                                                                        </Link>
                                                                        <div className="product-title">
                                                                            <Link
                                                                                to={`${process.env.PUBLIC_URL}/product/${product.id}`}
                                                                            >
                                                                                {
                                                                                    product.name
                                                                                }
                                                                            </Link>
                                                                        </div>
                                                                        <div className="compare-btn">
                                                                            {product.affiliateLink ? (
                                                                                <a
                                                                                    href={
                                                                                        product.affiliateLink
                                                                                    }
                                                                                    rel="noopener noreferrer"
                                                                                    target="_blank"
                                                                                >
                                                                                    {" "}
                                                                                    Buy
                                                                                    now{" "}
                                                                                </a>
                                                                            ) : product.variation &&
                                                                              product
                                                                                  .variation
                                                                                  .length >=
                                                                                  1 ? (
                                                                                <Link
                                                                                    to={`${process.env.PUBLIC_URL}/product/${product.id}`}
                                                                                >
                                                                                    Select
                                                                                    Option
                                                                                </Link>
                                                                            ) : product.stock &&
                                                                              product.stock >
                                                                                  0 ? (
                                                                                <button
                                                                                    onClick={() =>
                                                                                        dispatch(
                                                                                            addToCart(
                                                                                                product
                                                                                            )
                                                                                        )
                                                                                    }
                                                                                    className={
                                                                                        cartItem !==
                                                                                            undefined &&
                                                                                        cartItem.quantity >
                                                                                            0
                                                                                            ? "active"
                                                                                            : ""
                                                                                    }
                                                                                    disabled={
                                                                                        cartItem !==
                                                                                            undefined &&
                                                                                        cartItem.quantity >
                                                                                            0
                                                                                    }
                                                                                    title={
                                                                                        product !==
                                                                                        undefined
                                                                                            ? "Added to cart"
                                                                                            : "Add to cart"
                                                                                    }
                                                                                >
                                                                                    {cartItem !==
                                                                                        undefined &&
                                                                                    cartItem.quantity >
                                                                                        0
                                                                                        ? "Added"
                                                                                        : "Add to cart"}
                                                                                </button>
                                                                            ) : (
                                                                                <button
                                                                                    disabled
                                                                                    className="active"
                                                                                >
                                                                                    Out
                                                                                    of
                                                                                    Stock
                                                                                </button>
                                                                            )}
                                                                        </div>
                                                                    </td>
                                                                );
                                                            }
                                                        )}
                                                    </tr>
                                                    <tr>
                                                        {/* Price */}
                                                        <th className="title-column">
                                                            Price
                                                        </th>
                                                        {filteredProducts.map(
                                                            (product) => {
                                                                return (
                                                                    <td
                                                                        className="product-price"
                                                                        key={
                                                                            product.id
                                                                        }
                                                                    >
                                                                        {product.variation.map(
                                                                            (
                                                                                item,
                                                                                variationKey
                                                                            ) => {
                                                                                const {
                                                                                    color,
                                                                                    size,
                                                                                } =
                                                                                    item;

                                                                                // Handle size mapping inside the variation
                                                                                return size.map(
                                                                                    (
                                                                                        single,
                                                                                        sizeKey
                                                                                    ) => {
                                                                                        const {
                                                                                            price,
                                                                                            name,
                                                                                        } =
                                                                                            single;

                                                                                        const discountedPrice =
                                                                                            getDiscountPrice(
                                                                                                price,
                                                                                                product.discount
                                                                                            );
                                                                                        const finalProductPrice =
                                                                                            (
                                                                                                price *
                                                                                                currency.currencyRate
                                                                                            ).toFixed(
                                                                                                2
                                                                                            );
                                                                                        const finalDiscountedPrice =
                                                                                            (
                                                                                                discountedPrice *
                                                                                                currency.currencyRate
                                                                                            ).toFixed(
                                                                                                2
                                                                                            );

                                                                                        return (
                                                                                            <div
                                                                                                key={`size-${variationKey}-${sizeKey}`}
                                                                                                className="price-container"
                                                                                            >
                                                                                                {discountedPrice !==
                                                                                                null ? (
                                                                                                    <div className="d-flex justify-content-center align-items-center">
                                                                                                        {/* <div
                                                                                                            className={`p-2   bg-${color}`}
                                                                                                            style={{
                                                                                                                width: "20px", // Width of the circle
                                                                                                                height: "20px", // Height of the circle
                                                                                                                borderRadius:
                                                                                                                    "50%", // Makes the div a circle
                                                                                                            }}
                                                                                                        ></div> */}
                                                                                                        <div className="p-2 ">
                                                                                                            size:{" "}
                                                                                                            {
                                                                                                                name
                                                                                                            }
                                                                                                        </div>
                                                                                                        <div className="p-2 g-col-4">
                                                                                                            price:{" "}
                                                                                                            <span className="amount old">
                                                                                                                {
                                                                                                                    finalProductPrice
                                                                                                                }
                                                                                                            </span>
                                                                                                            {
                                                                                                                "-"
                                                                                                            }
                                                                                                            <span className="amount">
                                                                                                                {currency.currencySymbol +
                                                                                                                    finalDiscountedPrice}
                                                                                                            </span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                ) : (
                                                                                                    <span className="amount">
                                                                                                        {currency.currencySymbol +
                                                                                                            finalProductPrice}
                                                                                                    </span>
                                                                                                )}
                                                                                            </div>
                                                                                        );
                                                                                    }
                                                                                );
                                                                            }
                                                                        )}
                                                                    </td>
                                                                );
                                                            }
                                                        )}
                                                    </tr>
                                                    {/* Description */}
                                                    <tr>
                                                        <th className="title-column">
                                                            Description
                                                        </th>
                                                        {filteredProducts.map(
                                                            (product) => {
                                                                return (
                                                                    <td className="product-desc">
                                                                        <p>
                                                                            {product.shortDescription ||
                                                                                "N/A"}
                                                                        </p>
                                                                    </td>
                                                                );
                                                            }
                                                        )}
                                                    </tr>

                                                    {/* <tr>
                                                        <th className="title-column">
                                                            Rating
                                                        </th>
                                                        {compareItems.map(
                                                            (
                                                                compareItem,
                                                                key
                                                            ) => {
                                                                return (
                                                                    <td
                                                                        className="product-rating"
                                                                        key={
                                                                            key
                                                                        }
                                                                    >
                                                                        <Rating
                                                                            ratingValue={
                                                                                compareItem.rating
                                                                            }
                                                                        />
                                                                    </td>
                                                                );
                                                            }
                                                        )}
                                                    </tr> */}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="item-empty-area text-center">
                                        <div className="item-empty-area__icon mb-30">
                                            <i className="pe-7s-shuffle"></i>
                                        </div>
                                        <div className="item-empty-area__text">
                                            No items found in compare <br />{" "}
                                            <Link
                                                to={`${process.env.PUBLIC_URL}/shop-grid-standard`}
                                            >
                                                Add Items
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

export default Compare;
