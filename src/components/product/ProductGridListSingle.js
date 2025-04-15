import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { getDiscountPrice } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import ProductModal from "./ProductModal";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";
import { FaCodeCompare } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

const ProductGridListSingle = ({
    product,
    currency,
    cartItem,
    wishlistItem,
    compareItem,
    spaceBottomClass,
}) => {
    const [modalShow, setModalShow] = useState(false);
    let productPrice = 0;

    if (product.variation) {
        productPrice = product.variation[0].size[0].price;
    } else {
        productPrice = product.price;
    }

    const discountedPrice = getDiscountPrice(productPrice, product.discount);
    const finalProductPrice = +(productPrice * currency.currencyRate).toFixed(
        2
    );
    const finalDiscountedPrice = +(
        discountedPrice * currency.currencyRate
    ).toFixed(2);
    const dispatch = useDispatch();

    return (
        <Fragment>
            {/* Product Card */}
            <div
                className={clsx(
                    "product-wrap h-100 card p-3 shadow-sm  ",
                    spaceBottomClass
                )}
            >
                <div className="">
                    <div className="product-img position-relative">
                        <Link
                            to={
                                process.env.PUBLIC_URL +
                                "/product/" +
                                product.id
                            }
                        >
                            <img
                                className="default-img rounded"
                                src={process.env.PUBLIC_URL + product.image[0]}
                                alt=""
                            />
                            {product.image.length > 1 ? (
                                <img
                                    className="hover-img img-fluid rounded position-absolute  w-100 h-100 hover-opacity"
                                    src={
                                        process.env.PUBLIC_URL +
                                        product.image[1]
                                    }
                                    alt={product.name}
                                />
                            ) : (
                                ""
                            )}
                        </Link>
                        {/* Badges */}
                        {product.discount || product.new ? (
                            <div className="product-img-badges">
                                {product.discount ? (
                                    <span className="pink">
                                        -{product.discount}%
                                    </span>
                                ) : (
                                    ""
                                )}
                                {product.new ? (
                                    <span className="purple">New</span>
                                ) : (
                                    ""
                                )}
                            </div>
                        ) : (
                            ""
                        )}
                        {/* Actions */}
                        <div className="position-absolute bottom-0 start-0 m-2 d-flex gap-2">
                            <button
                                className={`btn btn-sm ${
                                    wishlistItem
                                        ? "btn-danger"
                                        : "btn-outline-secondary"
                                }`}
                                onClick={() => dispatch(addToWishlist(product))}
                            >
                                <FaHeart />
                            </button>
                            <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => setModalShow(true)}
                            >
                                Quick View
                            </button>
                            <button
                                className={`btn btn-sm ${
                                    compareItem
                                        ? "btn-primary"
                                        : "btn-outline-secondary"
                                }`}
                                onClick={() => dispatch(addToCompare(product))}
                            >
                                <FaCodeCompare />
                            </button>
                        </div>
                        <div className="pro-same-action pro-cart"></div>
                    </div>
                    <div className="product-content text-top ">
                        <h3 className="fw-bold product-title">
                            <Link
                                to={
                                    process.env.PUBLIC_URL +
                                    "/product/" +
                                    product.id
                                }
                            >
                                {product.name}
                            </Link>
                        </h3>

                        {/* {product.rating && product.rating > 0 ? (
                        <div className="product-rating">
                            <Rating ratingValue={product.rating} />
                        </div>
                    ) : (
                        ""
                    )} */}
                        <div className="product-price">
                            {discountedPrice !== null ? (
                                <Fragment>
                                    <span className="fw-bold text-primary me-1">
                                        <h4 className="fs-6 text-muted">
                                            {" "}
                                            From{" "}
                                        </h4>
                                        <img
                                            src={currency.currencySymbol}
                                            className="img-fluid "
                                            alt="Saudi Riyal"
                                            width={15}
                                            style={{ pointerEvents: "auto" }}
                                        />
                                        {" " + finalDiscountedPrice}
                                    </span>
                                    {/* <span className="fw-bold">{"-"}</span> */}
                                    <span className="old">
                                        {" " + finalProductPrice}
                                    </span>
                                </Fragment>
                            ) : (
                                <span>
                                    <h4 className="fs-6 text-muted"> From </h4>
                                    <img
                                        src={currency.currencySymbol}
                                        className="img-fluid  item"
                                        alt="Saudi Riyal"
                                        width={15}
                                        style={{ pointerEvents: "auto" }}
                                    />
                                    {" " + finalProductPrice}
                                </span>
                            )}
                        </div>
                        {/* Add to Cart */}
                        {product.variation[0].size.some((s) => s.stock > 0) ? (
                            <button className="btn btn-primary w-100 mt-1">
                                <Link
                                    to={`${process.env.PUBLIC_URL}/product/${product.id}`}
                                >
                                    Select Option
                                </Link>
                            </button>
                        ) : (
                            <button className="btn btn-secondary w-100 mt-1">
                                <Link
                                    to={`${process.env.PUBLIC_URL}/product/${product.id}`}
                                >
                                    Out of Stock
                                </Link>
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {/* filter 3rd product + price + small description */}
            <div className="shop-list-wrap  card shadow-sm p-1">
                <div className="row px-2 px-md-0">
                    <div className="col-lg-4 col-md-5 col-sm-6 col-12 ">
                        <div className="product-list-image-wrap">
                            <div className="product-img position-relative">
                                <Link
                                    to={
                                        process.env.PUBLIC_URL +
                                        "/product/" +
                                        product.id
                                    }
                                >
                                    <img
                                        className="default-img img-fluid  rounded"
                                        src={
                                            process.env.PUBLIC_URL +
                                            product.image[0]
                                        }
                                        alt=""
                                    />
                                    {product.image.length > 1 ? (
                                        <img
                                            className="hover-img img-fluid w-100 position-absolute rounded"
                                            src={
                                                process.env.PUBLIC_URL +
                                                product.image[1]
                                            }
                                            alt=""
                                        />
                                    ) : (
                                        ""
                                    )}
                                </Link>
                                {product.discount || product.new ? (
                                    <div className="product-img-badges position-absolute">
                                        {product.discount ? (
                                            <span className="pink">
                                                -{product.discount}%
                                            </span>
                                        ) : (
                                            ""
                                        )}
                                        {product.new ? (
                                            <span className="purple">New</span>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-7 col-sm-6 col-12">
                        <div className="shop-list-content">
                            <h3>
                                <Link
                                    to={
                                        process.env.PUBLIC_URL +
                                        "/product/" +
                                        product.id
                                    }
                                >
                                    {product.name}
                                </Link>
                            </h3>
                            <div className="product-list-price">
                                {discountedPrice !== null ? (
                                    <Fragment>
                                        <span className="fw-bold">
                                            <h4 className="fs-6 text-muted">
                                                {" "}
                                                From{" "}
                                            </h4>
                                            <img
                                                src={currency.currencySymbol}
                                                className="img-fluid  item"
                                                alt="Saudi Riyal"
                                                width={15}
                                                style={{
                                                    pointerEvents: "auto",
                                                }}
                                            />
                                            {" " + finalDiscountedPrice}
                                        </span>
                                        {/* <span className="fw-bold">{"-"}</span> */}
                                        <span className="old">
                                            {" " + finalProductPrice}
                                        </span>
                                    </Fragment>
                                ) : (
                                    <span>
                                        <h4 className="fs-6 text-muted">
                                            {" "}
                                            From{" "}
                                        </h4>
                                        <img
                                            src={currency.currencySymbol}
                                            className="img-fluid  item"
                                            alt="Saudi Riyal"
                                            width={15}
                                            style={{
                                                pointerEvents: "auto",
                                            }}
                                        />
                                        {" " + finalProductPrice}{" "}
                                    </span>
                                )}
                            </div>
                            {/* {product.rating && product.rating > 0 ? (
                                <div className="rating-review">
                                    <div className="product-list-rating">
                                        <Rating ratingValue={product.rating} />
                                    </div>
                                </div>
                            ) : (
                                ""
                            )} */}
                            {product.shortDescription ? (
                                <p>{product.shortDescription}</p>
                            ) : (
                                ""
                            )}

                            <div className="shop-list-actions d-flex flex-wrap align-items-center gap-1 mt-3">
                                <div className=" btn-hover">
                                    {product.variation[0].size.some(
                                        (s) => s.stock > 0
                                    ) ? (
                                        <button className="btn btn-primary btn-block">
                                            <Link
                                                to={`${process.env.PUBLIC_URL}/product/${product.id}`}
                                            >
                                                Select Option
                                            </Link>
                                        </button>
                                    ) : (
                                        <button className="btn btn-secondary btn-block ">
                                            <Link
                                                to={`${process.env.PUBLIC_URL}/product/${product.id}`}
                                            >
                                                Out of Stock
                                            </Link>
                                        </button>
                                    )}
                                </div>

                                <button
                                    className={`btn btn-sm ${
                                        wishlistItem
                                            ? "btn-danger"
                                            : "btn-outline-danger"
                                    }`}
                                    title={
                                        wishlistItem !== undefined
                                            ? "Added to wishlist"
                                            : "Add to wishlist"
                                    }
                                    onClick={() =>
                                        dispatch(addToWishlist(product))
                                    }
                                >
                                    <FaHeart />
                                </button>

                                <button
                                    className={`btn btn-sm ${
                                        compareItem
                                            ? "btn-warning"
                                            : "btn-outline-warning"
                                    }`}
                                    title={
                                        compareItem !== undefined
                                            ? "Added to compare"
                                            : "Add to compare"
                                    }
                                    onClick={() =>
                                        dispatch(addToCompare(product))
                                    }
                                >
                                    <FaCodeCompare />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* product modal */}
            <ProductModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                product={product}
                currency={currency}
                // discountedPrice={discountedPrice}
                // finalProductPrice={finalProductPrice}
                // finalDiscountedPrice={finalDiscountedPrice}
                wishlistItem={wishlistItem}
                compareItem={compareItem}
            />
        </Fragment>
    );
};

ProductGridListSingle.propTypes = {
    cartItem: PropTypes.shape({}),
    compareItem: PropTypes.shape({}),
    currency: PropTypes.shape({}),
    product: PropTypes.shape({}),
    spaceBottomClass: PropTypes.string,
    wishlistItem: PropTypes.shape({}),
};

export default ProductGridListSingle;
