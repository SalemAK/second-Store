import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProductPriceFilter = ({
    initialMinPrice = 0,
    initialMaxPrice = 100,
    getSortParams,
    getSortPrice,
}) => {
    const [minVal, setMinVal] = useState(initialMinPrice);
    const [maxVal, setMaxVal] = useState(initialMaxPrice);
    const sliderTrack = useRef();
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);

    const activeLowPrice = searchParams.get("low-price");
    const activeHighPrice = searchParams.get("high-price");

    useEffect(() => {
        if (activeLowPrice) {
            setMinVal(Number(activeLowPrice));
        }
        if (activeHighPrice) {
            setMaxVal(Number(activeHighPrice));
        }
    }, [location.search]);

    // Helper function to handle price change and update URL search params
    const handlePriceChange = (key, value, setValue) => {
        const newSearchParams = new URLSearchParams(location.search);
        if (value) {
            newSearchParams.set(key, value);
        } else {
            newSearchParams.delete(key);
        }
        navigate({ search: newSearchParams.toString() });
        setValue(Number(value)); // Update local state
    };

    // Handle changes to the min price
    const handleLowPrice = (e) => {
        let value = Number(e.target.value);
        if (value > maxVal - 5) {
            value = maxVal - 5; // Ensure min price is not greater than max price minus 5
        }
        setMinVal(value);
        handlePriceChange("low-price", value, setMinVal);
    };

    // Handle changes to the max price
    const handleHighPrice = (e) => {
        let value = Number(e.target.value);
        if (value < minVal + 5) {
            value = minVal + 5; // Ensure max price is not less than min price plus 5
        }
        setMaxVal(value);
        handlePriceChange("high-price", value, setMaxVal);
    };

    // Update slider track position and call getSortParams on price change
    useEffect(() => {
        setSliderTrack();
        getSortPrice("price", minVal, maxVal);
    }, [minVal, maxVal]);

    // Update the slider track style based on the price range
    const setSliderTrack = () => {
        const minPercent = (minVal / initialMaxPrice) * 100;
        const maxPercent = (maxVal / initialMaxPrice) * 100;
        if (sliderTrack.current) {
            sliderTrack.current.style.left = `${minPercent}%`;
            sliderTrack.current.style.right = `${100 - maxPercent}%`;
        }
    };

    return (
        <div className="double-slider-box">
            <h4 className="pro-sidebar-title mb-3">Price</h4>
            <div className="input-box">
                <input
                    type="number"
                    value={minVal}
                    onChange={handleLowPrice}
                    min={initialMinPrice}
                    max={maxVal - 5}
                />
                <input
                    type="number"
                    value={maxVal}
                    onChange={handleHighPrice}
                    min={minVal + 5}
                    max={initialMaxPrice}
                />
            </div>
            <div className="range-slider">
                <div className="slider-track" ref={sliderTrack}></div>
                <input
                    type="range"
                    min={initialMinPrice}
                    max={initialMaxPrice}
                    value={minVal}
                    onChange={handleLowPrice}
                />
                <input
                    type="range"
                    min={initialMinPrice}
                    max={initialMaxPrice}
                    value={maxVal}
                    onChange={handleHighPrice}
                />
            </div>
        </div>
    );
};

export default ProductPriceFilter;
