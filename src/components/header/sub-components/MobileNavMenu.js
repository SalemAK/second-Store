import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MobileNavMenu = () => {
    const { t } = useTranslation();
    const { lang } = useParams(); // en / ar

    const withLang = (path) => `/${lang}${path.startsWith("/") ? path : "/" + path}`;

    return (
        <nav className="offcanvas-navigation" id="offcanvas-navigation">
            <ul>
                <li>
                    <Link to={withLang("/")}>{t("home")}</Link>
                </li>
                <li>
                    <Link to={withLang("/shop-grid-standard")}>{t("collection")}</Link>
                </li>
                <li>
                    <Link to={withLang("/about")}>{t("about_us.title")}</Link>
                </li>
                <li>
                    <Link to={withLang("/contact")}>{t("contact_us.title")}</Link>
                </li>

                {/* <li className="menu-item-has-children">
                    <Link to={withLang("/blog-standard")}>{t("blog")}</Link>
                    <ul className="sub-menu">
                        <li>
                            <Link to={withLang("/blog-standard")}>{t("blog_standard")}</Link>
                        </li>
                        <li>
                            <Link to={withLang("/blog-no-sidebar")}>{t("blog_no_sidebar")}</Link>
                        </li>
                        <li>
                            <Link to={withLang("/blog-right-sidebar")}>{t("blog_right_sidebar")}</Link>
                        </li>
                        <li>
                            <Link to={withLang("/blog-details-standard")}>{t("blog_details_standard")}</Link>
                        </li>
                    </ul>
                </li> */}

                {/* <li className="menu-item-has-children">
                    <Link to={withLang("/cart")}>{t("pages")}</Link>
                    <ul className="sub-menu">
                        <li>
                            <Link to={withLang("/cart")}>{t("cart")}</Link>
                        </li>
                        <li>
                            <Link to={withLang("/checkout")}>{t("checkout")}</Link>
                        </li>
                        <li>
                            <Link to={withLang("/wishlist")}>{t("wishlist")}</Link>
                        </li>
                        <li>
                            <Link to={withLang("/compare")}>{t("compare")}</Link>
                        </li>
                        <li>
                            <Link to={withLang("/my-account")}>{t("my_account")}</Link>
                        </li>
                        <li>
                            <Link to={withLang("/login-register")}>{t("login_register")}</Link>
                        </li>
                        <li>
                            <Link to={withLang("/about")}>{t("about_us")}</Link>
                        </li>
                        <li>
                            <Link to={withLang("/contact")}>{t("contact_us")}</Link>
                        </li>
                        <li>
                            <Link to={withLang("/not-found")}>{t("404_page")}</Link>
                        </li>
                    </ul>
                </li> */}
            </ul>
        </nav>
    );
};

export default MobileNavMenu;
