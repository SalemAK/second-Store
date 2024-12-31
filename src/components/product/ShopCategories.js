import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";

const ShopCategories = ({ categories = [], getSortParams }) => {
    const location = useLocation();
    const navigate = useNavigate();

    // Parse the URL query to get selected categories as an array
    const searchParams = new URLSearchParams(location.search);
    const activeCategories = searchParams.get("category")
        ? searchParams.get("category").split(",")
        : [];

    // Handle category toggle (add/remove categories)
    const handleCategoryClick = (category, e) => {
        const newSearchParams = new URLSearchParams(location.search);
        let updatedCategories;

        if (activeCategories.includes(category)) {
            // Remove category if already selected
            updatedCategories = activeCategories.filter((c) => c !== category);
        } else {
            // Add category if not selected
            updatedCategories = [...activeCategories, category];
        }

        // Update the URL query string with the new categories
        if (updatedCategories.length > 0) {
            newSearchParams.set("category", updatedCategories.join(","));
        } else {
            newSearchParams.delete("category");
        }

        navigate({ search: newSearchParams.toString() });

        // Update sort params (for product filtering)
        getSortParams("category", updatedCategories);
    };

    return (
        <div className="sidebar-widget">
            <h4 className="pro-sidebar-title">Categories</h4>
            <div className="sidebar-widget-list mt-30">
                {categories.length > 0 ? (
                    <ul>
                        {categories.map((category, key) => (
                            <li key={key}>
                                <div className="sidebar-widget-list-left">
                                    <button
                                        className={clsx({
                                            active: activeCategories.includes(
                                                category
                                            ),
                                        })}
                                        onClick={(e) =>
                                            handleCategoryClick(category, e)
                                        }
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
