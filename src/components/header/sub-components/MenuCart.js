import { Fragment, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDiscountPrice } from "../../../helpers/product";
import { deleteFromCart } from "../../../store/slices/cart-slice";
import ConfirmationPopup from "../../ConfirmationPopup";
import { useTranslation } from "react-i18next";

const MenuCart = () => {
    const { t } = useTranslation();
    const { lang } = useParams(); // Get 'en' or 'ar'
    const dispatch = useDispatch();
    const currency = useSelector((state) => state.currency);
    const { cartItems } = useSelector((state) => state.cart);
    let cartTotalPrice = 0;

    const [showPopup, setShowPopup] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleDeleteClick = (cartItemId) => {
        setItemToDelete(cartItemId);
        setShowPopup(true);
    };

    const confirmDelete = () => {
        dispatch(deleteFromCart(itemToDelete));
        setShowPopup(false);
        setItemToDelete(null);
    };
    const cancelDelete = () => {
        setShowPopup(false);
        setItemToDelete(null);
    };
    return (
        <div className="shopping-cart-content">
            {cartItems && cartItems.length > 0 ? (
                <Fragment>
                    <ul>
                        {cartItems.map((item) => {
                            const discountedPrice = getDiscountPrice(item.selectedProductPrice, item.discount);
                            const finalProductPrice = (item.selectedProductPrice * currency.currencyRate).toFixed(2);
                            const finalDiscountedPrice = (discountedPrice * currency.currencyRate).toFixed(2);

                            discountedPrice != null ? (cartTotalPrice += finalDiscountedPrice * item.quantity) : (cartTotalPrice += finalProductPrice * item.quantity);

                            return (
                                <li className="single-shopping-cart" key={item.cartItemId}>
                                    <div className="shopping-cart-img">
                                        <Link to={`/${lang}/product/${item.id}`}>
                                            <img alt={item.name} src={process.env.PUBLIC_URL + item.image[0]} className="img-fluid" />
                                        </Link>
                                    </div>
                                    <div className="shopping-cart-title">
                                        <h4>
                                            <Link to={`/${lang}/product/${item.id}`}> {item.name} </Link>
                                        </h4>
                                        {item.selectedProductSize ? (
                                            <div className="cart-item-variation mt-0 text-muted">
                                                <span>
                                                    {t("size")}: {item.selectedProductSize}
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        <h6>
                                            {t("qty")}: {item.quantity}
                                        </h6>

                                        <span>
                                            {" "}
                                            <img
                                                src={currency.currencySymbol}
                                                className="img-fluid  item"
                                                alt="Saudi Riyal"
                                                width={15}
                                                style={{
                                                    pointerEvents: "auto",
                                                }}
                                            />
                                            {discountedPrice !== null ? " " + finalDiscountedPrice : " " + finalProductPrice}
                                        </span>
                                    </div>
                                    <div className="shopping-cart-delete">
                                        <button onClick={() => handleDeleteClick(item.cartItemId)}>
                                            <i className="fa fa-times-circle" />
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="shopping-cart-total">
                        <h4>
                            {t("total")}:{" "}
                            <span className="shop-total">
                                {" "}
                                <img
                                    src={currency.currencySymbol}
                                    className="img-fluid  item"
                                    alt="Saudi Riyal"
                                    width={15}
                                    style={{
                                        pointerEvents: "auto",
                                    }}
                                />
                                {" " + cartTotalPrice.toFixed(2)}
                            </span>
                        </h4>
                    </div>
                    <div className="shopping-cart-btn btn-hover text-center">
                        <Link className="default-btn" to={`/${lang}/cart`}>
                            {t("view_cart")}
                        </Link>
                        <Link className="default-btn" to={`/${lang}/checkout`}>
                            {t("checkout")}
                        </Link>
                    </div>
                </Fragment>
            ) : (
                <p className="text-center">{t("no_items_in_cart")}</p>
            )}
            {showPopup && <ConfirmationPopup message="Are you sure you want to remove this item ?" onConfirm={confirmDelete} onCancel={cancelDelete} />}
        </div>
    );
};

export default MenuCart;
