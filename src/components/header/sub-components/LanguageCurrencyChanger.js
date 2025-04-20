import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { setCurrency } from "../../../store/slices/currency-slice";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const LanguageCurrencyChanger = ({ currency }) => {
    const { i18n, t } = useTranslation();
    const dispatch = useDispatch();
    const { lang } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const changeLanguageTrigger = (e) => {
        const newLang = e.target.value;

        // Replace language in current path
        const newPath = location.pathname.replace(`/${lang}`, `/${newLang}`);
        i18n.changeLanguage(newLang);
        navigate(newPath, { replace: true });
    };

    const setCurrencyTrigger = (e) => {
        const currencyName = e.currentTarget.value;
        dispatch(setCurrency(currencyName));
    };

    useEffect(() => {
        document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    }, [i18n.language]);

    return (
        <div className="language-currency-wrap">
            {/* Language Selector */}
            <div className="same-language-currency language-style">
                <span>
                    {t("language")} <i className="fa fa-angle-down" />
                </span>
                <div className="lang-car-dropdown">
                    <ul>
                        <li>
                            <button value="en" onClick={changeLanguageTrigger}>
                                English
                            </button>
                        </li>
                        <li>
                            <button value="ar" onClick={changeLanguageTrigger}>
                                العربية
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Currency Placeholder */}
            <div className="same-language-currency use-style">
                <span>
                    <img src={currency.currencySymbol} className="img-fluid item" alt={currency.currencySymbol} width={20} style={{ pointerEvents: "auto" }} />
                </span>
            </div>

            {/* Contact Info */}
            <div className="same-language-currency">
                <p>{t("callUs")}: 3965410</p>
            </div>
        </div>
    );
};

LanguageCurrencyChanger.propTypes = {
    currency: PropTypes.shape({
        currencySymbol: PropTypes.string,
    }),
};

export default LanguageCurrencyChanger;
