// PaymentDetails.js
import React from "react";
import paymentMethods from "../../data/ourData/PaymentMethod.json";

const PaymentDetails = ({ paymentMethod, isArabic, customer }) => {
    const method = paymentMethods.find((m) => m.method.toLowerCase() === paymentMethod.toLowerCase());

    console.log("Selected method:", paymentMethod);

    console.log(
        paymentMethods.map((m) => m.method),
        "Current:",
        paymentMethod
    );

    if (!method) return null;

    const renderDetails = () => {
        switch (paymentMethod) {
            case "bank":
                return (
                    <>
                        <p>
                            <strong>{isArabic ? "تفاصيل البنك:" : "Bank Details:"}</strong>
                        </p>
                        <p>
                            {isArabic ? "اسم البنك: " : "Bank Name: "}
                            {isArabic ? method["name-ar"] : method["name-en"]}
                        </p>
                        <p>
                            {isArabic ? "الآيبان: " : "IBAN: "}
                            {method.iban}
                        </p>
                        <p>
                            {isArabic ? "اسم الحساب: " : "Account Name: "}
                            {method.account_name}
                        </p>
                    </>
                );
            case "sadad":
                return (
                    <>
                        <p>
                            <strong>{isArabic ? "تفاصيل سداد:" : "Sadad Details:"}</strong>
                        </p>
                        <p>
                            {isArabic ? "رقم سداد: " : "Sadad No: "}
                            {method.iban}
                        </p>
                        <p>
                            {isArabic ? "اسم المستفيد: " : "Beneficiary Name: "}
                            {method.account_name}
                        </p>
                    </>
                );
            case "pickup":
                return (
                    <>
                        <p>
                            <strong>{isArabic ? "تفاصيل الاستلام:" : "Pickup Details:"}</strong>
                        </p>
                        <p>
                            {isArabic ? "اسم المستلم: " : "Recipient Name: "}
                            {customer?.firstName} {customer?.lastName}
                        </p>
                        <p>
                            {isArabic ? "رقم الجوال: " : "Mobile No: "}
                            {customer?.phone}
                        </p>
                    </>
                );
            default:
                return null;
        }
    };

    return <div>{renderDetails()}</div>;
};

export default PaymentDetails;
