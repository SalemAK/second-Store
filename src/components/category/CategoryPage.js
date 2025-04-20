import PropTypes from "prop-types";

import { Link, useParams } from "react-router-dom";

const CategoryPage = ({ data }) => {
    const { lang } = useParams();

    const title = data[`name-${lang}`] || data["name-en"];
    const description = data[`description-${lang}`] || data["description-en"];

    // Always use English name in query param for filtering logic
    const link = `/${lang}/shop-grid-standard?category=${encodeURIComponent(data["name-en"])}`;

    return (
        // <Link to={`/shop-grid-standard?category=${data.name}`} className="st_block">
        <Link to={link}>
            <img src={process.env.PUBLIC_URL + data.image} className="card-img" alt={title} />
            <div className="content d-flex">
                <h2 className="title">{title}</h2>
            </div>
        </Link>
    );
};

CategoryPage.propTypes = {
    data: PropTypes.shape({
        image: PropTypes.string,
        link: PropTypes.string,
        "name-en": PropTypes.string,
        "name-ar": PropTypes.string,
    }),
};
export default CategoryPage;
