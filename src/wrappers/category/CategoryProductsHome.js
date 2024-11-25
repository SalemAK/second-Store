import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import CategoryProductsHomeShow from "../../components/categoryProducts/CategoryProductsHomeShow";
import categoryData from "../../data/ourData/CategoryProductsHomeShow.json";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Link } from "react-router-dom";

const CategoryProductsHome = ({ spaceBottomClass, categoryName }) => {
    const categoriesItems = categoryData.filter(
        (item) => item.category === categoryName
    );
    console.log(categoriesItems);

    return (
        <div className={clsx("container mb-8", spaceBottomClass)}>
            <div className="d-flex justify-content-between border-bottom border-color-1 flex-lg-nowrap flex-wrap border-md-down-top-0 border-md-down-bottom-0 mb-3 rtl">
                <h3 className="section-title section-title__full mb-0 pb-2 font-size-22">
                    {categoryName}
                </h3>
                <Link to="#" className="d-block text-gray-16">
                    Go To ALL PRODUCTS <MdKeyboardDoubleArrowRight />
                </Link>
            </div>
            <div className="row rtl">
                <div className="col-12 col-md-2">
                    <Link to="#" className="d-block">
                        <img
                            src="https://youmats-media.s3.me-central-1.amazonaws.com/65077/conversions/Fire-Pumps-size_200_300.webp"
                            alt=""
                            className="img-fluid img_main_block"
                            width={300}
                        />
                    </Link>
                </div>
                <div className="col-12 col-md-10 pl-md-0">
                    <ul className="row list-unstyled products-group no-gutters">
                        {categoriesItems?.map((single, index) => {
                            if (index < 5) {
                                return (
                                    <li
                                        className="col-6 col-md-2 col-xl-2 product-item"
                                        key={single.id}
                                    >
                                        <CategoryProductsHomeShow
                                            data={single}
                                        />
                                    </li>
                                );
                            }
                            return null; // Return null if index >= 5
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

CategoryProductsHome.propTypes = {
    spaceBottomClass: PropTypes.string,
    categoryName: PropTypes.string.isRequired,
};

export default CategoryProductsHome;
