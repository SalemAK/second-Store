import { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import regionsData from "../../data/ourData/regionsData.json";
// import { convertToWords } from "../../utils/numberToWords";
import CompanyForm from "../../components/forms/companyForm";
import PersonalForm from "../../components/forms/PersonalForm";
import { useTranslation } from "react-i18next";
import PaymentMethodSelector from "../../wrappers/checkout/PaymentMethodSelector";

const Checkout = () => {
    let cartTotalPrice = 0;

    let { pathname } = useLocation();
    const currency = useSelector((state) => state.currency);
    const { cartItems } = useSelector((state) => state.cart);

    const [selectedOption, setSelectedOption] = useState("Company");
    const [selectedRegion, setSelectedRegion] = useState("riyadh");
    const handleRegionChange = (event) => {
        setSelectedRegion(event.target.value); // Update selected region
    };
    //saving customer info
    const [selectedMethod, setSelectedMethod] = useState("sadad");
    const navigate = useNavigate();
    const [personalInfo, setPersonalInfo] = useState({
        firstName: "",
        lastName: "",
        address: "",
        street: "",
        building: "",
        postcode: "",
        phone: "",
        email: "",
    });

    const [companyInfo, setCompanyInfo] = useState({
        firstName: "",
        lastName: "",
        companyName: "",
        vat: "",
        address: "",
        street: "",
        building: "",
        postcode: "",
        idType: "",
        idNumber: "",
        Branch: "",
        phone: "",
        email: "",
    });

    // Handle change event
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const { t } = useTranslation();
    const { lang } = useParams();
    const [shippingCost, setShippingCost] = useState(0);
    const [taxAmount, setTaxAmount] = useState(0.15);
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

    const validateCompanyForm = () => {
        const fields = {
            firstName: "First Name",
            lastName: "Last Name",
            companyName: "Company Name",
            vat: "VAT Number",
            address: "Address",
            street: "Street",
            building: "Building",
            postcode: "Postal Code",
            idType: "ID Type",
            idNumber: "ID Number",
            Branch: "Branch",
            phone: "Phone Number",
            email: "Email",
        };

        for (let key in fields) {
            if (!companyInfo[key] || companyInfo[key].trim() === "") {
                alert(`Please fill in the "${fields[key]}" field.`);
                return false;
            }
        }

        return true;
    };

    const validatePersonalForm = () => {
        const fields = {
            firstName: "First Name",
            lastName: "Last Name",
            idType: "ID Type",
            idNumber: "ID Number",
            phone: "Phone Number",
            email: "Email",
            address: "Address",
        };

        for (let key in fields) {
            if (!personalInfo[key] || personalInfo[key].trim() === "") {
                alert(`Please fill in the "${fields[key]}" field.`);
                return false;
            }
        }

        return true;
    };

    const handlePlaceOrder = () => {
        const buyerType = selectedOption;

        if (buyerType === "Company" && !validateCompanyForm()) {
            return; // Stop if validation fails
        }
        if (buyerType === "Personal" && !validatePersonalForm()) {
            return; // Stop if validation fails
        }
        const customer = buyerType === "Company" ? companyInfo : personalInfo;

        // Calculate cart totals
        const subtotal = cartItems.reduce((sum, item) => {
            const discountedPrice = getDiscountPrice(item.selectedProductPrice, item.discount);
            return sum + (discountedPrice !== null ? discountedPrice * item.quantity : item.selectedProductPrice * item.quantity);
        }, 0);

        const orderData = {
            buyerType,
            customer,
            items: cartItems.map((item) => {
                const discountedPrice = getDiscountPrice(item.selectedProductPrice, item.discount);
                const price = discountedPrice !== null ? discountedPrice : item.selectedProductPrice;
                const beforeTax = price * item.quantity;
                const vat = beforeTax * 0.15;

                return {
                    code: item.id || "N/A",
                    name: item.name,
                    unit: "PCS", // or get from product data
                    qty: item.quantity,
                    price: item.selectedProductPrice,
                    discount: discountedPrice || 0, // or calculate if you have discounts
                    beforeTax: beforeTax.toFixed(2),
                    vat: vat.toFixed(2),
                    total: (beforeTax + vat).toFixed(2),
                };
            }),
            invoiceNumber: "INV-" + Math.floor(Math.random() * 100000),
            date: new Date().toLocaleDateString(),
            subtotal: subtotal.toFixed(2),
            discount: 0, // add if you have discounts
            vat: taxAmount.toFixed(2),
            netTotal: estimatedTotal.toFixed(2),
            // amountInWords: convertToWords(estimatedTotal), // implement this function
            paymentMethod: selectedMethod,
            salesman: "Online Store", // or get from system
        };
        console.log(orderData);

        navigate(`/${lang}/placeOrder`, { state: orderData });
    };

    return (
        <Fragment>
            <SEO titleTemplate="Checkout" description="Checkout page of flone react minimalist eCommerce template." />
            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb
                    pages={[
                        { label: t("home"), path: `/${lang}/` },
                        { label: t("cart.title"), path: `/${lang}/cart` },
                        {
                            label: t("checkout.title"),
                            path: `${lang}${pathname}`,
                        },
                    ]}
                />
                <div className="checkout-area pt-95 pb-100">
                    <div className="container">
                        {cartItems && cartItems.length >= 1 ? (
                            <div className="row">
                                {selectedOption === "Company" ? (
                                    <div className="col-lg-7">
                                        <div className="billing-info-wrap">
                                            <div className="container">
                                                <div className="row align-items-center">
                                                    <div className="col-lg-4 col-md-4">
                                                        <h4 className="mt-2">
                                                            {t("checkout.company")}/{t("checkout.personal")}
                                                        </h4>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="radio-input d-flex gap-3 w-100">
                                                            <label className="d-flex align-items-center">
                                                                <input type="radio" name="buyerType" value="Company" checked={selectedOption === "Company"} onChange={handleOptionChange} className="form-check-input me-2" />
                                                                <span className={`btn btn-${selectedOption === "Company" ? "primary" : "secondary"}`}>{t("checkout.company")}</span>
                                                            </label>
                                                            <label className="d-flex align-items-center">
                                                                <input type="radio" name="buyerType" value="Personal" checked={selectedOption === "Personal"} onChange={handleOptionChange} className="form-check-input me-2" />
                                                                <span className={`btn btn-${selectedOption === "Personal" ? "primary" : "secondary"}`}>{t("checkout.personal")}</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr className="mt-3" />
                                            </div>
                                            <h3>{t("checkout.billing_details")}</h3>
                                            <CompanyForm info={companyInfo} setInfo={setCompanyInfo} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="col-lg-7">
                                        <div className="billing-info-wrap">
                                            <div className="container">
                                                <div className="row align-items-center">
                                                    <div className="col-lg-4 col-md-4">
                                                        <h4 className="mt-2">
                                                            {t("checkout.company")}/{t("checkout.personal")}
                                                        </h4>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="radio-input d-flex gap-3 w-100">
                                                            <label className="d-flex align-items-center">
                                                                <input type="radio" value="Company" name="value-radio" checked={selectedOption === "Company"} onChange={handleOptionChange} className="form-check-input me-2" />
                                                                <span className={`btn btn-${selectedOption === "Company" ? "primary" : "secondary"}`}>{t("checkout.company")}</span>
                                                            </label>
                                                            <label className="d-flex align-items-center">
                                                                <input type="radio" value="Personal" name="value-radio" checked={selectedOption === "Personal"} onChange={handleOptionChange} className="form-check-input me-2" />
                                                                <span className={`btn btn-${selectedOption === "Personal" ? "primary" : "secondary"}`}>{t("checkout.personal")}</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr className="mt-3" />
                                            </div>
                                            <h3>{t("checkout.billing_details")}</h3>
                                            <PersonalForm info={personalInfo} setInfo={setPersonalInfo} />
                                            <hr />
                                            <div className="additional-info-wrap ">
                                                <h4>{t("checkout.additional_information")}</h4>
                                                <div className="additional-info">
                                                    <label>{t("checkout.order_notes")}</label>
                                                    <textarea placeholder={t("checkout.order_notes_placeholder")} name="message" defaultValue={""} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="col-lg-5">
                                    <div className="your-order-area">
                                        <h3>{t("checkout.your_order")}</h3>
                                        <div className="your-order-wrap gray-bg-4">
                                            <div className="your-order-product-info">
                                                <div className="your-order-top">
                                                    <ul>
                                                        <li>{t("checkout.product")}</li>
                                                        <li></li>
                                                        <li>{t("checkout.total")}</li>
                                                    </ul>
                                                </div>
                                                <div className="your-order-middle">
                                                    <ul>
                                                        {cartItems.map((cartItem, key) => {
                                                            const discountedPrice = getDiscountPrice(cartItem.selectedProductPrice, cartItem.discount);
                                                            const finalProductPrice = (cartItem.selectedProductPrice * currency.currencyRate).toFixed(2);
                                                            const finalDiscountedPrice = (discountedPrice * currency.currencyRate).toFixed(2);
                                                            const productName = cartItem[`name-${lang}`] || cartItem[`name-en`];

                                                            discountedPrice != null ? (cartTotalPrice += finalDiscountedPrice * cartItem.quantity) : (cartTotalPrice += finalProductPrice * cartItem.quantity);
                                                            return (
                                                                <li key={key} className="row ">
                                                                    <div className="col-10">
                                                                        <span className="order-middle-left">
                                                                            {productName}
                                                                            {cartItem.selectedProductSize ? (
                                                                                <div className=" text-muted">
                                                                                    <div>
                                                                                        {t("checkout.quantity")}
                                                                                        {" :"} {cartItem.quantity}
                                                                                    </div>
                                                                                    <div>
                                                                                        {t("checkout.size")}
                                                                                        {" :"} {cartItem.selectedProductSize}
                                                                                    </div>
                                                                                    {key !== cartItems.length - 1 && <hr />}
                                                                                </div>
                                                                            ) : (
                                                                                ""
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                    <div className="order-price col-2">
                                                                        <img
                                                                            src={currency.currencySymbol}
                                                                            className="img-fluid me-2 currency-icon"
                                                                            alt="Saudi Riyal"
                                                                            width={15}
                                                                            style={{
                                                                                pointerEvents: "auto",
                                                                            }}
                                                                        />
                                                                        <span className="price-text">
                                                                            {discountedPrice !== null ? " " + (finalDiscountedPrice * cartItem.quantity).toFixed(2) : " " + (finalProductPrice * cartItem.quantity).toFixed(2)}
                                                                        </span>
                                                                    </div>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                                <div className="your-order-bottom mb-1 ">
                                                    <ul>
                                                        <li className="row">
                                                            <div className="col-10">
                                                                <span className="order-middle-left">{t("checkout.vat")} 15%</span>
                                                            </div>

                                                            <div className="order-price col-2">
                                                                <img
                                                                    src={currency.currencySymbol}
                                                                    className="img-fluid  me-2 currency-icon"
                                                                    alt="Saudi Riyal"
                                                                    width={15}
                                                                    style={{
                                                                        pointerEvents: "auto",
                                                                    }}
                                                                />
                                                                <span className="price-text">{" " + taxAmount.toFixed(2)}</span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                {/* {selectedOption === "Delivery" ? (
                                                    <div className="your-order-bottom">
                                                        <ul>
                                                            <li className="your-order-shipping">Shipping Cost</li>
                                                            <li>
                                                                {" "}
                                                                <img
                                                                    src={currency.currencySymbol}
                                                                    className="img-fluid  item"
                                                                    alt="Saudi Riyal"
                                                                    width={15}
                                                                    style={{
                                                                        pointerEvents: "auto",
                                                                    }}
                                                                />{" "}
                                                                {" " + shippingCost.toFixed(2)}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                ) : null} */}

                                                <div className="your-order-total">
                                                    <ul>
                                                        <li className="row">
                                                            <div className=" col-10">
                                                                <span className="order-total">{t("checkout.total")}</span>
                                                            </div>
                                                            <div className="order-price col-2">
                                                                {" "}
                                                                <img
                                                                    src={currency.currencySymbol}
                                                                    className="img-fluid  currency-icon me-2 "
                                                                    alt="Saudi Riyal"
                                                                    width={15}
                                                                    style={{
                                                                        pointerEvents: "auto",
                                                                    }}
                                                                />{" "}
                                                                <span className="price-text">{" " + estimatedTotal.toFixed(2)} </span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="payment-method">
                                                <PaymentMethodSelector selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod} />
                                            </div>
                                        </div>

                                        <div className="place-order mt-25">
                                            <button className="btn-hover" onClick={handlePlaceOrder}>
                                                {t("checkout.place_order")}
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
                                            {t("checkout.no_item_checkout")} <br /> <Link to={`/${lang}/shop-grid-standard`}>{t("checkout.shop_now")}</Link>
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
