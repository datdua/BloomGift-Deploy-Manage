import { GET_ALL_ACCOUNTS } from "../actions/accountActions";

const initState = {
    accounts: [],
    isAuthenticated: false,
};

const customerReducer = (state = initState, action) => {
    if (action.type === GET_ALL_ACCOUNTS) {
        return {
            ...state,
            accounts: action.payload,
            isAuthenticated: true,
        };
    }

    return state;
}

export default customerReducer;