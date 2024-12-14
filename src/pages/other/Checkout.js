import { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import regionsData from "../../data/ourData/regionsData.json";

const Checkout = () => {
    let cartTotalPrice = 0;

    let { pathname } = useLocation();
    const currency = useSelector((state) => state.currency);
    const { cartItems } = useSelector((state) => state.cart);

    const [selectedOption, setSelectedOption] = useState("Delivery");
    const [selectedRegion, setSelectedRegion] = useState("riyadh");
    const handleRegionChange = (event) => {
        setSelectedRegion(event.target.value); // Update selected region
    };

    // Handle change event
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const [shippingCost, setShippingCost] = useState(0);
    const [taxAmount, setTaxAmount] = useState(0);
    const [estimatedTotal, setEstimatedTotal] = useState(cartTotalPrice);
    useEffect(() => {
        let total = 0;
        const regionData = regionsData[selectedRegion];
        const tax = cartTotalPrice * regionData.taxRate;
        if (selectedOption === "Pick up") {
            total = cartTotalPrice + tax;
            setTaxAmount(tax);
            setEstimatedTotal(total); // Recalculate estimated total
        } else {
            total = cartTotalPrice + regionData.shippingCost + tax;
            setShippingCost(regionData.shippingCost);
            setTaxAmount(tax);
            setEstimatedTotal(total); // Recalculate estimated total
        }
    }, [selectedRegion, cartTotalPrice, selectedOption]); // Recalculate when either selectedRegion or cartTotalPrice changes
    return (
        <Fragment>
            <SEO
                titleTemplate="Checkout"
                description="Checkout page of flone react minimalist eCommerce template."
            />
            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb
                    pages={[
                        { label: "Home", path: process.env.PUBLIC_URL + "/" },
                        {
                            label: "Checkout",
                            path: process.env.PUBLIC_URL + pathname,
                        },
                    ]}
                />
                <div className="checkout-area pt-95 pb-100">
                    <div className="container">
                        <div className="col-lg-12 d-flex justify-content-center mb-4">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 ">
                                    <h3 className="mt-2">
                                        Pickup / delivery :
                                    </h3>
                                </div>
                                <div className="col-lg-4 col-md-4 ">
                                    <div class="radio-input">
                                        <label>
                                            <input
                                                value="Delivery"
                                                name="value-radio"
                                                id="value-2"
                                                type="radio"
                                                checked={
                                                    selectedOption ===
                                                    "Delivery"
                                                }
                                                onChange={handleOptionChange}
                                            />
                                            <span>Delivery</span>
                                        </label>
                                        <label>
                                            <input
                                                value="Pick up"
                                                name="value-radio"
                                                id="value-1"
                                                type="radio"
                                                checked={
                                                    selectedOption === "Pick up"
                                                }
                                                onChange={handleOptionChange}
                                            />
                                            <span>Pick up</span>
                                        </label>
                                        <span class="selection"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />

                        {cartItems && cartItems.length >= 1 ? (
                            <div className="row">
                                {selectedOption === "Delivery" ? (
                                    <div className="col-lg-7">
                                        <div className="billing-info-wrap">
                                            <h3>Billing Details</h3>
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="billing-info mb-20">
                                                        <label>
                                                            First Name
                                                        </label>
                                                        <input type="text" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="billing-info mb-20">
                                                        <label>Last Name</label>
                                                        <input type="text" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="billing-info mb-20">
                                                        <label>
                                                            Company Name
                                                        </label>
                                                        <input type="text" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="billing-select mb-20">
                                                        <label>* Country</label>
                                                        <select>
                                                            <option selected>
                                                                Saudi Arabia
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="billing-select mb-20">
                                                        <label>
                                                            * Region / State
                                                        </label>
                                                        <select
                                                            value={
                                                                selectedRegion
                                                            }
                                                            onChange={
                                                                handleRegionChange
                                                            }
                                                        >
                                                            {Object.keys(
                                                                regionsData
                                                            ).map(
                                                                (regionKey) => (
                                                                    <option
                                                                        key={
                                                                            regionKey
                                                                        }
                                                                        value={
                                                                            regionKey
                                                                        }
                                                                    >
                                                                        {regionKey
                                                                            .charAt(
                                                                                0
                                                                            )
                                                                            .toUpperCase() +
                                                                            regionKey
                                                                                .slice(
                                                                                    1
                                                                                )
                                                                                .replace(
                                                                                    "_",
                                                                                    " "
                                                                                )}
                                                                    </option>
                                                                )
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="billing-info mb-20">
                                                        <label>
                                                            Street Address
                                                        </label>
                                                        <input
                                                            className="billing-address"
                                                            placeholder="House number and street name"
                                                            type="text"
                                                        />
                                                        <input
                                                            placeholder="Apartment, suite, unit etc."
                                                            type="text"
                                                        />
                                                    </div>
                                                </div>
                                                {/* <div className="col-lg-12">
                                                    <div className="billing-info mb-20">
                                                        <label>
                                                            Town / City
                                                        </label>
                                                        <input type="text" />
                                                    </div>
                                                </div> */}
                                                {/* <div className="col-lg-6 col-md-6">
                                                    <div className="billing-info mb-20">
                                                        <label>
                                                            State / County
                                                        </label>
                                                        <input type="text" />
                                                    </div>
                                                </div> */}
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="billing-info mb-20">
                                                        <label>
                                                            Postcode / ZIP
                                                        </label>
                                                        <input type="text" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="billing-info mb-20">
                                                        <label>Phone</label>
                                                        <input type="text" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="billing-info mb-20">
                                                        <label>
                                                            Email Address
                                                        </label>
                                                        <input type="text" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="additional-info-wrap">
                                                <h4>Additional information</h4>
                                                <div className="additional-info">
                                                    <label>Order notes</label>
                                                    <textarea
                                                        placeholder="Notes about your order, e.g. special notes for delivery. "
                                                        name="message"
                                                        defaultValue={""}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="col-lg-7">
                                        <div className="billing-info-wrap">
                                            <h3>Billing Details</h3>
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="billing-info mb-20">
                                                        <label>
                                                            First Name
                                                        </label>
                                                        <input type="text" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="billing-info mb-20">
                                                        <label>Last Name</label>
                                                        <input type="text" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="billing-info mb-20">
                                                        <label>
                                                            Company Name
                                                        </label>
                                                        <input type="text" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="billing-select mb-20">
                                                        <label>Branch</label>
                                                        <select>
                                                            <option>
                                                                Select a Branch
                                                            </option>
                                                            <option>
                                                                riyadh
                                                            </option>
                                                            <option>
                                                                mecca
                                                            </option>
                                                            <option>
                                                                tabuk
                                                            </option>
                                                            <option>
                                                                jizan
                                                            </option>
                                                            <option>
                                                                makkah
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 col-md-6">
                                                    <div className="billing-info mb-20">
                                                        <label>Phone</label>
                                                        <input type="text" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="billing-info mb-20">
                                                        <label>
                                                            Email Address
                                                        </label>
                                                        <input type="text" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="additional-info-wrap">
                                                <h4>Additional information</h4>
                                                <div className="additional-info">
                                                    <label>Order notes</label>
                                                    <textarea
                                                        placeholder="Notes about your order, e.g. special notes for delivery. "
                                                        name="message"
                                                        defaultValue={""}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="col-lg-5">
                                    <div className="your-order-area">
                                        <h3>Your order</h3>
                                        <div className="your-order-wrap gray-bg-4">
                                            <div className="your-order-product-info">
                                                <div className="your-order-top">
                                                    <ul>
                                                        <li>Product</li>
                                                        <li>Total</li>
                                                    </ul>
                                                </div>
                                                <div className="your-order-middle">
                                                    <ul>
                                                        {cartItems.map(
                                                            (cartItem, key) => {
                                                                const discountedPrice =
                                                                    getDiscountPrice(
                                                                        cartItem.selectedProductPrice,
                                                                        cartItem.discount
                                                                    );
                                                                const finalProductPrice =
                                                                    (
                                                                        cartItem.selectedProductPrice *
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

                                                                discountedPrice !=
                                                                null
                                                                    ? (cartTotalPrice +=
                                                                          finalDiscountedPrice *
                                                                          cartItem.quantity)
                                                                    : (cartTotalPrice +=
                                                                          finalProductPrice *
                                                                          cartItem.quantity);
                                                                return (
                                                                    <li
                                                                        key={
                                                                            key
                                                                        }
                                                                    >
                                                                        <span className="order-middle-left">
                                                                            {
                                                                                cartItem.name
                                                                            }{" "}
                                                                            X{" "}
                                                                            {
                                                                                cartItem.quantity
                                                                            }
                                                                        </span>{" "}
                                                                        <span className="order-price">
                                                                            {discountedPrice !==
                                                                            null
                                                                                ? currency.currencySymbol +
                                                                                  " " +
                                                                                  (
                                                                                      finalDiscountedPrice *
                                                                                      cartItem.quantity
                                                                                  ).toFixed(
                                                                                      2
                                                                                  )
                                                                                : currency.currencySymbol +
                                                                                  " " +
                                                                                  (
                                                                                      finalProductPrice *
                                                                                      cartItem.quantity
                                                                                  ).toFixed(
                                                                                      2
                                                                                  )}
                                                                        </span>
                                                                    </li>
                                                                );
                                                            }
                                                        )}
                                                    </ul>
                                                </div>
                                                <div className="your-order-bottom mb-2">
                                                    <ul>
                                                        <li className="your-order-shipping">
                                                            Tax
                                                        </li>
                                                        <li>
                                                            {currency.currencySymbol +
                                                                " " +
                                                                taxAmount.toFixed(
                                                                    2
                                                                )}
                                                        </li>
                                                    </ul>
                                                </div>
                                                {selectedOption ===
                                                "Delivery" ? (
                                                    <div className="your-order-bottom">
                                                        <ul>
                                                            <li className="your-order-shipping">
                                                                Shipping Cost
                                                            </li>
                                                            <li>
                                                                {currency.currencySymbol +
                                                                    " " +
                                                                    shippingCost.toFixed(
                                                                        2
                                                                    )}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                ) : null}

                                                <div className="your-order-total">
                                                    <ul>
                                                        <li className="order-total">
                                                            Total
                                                        </li>
                                                        <li>
                                                            {currency.currencySymbol +
                                                                " " +
                                                                estimatedTotal.toFixed(
                                                                    2
                                                                )}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="payment-method"></div>
                                        </div>
                                        <div className="place-order mt-25">
                                            <button className="btn-hover">
                                                Place Order
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="item-empty-area text-center">
                                        <div className="item-empty-area__icon mb-30">
                                            <i className="pe-7s-cash"></i>
                                        </div>
                                        <div className="item-empty-area__text">
                                            No items found in cart to checkout{" "}
                                            <br />{" "}
                                            <Link
                                                to={
                                                    process.env.PUBLIC_URL +
                                                    "/shop-grid-standard"
                                                }
                                            >
                                                Shop Now
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

export default Checkout;
