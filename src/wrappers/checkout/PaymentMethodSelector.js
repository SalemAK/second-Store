import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, Form } from "react-bootstrap";

const PaymentMethodSelector = ({ selectedMethod, setSelectedMethod }) => {
    const { t } = useTranslation();

    const handleChange = (e) => {
        setSelectedMethod(e.target.value);
    };

    return (
        <div className="payment-method">
            <h4 className="mb-3">{t("checkout.payment_method")}</h4>
            <Form>
                <div className="d-flex flex-column gap-3">
                    {/* Sadad */}
                    <Card className="p-3">
                        <Form.Check type="radio" id="sadad" name="paymentMethod" value="sadad" label={t("checkout.sadad")} checked={selectedMethod === "sadad"} onChange={handleChange} />
                        {selectedMethod === "sadad" && (
                            <div className="mt-2">
                                <p className="text-muted">{t("checkout.sadad_info")}</p>
                            </div>
                        )}
                    </Card>

                    {/* Bank Transfer */}
                    <Card className="p-3">
                        <Form.Check type="radio" id="bank" name="paymentMethod" value="bank" label={t("checkout.bank_transfer")} checked={selectedMethod === "bank"} onChange={handleChange} />
                        {selectedMethod === "bank" && (
                            <div className="mt-2">
                                <p className="text-muted">{t("checkout.bank_info")}</p>
                                {/* Add your bank account details here */}
                            </div>
                        )}
                    </Card>

                    {/* On Pick Up */}
                    <Card className="p-3">
                        <Form.Check type="radio" id="pickup" name="paymentMethod" value="pickup" label={t("checkout.on_pickup")} checked={selectedMethod === "pickup"} onChange={handleChange} />
                        {selectedMethod === "pickup" && (
                            <div className="mt-2">
                                <p className="text-muted">{t("checkout.pickup_info")}</p>
                            </div>
                        )}
                    </Card>
                </div>
            </Form>
        </div>
    );
};

export default PaymentMethodSelector;
