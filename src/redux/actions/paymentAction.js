import axios from "axios";
export const GET_ALL_PAYMENT = "GET_ALL_PAYMENT";
export const GET_PAYMENT_BY_STATUS_TRUE = "GET_PAYMENT_BY_STATUS_TRUE";
export const ACCEPT_PAYMENT = "ACCEPT_PAYMENT";
export const REJECT_PAYMENT = "REJECT_PAYMENT";
export const GET_PAYMENT_BY_STATUS_FALSE = "GET_PAYMENT_BY_STATUS_FALSE";


export const fetchAllPayment = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`https://bloomgift2-hkdra9cyapase2cy.southeastasia-01.azurewebsites.net/api/admin/payment/all`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.status !== 200) {
                throw new Error(`Lỗi khi nhận dữ liệu: ${response.status}`);
            }

            dispatch({
                type: GET_ALL_PAYMENT,
                payload: response.data,
            });
        } catch (error) {
            console.error("Fetch all stores failed:", error);
            return Promise.reject(error);
        }
    };
};

export const fetchPaymentByStatusTrue = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`https://bloomgift2-hkdra9cyapase2cy.southeastasia-01.azurewebsites.net/api/admin/payment/get-payment-by-status/true`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.status !== 200) {
                throw new Error(`Lỗi khi nhận dữ liệu: ${response.status}`);
            }

            dispatch({
                type: GET_PAYMENT_BY_STATUS_TRUE,
                payload: response.data,
            });
        } catch (error) {
            console.error("Fetch all stores failed:", error);
            return Promise.reject(error);
        }
    };
};

export const fetchPaymentByStatusFalse = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`https://bloomgift2-hkdra9cyapase2cy.southeastasia-01.azurewebsites.net/api/admin/payment/get-payment-by-status/false`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.status !== 200) {
                throw new Error(`Lỗi khi nhận dữ liệu: ${response.status}`);
            }

            dispatch({
                type: GET_PAYMENT_BY_STATUS_FALSE,
                payload: response.data,
            });
        } catch (error) {
            console.error("Fetch all stores failed:", error);
            return Promise.reject(error);
        }
    };
};

export const acceptPayment = (paymentID) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`https://bloomgift2-hkdra9cyapase2cy.southeastasia-01.azurewebsites.net/api/admin/payment/update-payment-status/payment-success`, null, {
                params: {
                    paymentID: paymentID,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.status !== 200) {
                throw new Error(`Lỗi khi nhận dữ liệu: ${response.status}`);
            }

            dispatch({
                type: ACCEPT_PAYMENT,
                payload: response.data,
            });
        } catch (error) {
            console.error("Fetch all stores failed:", error);
            return Promise.reject(error);
        }
    };
};

export const rejectPayment = (paymentID, note) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`https://bloomgift2-hkdra9cyapase2cy.southeastasia-01.azurewebsites.net/api/admin/payment/reject-payment`, null, {
                params: {
                    paymentID: paymentID,
                    note: note,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.status !== 200) {
                throw new Error(`Lỗi khi nhận dữ liệu: ${response.status}`);
            }

            dispatch({
                type: REJECT_PAYMENT,
                payload: response.data,
            });
        } catch (error) {
            console.error("Reject payment failed:", error);
            return Promise.reject(error);
        }
    };
};