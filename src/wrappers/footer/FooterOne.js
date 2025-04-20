import PropTypes from "prop-types";
import clsx from "clsx";
import { Link, useParams } from "react-router-dom";
import FooterCopyright from "../../components/footer/FooterCopyright";
import FooterNewsletter from "../../components/footer/FooterNewsletter";
import { useTranslation } from "react-i18next";

const FooterOne = ({ backgroundColorClass, spaceTopClass, spaceBottomClass, spaceLeftClass, spaceRightClass, containerClass, extraFooterClass, sideMenu }) => {
    const { t } = useTranslation();
    const { lang } = useParams();
    return (
        <footer className={clsx("footer-area", backgroundColorClass, spaceTopClass, spaceBottomClass, extraFooterClass, spaceLeftClass, spaceRightClass)}>
            <div className={`${containerClass ? containerClass : "container"}`}>
                <div className="row">
                    <div className={`${sideMenu ? "col-xl-2 col-sm-4" : "col-lg-2 col-sm-4"}`}>
                        {/* footer copyright */}
                        <FooterCopyright footerLogo="/assets/img/IwacoLogo.png" spaceBottomClass="mb-30" />
                    </div>
                    <div className={`${sideMenu ? "col-xl-2 col-sm-4" : "col-lg-2 col-sm-4"}`}>
                        <div className="footer-widget mb-30 ml-30">
                            <div className="footer-title">
                                <h3>{t("footer.about_title")}</h3>
                            </div>
                            <div className="footer-list">
                                <ul>
                                    <li>
                                        <Link to={`/${lang}/about`}>{t("footer.about_us")}</Link>
                                    </li>
                                    <li>
                                        <Link to={`/${lang}/contact`}>{t("footer.store_location")}</Link>
                                    </li>
                                    <li>
                                        <Link to={`/${lang}/contact`}>{t("footer.contact")}</Link>
                                    </li>
                                    <li>
                                        <Link to={`/${lang}/catalogs`}>{t("footer.catalogs")}</Link>
                                    </li>
                                    <li>
                                        <Link to={`/${lang}/certificates`}>{t("footer.certificates")}</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={`${sideMenu ? "col-xl-2 col-sm-4" : "col-lg-2 col-sm-4"}`}>
                        <div className={`${sideMenu ? "footer-widget mb-30 ml-95" : "footer-widget mb-30 ml-50"}`}>
                            <div className="footer-title">
                                <h3>{t("footer.links_title")}</h3>
                            </div>
                            <div className="footer-list">
                                <ul>
                                    <li>
                                        <Link to={`/${lang}/returns`}>{t("footer.returns")}</Link>
                                    </li>
                                    <li>
                                        <Link to={`/${lang}/support-policy`}>{t("footer.support_policy")}</Link>
                                    </li>
                                    <li>
                                        <Link to={`/${lang}/blogs`}>{t("footer.blogs")}</Link>
                                    </li>
                                    <li>
                                        <Link to={`/${lang}/faqs`}>{t("footer.faqs")}</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={`${sideMenu ? "col-xl-3 col-sm-4" : "col-lg-2 col-sm-6"}`}>
                        <div className={`${sideMenu ? "footer-widget mb-30 ml-145" : "footer-widget mb-30 ml-75"}`}>
                            <div className="footer-title">
                                <h3>{t("footer.follow_us")}</h3>
                            </div>
                            <div className="footer-list">
                                <ul>
                                    <li>
                                        <a href="//www.facebook.com" target="_blank" rel="noopener noreferrer">
                                            Facebook
                                        </a>
                                    </li>
                                    <li>
                                        <a href="//www.twitter.com" target="_blank" rel="noopener noreferrer">
                                            Twitter
                                        </a>
                                    </li>
                                    <li>
                                        <a href="//www.instagram.com" target="_blank" rel="noopener noreferrer">
                                            Instagram
                                        </a>
                                    </li>
                                    <li>
                                        <a href="//www.youtube.com" target="_blank" rel="noopener noreferrer">
                                            Youtube
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={`${sideMenu ? "col-xl-3 col-sm-8" : "col-lg-4 col-sm-6"}`}>
                        {/* footer newsletter */}
                        <FooterNewsletter spaceBottomClass="mb-30" spaceLeftClass="ml-70" sideMenu={sideMenu} />
                    </div>
                </div>
            </div>
        </footer>
    );
};

FooterOne.propTypes = {
    backgroundColorClass: PropTypes.string,
    containerClass: PropTypes.string,
    extraFooterClass: PropTypes.string,
    sideMenu: PropTypes.bool,
    spaceBottomClass: PropTypes.string,
    spaceTopClass: PropTypes.string,
    spaceLeftClass: PropTypes.string,
    spaceRightClass: PropTypes.string,
};

export default FooterOne;
