import { Fragment } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import GoogleMap from "../../components/google-map";
import LocationCard from "../../components/contact/LocationCard";
import location from "../../data/ourData/Location.json";
import SectionTitleSeven from "../../components/section-title/SectionTitleSeven";
import { useTranslation } from "react-i18next";
import SocialMediaLinks from "../../components/contact/SocialMediaLinks";

const Contact = () => {
    let { pathname } = useLocation();
    const { t } = useTranslation();
    const { lang } = useParams();

    return (
        <Fragment>
            <SEO titleTemplate="Contact" description="Contact page of flone react minimalist eCommerce template." />
            <LayoutOne headerTop="visible">
                {/* Breadcrumb */}
                <Breadcrumb
                    pages={[
                        { label: t("breadcrumb.home"), path: `/${lang}/` },
                        { label: t("breadcrumb.contact_us"), path: `/${lang}${pathname}` },
                    ]}
                />

                <div className="contact-area pt-100 pb-100">
                    <div className="container">
                        <SectionTitleSeven titleText={t("our_branches.title")} positionClass="text-center" spaceClass="mb-25" borderClass="no-border" />

                        <div className="row mb-4 justify-content-center">
                            {location.map((loc, index) => (
                                <LocationCard key={index} {...loc} />
                            ))}
                        </div>

                        <div className="row">
                            {/* Contact Information */}
                            <div className="col-lg-4 col-md-5">
                                <div className="contact-info-wrap " style={{ height: 543 }}>
                                    <div className="single-contact-info">
                                        <div className="contact-icon">
                                            <i className="fa fa-globe" />
                                        </div>
                                        <div className="contact-info-dec">
                                            <p>
                                                <a href="mailto:yourname@email.com">Sales@iwaco-sa.com</a>
                                            </p>
                                        </div>
                                    </div>

                                    <SocialMediaLinks />
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="col-lg-8 col-md-7">
                                <div className="contact-form">
                                    <div className="contact-title mb-30">
                                        <h2>{t("contact_us.get_in_touch")}</h2>
                                    </div>
                                    <form className="contact-form-style">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <input name="name" placeholder={t("contact_us.name")} type="text" required />
                                            </div>
                                            <div className="col-lg-6">
                                                <input name="email" placeholder={t("contact_us.email")} type="email" required />
                                            </div>
                                            <div className="col-lg-12">
                                                <input name="subject" placeholder={t("contact_us.subject")} type="text" />
                                            </div>
                                            <div className="col-lg-12">
                                                <textarea name="message" placeholder={t("contact_us.your_message")} required />
                                                <button className="submit btn btn-primary w-100 mt-3" type="submit">
                                                    {t("contact_us.send")}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    <p className="form-message" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

export default Contact;
