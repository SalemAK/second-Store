// CompanyInvoice.js (with forwardRef, Arabic/English, full support)

import React, { forwardRef } from "react";
import { convertToWordsEn, convertToWordsAr } from "../../utils/numberToWords";
import { Link } from "react-router-dom";
import PaymentDetails from "../../wrappers/paymentInvoice/PaymentDetails";

const CompanyInvoice = forwardRef(({ orderData, lang }, ref) => {
    const { invoiceNumber, date, customer, items, subtotal, vat, netTotal, paymentMethod, deliveryMethod, discount } = orderData;

    const isArabic = lang === "ar";
    const amountInWords = isArabic ? convertToWordsAr(Number(netTotal)) : convertToWordsEn(Number(netTotal));
    console.log(paymentMethod);

    return (
        <div ref={ref} className="bg-white p-4 border shadow invoice-container" dir={isArabic ? "rtl" : "ltr"}>
            <img src="/assets/img/logo-iwaco.png" alt="Watermark" className="invoice-watermark" />
            <div className="invoice-header">
                <div className="row">
                    <div className="col-md-4 text-center pt-3">
                        <h1 className="fw-bold">Irrigation world Co.</h1>
                        <h4>Water Network - Misting System</h4>
                        <h4>Polyethylene Technologies</h4>
                        <h4>Kingdom of Saudi Arabia</h4>
                    </div>
                    <div className="col-md-4 text-center">
                        <img src={process.env.PUBLIC_URL + "/assets/img/logo-iwaco.png"} alt="Company Logo" style={{ width: "150px", height: "auto" }} />
                        <p className="fw-bold">VAT No: 310788763400003 : رقم الضريبي</p>
                    </div>
                    <div className="col-md-4 text-center pt-3">
                        <h1 className="fw-bold">شركة عالم الري الزراعية</h1>
                        <h4>شبكات المياه وأنظمة الضباب</h4>
                        <h4>وتقنيات البولي ايثيلين</h4>
                        <h4>المملكة العربية السعودية</h4>
                    </div>
                </div>

                <hr />

                <div className="row mb-4">
                    <div className="col-md-6">
                        <p>
                            <strong>{isArabic ? "رقم الفاتورة:" : "Invoice No:"}</strong> {invoiceNumber}
                        </p>
                        <p>
                            <strong>{isArabic ? "التاريخ:" : "Date:"}</strong> {date || new Date().toLocaleDateString()}
                        </p>
                        <p>
                            <strong>{isArabic ? "اسم الشركة:" : "Company Name:"}</strong> {customer?.companyName}
                        </p>
                        <p>
                            <strong>{isArabic ? "الرقم الضريبي:" : "VAT No:"}</strong> {customer?.vat}
                        </p>
                    </div>
                    <div className="col-md-6">
                        <p>
                            <strong>{isArabic ? "الهاتف:" : "Phone:"}</strong> {customer?.phone}
                        </p>
                        <p>
                            <strong>{isArabic ? "العنوان:" : "Address:"}</strong> {customer?.address}
                        </p>
                        <p>
                            <strong>{isArabic ? "الفرع:" : "Branch:"}</strong> {customer?.Branch}
                        </p>
                        <p>
                            <strong>{isArabic ? "البريد الإلكتروني:" : "Email:"}</strong> {customer?.email}
                        </p>
                    </div>
                </div>
            </div>
            <div className="invoice-body">
                <table className="table table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>#</th>
                            <th>{isArabic ? "اسم المنتج" : "Item Name"}</th>
                            <th>{isArabic ? "الكمية" : "Qty"}</th>
                            <th>{isArabic ? "سعر الوحدة" : "Unit Price (SAR)"}</th>
                            <th>{isArabic ? "الخصم" : "Discount (SAR)"}</th>
                            <th>{isArabic ? "ضريبة القيمة المضافة" : "VAT 15% (SAR)"}</th>
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
                                <td>{item.discount}</td>
                                <td>{item.vat}</td>
                                <td>{item.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="invoice-footer">
                <div className="row mt-4">
                    <div className="col-md-6">
                        <p>
                            <strong>{isArabic ? "طريقة الدفع:" : "Payment Method:"}</strong> {paymentMethod}
                        </p>
                        {/* <p>
                            <strong>{isArabic ? "طريقة التوصيل:" : "Delivery Method:"}</strong> {deliveryMethod}
                        </p> */}
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
                                    <th>{isArabic ? "ضريبة القيمة المضافة" : "VAT 15%"}</th>
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

                <div className="mt-5 pt-3 border-top">
                    <div className="row">
                        <div className="col-md-6">
                            <PaymentDetails paymentMethod={paymentMethod} isArabic={isArabic} customer={customer} />
                        </div>
                        <div className="col-md-6 text-end">
                            <p>_________________________</p>
                            <p>{isArabic ? "التوقيع المعتمد" : "Authorized Signature"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default CompanyInvoice;
