import axios from 'axios';

export const GET_ALL_ORDERS = 'GET_ALL_ORDERS';
export const GET_ORDER_BY_ID = 'GET_ORDER_BY_ID';
export const GET_ORDER_BY_STATUS = 'GET_ORDER_BY_STATUS';


export const fetchAllOrders = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("No token found");
            }
            const response = await axios.get('https://bloomgift-e5hva0bgc6aubaen.eastus-01.azurewebsites.net/api/seller/order/order-management/get-all-order', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status !== 200) {
                throw new Error(`Lỗi khi nhận dữ liệu: ${response.status}`);
            }
            const orders = response.data;
            dispatch({
                type: GET_ALL_ORDERS,
                payload: orders
            });
            return orders;
        } catch (error) {
            console.error("Fetch orders failed:", error);
            return Promise.reject(error);
        }
    }
}

export const fetchOrderById = (orderID) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("No token found");
            }
            const response = await axios.get(`https://bloomgift-e5hva0bgc6aubaen.eastus-01.azurewebsites.net/api/seller/order/order-management/get-order-by-id/${orderID}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status !== 200) {
                throw new Error(`Lỗi khi nhận dữ liệu: ${response.status}`);
            }
            const order = response.data;
            dispatch({
                type: GET_ORDER_BY_ID,
                payload: order
            });
            return order;
        } catch (error) {
            console.error("Fetch order by ID failed:", error);
            return Promise.reject(error);
        }
    }
}

export const fetchOrderByStatus = (orderStatus) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("No token found");
            }
            const response = await axios.get(`https://bloomgift-e5hva0bgc6aubaen.eastus-01.azurewebsites.net/api/seller/order/order-management/get-order-by-status/${orderStatus}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status !== 200) {
                throw new Error(`Lỗi khi nhận dữ liệu: ${response.status}`);
            }
            const orders = response.data;
            dispatch({
                type: GET_ORDER_BY_STATUS,
                payload: orders
            });
            return orders;
        } catch (error) {
            console.error("Fetch order by status failed:", error);
            return Promise.reject(error);
        }
    }
}
