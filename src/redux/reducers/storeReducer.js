import { GET_ALL_STORES, ACCEPT_STORE, REJECT_STORE } from '../actions/storeActions';

const initialState = {
    isAuthorized: false,
    stores: [],
    error: null,
};

const storeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_STORES:
            return {
                ...state,
                stores: action.payload,  // Cập nhật danh sách các cửa hàng
                error: null,
                isAuthorized: true,
            };
        case ACCEPT_STORE:
        case REJECT_STORE:
            return {
                ...state,
                stores: state.stores.map(store =>
                    store._id === action.payload._id ? action.payload : store  // Dùng _id để xác định cửa hàng đúng
                ),
                error: null,
            };
        default:
            return state;
    }
};

export default storeReducer;
