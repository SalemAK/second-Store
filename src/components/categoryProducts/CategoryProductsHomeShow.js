import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CategoryProductsHomeShow = ({ data }) => {
    return (
        <div className="product-item__outer h-100">
            <div className="product-item__inner px-xl-3 p-3">
                <div className="product-item__body pb-xl-2">
                    <div className="mb-2">
                        <Link
                            to={process.env.PUBLIC_URL + data.link}
                            className="h6 text-muted font-weight-bold"
                        >
                            {data.category}
                        </Link>
                    </div>
                    <h5 className="mb-1 product-item__title">
                        <Link
                            href={process.env.PUBLIC_URL + data.link}
                            className="text-primary fw-bold"
                        >
                            {data.name}
                        </Link>
                    </h5>
                    <div className="mb-2">
                        <Link
                            to={process.env.PUBLIC_URL + data.link}
                            className="d-block text-center"
                        >
                            <img
                                src={process.env.PUBLIC_URL + data.image}
                                alt=""
                                className="img-fluid"
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
