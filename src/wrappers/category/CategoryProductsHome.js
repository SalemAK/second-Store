import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import CategoryProductsHomeShow from "../../components/categoryProducts/CategoryProductsHomeShow";
import itemsData from "../../data/ourData/CategoryProductsHomeShow.json";
import categoryData from "../../data/ourData/Category.json";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Link } from "react-router-dom";

const CategoryProductsHome = ({ spaceBottomClass }) => {
    return (
        <>
            {categoryData.map((category) => {
                if (category.show) {
                    const filteredItems = itemsData
                        .filter((item) => item.category === category.name)
                        .slice(0, 5);
                    return (
                        <div
                            className={clsx("container mb-8", spaceBottomClass)}
                            key={category.id}
                        >
                            <div className="d-flex justify-content-between border-bottom border-color-1 flex-lg-nowrap flex-wrap border-md-down-top-0 border-md-down-bottom-0 mb-3 rtl">
                                <h3 className="section-title section-title__full mb-0 pb-2 font-size-22">
                                    {category.name}
                                </h3>
                                <Link
                                    to={`/products/${category.id}`}
                                    className="d-block text-gray-16"
                                >
                                    Go To ALL PRODUCTS
                                    <MdKeyboardDoubleArrowRight />
                                </Link>
                            </div>
                            <div className="row rtl">
                                <div className="col-12 col-md-2 ">
                                    <Link
                                        to={`/products/${category.id}`}
                                        className="d-block "
                                    >
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className=" img-fluid my-brand-image "
                                            width={200}
                                        />
                                    </Link>
                                </div>
                                <div className="col-12 col-md-10 pl-md-0">
                                    <ul className="row list-unstyled products-group no-gutters">
                                        {filteredItems?.map((single) => {
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
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    );
                }
            })}
        </>
    );
};

CategoryProductsHome.propTypes = {
    spaceBottomClass: PropTypes.string,
};

export default CategoryProductsHome;
