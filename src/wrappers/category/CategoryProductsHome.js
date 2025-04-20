// import { MdKeyboardDoubleArrowRight } from "react-icons/md";
// import CategoryProductsHomeShow from "../../components/categoryProducts/CategoryProductsHomeShow";
// import itemsData from "../../data/ourData/CategoryProductsHomeShow.json";
// import categoryData from "../../data/ourData/Category.json";
// import PropTypes from "prop-types";
// import clsx from "clsx";
// import { useTranslation } from "react-i18next";
// import { useParams, Link } from "react-router-dom";

// const CategoryProductsHome = ({ spaceBottomClass }) => {
//     const { lang } = useParams();
//     const { t } = useTranslation();

//     return (
//         <>
//             {categoryData.map((category) => {
//                 if (!category.show) return null;

//                 // const filteredItems = itemsData.filter((item) => item.category[0] === category["name-en"]).slice(0, 5);
//                 const filteredItems = itemsData.filter((item) => item.categoryCode === category.categoryCode).slice(0, 5);

//                 const nameEn = category["name-en"];
//                 const nameLocalized = category[`name-${lang}`] || nameEn;

//                 const categoryUrl = `/${lang}/shop-grid-standard?category=${encodeURIComponent(nameEn)}`;

//                 return (
//                     <div className={clsx("container mb-8", spaceBottomClass)} key={category.categoryCode}>
//                         <div className="d-flex justify-content-between border-bottom border-color-1 flex-lg-nowrap flex-wrap border-md-down-top-0 border-md-down-bottom-0 mb-3 rtl">
//                             <h3 className="section-title section-title__full mb-0 pb-2 font-size-22">{nameLocalized}</h3>
//                             <Link to={categoryUrl} className="d-block text-gray-16">
//                                 {t("category_products.go_to_all")} <MdKeyboardDoubleArrowRight />
//                             </Link>
//                         </div>

//                         <div className="row">
//                             <div className="col-12 col-md-2 mb-3 mb-md-0">
//                                 <Link to={categoryUrl} className="d-block">
//                                     <img src={category.image} alt={nameLocalized} className="img-fluid my-brand-image rounded" />
//                                 </Link>
//                             </div>

//                             <div className="col-12 col-md-10">
//                                 <ul className="row list-unstyled products-group g-3">
//                                     {filteredItems.map((single) => (
//                                         <li className="col-6 col-sm-4 col-md-6 col-lg-2 product-item" key={single.id}>
//                                             <CategoryProductsHomeShow data={single} />
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 );
//             })}
//         </>
//     );
// };

// CategoryProductsHome.propTypes = {
//     spaceBottomClass: PropTypes.string,
// };

// export default CategoryProductsHome;
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import CategoryProductsHomeShow from "../../components/categoryProducts/CategoryProductsHomeShow";
import itemsData from "../../data/ourData/CategoryProductsHomeShow.json";
import categoryData from "../../data/ourData/Category.json";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const CategoryProductsHome = ({ spaceBottomClass }) => {
    const { lang } = useParams();
    const { t } = useTranslation();

    return (
        <>
            {categoryData.map((category) => {
                if (!category.show) return null;

                const filteredItems = itemsData.filter((item) => item.categoryCode === category.categoryCode).slice(0, 4);

                const nameEn = category["name-en"];
                const nameLocalized = category[`name-${lang}`] || nameEn;
                const categoryUrl = `/${lang}/shop-grid-standard?category=${encodeURIComponent(nameEn)}`;

                return (
                    <Container className={clsx("mb-5", spaceBottomClass)} key={category.categoryCode}>
                        <Row className="align-items-center justify-content-between border-bottom mb-3 pb-2">
                            <Col xs={12} md={6}>
                                <h3 className="section-title mb-0">{nameLocalized}</h3>
                            </Col>
                            <Col xs="auto">
                                <Link to={categoryUrl} className="text-muted d-flex align-items-center">
                                    {t("category_products.go_to_all")} {lang === "ar" ? <MdKeyboardDoubleArrowLeft className="me-2" /> : <MdKeyboardDoubleArrowRight className="ms-2" />}
                                </Link>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} md={2} className="mb-3 mb-md-0">
                                <Link to={categoryUrl}>
                                    <img src={category.image} alt={nameLocalized} className="img-fluid rounded w-100" style={{ height: "300px", objectFit: "cover" }} />
                                </Link>
                            </Col>

                            <Col xs={12} md={10}>
                                <Row className="g-3 m-0">
                                    {filteredItems.map((single) => (
                                        <Col key={single.id} xs={6} sm={4} md={3} lg={2} className="m-4">
                                            <CategoryProductsHomeShow data={single} />
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                );
            })}
        </>
    );
};

CategoryProductsHome.propTypes = {
    spaceBottomClass: PropTypes.string,
};

export default CategoryProductsHome;
