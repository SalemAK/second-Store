import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const CategoryPage = ({ data }) => {
    return (
        <Link
            to={`/shop-grid-standard?category=${data.name}`}
            className="st_block"
        >
            <img
                src={process.env.PUBLIC_URL + data.image}
                className="card-img"
                alt={process.env.PUBLIC_URL + data.name}
            />
            <div className="content d-flex">
                <h2 className="title">{process.env.PUBLIC_URL + data.name}</h2>
            </div>
        </Link>
    );
};

CategoryPage.propTypes = {
    data: PropTypes.shape({}),
};
export default CategoryPage;
