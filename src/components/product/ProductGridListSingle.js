import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { getDiscountPrice } from "../../helpers/product";
import ProductModal from "./ProductModal";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";
import { FaCodeCompare } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

const ProductGridListSingle = ({ product, currency, cartItem, wishlistItem, compareItem, spaceBottomClass }) => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === "ar";
    const [modalShow, setModalShow] = useState(false);

    const dispatch = useDispatch();

    const productPrice = product.variation?.[0]?.size?.[0]?.price ?? product.price;
    const discountedPrice = getDiscountPrice(productPrice, product.discount);

    const finalProductPrice = +(productPrice * currency.currencyRate).toFixed(2);
    const finalDiscountedPrice = +(discountedPrice * currency.currencyRate).toFixed(2);

    const handleWishlist = () => dispatch(addToWishlist(product));
    const handleCompare = () => dispatch(addToCompare(product));
    const { lang } = useParams();
    console.log(lang);

    return (
        <Fragment>
            {/* Product Card */}
            <div className={clsx("product-wrap h-100 card p-3 shadow-sm", spaceBottomClass)}>
                <div className="product-img position-relative">
                    <Link to={`/${lang}/product/${product.id}`}>
                        <img className="default-img rounded" src={process.env.PUBLIC_URL + product.image[0]} alt={product.name} />
                        {product.image[1] && <img className="hover-img img-fluid rounded position-absolute w-100 h-100 hover-opacity" src={process.env.PUBLIC_URL + product.image[1]} alt={product.name} />}
                    </Link>

                    {(product.discount || product.new) && (
                        <div className="product-img-badges">
                            {product.discount && <span className="pink">-{product.discount}%</span>}
                            {product.new && <span className="purple">{t("product.badge.new")}</span>}
                        </div>
                    )}

                    <div className="position-absolute bottom-0 start-0 m-2 d-flex gap-2">
                        <button className={`btn btn-sm ${wishlistItem ? "btn-danger" : "btn-outline-secondary"}`} onClick={handleWishlist} title={wishlistItem ? t("product.wishlist.added") : t("product.wishlist.add")}>
                            <FaHeart />
                        </button>
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => setModalShow(true)}>
                            {t("product.quick_view")}
                        </button>
                        <button className={`btn btn-sm ${compareItem ? "btn-primary" : "btn-outline-secondary"}`} onClick={handleCompare} title={compareItem ? t("product.compare.added") : t("product.compare.add")}>
                            <FaCodeCompare />
                        </button>
                    </div>
                </div>

                <div className="product-content text-top" dir={isRTL ? "rtl" : "ltr"}>
                    <h3 className="fw-bold product-title">
                        <Link to={`/${lang}/product/${product.id}`}>{product[`name-${i18n.language}`] || product.name}</Link>
                    </h3>

                    <div className="product-price">
                        {discountedPrice !== null ? (
                            <Fragment>
                                <span className="fw-bold text-primary me-1">
                                    <small className="text-muted">{t("product.price.from")} </small>
                                    <img src={currency.currencySymbol} className="img-fluid" alt="Currency" width={15} />
                                    {" " + finalDiscountedPrice}
                                </span>
                                <span className="old">{" " + finalProductPrice}</span>
                            </Fragment>
                        ) : (
                            <span>
                                <small className="text-muted">{t("product.price.from")} </small>
                                <img src={currency.currencySymbol} className="img-fluid" alt="Currency" width={15} />
                                {" " + finalProductPrice}
                            </span>
                        )}
                    </div>

                    {product.variation[0].size.some((s) => s.stock > 0) ? (
                        <Link to={`/${lang}/product/${product.id}`} className="btn btn-primary w-100 mt-1">
                            {t("product.select_option")}
                        </Link>
                    ) : (
                        <Link to={`/${lang}/product/${product.id}`} className="btn btn-secondary w-100 mt-1">
                            {t("product.out_of_stock")}
                        </Link>
                    )}
                </div>
            </div>

            {/* Product Modal */}
            <ProductModal show={modalShow} onHide={() => setModalShow(false)} product={product} currency={currency} wishlistItem={wishlistItem} compareItem={compareItem} />
        </Fragment>
    );
};

ProductGridListSingle.propTypes = {
    cartItem: PropTypes.shape({}),
    compareItem: PropTypes.shape({}),
    currency: PropTypes.shape({
        currencyRate: PropTypes.number,
        currencySymbol: PropTypes.string,
    }),
    product: PropTypes.shape({}),
    spaceBottomClass: PropTypes.string,
    wishlistItem: PropTypes.shape({}),
};

export default ProductGridListSingle;
