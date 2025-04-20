import PropTypes from "prop-types";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { useTranslation } from "react-i18next";

const CustomForm = ({ status, message, onValidated }) => {
    const { t } = useTranslation();
    let email;

    const submit = () => {
        email && email.value.indexOf("@") > -1 && onValidated({ EMAIL: email.value });

        const emailInput = document.getElementById("mc-form-email");
        if (emailInput) emailInput.value = "";
    };

    return (
        <div className="subscribe-form">
            <div className="mc-form">
                <div>
                    <input id="mc-form-email" className="email" ref={(node) => (email = node)} type="email" placeholder={t("subscribe.placeholder")} />
                </div>
                <div className="clear">
                    <button className="button" onClick={submit}>
                        {t("subscribe.button")}
                    </button>
                </div>
            </div>

            {status === "sending" && <div style={{ color: "#3498db", fontSize: "12px" }}>{t("subscribe.sending")}</div>}
            {status === "error" && <div style={{ color: "#e74c3c", fontSize: "12px" }} dangerouslySetInnerHTML={{ __html: message }} />}
            {status === "success" && <div style={{ color: "#2ecc71", fontSize: "12px" }} dangerouslySetInnerHTML={{ __html: message }} />}
        </div>
    );
};

const SubscribeEmail = ({ mailchimpUrl }) => {
    return (
        <div>
            <MailchimpSubscribe url={mailchimpUrl} render={({ subscribe, status, message }) => <CustomForm status={status} message={message} onValidated={(formData) => subscribe(formData)} />} />
        </div>
    );
};

SubscribeEmail.propTypes = {
    mailchimpUrl: PropTypes.string,
};

export default SubscribeEmail;
