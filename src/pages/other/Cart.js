import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { addToCart, decreaseQuantity, deleteFromCart, deleteAllFromCart } from "../../store/slices/cart-slice";
import { cartItemStock } from "../../helpers/product";
import regionsData from "../../data/ourData/regionsData.json";
import ConfirmationPopup from "../../components/ConfirmationPopup";
import { CgProductHunt } from "react-icons/cg";
import { TbTrashX } from "react-icons/tb";
import CartItemInput from "./CartItemUnput";

const Cart = () => {
    // let cartTotalPrice = 0;

    const [quantityCount] = useState(1);
    const dispatch = useDispatch();
    let { pathname } = useLocation();

    const currency = useSelector((state) => state.currency);
    const { cartItems } = useSelector((state) => state.cart);

    const [selectedRegion, setSelectedRegion] = useState("riyadh");
    const [cartTotalPrice, setCartTotalPrice] = useState(0);

    const [SelectedStock, setSelectedStock] = useState(0);
    const [shippingCost, setShippingCost] = useState(0);
    const [taxAmount, setTaxAmount] = useState(0);
    const [estimatedTotal, setEstimatedTotal] = useState(cartTotalPrice);
    const handleRegionChange = (event) => {
        setSelectedRegion(event.target.value); // Update selected region
    };

    useEffect(() => {
        let updatedCartTotal = 0;

        cartItems.forEach((cartItem) => {
            const discountedPrice = getDiscountPrice(cartItem.selectedProductPrice, cartItem.discount);
            const finalProductPrice = (cartItem.selectedProductPrice * currency.currencyRate).toFixed(2);
            const finalDiscountedPrice = (discountedPrice * currency.currencyRate).toFixed(2);

            updatedCartTotal += discountedPrice !== null ? finalDiscountedPrice * cartItem.quantity : finalProductPrice * cartItem.quantity;
        });

        setCartTotalPrice(updatedCartTotal); // Update state with the new total
    }, [cartItems, currency.currencyRate]);

    useEffect(() => {
        const regionData = regionsData[selectedRegion];
        const tax = cartTotalPrice * regionData.taxRate;
        const total = cartTotalPrice + regionData.shippingCost + tax;

        setShippingCost(regionData.shippingCost);
        setTaxAmount(tax);
        setEstimatedTotal(total); // Recalculate estimated total
    }, [selectedRegion, cartTotalPrice]); // Recalculate when either selectedRegion or cartTotalPrice changes

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
        <Fragment>
            <SEO titleTemplate="Cart" description="Cart page of flone react minimalist eCommerce template." />

            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb
                    pages={[
                        { label: "Home", path: process.env.PUBLIC_URL + "/" },
                        {
                            label: "Cart",
                            path: process.env.PUBLIC_URL + pathname,
                        },
                    ]}
                />
                <div className="cart-main-area pt-90 pb-100">
                    <div className="container">
                        {cartItems && cartItems.length >= 1 ? (
                            <Fragment>
                                <h3 className="cart-page-title">Your cart items</h3>
                                <div className="row">
                                    <div className="col-12">
                                        {/* Table Layout (Visible on Larger Screens) */}
                                        <div className="d-none d-md-block table-responsive">
                                            <table className="table ">
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: "100px" }}>Image</th>
                                                        <th style={{ width: "200px" }}>Product Name</th>
                                                        <th style={{ width: "100px" }}>Unit Price</th>
                                                        <th style={{ width: "100px" }}>Qty</th>
                                                        <th style={{ width: "120px" }}>Subtotal</th>
                                                        <th style={{ width: "80px" }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cartItems.map((cartItem, key) => {
                                                        const discountedPrice = getDiscountPrice(cartItem.selectedProductPrice, cartItem.discount);
                                                        const finalProductPrice = (cartItem.selectedProductPrice * currency.currencyRate).toFixed(2);
                                                        const finalDiscountedPrice = (discountedPrice * currency.currencyRate).toFixed(2);
                                                        return (
                                                            <tr key={key} style={{ minHeight: "60px" }}>
                                                                <td>
                                                                    <img className="img-fluid rounded" src={cartItem.image[0]} alt="" width="100" />
                                                                </td>
                                                                <td className="product-name">
                                                                    <Link to={process.env.PUBLIC_URL + "/product/" + cartItem.id}>{cartItem.name}</Link>
                                                                    {cartItem.selectedProductSize ? (
                                                                        <div className="cart-item-variation">
                                                                            <span>Size: {cartItem.selectedProductSize}</span>
                                                                        </div>
                                                                    ) : (
                                                                        ""
                                                                    )}
                                                                </td>
                                                                <td className="product-price-cart">
                                                                    {discountedPrice !== null ? (
                                                                        <Fragment>
                                                                            <span className="amount fw-bold">
                                                                                <img src={currency.currencySymbol} className="img-fluid " alt="Saudi Riyal" width={15} style={{ pointerEvents: "auto" }} />
                                                                                {" " + finalDiscountedPrice}
                                                                            </span>{" "}
                                                                            <span className="amount old text-muted text-decoration-line-through">{" " + finalProductPrice}</span>
                                                                            {/* <span className="fw-bold m-1">{" - "}</span> */}
                                                                        </Fragment>
                                                                    ) : (
                                                                        <span className="amount">
                                                                            <img src={currency.currencySymbol} className="img-fluid " alt="Saudi Riyal" width={15} style={{ pointerEvents: "auto" }} />
                                                                            {" " + finalProductPrice}
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                {/* <td>{cartItem.quantity}</td> */}
                                                                <td className="product-quantity">
                                                                    {/* <div className="d-flex align-items-center">
                                                                        <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => dispatch(decreaseQuantity(cartItem))}>
                                                                            -
                                                                        </button>
                                                                        <span className="fw-bold">{cartItem.quantity}</span>
                                                                        <button
                                                                            className="btn btn-sm btn-outline-secondary ms-2"
                                                                            onClick={() => dispatch(addToCart({ ...cartItem, quantity: quantityCount }))}
                                                                            disabled={cartItem !== undefined && cartItem.quantity && cartItem.quantity >= cartItemStock(cartItem, cartItem.selectedProductColor, cartItem.selectedProductSize)}
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </div> */}
                                                                    {/* <div className="d-flex align-items-center">
                                                                        <button onClick={() => dispatch(decreaseQuantity(cartItem))} className="btn btn-sm btn-outline-secondary me-2">
                                                                            -
                                                                        </button> */}
                                                                    {/* <input
                                                                            className="form-control text-center"
                                                                            type="text"
                                                                            value={cartItem.quantity}
                                                                            onChange={(e) => {
                                                                                let value = e.target.value;
                                                                                console.log(value);

                                                                                if (value > cartItemStock(cartItem, cartItem.selectedProductSize)) {
                                                                                    value = cartItemStock(cartItem, cartItem.selectedProductSize);
                                                                                }
                                                                            }}
                                                                        /> */}
                                                                    <CartItemInput cartItem={cartItem} cartItemStock={cartItemStock} dispatch={dispatch} />

                                                                    {/* <button
                                                                            className="btn btn-sm btn-outline-secondary ms-2"
                                                                            onClick={() => dispatch(addToCart({ ...cartItem, quantity: quantityCount }))}
                                                                            disabled={cartItem !== undefined && cartItem.quantity && cartItem.quantity >= cartItemStock(cartItem, cartItem.selectedProductSize)}
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </div> */}
                                                                </td>
                                                                <td className="product-subtotal">
                                                                    <img src={currency.currencySymbol} className="img-fluid " alt="Saudi Riyal" width={15} style={{ pointerEvents: "auto" }} />{" "}
                                                                    {discountedPrice !== null ? (finalDiscountedPrice * cartItem.quantity).toFixed(2) : (finalProductPrice * cartItem.quantity).toFixed(2)}
                                                                </td>
                                                                <td>
                                                                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(cartItem.cartItemId)}>
                                                                        Remove
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Card Layout (Visible on Tablets & Smaller Screens) */}
                                        <div className="d-block d-md-none p-2">
                                            {cartItems.map((cartItem, key) => {
                                                const discountedPrice = getDiscountPrice(cartItem.selectedProductPrice, cartItem.discount);
                                                const finalProductPrice = (cartItem.selectedProductPrice * currency.currencyRate).toFixed(2);
                                                const finalDiscountedPrice = (discountedPrice * currency.currencyRate).toFixed(2);
                                                return (
                                                    <div key={key} className="card mb-3 p-2" style={{ minHeight: "120px" }}>
                                                        <div className="d-flex align-items-center">
                                                            <img className="img-fluid rounded me-3" src={cartItem.image[0]} alt="" width="80" />
                                                            <div>
                                                                <h6 className="mb-1 fw-bold">
                                                                    {cartItem.name}
                                                                    {cartItem.selectedProductSize ? (
                                                                        <div className="cart-item-variation">
                                                                            <span>Size: {cartItem.selectedProductSize}</span>
                                                                        </div>
                                                                    ) : (
                                                                        ""
                                                                    )}
                                                                </h6>
                                                                <p className="text-muted mb-1">
                                                                    {discountedPrice !== null ? (
                                                                        <Fragment>
                                                                            <span className="amount fw-bold">
                                                                                <img src={currency.currencySymbol} className="img-fluid " alt="Saudi Riyal" width={15} style={{ pointerEvents: "auto" }} />
                                                                                {" " + finalDiscountedPrice}
                                                                            </span>{" "}
                                                                            <span className="amount old text-muted text-decoration-line-through">{" " + finalProductPrice}</span>
                                                                            {/* <span className="fw-bold m-1">{" - "}</span> */}
                                                                        </Fragment>
                                                                    ) : (
                                                                        <span className="amount">
                                                                            <img src={currency.currencySymbol} className="img-fluid " alt="Saudi Riyal" width={15} style={{ pointerEvents: "auto" }} />
                                                                            {" " + finalProductPrice}
                                                                        </span>
                                                                    )}
                                                                </p>
                                                                {/* <div className="d-flex align-items-center">
                                                                    <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => dispatch(decreaseQuantity(cartItem))}>
                                                                        -
                                                                    </button>
                                                                    <span className="fw-bold">{cartItem.quantity}</span>
                                                                    <button
                                                                        className="btn btn-sm btn-outline-secondary ms-2"
                                                                        onClick={() => dispatch(addToCart({ ...cartItem, quantity: quantityCount }))}
                                                                        disabled={cartItem !== undefined && cartItem.quantity && cartItem.quantity >= cartItemStock(cartItem, cartItem.selectedProductSize)}
                                                                    >
                                                                        +
                                                                    </button>
                                                                </div> */}
                                                                <CartItemInput cartItem={cartItem} cartItemStock={cartItemStock} dispatch={dispatch} />
                                                            </div>
                                                        </div>
                                                        <div className="d-flex justify-content-between mt-2">
                                                            <p className="mb-0">
                                                                Subtotal: <strong>{(cartItem.selectedProductPrice * cartItem.quantity).toFixed(2)}</strong>
                                                            </p>
                                                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(cartItem.cartItemId)}>
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="row row-cols-1 row-cols-md-2 g-3 ">
                                    <div className="col-lg-12">
                                        <div className="cart-shiping-update-wrapper px-4 px-md-0 ">
                                            <div className="cart-shiping-update px-sm-2">
                                                <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"} className="w-100 mt-2 text-center ">
                                                    Continue Shopping
                                                </Link>
                                            </div>
                                            <div className="cart-clear">
                                                <button className="btn btn-danger btn-sm w-100 mt-2" onClick={() => dispatch(deleteAllFromCart())}>
                                                    Clear Shopping Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    {/* <div className="col-lg-6 col-md-12">
                                        <div className="cart-tax">
                                            <div className="title-wrap">
                                                <h4 className="cart-bottom-title section-bg-gray">Estimate Shipping And Tax</h4>
                                            </div>
                                            <div className="tax-wrapper">
                                                <p>Enter your destination to get a shipping estimate.</p>
                                                <div className="tax-select-wrapper">
                                                    <div className="tax-select">
                                                        <label>* Country</label>
                                                        <select className="email s-email s-wid">
                                                            <option selected>Saudi Arabia</option>
                                                        </select>
                                                    </div>
                                                    <div className="tax-select">
                                                        <label>* Region / State</label>
                                                        <select className="email s-email s-wid" value={selectedRegion} onChange={handleRegionChange}>
                                                            {Object.keys(regionsData).map((regionKey) => (
                                                                <option key={regionKey} value={regionKey}>
                                                                    {regionKey.charAt(0).toUpperCase() + regionKey.slice(1).replace("_", " ")}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="tax-select">
                                                        <label>* Zip/Postal Code</label>
                                                        <input type="text" />
                                                    </div>
                                                    <button className="cart-btn-2" type="submit">
                                                        Get A Quote
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 col-md-6">
                                        <div className="discount-code-wrapper">
                                            <div className="title-wrap">
                                                <h4 className="cart-bottom-title section-bg-gray">Use Coupon Code</h4>
                                            </div>
                                            <div className="discount-code">
                                                <p>Enter your coupon code if you have one.</p>
                                                <form>
                                                    <input type="text" required name="name" />
                                                    <button className="cart-btn-2" type="submit">
                                                        Apply Coupon
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div> */}

                                    <div className="col-lg-12 col-md-12">
                                        <div className="grand-totall">
                                            <div className="title-wrap">
                                                <h4 className="cart-bottom-title section-bg-gary-cart">Cart Total</h4>
                                            </div>
                                            <h5>
                                                Subtotal:{" "}
                                                <span>
                                                    <img src={currency.currencySymbol} className="img-fluid " alt="Saudi Riyal" width={15} style={{ pointerEvents: "auto" }} />
                                                    {" " + cartTotalPrice.toFixed(2)}
                                                </span>
                                            </h5>
                                            <h5>
                                                VAT 15%:{" "}
                                                <span>
                                                    <img src={currency.currencySymbol} className="img-fluid " alt="Saudi Riyal" width={15} style={{ pointerEvents: "auto" }} />
                                                    {" " + taxAmount.toFixed(2)}
                                                </span>
                                            </h5>
                                            {/* <h5>
                                                Shipping Cost:{" "}
                                                <span>
                                                    <img src={currency.currencySymbol} className="img-fluid " alt="Saudi Riyal" width={15} style={{ pointerEvents: "auto" }} />
                                                    {" " + shippingCost.toFixed(2)}
                                                </span>
                                            </h5> */}

                                            <hr />
                                            <h4 className="grand-totall-title">
                                                Estimated Total:{" "}
                                                <span>
                                                    <img src={currency.currencySymbol} className="img-fluid " alt="Saudi Riyal" width={15} style={{ pointerEvents: "auto" }} />
                                                    {" " + estimatedTotal.toFixed(2)}
                                                </span>
                                            </h4>
                                            <Link to={process.env.PUBLIC_URL + "/checkout"}>Proceed to Checkout</Link>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        ) : (
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="item-empty-area text-center">
                                        <div className="item-empty-area__icon mb-30">
                                            <i className="pe-7s-cart"></i>
                                        </div>
                                        <div className="item-empty-area__text">
                                            No items found in cart <br /> <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>Shop Now</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {showPopup && <ConfirmationPopup message="Are you sure you want to remove this item ?" onConfirm={confirmDelete} onCancel={cancelDelete} />}
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

export default Cart;
