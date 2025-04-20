import React from "react";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import BrandLogoSliderThree from "../../wrappers/brand-logo/BrandLogoSliderThree";
import { Fragment } from "react";
import { useLocation, useParams } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ourProducts from "../../data/ourData/OurProducts.json";

import { FaStar, FaCheckCircle, FaLightbulb, FaHandshake, FaEye } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const products = [
    {
        title: "HDPE technologies & system",
        image: "assets/img/HDPE.jpg",
        description: "High-density polyethylene (HDPE) is a polyethylene thermoplastic made from petroleum.",
    },
    {
        title: "Fogging Systems",
        image: "assets/img/calcool.png",
        description: "Calcool fog system & Schaefer ventilation.",
    },
    {
        title: "Fountain Systems",
        image: "assets/img/Fountain Systems.png",
        description: "IWACO specializes in the design, manufacture, and commercialization of architectural fountains.",
    },
    {
        title: "Filtration Systems & Irrigation Systems",
        image: "assets/img/Irrigation Systems.png",
        description: "IWACO is a pioneer in filtration and irrigation systems, specializing in hydroponic cultivation.",
    },
];

const About = () => {
    let { pathname } = useLocation();
    const { t } = useTranslation();
    const { lang } = useParams();
    return (
        <Fragment>
            <SEO titleTemplate={t("about_us.seo_title")} description={t("about_us.seo_description")} />
            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb
                    pages={[
                        { label: t("home"), path: `/${lang}/` },
                        { label: t("about_us.title"), path: process.env.PUBLIC_URL + pathname },
                    ]}
                />

                <div className="container py-5">
                    {/* Title */}
                    <div className="welcome-content text-center mb-5">
                        <h1 className="display-4 fw-bold ">{t("about.title")}</h1>
                        <p className="lead text-muted">{t("about.subtitle")}</p>
                    </div>

                    {/* Intro Section */}
                    <div className="row mb-5 align-items-center">
                        <div className="col-12 col-md-6 mb-4 mb-md-0">
                            <img src="assets/img/warhouse.jpeg" alt="IWACO Showroom" className="img-fluid rounded shadow-lg" />
                        </div>
                        <div className="col-12 col-md-6">
                            <p className="lead text-center fs-5">{t("about.intro1")}</p>
                            <p className="text-muted text-center">{t("about.intro2")}</p>
                        </div>
                    </div>
                </div>

                {/* Mission & Vision */}
                <div className="mb-5">
                    <Container className="my-5">
                        <Row>
                            <Col>
                                <h2 className=" fw-bold mb-4 text-center">{t("about.services_core")}</h2>
                            </Col>
                        </Row>

                        {/* Two-Column Layout for Services & Core Values */}
                        <Row className="mb-5">
                            {/* Services Section */}
                            <Col md={6}>
                                <Card className="shadow-sm border-0 mb-4">
                                    <Card.Body>
                                        <Card.Title className="fw-semibold text-secondary">{t("about.services.title")}</Card.Title>
                                        <Card.Text>{t("about.services.description1")}</Card.Text>
                                        <Card.Text>
                                            {t("about.services.description2")}
                                            <strong>{t("about.services.description3")}</strong>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>

                            {/* Core Values Section */}
                            <Col md={6}>
                                <Card className="shadow-sm border-0 mb-4">
                                    <Card.Body>
                                        <Card.Title className="fw-semibold text-secondary">{t("about.coreValues.title")}</Card.Title>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item className="d-flex align-items-center">
                                                <FaStar className="text-primary me-3" />
                                                <p>
                                                    <strong>
                                                        {t("about.coreValues.Excellence")}
                                                        {": "}
                                                    </strong>
                                                    {t("about.coreValues.excellence_description")}
                                                </p>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="d-flex align-items-center">
                                                <FaCheckCircle className="text-primary me-3" />
                                                <p>
                                                    <strong>{t("about.coreValues.quality")}:</strong> {t("about.coreValues.quality_description")}
                                                </p>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="d-flex align-items-center">
                                                <FaLightbulb className="text-primary me-3" />
                                                <p>
                                                    <strong>{t("about.coreValues.innovation")}:</strong> {t("about.coreValues.innovation_description")}
                                                </p>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="d-flex align-items-center">
                                                <FaHandshake className="text-primary me-3" />
                                                <p>
                                                    <strong>{t("about.coreValues.respect")}:</strong> {t("about.coreValues.respect_description")}
                                                </p>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="d-flex align-items-center">
                                                <FaEye className="text-primary me-3" />
                                                <p>
                                                    <strong>{t("about.coreValues.honesty")}:</strong> {t("about.coreValues.honesty_description")}
                                                </p>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
                {/* Products Section */}
                <div className="container py-5">
                    <h2 className="text-center mb-4 fw-bold">{t("about.products.title")}</h2>
                    <div className="row">
                        {ourProducts.map((product, idx) => {
                            const productTitle = product[`title-${lang}`] || product[`title-en`];
                            const productDescription = product[`description-${lang}`] || product[`description-en`];
                            return (
                                <div className="col-12 col-md-3 mb-4" key={idx}>
                                    <div className="card h-100 shadow-sm border-light">
                                        <img src={product.image} className="card-img-top rounded" alt={productTitle} />
                                        <div className="card-body">
                                            <h5 className="card-title fs-6 fw-bold">{productTitle}</h5>
                                            <p className="card-text text-muted">{productDescription}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Brands Section */}
                <div className="mb-3">
                    <BrandLogoSliderThree spaceBottomClass="pb-85" />
                </div>

                {/* Call to Action */}
                <div className="text-center mb-5">
                    <h3 className="fw-bold ">{t("about.cta.title")}</h3>
                    <p className="text-muted mb-4">{t("about.cta.description")}</p>
                    <Button href={`/${lang}/contact`} variant="primary" size="lg" className="px-5 py-3 rounded-pill">
                        {t("about.cta.button")}
                    </Button>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

export default About;
