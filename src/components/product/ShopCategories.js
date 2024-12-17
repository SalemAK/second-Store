import PropTypes from "prop-types";
import { setActiveSort } from "../../helpers/product";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import clsx from "clsx";

const ShopCategories = ({ categories = [], getSortParams }) => {
    const location = useLocation();
    const navigate = useNavigate(); // Initialize navigate
    const searchParams = new URLSearchParams(location.search);
    const activeCategory = searchParams.get("category") || "";

    const handleCategoryClick = (category, e) => {
        const newSearchParams = new URLSearchParams(location.search);

        if (category) {
            // Set the category filter in the query string
            newSearchParams.set("category", category);
        } else {
            // Remove the category filter if "All Categories" is clicked
            getSortParams("category", "");
            newSearchParams.delete("category");
        }

        // Update the URL with the new query string
        navigate({ search: newSearchParams.toString() });

        // Call setActiveSort function (handle active state for buttons)
        setActiveSort(e, getSortParams, newSearchParams, navigate);
    };

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
                                        active: !activeCategory, // Active if no category is selected
                                    })}
                                    onClick={(e) => handleCategoryClick("", e)} // Handle All Categories click
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
                                            active: activeCategory === category, // Mark the active category
                                        })}
                                        onClick={(e) =>
                                            handleCategoryClick(category, e)
                                        } // Handle individual category click
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
    categories: PropTypes.array.isRequired,
    getSortParams: PropTypes.func.isRequired,
};

export default ShopCategories;
