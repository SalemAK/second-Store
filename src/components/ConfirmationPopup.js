import React from "react";

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <p className="popup-message">{message}</p>
                <div className="popup-buttons">
                    <button
                        className="popup-button confirm"
                        onClick={onConfirm}
                    >
                        Yes
                    </button>
                    <button className="popup-button cancel" onClick={onCancel}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPopup;
