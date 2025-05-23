import { v4 as uuidv4 } from "uuid";
import cogoToast from "cogo-toast";
const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
    },
    reducers: {
        // addToCart(state, action) {
        //     const product = action.payload;
        //     if (!product.variation) {
        //         const cartItem = state.cartItems.find((item) => item.id === product.id);
        //         if (!cartItem) {
        //             state.cartItems.push({
        //                 ...product,
        //                 quantity: product.quantity ? product.quantity : 1,
        //                 cartItemId: uuidv4(),
        //             });
        //         } else {
        //             state.cartItems = state.cartItems.map((item) => {
        //                 if (item.cartItemId === cartItem.cartItemId) {
        //                     return {
        //                         ...item,
        //                         quantity: product.quantity ? item.quantity + product.quantity : item.quantity + 1,
        //                     };
        //                 }
        //                 return item;
        //             });
        //         }
        //     } else {
        //         const cartItem = state.cartItems.find(
        //             (item) =>
        //                 item.id === product.id &&
        //                 // product.selectedProductColor &&
        //                 // product.selectedProductColor ===
        //                 //     item.selectedProductColor &&
        //                 product.selectedProductSize &&
        //                 product.selectedProductSize === item.selectedProductSize &&
        //                 product.selectedProductPrice &&
        //                 product.selectedProductPrice === item.selectedProductPrice &&
        //                 (product.cartItemId ? product.cartItemId === item.cartItemId : true)
        //         );
        //         if (!cartItem) {
        //             state.cartItems.push({
        //                 ...product,
        //                 quantity: product.quantity ? product.quantity : 1,
        //                 cartItemId: uuidv4(),
        //             });
        //         } else if (cartItem !== undefined && (cartItem.selectedProductPrice !== product.selectedProductPrice || cartItem.selectedProductColor !== product.selectedProductColor || cartItem.selectedProductSize !== product.selectedProductSize)) {
        //             state.cartItems = [
        //                 ...state.cartItems,
        //                 {
        //                     ...product,
        //                     quantity: product.quantity ? product.quantity : 1,
        //                     cartItemId: uuidv4(),
        //                 },
        //             ];
        //         } else {
        //             state.cartItems = state.cartItems.map((item) => {
        //                 if (item.cartItemId === cartItem.cartItemId) {
        //                     return {
        //                         ...item,
        //                         quantity: product.quantity ? item.quantity + product.quantity : item.quantity + 1,
        //                         selectedProductColor: product.selectedProductColor,
        //                         selectedProductSize: product.selectedProductSize,
        //                         selectedProductPrice: product.selectedProductPrice,
        //                     };
        //                 }
        //                 return item;
        //             });
        //         }
        //     }

        //     cogoToast.success("Added To Cart", { position: "bottom-left" });
        // },
        // addToCart(state, action) {
        //     const product = action.payload;
        //     const quantityToAdd = product.quantity ? product.quantity : 1;

        //     if (!product.variation) {
        //         const cartItem = state.cartItems.find((item) => item.id === product.id);

        //         if (!cartItem) {
        //             // Add new product to cart
        //             state.cartItems.push({
        //                 ...product,
        //                 quantity: quantityToAdd,
        //                 cartItemId: uuidv4(),
        //             });
        //         } else {
        //             // Update quantity of existing product
        //             state.cartItems = state.cartItems.map((item) => (item.cartItemId === cartItem.cartItemId ? { ...item, quantity: item.quantity + quantityToAdd } : item));
        //         }
        //     } else {
        //         // Handling Variations (Color, Size, Price)
        //         const cartItem = state.cartItems.find(
        //             (item) => item.id === product.id && product.selectedProductSize === item.selectedProductSize && product.selectedProductPrice === item.selectedProductPrice && (product.cartItemId ? product.cartItemId === item.cartItemId : true)
        //         );

        //         if (!cartItem) {
        //             state.cartItems.push({
        //                 ...product,
        //                 quantity: quantityToAdd,
        //                 cartItemId: uuidv4(),
        //             });
        //         } else {
        //             state.cartItems = state.cartItems.map((item) =>
        //                 item.cartItemId === cartItem.cartItemId
        //                     ? {
        //                           ...item,
        //                           quantity: item.quantity + quantityToAdd,
        //                           //   selectedProductColor: product.selectedProductColor,
        //                           selectedProductSize: product.selectedProductSize,
        //                           selectedProductPrice: product.selectedProductPrice,
        //                       }
        //                     : item
        //             );
        //         }
        //     }

        //     cogoToast.success("Added To Cart", { position: "bottom-left" });
        // },
        addToCart(state, action) {
            const product = action.payload;
            const quantityToAdd = product.quantity ? product.quantity : 1;

            if (!product.variation) {
                const cartItem = state.cartItems.find((item) => item.id === product.id);

                if (!cartItem) {
                    state.cartItems.push({
                        ...product,
                        quantity: quantityToAdd,
                        cartItemId: uuidv4(),
                    });
                } else {
                    cartItem.quantity += quantityToAdd; // Just increase by `quantityToAdd`
                }
            } else {
                const cartItem = state.cartItems.find((item) => item.id === product.id && item.selectedProductSize === product.selectedProductSize && item.selectedProductPrice === product.selectedProductPrice);

                if (!cartItem) {
                    state.cartItems.push({
                        ...product,
                        quantity: quantityToAdd,
                        cartItemId: uuidv4(),
                    });
                } else {
                    cartItem.quantity += quantityToAdd; // Just increase by `quantityToAdd`
                }
            }
        },
        setQuantity(state, action) {
            const { id, selectedProductSize, quantity } = action.payload;

            const cartItem = state.cartItems.find((item) => item.id === id && item.selectedProductSize === selectedProductSize);

            if (cartItem) {
                cartItem.quantity = quantity; // Directly set the new quantity
            }
        },

        deleteFromCart(state, action) {
            state.cartItems = state.cartItems.filter((item) => item.cartItemId !== action.payload);
            cogoToast.error("Removed From Cart", { position: "bottom-left" });
        },
        removeFromCart(state, action) {
            const { id, selectedProductColor, selectedProductSize } = action.payload;

            // Filter out the matching product
            state.cartItems = state.cartItems.filter((item) => !(item.id === id && item.selectedProductColor === selectedProductColor && item.selectedProductSize === selectedProductSize));

            // Optional: Show toast notification
            cogoToast.error("Removed From Cart", {
                position: "bottom-left",
            });
        },
        decreaseQuantity(state, action) {
            const product = action.payload;
            if (product.quantity <= 1) {
                cogoToast.warn("Quantity cannot be less than 1", {
                    position: "bottom-left",
                });
                return;
                // state.cartItems = state.cartItems.filter(
                //     (item) => item.cartItemId !== product.cartItemId
                // );
                // cogoToast.error("Removed From Cart", {
                //     position: "bottom-left",
                // });
            } else {
                state.cartItems = state.cartItems.map((item) => (item.cartItemId === product.cartItemId ? { ...item, quantity: item.quantity - 1 } : item));
                cogoToast.warn("Item Decremented From Cart", {
                    position: "bottom-left",
                });
            }
        },
        deleteAllFromCart(state) {
            state.cartItems = [];
        },
    },
});

export const { addToCart, deleteFromCart, decreaseQuantity, deleteAllFromCart, removeFromCart, setQuantity } = cartSlice.actions;
export default cartSlice.reducer;
