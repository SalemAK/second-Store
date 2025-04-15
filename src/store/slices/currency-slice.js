const { createSlice } = require("@reduxjs/toolkit");

const currencySlice = createSlice({
    name: "currency",
    initialState: {
        currencySymbol: "/assets/img/Saudi_Riyal_Symbol-1.png",
        currencyName: "SAR",
        currencyRate: 1,
    },
    reducers: {
        setCurrency(state, action) {
            const currencyName = action.payload;

            if (currencyName === "USD") {
                return (state = {
                    currencySymbol: "$",
                    currencyRate: 1,
                    currencyName,
                });
            }
            if (currencyName === "SAR") {
                return (state = {
                    currencySymbol: "/assets/img/Saudi_Riyal_Symbol-1.png",
                    currencyRate: 1,
                    currencyName,
                });
            }
            if (currencyName === "GBP") {
                return (state = {
                    currencySymbol: "£",
                    currencyRate: 1,
                    currencyName,
                });
            }
        },
    },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
