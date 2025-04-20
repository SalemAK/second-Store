import React from "react";
import { useTranslation } from "react-i18next";

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
    const { t } = useTranslation();
    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <p className="popup-message">{message}</p>
                <div className="popup-buttons">
                    <button className="popup-button confirm" onClick={onConfirm}>
                        {t("Yes")}
                    </button>
                    <button className="popup-button cancel" onClick={onCancel}>
                        {t("No")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPopup;
