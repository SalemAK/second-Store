import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import GoogleMap from "../../components/google-map";
import LocationCard from "../../components/contact/LocationCard";
import location from "../../data/ourData/Location.json";
import SectionTitleSeven from "../../components/section-title/SectionTitleSeven";

const Contact = () => {
    let { pathname } = useLocation();

    return (
        <Fragment>
            <SEO titleTemplate="Contact" description="Contact page of flone react minimalist eCommerce template." />
            <LayoutOne headerTop="visible">
                {/* Breadcrumb */}
                <Breadcrumb
                    pages={[
                        { label: "Home", path: process.env.PUBLIC_URL + "/" },
                        { label: "Contact", path: process.env.PUBLIC_URL + pathname },
                    ]}
                />

                <div className="contact-area pt-100 pb-100">
                    <div className="container">
                        <SectionTitleSeven titleText="Our Branches" positionClass="text-center" spaceClass="mb-25" borderClass="no-border" />

                        <div className="row mb-4 justify-content-center">
                            {location.map((loc, index) => (
                                <LocationCard key={index} {...loc} />
                            ))}
                        </div>

                        <div className="row">
                            {/* Contact Information */}
                            <div className="col-lg-4 col-md-5">
                                <div className="contact-info-wrap " style={{ height: 543 }}>
                                    {/* <div className="single-contact-info">
                                        <div className="contact-icon">
                                            <i className="fa fa-phone" />
                                        </div>
                                        <div className="contact-info-dec">
                                            <p>
                                                <a href="tel:+012345678102">+012 345 678 102</a>
                                            </p>
                                            <p>
                                                <a href="tel:+012345678102">+012 345 678 102</a>
                                            </p>
                                        </div>
                                    </div> */}
                                    <div className="single-contact-info">
                                        <div className="contact-icon">
                                            <i className="fa fa-globe" />
                                        </div>
                                        <div className="contact-info-dec">
                                            <p>
                                                <a href="mailto:yourname@email.com">Sales@iwaco-sa.com</a>
                                            </p>
                                            {/* <p>
                                                <a href="https://yourwebsitename.com">yourwebsitename.com</a>
                                            </p> */}
                                        </div>
                                    </div>
                                    {/* <div className="single-contact-info">
                                        <div className="contact-icon">
                                            <i className="fa fa-map-marker" />
                                        </div>
                                        <div className="contact-info-dec">
                                            <p>Address goes here,</p>
                                            <p>Street, Crossroad 123.</p>
                                        </div>
                                    </div> */}
                                    <div className="contact-social text-center">
                                        <h3>Follow Us</h3>
                                        <ul className="d-flex justify-content-center">
                                            <li>
                                                <a href="//facebook.com">
                                                    <i className="fa fa-facebook" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="//pinterest.com">
                                                    <i className="fa fa-pinterest-p" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="//thumblr.com">
                                                    <i className="fa fa-tumblr" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="//vimeo.com">
                                                    <i className="fa fa-vimeo" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="//twitter.com">
                                                    <i className="fa fa-twitter" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="col-lg-8 col-md-7">
                                <div className="contact-form">
                                    <div className="contact-title mb-30">
                                        <h2>Get In Touch</h2>
                                    </div>
                                    <form className="contact-form-style">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <input name="name" placeholder="Name*" type="text" required />
                                            </div>
                                            <div className="col-lg-6">
                                                <input name="email" placeholder="Email*" type="email" required />
                                            </div>
                                            <div className="col-lg-12">
                                                <input name="subject" placeholder="Subject*" type="text" />
                                            </div>
                                            <div className="col-lg-12">
                                                <textarea name="message" placeholder="Your Message*" required />
                                                <button className="submit btn btn-primary w-100 mt-3" type="submit">
                                                    SEND
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
