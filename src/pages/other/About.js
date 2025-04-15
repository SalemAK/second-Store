import React from "react";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import BrandLogoSliderThree from "../../wrappers/brand-logo/BrandLogoSliderThree";
import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

import { FaStar, FaCheckCircle, FaLightbulb, FaHandshake, FaEye } from "react-icons/fa";
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
    return (
        <Fragment>
            <SEO titleTemplate="About us" description="About page of flone react minimalist eCommerce template." />
            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb
                    pages={[
                        { label: "Home", path: process.env.PUBLIC_URL + "/" },
                        { label: "About us", path: process.env.PUBLIC_URL + pathname },
                    ]}
                />

                <div className="container py-5">
                    {/* Title */}
                    <div className="welcome-content text-center mb-5">
                        <h1 className="display-4 fw-bold ">About IWACO</h1>
                        <p className="lead text-muted">Leader in water networks technology with global presence | Saudi Arabia</p>
                    </div>

                    {/* Intro Section */}
                    <div className="row mb-5 align-items-center">
                        <div className="col-12 col-md-6 mb-4 mb-md-0">
                            <img src="assets/img/warhouse.jpeg" alt="IWACO Showroom" className="img-fluid rounded shadow-lg" />
                        </div>
                        <div className="col-12 col-md-6">
                            <p className="lead text-center fs-5">
                                <strong>IWACO</strong> is the Middle East market leader in water networks technology with a global presence. Since its establishment, the company has consistently set new trends with comprehensive system solutions.
                            </p>
                            <p className="text-muted text-center">
                                Innovative ideas, dedicated employees, and elaborate working processes make IWACO a pioneer in the Middle East. We are committed to using natural resources responsibly to protect the environment.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mission & Vision */}
                <div className="mb-5">
                    <Container className="my-5">
                        <Row>
                            <Col>
                                <h2 className=" fw-bold mb-4 text-center">IWACO Services & Core Values</h2>
                            </Col>
                        </Row>

                        {/* Two-Column Layout for Services & Core Values */}
                        <Row className="mb-5">
                            {/* Services Section */}
                            <Col md={6}>
                                <Card className="shadow-sm border-0 mb-4">
                                    <Card.Body>
                                        <Card.Title className="fw-semibold text-secondary">Our Services</Card.Title>
                                        <Card.Text>
                                            IWACO specializes in water supply systems, drainage networks, HDPE piping, fittings, geomembranes, and chemical isolation sheets for buildings, lakes, tanks, and more—serving both public and private
                                            sectors.
                                        </Card.Text>
                                        <Card.Text>
                                            We manage a wide range of projects with expert methods in <strong>Supply, Design, Installation, Finishing, and Testing</strong>.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>

                            {/* Core Values Section */}
                            <Col md={6}>
                                <Card className="shadow-sm border-0 mb-4">
                                    <Card.Body>
                                        <Card.Title className="fw-semibold text-secondary">Our Core Values</Card.Title>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item className="d-flex align-items-center">
                                                <FaStar className="text-primary me-3" />
                                                <p>
                                                    <strong>Excellence: </strong> Excellence in all aspects, from reputation to performance.
                                                </p>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="d-flex align-items-center">
                                                <FaCheckCircle className="text-primary me-3" />
                                                <p>
                                                    <strong>Quality:</strong> Premium solutions and services across the board.
                                                </p>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="d-flex align-items-center">
                                                <FaLightbulb className="text-primary me-3" />
                                                <p>
                                                    <strong>Innovation:</strong> Leading industry practices and continuously pioneering new solutions.
                                                </p>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="d-flex align-items-center">
                                                <FaHandshake className="text-primary me-3" />
                                                <p>
                                                    <strong>Respect:</strong> Prioritizing our customers, vendors, and employees in every decision.
                                                </p>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="d-flex align-items-center">
                                                <FaEye className="text-primary me-3" />
                                                <p>
                                                    <strong>Honesty & Transparency:</strong> Integrity in all transactions.
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
                    <h2 className="text-center mb-4 fw-bold">Our Products</h2>
                    <div className="row">
                        {products.map((product, idx) => (
                            <div className="col-12 col-md-3 mb-4" key={idx}>
                                <div className="card h-100 shadow-sm border-light">
                                    <img src={product.image} className="card-img-top rounded" alt={product.title} />
                                    <div className="card-body">
                                        <h5 className="card-title fs-6 fw-bold">{product.title}</h5>
                                        <p className="card-text text-muted">{product.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Brands Section */}
                <div className="mb-3">
                    <BrandLogoSliderThree spaceBottomClass="pb-85" />
                </div>

                {/* Call to Action */}
                <div className="text-center mb-5">
                    <h3 className="fw-bold ">Want to learn more or get a quote?</h3>
                    <p className="text-muted mb-4">Contact us today for more information or to request a personalized quote.</p>
                    <Button href="/contact" variant="primary" size="lg" className="px-5 py-3 rounded-pill">
                        Get in Touch
                    </Button>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

export default About;
