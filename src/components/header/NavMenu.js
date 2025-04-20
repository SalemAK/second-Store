import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const NavMenu = ({ menuWhiteClass, sidebarMenu }) => {
    const { t } = useTranslation();
    const { lang } = useParams(); // Get 'en' or 'ar'

    return (
        <div className={clsx(sidebarMenu ? "sidebar-menu" : `main-menu ${menuWhiteClass || ""}`)}>
            <nav>
                <ul>
                    <li>
                        <Link to={`/${lang}/`}>{t("home")}</Link>
                    </li>
                    <li>
                        <Link to={`/${lang}/shop-grid-standard`}>{t("collection")}</Link>
                    </li>
                    <li>
                        <Link to={`/${lang}/about`}>{t("about_us.title")}</Link>
                    </li>
                    <li>
                        <Link to={`/${lang}/contact`}>{t("contact_us.title")}</Link>
                    </li>
                    {/* <li>
                        <Link to={`/${lang}/blog-standard`}>
                            {t("blog")}
                            {sidebarMenu ? (
                                <span>
                                    <i className="fa fa-angle-right"></i>
                                </span>
                            ) : (
                                <i className="fa fa-angle-down" />
                            )}
                        </Link>
                        <ul className="submenu">
                            <li>
                                <Link to={`/${lang}/blog-standard`}>{t("blog_standard")}</Link>
                            </li>
                            <li>
                                <Link to={`/${lang}/blog-no-sidebar`}>{t("blog_no_sidebar")}</Link>
                            </li>
                            <li>
                                <Link to={`/${lang}/blog-right-sidebar`}>{t("blog_right_sidebar")}</Link>
                            </li>
                            <li>
                                <Link to={`/${lang}/blog-details-standard`}>{t("blog_details_standard")}</Link>
                            </li>
                        </ul>
                    </li> */}
                </ul>
            </nav>
        </div>
    );
};

NavMenu.propTypes = {
    menuWhiteClass: PropTypes.string,
    sidebarMenu: PropTypes.bool,
};

export default NavMenu;
