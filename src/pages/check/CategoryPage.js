import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const CategoryPage = ({ data }) => {
    return (
        <Link href={process.env.PUBLIC_URL + data.link} className="st_block">
            <img
                src={process.env.PUBLIC_URL + data.image}
                className="card-img"
                alt={process.env.PUBLIC_URL + data.title}
            />
            <div className="content d-flex">
                <h5 className="title">{process.env.PUBLIC_URL + data.title}</h5>
            </div>
        </Link>
    );
};

CategoryPage.propTypes = {
    data: PropTypes.shape({}),
};
export default CategoryPage;
