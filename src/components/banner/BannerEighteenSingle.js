import PropTypes from "prop-types";
import clsx from "clsx";
import { Link, useParams } from "react-router-dom";

const BannerEighteenSingle = ({ data, spaceBottomClass }) => {
    const { lang } = useParams();
    const localizedLink = `/${lang}${data.link.startsWith("/") ? data.link : `/${data.link}`}`;
    return (
        <div className={clsx("single-banner   ", spaceBottomClass)}>
            <Link to={localizedLink}>
                <img src={data.image} alt="" />

                <div className="banner-content banner-content--style2 ">
                    <h3>{data[`title-${lang}`]}</h3>
                    <h4>{data[`subtitle-${lang}`]}</h4>
                    <Link to={localizedLink}>
                        <i className="fa fa-long-arrow-right" />
                    </Link>
                </div>
            </Link>
        </div>
    );
};

BannerEighteenSingle.propTypes = {
    data: PropTypes.shape({
        image: PropTypes.string,
        link: PropTypes.string,
        "title-en": PropTypes.string,
        "title-ar": PropTypes.string,
        "subtitle-en": PropTypes.string,
        "subtitle-ar": PropTypes.string,
    }),
    spaceBottomClass: PropTypes.string,
};

export default BannerEighteenSingle;
