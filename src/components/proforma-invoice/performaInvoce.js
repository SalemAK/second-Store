import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import CompanyInvoice from "./CompanyInvoice";
import PersonalInvoice from "./PersonalInvoice";

const InvoiceRouter = () => {
    const location = useLocation();
    const order = location.state;
    const componentRef = useRef();

    const [lang, setLang] = useState("en");
    const [downloading, setDownloading] = useState(false);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `Invoice_${order?.invoiceNumber || "N/A"}`,
        onBeforePrint: () => {
            console.log("Preparing invoice...");
            return Promise.resolve();
        },
    });

    const handleDownloadPDF = async () => {
        if (!componentRef.current) {
            alert("Invoice not ready yet. Please try again.");
            return;
        }

        setDownloading(true);
        const canvas = await html2canvas(componentRef.current);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Invoice_${order?.invoiceNumber || "N/A"}.pdf`);
        setDownloading(false);
    };

    if (!order) return <div>No order data found.</div>;

    const InvoiceComponent = order.buyerType === "Company" ? CompanyInvoice : PersonalInvoice;

    return (
        <div className="pb-3">
            <div className="container my-4">
                {/* Language Selector */}
                <div className="text-end mb-3">
                    <label className="me-2 fw-bold">Invoice Language:</label>
                    <select value={lang} onChange={(e) => setLang(e.target.value)} className="form-select d-inline-block w-auto">
                        <option value="en">English</option>
                        <option value="ar">Arabic</option>
                    </select>
                </div>

                {/* Invoice Component */}
                <InvoiceComponent ref={componentRef} orderData={order} lang={lang} />

                {/* Action Buttons */}
                <div className="text-center mt-4 no-print">
                    <button
                        onClick={() => {
                            if (!componentRef.current) {
                                alert("Invoice is not ready yet.");
                                return;
                            }
                            setTimeout(() => handlePrint(), 300);
                        }}
                        className="btn btn-primary me-2"
                        style={{ minWidth: "150px" }}
                    >
                        <i className="bi bi-printer me-2"></i> Print Invoice
                    </button>

                    <button onClick={handleDownloadPDF} className="btn btn-success" disabled={downloading} style={{ minWidth: "150px" }}>
                        {downloading ? (
                            "Downloading..."
                        ) : (
                            <>
                                <i className="bi bi-download me-2"></i>Download PDF
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvoiceRouter;
