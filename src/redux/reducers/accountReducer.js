import { produce } from 'immer';
import { ACCOUNT_INFO, UPDATE_ACCOUNT_INFO } from "../actions/storeActions";

const initialState = {
    accountInfo: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACCOUNT_INFO:
            return {
                ...state,
                accountInfo: action.payload,
                isAuthenticated: true,
                loading: false,
                error: null,
            };
        case UPDATE_ACCOUNT_INFO:
            return {
                ...state,
                accountInfo: action.payload,
                isAuthenticated: true,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
};

export default accountReducer;