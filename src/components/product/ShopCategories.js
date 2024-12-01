import PropTypes from "prop-types";
import { setActiveSort } from "../../helpers/product";
import { useLocation } from "react-router-dom";
import clsx from "clsx";

const ShopCategories = ({ categories = [], getSortParams }) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const activeCategory = searchParams.get("category");

    return (
        <div className="sidebar-widget">
            <h4 className="pro-sidebar-title">Categories</h4>
            <div className="sidebar-widget-list mt-30">
                {categories.length > 0 ? (
                    <ul>
                        <li>
                            <div className="sidebar-widget-list-left">
                                <button
                                    className={clsx("all-categories", {
                                        active: !activeCategory,
                                    })}
                                    onClick={(e) => {
                                        setActiveSort(e, getSortParams);
                                    }}
                                >
                                    <span className="checkmark" />
                                    All Categories
                                </button>
                            </div>
                        </li>
                        {categories.map((category, key) => (
                            <li key={key}>
                                <div className="sidebar-widget-list-left">
                                    <button
                                        className={clsx({
                                            active: activeCategory === category,
                                        })}
                                        onClick={(e) => {
                                            setActiveSort(e, getSortParams);
                                        }}
                                    >
                                        <span className="checkmark" />
                                        {category}
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No categories found</p>
                )}
            </div>
        </div>
    );
};

ShopCategories.propTypes = {
    categories: PropTypes.array.isRequired, // Make categories required
    getSortParams: PropTypes.func.isRequired, // Ensure getSortParams is required
};

export default ShopCategories;
