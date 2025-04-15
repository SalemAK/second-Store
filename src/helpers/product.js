// get products
export const getProducts = (products, category, type, limit) => {
    const finalProducts = category ? products.filter((product) => product.category.filter((single) => single === category)[0]) : products;

    if (type && type === "new") {
        const newProducts = finalProducts.filter((single) => single.new);
        return newProducts.slice(0, limit ? limit : newProducts.length);
    }
    if (type && type === "bestSeller") {
        return finalProducts
            .sort((a, b) => {
                return b.saleCount - a.saleCount;
            })
            .slice(0, limit ? limit : finalProducts.length);
    }
    if (type && type === "saleItems") {
        const saleItems = finalProducts.filter((single) => single.discount && single.discount > 0);
        return saleItems.slice(0, limit ? limit : saleItems.length);
    }
    return finalProducts.slice(0, limit ? limit : finalProducts.length);
};

// get product discount price
export const getDiscountPrice = (price, discount) => {
    return discount && discount > 0 ? price - price * (discount / 100) : null;
};

// get product cart quantity
export const getProductCartQuantity = (cartItems, product, color, size) => {
    let productInCart = cartItems.find((single) => single.id === product.id && (single.selectedProductColor ? single.selectedProductColor === color : true) && (single.selectedProductSize ? single.selectedProductSize === size : true));
    if (cartItems.length >= 1 && productInCart) {
        if (product.variation) {
            return cartItems.find((single) => single.id === product.id && single.selectedProductColor === color && single.selectedProductSize === size).quantity;
        } else {
            return cartItems.find((single) => product.id === single.id).quantity;
        }
    } else {
        return 0;
    }
};

export const cartItemStock = (item, size) => {
    if (item.stock) {
        return item.stock;
    } else {
        return item.variation[0].size.filter((single) => single.name === size)[0].stock;
    }
};

//get products based on category
export const getSortedProducts = (products, sortType, sortValue, max) => {
    if (!products || !sortType || sortValue == null) return products; // Early exit if invalid inputs

    const getEffectivePrice = (product) => {
        const basePrice = product?.variation?.[0]?.size?.[0]?.price ?? 0;
        const discount = product?.discount ?? 0;
        return discount > 0 ? basePrice - (basePrice * discount) / 100 : basePrice;
    };

    // Filter by Category
    if (sortType === "category" && sortValue) {
        const selectedCategories = Array.isArray(sortValue) ? sortValue : sortValue.split(","); // Handle array or string
        return products.filter((product) => selectedCategories.some((category) => product.category.includes(category)));
    }

    // Filter by Tag
    if (sortType === "tag" && sortValue) {
        return products.filter((product) => product.tag.includes(sortValue));
    }

    // Filter by Color
    if (sortType === "color" && sortValue) {
        return products.filter((product) => product.variation?.some((variation) => variation.color === sortValue));
    }

    // Filter by Size
    if (sortType === "size" && sortValue) {
        return products.filter((product) => product.variation?.some((variation) => variation.size?.some((size) => size.name === sortValue)));
    }

    // Sorting Products based on price or new arrivals
    if (sortType === "filterSort") {
        let sortedProducts = [...products]; // Copy to avoid mutation

        if (sortValue === "default") {
            return sortedProducts; // Return unsorted
        }

        if (sortValue === "priceHighToLow") {
            return sortedProducts.sort((a, b) => getEffectivePrice(b) - getEffectivePrice(a));
        }

        if (sortValue === "priceLowToHigh") {
            return sortedProducts.sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b));
        }

        if (sortValue === "NewestArrivals") {
            return sortedProducts.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
        }
    }

    // Search Filter
    if (sortType === "search" && sortValue) {
        return products.filter((product) => product.name.toLowerCase().includes(sortValue.toLowerCase()) || product.category.some((cat) => cat.toLowerCase().includes(sortValue.toLowerCase())));
    }

    // Price Range Filter
    if (sortType === "price" && sortValue != null && max != null) {
        return products.filter((product) => {
            // Safely access price with optional chaining
            const price = product?.variation?.[0]?.size?.[0]?.price;

            // Exclude products with missing, null, or invalid prices
            if (price == null) return false;

            // Filter products strictly within the price range
            return price >= sortValue && price <= max;
        });
    }

    // Default return - if no filters applied
    return products;
};

// get individual element
const getIndividualItemArray = (array) => {
    let individualItemArray = array.filter(function (v, i, self) {
        return i === self.indexOf(v);
    });
    return individualItemArray;
};

// get individual categories
export const getIndividualCategories = (products) => {
    let productCategories = [];
    products &&
        products.map((product) => {
            return (
                product.category &&
                product.category.map((single) => {
                    return productCategories.push(single);
                })
            );
        });
    const individualProductCategories = getIndividualItemArray(productCategories);
    return individualProductCategories;
};

// get individual tags
export const getIndividualTags = (products) => {
    let productTags = [];
    products &&
        products.map((product) => {
            return (
                product.tag &&
                product.tag.map((single) => {
                    return productTags.push(single);
                })
            );
        });
    const individualProductTags = getIndividualItemArray(productTags);
    return individualProductTags;
};

// get individual colors
export const getIndividualColors = (products) => {
    let productColors = [];
    products &&
        products.map((product) => {
            return (
                product.variation &&
                product.variation.map((single) => {
                    return productColors.push(single.color);
                })
            );
        });
    const individualProductColors = getIndividualItemArray(productColors);
    return individualProductColors;
};

// get individual sizes
export const getProductsIndividualSizes = (products) => {
    let productSizes = [];
    products &&
        products.map((product) => {
            return (
                product.variation &&
                product.variation.map((single) => {
                    return single.size.map((single) => {
                        return productSizes.push(single.name);
                    });
                })
            );
        });
    const individualProductSizes = getIndividualItemArray(productSizes);
    return individualProductSizes;
};

// get product individual sizes
export const getIndividualSizes = (product) => {
    let productSizes = [];
    product.variation &&
        product.variation.map((singleVariation) => {
            return (
                singleVariation.size &&
                singleVariation.size.map((singleSize) => {
                    return productSizes.push(singleSize.name);
                })
            );
        });
    const individualSizes = getIndividualItemArray(productSizes);
    return individualSizes;
};

export const setActiveSort = (e, getSortParams, newSearchParams, navigate) => {
    const allCategoriesButton = document.querySelector(".all-categories");
    const filterButtons = document.querySelectorAll(".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button");

    // If the clicked button is "All Categories" and already active, do nothing
    if (e.currentTarget.classList.contains("all-categories")) {
        if (!e.currentTarget.classList.contains("active")) {
            filterButtons.forEach((item) => {
                item.classList.remove("active");
            });
            allCategoriesButton.classList.add("active");
            getSortParams("category", ""); // Reset the category filter to show all products

            return;
        } // Prevent unchecking "All Categories"
    }

    // If the clicked button already has the "active" class, remove it
    if (e.currentTarget.classList.contains("active")) {
        e.currentTarget.classList.remove("active");
        // Trigger the reset to "All Categories"
        allCategoriesButton.classList.add("active");
        newSearchParams.delete("category");
        navigate({ search: newSearchParams.toString() });

        getSortParams("category", ""); // Reset the category filter to show all products
    } else {
        // Remove "active" class from all buttons
        filterButtons.forEach((item) => {
            item.classList.remove("active");
        });

        // Add "active" class to the clicked button
        e.currentTarget.classList.add("active");

        // Update the category filter
        const category = e.currentTarget.textContent.trim();
        getSortParams("category", category);
    }
};

export const setActiveLayout = (e) => {
    const gridSwitchBtn = document.querySelectorAll(".shop-tab button");
    gridSwitchBtn.forEach((item) => {
        item.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
};

export const toggleShopTopFilter = (e) => {
    const shopTopFilterWrapper = document.querySelector("#product-filter-wrapper");
    shopTopFilterWrapper.classList.toggle("active");
    if (shopTopFilterWrapper.style.height) {
        shopTopFilterWrapper.style.height = null;
    } else {
        shopTopFilterWrapper.style.height = shopTopFilterWrapper.scrollHeight + "px";
    }
    e.currentTarget.classList.toggle("active");
};
