// import PropTypes from "prop-types";
// import { Link, useParams } from "react-router-dom";
// import categoryData from "../../data/ourData/Category.json";
// const CategoryProductsHomeShow = ({ data }) => {
//     const { lang } = useParams();

//     // Match the category object using categoryCode
//     const category = categoryData.find((cat) => cat.categoryCode === data.categoryCode);
//     const categoryNameLocalized = category ? category[`name-${lang}`] || category["name-en"] : "Unknown";
//     const categoryNameEn = category?.["name-en"] || "";

//     const productName = data[`name-${lang}`] || data["name-en"];

//     return (
//         <div className="product-item__outer h-100">
//             <div className="product-item__inner px-xl-3 p-3">
//                 <div className="product-item__body pb-xl-2">
//                     <div className="mb-2">
//                         <Link to={`/${lang}/shop-grid-standard?category=${encodeURIComponent(categoryNameEn)}`} className="h6 text-muted font-weight-bold">
//                             {categoryNameLocalized}
//                         </Link>
//                     </div>
//                     <h3 className="mb-1 product-item__title">
//                         <Link to={`/${lang}/product/${data.id}`} className="text-primary fw-bold">
//                             {productName}
//                         </Link>
//                     </h3>
//                     <div className="mb-2">
//                         <Link to={`/${lang}/product/${data.id}`} className="d-block">
//                             <img src={process.env.PUBLIC_URL + data.image[0]} alt={productName} className="img-fluid my rounded" />
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// CategoryProductsHomeShow.propTypes = {
//     data: PropTypes.shape({
//         id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//         image: PropTypes.arrayOf(PropTypes.string).isRequired,
//         categoryCode: PropTypes.string.isRequired,
//         "name-en": PropTypes.string,
//         "name-ar": PropTypes.string,
//     }).isRequired,
// };

// export default CategoryProductsHomeShow;
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import categoryData from "../../data/ourData/Category.json";

const CategoryProductsHomeShow = ({ data }) => {
    const { lang } = useParams();

    const category = categoryData.find((cat) => cat.categoryCode === data.categoryCode);
    const categoryNameLocalized = category ? category[`name-${lang}`] || category["name-en"] : "Unknown";
    const categoryNameEn = category?.["name-en"] || "";
    const productName = data[`name-${lang}`] || data["name-en"];

    const productLink = `/${lang}/product/${data.id}`;
    const categoryLink = `/${lang}/shop-grid-standard?category=${encodeURIComponent(categoryNameEn)}`;
    console.log(productName);

    return (
        <Card className="h-100 shadow-sm border-0 " style={{ width: "200px" }}>
            <Link to={productLink}>
                <Card.Img
                    variant="top"
                    src={process.env.PUBLIC_URL + data.image[0]}
                    alt={productName}
                    className="rounded-top w-100"
                    style={{ height: "240px", objectFit: "contain" }} // 👈 change height as needed
                />
            </Link>
            <Card.Body className="p-2">
                <small className="text-muted d-block mb-1">
                    <Link to={categoryLink} className="text-decoration-none text-secondary">
                        {categoryNameLocalized}
                    </Link>
                </small>
                <Card.Title
                    as="h3"
                    className="mb-0"
                    style={{
                        minHeight: "40px",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    <Link to={productLink} className="text-primary text-decoration-none" title={productName}>
                        {productName}
                    </Link>
                </Card.Title>
            </Card.Body>
        </Card>
    );
};

CategoryProductsHomeShow.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        image: PropTypes.arrayOf(PropTypes.string).isRequired,
        categoryCode: PropTypes.string.isRequired,
        "name-en": PropTypes.string,
        "name-ar": PropTypes.string,
    }).isRequired,
};

export default CategoryProductsHomeShow;
