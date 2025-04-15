// PersonalInvoice.js (with forwardRef, simple version)

import React, { forwardRef } from "react";
import { convertToWordsEn, convertToWordsAr } from "../../utils/numberToWords";

const PersonalInvoice = forwardRef(({ orderData, lang }, ref) => {
    const { invoiceNumber, date, customer, items, subtotal, vat, netTotal, paymentMethod, deliveryMethod, discount } = orderData;
    const isArabic = lang === "ar";
    const amountInWords = isArabic ? convertToWordsAr(Number(netTotal)) : convertToWordsEn(Number(netTotal));

    return (
        <div ref={ref} className="bg-white p-4 border shadow" dir={isArabic ? "rtl" : "ltr"}>
            <h2 className="text-center">{isArabic ? "فاتورة شخصية" : "Personal Invoice"}</h2>
            <hr />
            <div className="row mb-4">
                <div className="col-md-6">
                    <p>
                        <strong>{isArabic ? "رقم الفاتورة:" : "Invoice No:"}</strong> {invoiceNumber}
                    </p>
                    <p>
                        <strong>{isArabic ? "التاريخ:" : "Date:"}</strong> {date || new Date().toLocaleDateString()}
                    </p>
                </div>
                <div className="col-md-6">
                    <p>
                        <strong>{isArabic ? "الاسم:" : "Name:"}</strong> {customer?.firstName} {customer?.lastName}
                    </p>
                    <p>
                        <strong>{isArabic ? "الهاتف:" : "Phone:"}</strong> {customer?.phone}
                    </p>
                    <p>
                        <strong>{isArabic ? "العنوان:" : "Address:"}</strong> {customer?.address}
                    </p>
                    <p>
                        <strong>{isArabic ? "البريد الإلكتروني:" : "Email:"}</strong> {customer?.email}
                    </p>
                </div>
            </div>

            <table className="table table-bordered">
                <thead className="table-light">
                    <tr>
                        <th>#</th>
                        <th>{isArabic ? "اسم المنتج" : "Item Name"}</th>
                        <th>{isArabic ? "الكمية" : "Qty"}</th>
                        <th>{isArabic ? "سعر الوحدة" : "Unit Price (SAR)"}</th>
                        <th>{isArabic ? "الضريبة" : "VAT 15% (SAR)"}</th>
                        <th>{isArabic ? "الإجمالي" : "Total (SAR)"}</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, idx) => (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.qty}</td>
                            <td>{item.price}</td>
                            <td>{item.vat}</td>
                            <td>{item.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="row mt-4">
                <div className="col-md-6">
                    <p>
                        <strong>{isArabic ? "طريقة الدفع:" : "Payment Method:"}</strong> {paymentMethod}
                    </p>
                    <p>
                        <strong>{isArabic ? "طريقة التوصيل:" : "Delivery Method:"}</strong> {deliveryMethod}
                    </p>
                </div>
                <div className="col-md-6 text-end">
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <th>{isArabic ? "المجموع الفرعي" : "Subtotal"}</th>
                                <td>{subtotal} SAR</td>
                            </tr>
                            {discount > 0 && (
                                <tr>
                                    <th>{isArabic ? "الخصم" : "Discount"}</th>
                                    <td>{discount} SAR</td>
                                </tr>
                            )}
                            <tr>
                                <th>{isArabic ? "الضريبة" : "VAT 15%"}</th>
                                <td>{vat} SAR</td>
                            </tr>
                            <tr className="fs-5">
                                <th>{isArabic ? "الإجمالي النهائي" : "Net Total"}</th>
                                <td>{netTotal} SAR</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="text-muted">
                        <strong>{isArabic ? "المبلغ كتابة:" : "Amount in Words:"}</strong> {amountInWords}
                    </p>
                </div>
            </div>
        </div>
    );
});

export default PersonalInvoice;
