import PropTypes from "prop-types";
import clsx from "clsx";
import { Link, useParams } from "react-router-dom";

const Logo = ({ imageUrl, logoClass }) => {
    const { lang } = useParams();
    return (
        <div className={clsx(logoClass)}>
            <Link to={`/${lang}/`}>
                <img className="logo-style" alt="" src={process.env.PUBLIC_URL + imageUrl} />
            </Link>
        </div>
    );
};

Logo.propTypes = {
    imageUrl: PropTypes.string,
    logoClass: PropTypes.string,
};

export default Logo;
