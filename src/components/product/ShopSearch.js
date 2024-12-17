import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ShopSearch = ({ getSortParams, getSearchSortParams }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const activeSearch = searchParams.get("search") || "";

    const handleFilter = (value) => {
        const newSearchParams = new URLSearchParams(location.search);
        if (value) {
            newSearchParams.set("search", value);
        } else {
            newSearchParams.delete("search");
        }
        navigate({ search: newSearchParams.toString() });

        getSearchSortParams("search", value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    useEffect(() => {
        if (activeSearch) {
            getSearchSortParams("search", activeSearch); // Update the products based on the search query in the URL
        }
    }, [activeSearch, getSearchSortParams]);
    return (
        <div className="sidebar-widget">
            <h4 className="pro-sidebar-title">Search </h4>
            <div className="pro-sidebar-search mb-50 mt-25">
                <form
                    className="pro-sidebar-search-form"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        value={activeSearch}
                        placeholder="Search here..."
                        onChange={(e) => handleFilter(e.target.value)}
                    />
                    <button>
                        <i className="pe-7s-search" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ShopSearch;
// import { useLocation, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";

// // Debounce utility function to delay the API call or search query update
// const useDebounce = (value, delay) => {
//     const [debouncedValue, setDebouncedValue] = useState(value);

//     useEffect(() => {
//         const handler = setTimeout(() => {
//             setDebouncedValue(value);
//         }, delay);

//         return () => {
//             clearTimeout(handler); // Cleanup the timeout on unmount or value change
//         };
//     }, [value, delay]);

//     return debouncedValue;
// };

// const ShopSearch = ({  getSearchSortParams }) => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const searchParams = new URLSearchParams(location.search);
//     const activeSearch = searchParams.get("search") || "";

//     const [searchTerm, setSearchTerm] = useState(activeSearch);

//     // Use debounce to delay updating the URL
//     const debouncedSearch = useDebounce(searchTerm, 500); // 500ms debounce delay

//     useEffect(() => {
//         if (debouncedSearch !== activeSearch) {
//             // Only update the URL if the debounced search term is different from the current one
//             const newSearchParams = new URLSearchParams(location.search);
//             if (debouncedSearch) {
//                 newSearchParams.set("search", debouncedSearch);
//             } else {
//                 newSearchParams.delete("search");
//             }
//             navigate({ search: newSearchParams.toString() });

//             // Call the parent function to handle the search filter logic
//             getSearchSortParams("search", debouncedSearch);
//         }
//     }, [
//         debouncedSearch,
//         navigate,
//         location.search,
//         activeSearch,
//         getSearchSortParams,
//     ]);

//     const handleChange = (e) => {
//         setSearchTerm(e.target.value); // Update the local state for the search input
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault(); // Prevent form submission (page reload)
//     };

//     return (
//         <div className="sidebar-widget">
//             <h4 className="pro-sidebar-title">Search</h4>
//             <div className="pro-sidebar-search mb-50 mt-25">
//                 <form
//                     className="pro-sidebar-search-form"
//                     onSubmit={handleSubmit}
//                 >
//                     <input
//                         type="text"
//                         value={searchTerm}
//                         placeholder="Search here..."
//                         onChange={handleChange}
//                     />
//                     <button type="submit">
//                         <i className="pe-7s-search" />
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ShopSearch;
