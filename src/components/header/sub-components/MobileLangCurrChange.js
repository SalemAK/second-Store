import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { setCurrency } from "../../../store/slices/currency-slice";

const MobileLangCurrChange = () => {
    const { i18n, t } = useTranslation();
    const dispatch = useDispatch();
    const currency = useSelector((state) => state.currency);
    const { lang } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const closeMobileMenu = () => {
        const offcanvasMobileMenu = document.querySelector("#offcanvas-mobile-menu");
        offcanvasMobileMenu?.classList.remove("active");
    };

    const changeLanguageTrigger = (e) => {
        const newLang = e.target.value;

        // Replace current lang in path
        const newPath = location.pathname.replace(`/${lang}`, `/${newLang}`);
        i18n.changeLanguage(newLang);
        navigate(newPath, { replace: true });
        closeMobileMenu();
    };

    const setCurrencyTrigger = (e) => {
        const currencyName = e.target.value;
        dispatch(setCurrency(currencyName));
        closeMobileMenu();
    };

    return (
        <div className="mobile-menu-middle">
            <div className="lang-curr-style">
                <span className="title mb-2">{t("choose_language")}</span>
                <select value={i18n.resolvedLanguage} onChange={changeLanguageTrigger}>
                    <option value="en">English</option>
                    <option value="ar">العربية</option>
                </select>
            </div>

            {/* Currency (future) */}
            {/* <div className="lang-curr-style">
        <span className="title mb-2">{t("choose_currency")}</span>
        <select
          value={currency.currencyName}
          onChange={setCurrencyTrigger}
        >
          <option value="USD">USD</option>
          <option value="SAR">SAR</option>
        </select>
      </div> */}
        </div>
    );
};

export default MobileLangCurrChange;
