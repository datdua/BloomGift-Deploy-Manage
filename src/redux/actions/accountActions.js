import axios from "axios";

export const GET_ALL_ACCOUNTS = "GET_ALL_ACCOUNTS";
export const GET_ACCOUNT_BY_ID = "GET_ACCOUNT_BY_ID";
export const CREATE_ACCOUNT = "CREATE_ACCOUNT";
export const UPDATE_ACCOUNT = "UPDATE_ACCOUNT";

export const getAllAccounts = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`https://bloomgift2-hkdra9cyapase2cy.southeastasia-01.azurewebsites.net/api/admin/accounts-management/list-all-account`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            dispatch({
                type: GET_ALL_ACCOUNTS,
                payload: response.data
            });
        } catch (error) {
            console.error("Get all accounts failed:", error);
        }
    }
}