import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CategoryProductsHomeShow = ({ data }) => {
    return (
        <div className="product-item__outer h-100">
            <div className="product-item__inner px-xl-3 p-3">
                <div className="product-item__body pb-xl-2">
                    <div className="mb-2">
                        <Link
                            to={`/shop-grid-standard?category=${data.category[0]}`}
                            className="h6 text-muted font-weight-bold"
                        >
                            {data.category[0]}
                        </Link>
                    </div>
                    <h3 className="mb-1 product-item__title">
                        <Link
                            to={process.env.PUBLIC_URL + "/product/" + data.id}
                            className="text-primary fw-bold"
                        >
                            {data.name}
                        </Link>
                    </h3>
                    <div className="mb-2">
                        <Link
                            to={process.env.PUBLIC_URL + "/product/" + data.id}
                            className="d-block"
                        >
                            <img
                                src={process.env.PUBLIC_URL + data.image[0]}
                                alt={data.name}
                                className="img-fluid my rounded"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

CategoryProductsHomeShow.propTypes = {
    data: PropTypes.shape({}),
};

export default CategoryProductsHomeShow;
