import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setCurrency } from "../../../store/slices/currency-slice";

const LanguageCurrencyChanger = ({ currency }) => {
    const { i18n } = useTranslation();
    const dispatch = useDispatch();
    const changeLanguageTrigger = (e) => {
        const languageCode = e.target.value;
        i18n.changeLanguage(languageCode);
    };

    const setCurrencyTrigger = (e) => {
        const currencyName = e.currentTarget.value;
        console.log(currencyName);

        dispatch(setCurrency(currencyName));
    };

    return (
        <div className="language-currency-wrap">
            <div className="same-language-currency language-style">
                <span>
                    {i18n.resolvedLanguage === "en"
                        ? "English"
                        : i18n.resolvedLanguage === "ar"
                        ? "Arabic"
                        : ""}{" "}
                    <i className="fa fa-angle-down" />
                </span>
                <div className="lang-car-dropdown">
                    <ul>
                        <li>
                            <button
                                value="en"
                                onClick={(e) => changeLanguageTrigger(e)}
                            >
                                English
                            </button>
                        </li>
                        <li>
                            <button
                                value="ar"
                                onClick={(e) => changeLanguageTrigger(e)}
                            >
                                Arabic
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="same-language-currency use-style">
                <span>
                    <img
                        src={currency.currencySymbol}
                        className="img-fluid  item"
                        alt="Saudi Riyal"
                        width={20}
                        style={{ pointerEvents: "auto" }}
                    />
                    {/* <i className="fa fa-angle-down" /> */}
                </span>
                {/* <div className="lang-car-dropdown">
                    <ul>
                        <li>
                            <button
                                value="USD"
                                onClick={(e) => setCurrencyTrigger(e)}
                            >
                                USD
                            </button>
                        </li>
                        <li>
                            <button value="SAR" onClick={setCurrencyTrigger}>
                                <img
                                    src={currency.currencySymbol}
                                    className="img-fluid w-25 item"
                                    alt="Saudi Riyal"
                                    style={{ pointerEvents: "auto" }}
                                />
                            </button>
                        </li>
                    </ul>
                </div> */}
            </div>
            <div className="same-language-currency">
                <p>Call Us 3965410</p>
            </div>
        </div>
    );
};

LanguageCurrencyChanger.propTypes = {
    currency: PropTypes.shape({}),
};

export default LanguageCurrencyChanger;
