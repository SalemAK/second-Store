import { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { EffectFade, Thumbs } from "swiper";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./sub-components/ProductRating";
import Swiper, { SwiperSlide } from "../../components/swiper";
import { getProductCartQuantity } from "../../helpers/product";
import { addToCart, removeFromCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";
import { getDiscountPrice } from "../../helpers/product";
import { FaCodeCompare } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import ConfirmationPopup from "../ConfirmationPopup";
import { useTranslation } from "react-i18next";

function ProductModal({
    product,
    currency,
    // discountedPrice,
    // finalProductPrice,
    // finalDiscountedPrice,
    show,
    onHide,
    wishlistItem,
    compareItem,
}) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    const [selectedProductPrice, setSelectedProductPrice] = useState(product.variation ? product.variation[0].size[0].price : "");

    const discountedPrice = getDiscountPrice(selectedProductPrice, product.discount);

    const finalProductPrice = +(selectedProductPrice * currency.currencyRate).toFixed(2);

    const finalDiscountedPrice = +(discountedPrice * currency.currencyRate).toFixed(2);

    const [selectedProductColor, setSelectedProductColor] = useState(product.variation ? product.variation[0].color : "");
    const [selectedProductSize, setSelectedProductSize] = useState(product.variation ? product.variation[0].size[0].name : "");
    const [productStock, setProductStock] = useState(product.variation ? product.variation[0].size[0].stock : product.stock);
    const [quantityCount, setQuantityCount] = useState(1);
    const productCartQty = getProductCartQuantity(cartItems, product, selectedProductColor, selectedProductSize);

    const gallerySwiperParams = {
        spaceBetween: 10,
        loop: true,
        effect: "fade",
        fadeEffect: {
            crossFade: true,
        },
        thumbs: { swiper: thumbsSwiper },
        modules: [EffectFade, Thumbs],
    };

    const thumbnailSwiperParams = {
        onSwiper: setThumbsSwiper,
        spaceBetween: 10,
        slidesPerView: 4,
        touchRatio: 0.2,
        freeMode: true,
        loop: true,
        slideToClickedSlide: true,
        navigation: true,
    };

    const onCloseModal = () => {
        setThumbsSwiper(null);
        onHide();
    };

    const [addToCartButton, setAddToCartButton] = useState(false);

    useEffect(() => {
        const isInCart = cartItems.some((item) => item.id === product.id && item.selectedProductColor === selectedProductColor && item.selectedProductSize === selectedProductSize);
        setAddToCartButton(isInCart);
    }, [cartItems, selectedProductColor, selectedProductSize, product.id]);

    const [showPopup, setShowPopup] = useState(false);
    const [productToRemove, setProductToRemove] = useState(null);

    const handleRemoveClick = () => {
        setProductToRemove({
            id: product.id,
            selectedProductColor,
            selectedProductSize,
        });
        setShowPopup(true);
    };

    const confirmDelete = () => {
        dispatch(removeFromCart(productToRemove));
        setShowPopup(false);
        setProductToRemove(null);
    };
    const cancelDelete = () => {
        setShowPopup(false);
        setProductToRemove(null);
    };

    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const localizedName = product[`name-${lang}`] || product.name;

    return (
        <Modal show={show} onHide={onCloseModal} className="product-quickview-modal-wrapper">
            <Modal.Header closeButton></Modal.Header>

            <div className="modal-body">
                <div className="row">
                    <div className="col-md-5 col-sm-12 col-xs-12">
                        <div className="product-large-image-wrapper">
                            <Swiper options={gallerySwiperParams}>
                                {product.image &&
                                    product.image.map((img, i) => {
                                        return (
                                            <SwiperSlide key={i}>
                                                <div className="single-image">
                                                    <img src={process.env.PUBLIC_URL + img} className="img-fluid" alt="Product" />
                                                </div>
                                            </SwiperSlide>
                                        );
                                    })}
                            </Swiper>
                        </div>
                        <div className="product-small-image-wrapper mt-15">
                            <Swiper options={thumbnailSwiperParams}>
                                {product.image &&
                                    product.image.map((img, i) => {
                                        return (
                                            <SwiperSlide key={i}>
                                                <div className="single-image">
                                                    <img src={process.env.PUBLIC_URL + img} className="img-fluid" alt="" />
                                                </div>
                                            </SwiperSlide>
                                        );
                                    })}
                            </Swiper>
                        </div>
                    </div>
                    <div className="col-md-7 col-sm-12 col-xs-12">
                        <div className="product-details-content quickview-content">
                            <h2>{localizedName}</h2>
                            <div className="product-details-price">
                                {discountedPrice !== null ? (
                                    <Fragment>
                                        <span>
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
                                        <span className="old">{finalProductPrice}</span>
                                    </Fragment>
                                ) : (
                                    <span>
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
                                    {/* <div className="pro-details-color-wrap">
                                        <span>Color</span>
                                        <div className="pro-details-color-content">
                                            {product.variation.map(
                                                (single, key) => {
                                                    return (
                                                        <label
                                                            className={`pro-details-color-content--single ${single.color}`}
                                                            key={key}
                                                        >
                                                            <input
                                                                type="radio"
                                                                value={
                                                                    single.color
                                                                }
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
                                                                        single
                                                                            .size[0]
                                                                            .name
                                                                    );
                                                                    setProductStock(
                                                                        single
                                                                            .size[0]
                                                                            .stock
                                                                    );
                                                                    setSelectedProductPrice(
                                                                        single
                                                                            .size[0]
                                                                            .price
                                                                    );
                                                                    setQuantityCount(
                                                                        1
                                                                    );
                                                                }}
                                                            />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div> */}
                                    <div className="pro-details-size">
                                        <span>{t("modal.size")}</span>
                                        <div className="pro-details-size-content">
                                            {product.variation &&
                                                product.variation.map((single) => {
                                                    return single.color === selectedProductColor
                                                        ? single.size.map((singleSize, key) => {
                                                              return (
                                                                  <label className={`pro-details-size-content--single`} key={key}>
                                                                      <input
                                                                          type="radio"
                                                                          value={singleSize.name}
                                                                          checked={singleSize.name === selectedProductSize ? "checked" : ""}
                                                                          onChange={() => {
                                                                              setSelectedProductSize(singleSize.name);
                                                                              setProductStock(singleSize.stock);
                                                                              setQuantityCount(1);
                                                                              setSelectedProductPrice(singleSize.price);
                                                                          }}
                                                                      />
                                                                      <span className="size-name">{singleSize.name}</span>
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
                                    <div className="pro-details-cart btn-hover">
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
                                {addToCartButton ? (
                                    <div className="pro-details-cart btn-hover ">
                                        <button className="bg-danger rounded" onClick={handleRemoveClick}>
                                            {t("modal.remove_from_cart")}
                                        </button>

                                        <button
                                            className="bg-success rounded"
                                            onClick={() => {
                                                window.location.href = process.env.PUBLIC_URL + "/cart";
                                            }}
                                        >
                                            {t("modal.go_to_cart")}
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="cart-plus-minus">
                                            <button onClick={() => setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)} className="dec qtybutton">
                                                -
                                            </button>
                                            <input className="cart-plus-minus-box" type="text" value={quantityCount} readOnly />
                                            <button onClick={() => setQuantityCount(quantityCount < productStock - productCartQty ? quantityCount + 1 : quantityCount)} className="inc qtybutton">
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
                                                                // quantity:
                                                                //     quantityCount,
                                                                // selectedProductColor:
                                                                //     selectedProductColor
                                                                //         ? selectedProductColor
                                                                //         : product.selectedProductColor
                                                                //         ? product.selectedProductColor
                                                                //         : null,
                                                                // selectedProductSize:
                                                                //     selectedProductSize
                                                                //         ? selectedProductSize
                                                                //         : product.selectedProductSize
                                                                //         ? product.selectedProductSize
                                                                //         : null,
                                                                // selectedProductPrice:
                                                                //     selectedProductPrice
                                                                //         ? selectedProductPrice
                                                                //         : product.selectedProductPrice
                                                                //         ? product.selectedProductPrice
                                                                //             : null,
                                                                quantity: quantityCount,
                                                                selectedProductColor,
                                                                selectedProductSize,
                                                                selectedProductPrice: product.variation ? product.variation.find((v) => v.color === selectedProductColor).size.find((s) => s.name === selectedProductSize).price : product.price,
                                                            })
                                                        );
                                                    }}
                                                    disabled={productCartQty >= productStock}
                                                >
                                                    {" "}
                                                    {t("modal.add_to_cart")}{" "}
                                                </button>
                                            ) : (
                                                <button className="bg-secondary" disabled>
                                                    {t("modal.out_of_stock")}
                                                </button>
                                            )}
                                        </div>
                                    </>
                                )}
                                <div className="pro-details-wishlist">
                                    <button className={wishlistItem !== undefined ? "active" : ""} title={t(wishlistItem ? "modal.remove_from_wishlist" : "modal.add_to_wishlist")} onClick={() => dispatch(addToWishlist(product))}>
                                        <FaHeart />
                                    </button>
                                </div>
                                <div className="pro-details-compare">
                                    <button className={compareItem !== undefined ? "active" : ""} title={t(compareItem ? "modal.remove_from_compare" : "modal.add_to_compare")} onClick={() => dispatch(addToCompare(product))}>
                                        <FaCodeCompare />
                                    </button>
                                </div>
                            </div>
                            {/* )} */}
                        </div>
                    </div>
                </div>
            </div>
            {showPopup && <ConfirmationPopup message={t("modal.confirm_remove")} onConfirm={confirmDelete} onCancel={cancelDelete} />}
        </Modal>
    );
}

ProductModal.propTypes = {
    currency: PropTypes.shape({}),
    // discountedprice: PropTypes.number,
    // finaldiscountedprice: PropTypes.number,
    // finalproductprice: PropTypes.number,
    onHide: PropTypes.func,
    product: PropTypes.shape({}),
    show: PropTypes.bool,
    wishlistItem: PropTypes.shape({}),
    compareItem: PropTypes.shape({}),
};

export default ProductModal;
