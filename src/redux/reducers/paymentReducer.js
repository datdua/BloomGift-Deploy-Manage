import {
    GET_ALL_PAYMENT,
    GET_PAYMENT_BY_STATUS_TRUE,
    GET_PAYMENT_BY_STATUS_FALSE,
    ACCEPT_PAYMENT,
    REJECT_PAYMENT
} from '../actions/paymentAction'; 

const initialState = {
    payments: [],
    paymentsByStatusTrue: [],
    paymentsByStatusFalse: [],
    error: null,
    isAuthenticated: false,
};

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PAYMENT:
            return {
                ...state,
                payments: action.payload,
                error: null,
                isAuthenticated: true,
            };
        case GET_PAYMENT_BY_STATUS_TRUE:
            return {
                ...state,
                paymentsByStatusTrue: action.payload,
                error: null,
                isAuthenticated: true,
            };
        case GET_PAYMENT_BY_STATUS_FALSE:
            return {
                ...state,
                paymentsByStatusFalse: action.payload,
                error: null,
                isAuthenticated: true,
            };
        case ACCEPT_PAYMENT:
        case REJECT_PAYMENT:
            return {
                ...state,
                payments: state.payments.map(payment =>
                    payment.id === action.payload.id ? action.payload : payment
                ),
                error: null,
            };
        default:
            return state;
    }
};

export default paymentReducer;