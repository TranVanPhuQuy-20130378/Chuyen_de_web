import {
    checkItemExistCart,
    loadCartFromLocalStorage,
    totalPrice
} from "../../javascript/utils/Utils_Tuyen"
import {DECREASE_QUANTITY, INCREASE_QUANTITY} from "./Action_quy";

const initCartState = {
    /* đây là trạng thái ban đầu của giỏ hàng */
    cart: loadCartFromLocalStorage() === null ? [] : loadCartFromLocalStorage(),
    totalPrice: localStorage.getItem('total-price') === null ? 0 : localStorage.getItem('total-price'),
    discount_percent: 0 // % giảm giá của đơn hàng
}

const initModalState = {
    modal_payment: false,
    modal_paypal: false
}

const initPaymentState = {
    payment_with_paypal: false,
    payment_with_momo: false,
    payment_with_viettelpay: false,
    payment_with_nganluong: false,
    payment: false
}

export const cartReducer = (state = initCartState, action) => {

    /* Đây là Reducer, một hàm xử lý các hành động (actions) để cập nhật trạng thái của ứng dụng */
    switch (action.type) {

        case 'cart/add-item': {
            const existingItem = state.cart.find(item => item.id === action.payload.id);
            const updatedCart = existingItem
                ? state.cart.map(item =>
                    item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
                )
                : [...state.cart, { ...action.payload, quantity: 1 }];

            localStorage.setItem('cart', JSON.stringify(updatedCart));
            const newTotalPrice = totalPrice(updatedCart);
            localStorage.setItem('total-price', JSON.stringify(newTotalPrice));

            return {
                ...state,
                cart: updatedCart,
                totalPrice: newTotalPrice
            };
        }
        case 'cart/remove-item': {

            // console.log("Day la Action cart/remove-item");

            const updatedCart = state.cart.filter(item => item.id !== action.payload.id); /* loại bỏ các phần tử có id trùng khớp với id của action.payload */
            // => tạo ra mảng mới
            localStorage.setItem('cart', JSON.stringify(updatedCart)); // Dữ liệu trong Local Storage không có hạn chế về thời gian sống và sẽ được giữ lại sau khi bạn đóng trình duyệt. Điều này có nghĩa là dữ liệu vẫn sẽ tồn tại ngay cả khi người dùng tắt trình duyệt hoặc khởi động lại máy tính.

            // console.log("Object cart", updatedCart);

            const newTotalPrice = totalPrice(updatedCart);
            localStorage.setItem('total-price', JSON.stringify(newTotalPrice));


            return {
                ...state, // sao chép trạng thái hiện tại
                cart: updatedCart, // cập nhật số lượng sản phẩm trong giỏ hàng
                totalPrice: newTotalPrice // => tổng giá trị mới của giỏ hàng
            }
        }

        case 'cart/update-discount-percent': {
            // console.log("Day la Action cart/update-discount-percent");

            return {
                ...state,
                discount_percent: action.payload
            }
        }

        case 'cart/reset': {

            const updateCart = [];
            const newTotalPrice = 0;
            localStorage.setItem('cart', JSON.stringify(updateCart));
            localStorage.setItem('total-price', JSON.stringify(newTotalPrice));

            return {
                ...state,
                cart: updateCart,
                totalPrice: newTotalPrice,
                discount_percent: 0
            }
        }

        case INCREASE_QUANTITY: {
            const updatedCart = state.cart.map(item =>
                item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            const newTotalPrice = totalPrice(updatedCart);
            localStorage.setItem('total-price', JSON.stringify(newTotalPrice));
            return {
                ...state,
                cart: updatedCart,
                totalPrice: newTotalPrice
            };
        }

        case DECREASE_QUANTITY: {
            const updatedCart = state.cart.map(item =>
                item.id === action.payload.id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
            );
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            const newTotalPrice = totalPrice(updatedCart);
            localStorage.setItem('total-price', JSON.stringify(newTotalPrice));
            return {
                ...state,
                cart: updatedCart,
                totalPrice: newTotalPrice
            };
        }

        default :
            return state;

        /**
         Đây là trường hợp mặc định của switch case.
         Nếu hành động không khớp với bất kỳ trường hợp nào đã được xác định,
         reducer sẽ trả về trạng thái hiện tại mà không có sự thay đổi.
         */

    }

}

export const discountCodeReducer = (state = {code: ''}, action) => {

    switch (action.type) {
        case 'discountCode/update-code': {
            return {
                ...state,
                code: action.payload
            }
        }
        default:
            return state
    }
}

export const modalReducer = (state = initModalState, action) => {
    switch (action.type) {
        case'modal/show-modal-payment': {
            return {
                ...state,
                modal_payment: action.payload
            }
        }
        case'modal/close-modal-payment': {
            return {
                ...state,
                modal_payment: action.payload
            }
        }
        case'modal/show-modal-paypal': {
            return {
                ...state,
                modal_paypal: action.payload
            }
        }
        case'modal/close-modal-paypal': {
            return {
                ...state,
                modal_paypal: action.payload
            }
        }
        default:
            return state
    }
}

export const paymentReducer = (state = initPaymentState, action) => {
    switch (action.type) {

        case 'payment/paypal': {
            console.log('Đây là Action updateStatePayment: ', action.payload)
            return {
                ...state,
                payment_with_paypal: true,
                payment: true
            }
        }
        case 'payment/momo': {
            console.log('Đây là Action updateStatePayment: ', action.payload)
            return {
                ...state,
                payment_with_momo: true,
                payment: true
            }
        }
        case 'payment/viettelpay': {
            console.log('Đây là Action updateStatePayment: ', action.payload)
            return {
                ...state,
                payment_with_viettelpay: true,
                payment: true
            }
        }
        case 'payment/nganluong': {
            console.log('Đây là Action updateStatePayment: ', action.payload)
            return {
                ...state,
                payment_with_nganluong: true,
                payment: true
            }
        }

        case 'payment/reset': {
            console.log('Đây là Action updateStatePayment: ', action.payload)
            return {
                ...state,
                payment_with_paypal: false,
                payment_with_momo: false,
                payment_with_viettelpay: false,
                payment_with_nganluong: false,
                payment: false
            }
        }
        default:
            return state;
    }
}