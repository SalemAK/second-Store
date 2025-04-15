// import { useState, useEffect } from "react";
// import { addToCart, decreaseQuantity, setQuantity } from "../../store/slices/cart-slice";
// function CartItemInput({ cartItem, cartItemStock, dispatch }) {
//     const [quantity, setQuantity] = useState(cartItem.quantity);
//     const [quantityCount] = useState(1);

//     // Ensure the input value is within valid range on mount
//     useEffect(() => {
//         setQuantity(cartItem.quantity);
//     }, [cartItem.quantity]);

//     // const handleChange = (e) => {
//     //     let value = parseInt(e.target.value, 10); // Ensure it's a number

//     //     // If value is invalid or less than 1, reset to 1
//     //     if (isNaN(value) || value < 1) {
//     //         setQuantity(1);
//     //         return;
//     //     }

//     //     const maxStock = cartItemStock(cartItem, cartItem.selectedProductSize);

//     //     // Restrict to max stock
//     //     if (value > maxStock) {
//     //         setQuantity(maxStock);
//     //     } else {
//     //         setQuantity(value);
//     //     }

//     //     dispatch(addToCart({ ...cartItem, quantity: value }));
//     // };
//     const handleChange = (e) => {
//         let value = parseInt(e.target.value, 10);

//         if (isNaN(value) || value < 1) {
//             value = 1;
//         }

//         const maxStock = cartItemStock(cartItem, cartItem.selectedProductSize);
//         if (value > maxStock) {
//             value = maxStock;
//         }

//         // Dispatch action to update Redux store quantity correctly
//         dispatch(
//             setQuantity({
//                 id: cartItem.id,
//                 selectedProductSize: cartItem.selectedProductSize,
//                 quantity: value,
//             })
//         );
//     };
//     return (
//         <div className="d-flex align-items-center">
//             <button onClick={() => dispatch(decreaseQuantity(cartItem))} className="btn btn-sm btn-outline-secondary me-2">
//                 -
//             </button>
//             <input
//                 className="form-control text-center"
//                 type="text"
//                 value={quantity}
//                 onChange={handleChange} // Update quantity while typing
//             />
//             <button className="btn btn-sm btn-outline-secondary ms-2" onClick={() => dispatch(addToCart({ ...cartItem, quantity: 1 }))} disabled={quantity >= cartItemStock(cartItem, cartItem.selectedProductSize)}>
//                 +
//             </button>
//         </div>
//     );
// }
// export default CartItemInput;
// // import { useState, useEffect } from "react";
// // import { addToCart, decreaseQuantity } from "../../store/slices/cart-slice";

// // function CartItemInput({ cartItem, cartItemStock, dispatch }) {
// //     const maxStock = cartItemStock(cartItem, cartItem.selectedProductSize);
// //     const [quantity, setQuantity] = useState(cartItem.quantity);

// //     useEffect(() => {
// //         setQuantity(cartItem.quantity);
// //     }, [cartItem.quantity]);

// //     const handleChange = (e) => {
// //         let value = parseInt(e.target.value, 10);

// //         if (isNaN(value) || value < 1) {
// //             value = 1;
// //         } else if (value > maxStock) {
// //             value = maxStock;
// //         }

// //         setQuantity(value);
// //         dispatch(addToCart({ ...cartItem, quantity: value })); // Sync with Redux
// //     };

// //     return (
// //         <div className="d-flex align-items-center">
// //             <button onClick={() => dispatch(decreaseQuantity(cartItem))} className="btn btn-sm btn-outline-secondary me-2" disabled={quantity <= 1}>
// //                 -
// //             </button>
// //             <input className="form-control text-center" type="number" value={quantity} onChange={handleChange} />
// //             <button className="btn btn-sm btn-outline-secondary ms-2" onClick={() => dispatch(addToCart({ ...cartItem, quantity: 1 }))} disabled={quantity >= maxStock}>
// //                 +
// //             </button>
// //         </div>
// //     );
// // }

// // export default CartItemInput;
import { useState, useEffect } from "react";
import { addToCart, decreaseQuantity, setQuantity } from "../../store/slices/cart-slice";

function CartItemInput({ cartItem, cartItemStock, dispatch }) {
    const [quantity, setQuantityState] = useState(cartItem.quantity);

    // Ensure the input value is within valid range on mount
    useEffect(() => {
        setQuantityState(cartItem.quantity);
    }, [cartItem.quantity]);

    const handleChange = (e) => {
        let value = parseInt(e.target.value, 10);

        // If value is invalid or less than 1, reset to 1
        if (isNaN(value) || value < 1) {
            value = 1;
        }

        const maxStock = cartItemStock(cartItem, cartItem.selectedProductSize);

        // Restrict to max stock
        if (value > maxStock) {
            value = maxStock;
        }

        setQuantityState(value);

        // Dispatch action to update Redux store quantity correctly
        dispatch(
            setQuantity({
                id: cartItem.id,
                selectedProductSize: cartItem.selectedProductSize,
                quantity: value,
            })
        );
    };

    return (
        <div className="d-flex align-items-center">
            <button onClick={() => dispatch(decreaseQuantity(cartItem))} className="btn btn-sm btn-outline-secondary me-2">
                -
            </button>
            <input
                className="form-control text-center "
                style={{ width: "45%", height: "35px" }}
                type="text"
                value={quantity}
                onChange={handleChange} // Update quantity while typing
            />
            <button className="btn btn-sm btn-outline-secondary ms-2" onClick={() => dispatch(addToCart({ ...cartItem, quantity: 1 }))} disabled={quantity >= cartItemStock(cartItem, cartItem.selectedProductSize)}>
                +
            </button>
        </div>
    );
}

export default CartItemInput;
