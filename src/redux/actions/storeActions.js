import axios from "axios";

export const ACCOUNT_INFO = "ACCOUNT_INFO";
export const UPDATE_ACCOUNT_INFO = "UPDATE_ACCOUNT_INFO";
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_COUNT_STORES_BY_STATUS_ACTIVE = "GET_COUNT_STORES_BY_STATUS_ACTIVE";
export const GET_COUNT_ACCOUNT = "GET_COUNT_ACCOUNT";
export const GET_ALL_STORES = "GET_ALL_STORES";
export const ACCEPT_STORE = "ACCEPT_STORE";
export const REJECT_STORE = "REJECT_STORE";

export const fetchSellerInfo = (accountID) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("No token found");
            }
            const response = await axios.get('https://bloomgift2-hkdra9cyapase2cy.southeastasia-01.azurewebsites.net/api/admin/accounts-management', {
                params: { accountID: accountID },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status !== 200) {
                throw new Error(`Lỗi khi nhận dữ liệu: ${response.status}`);
            }
            const accountData = response.data;
            dispatch({
                type: ACCOUNT_INFO,
                payload: {
                    accountID: accountData.accountID,
                    accountName: accountData.accountName,
                    type: accountData.type.trim(),
                    accountPhone: accountData.accountPhone,
                    accountAddress: accountData.accountAddress,
                    email: accountData.email,
                    bankAccountName: accountData.bankAccountName,
                    bankNumber: accountData.bankNumber,
                    bankAddress: accountData.bankAddress,
                    taxNumber: accountData.taxNumber,
                    accountStatus: accountData.accountStatus,
                    accountAvatar: accountData.accountAvatar,
                    identityCard: accountData.identityCard.trim(),
                    identityName: accountData.identityName,
                    roleName: accountData.roleName,
                    accountDescription: accountData.accountDescription
                }
            });
            return accountData;
        } catch (error) {
            console.error("Fetch seller info failed:", error);
            return Promise.reject(error);
        }
    }
}

export const updateSellerInfo = (accountID, editedInfo, accountAvatar) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("No token found");
            }

            const sellerInfoForBackend = {
                accountName: editedInfo.accountName,
                type: editedInfo.type,
                accountPhone: editedInfo.accountPhone,
                accountAddress: editedInfo.accountAddress,
                email: editedInfo.email,
                bankAccountName: editedInfo.bankAccountName,
                bankNumber: editedInfo.bankNumber,
                bankAddress: editedInfo.bankAddress,
                taxNumber: editedInfo.taxNumber,
                identityCard: editedInfo.identityCard,
                identityName: editedInfo.identityName,
                accountStatus: editedInfo.accountStatus,
                accountDescription: editedInfo.accountDescription,
                password: editedInfo.password
            };

            // Prepare FormData for multipart request
            const formData = new FormData();
            formData.append("accountPutRequest", JSON.stringify(sellerInfoForBackend));
            if (accountAvatar) {
                formData.append("accountAvatar", accountAvatar); // Attach file if exists
            }

            // Send the request with multipart data
            const response = await axios.put(
                `https://bloomgift2-hkdra9cyapase2cy.southeastasia-01.azurewebsites.net/api/admin/accounts-management/update/${accountID}`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status !== 200) {
                throw new Error(`Error updating account info: ${response.status}`);
            }

            const updatedaccountData = response.data;
            dispatch({
                type: UPDATE_ACCOUNT_INFO,
                payload: updatedaccountData,
            });
            return updatedaccountData;
        } catch (error) {
            console.error("Update account info failed:", error);
            return Promise.reject(error);
        }
    };
}

export const rejectSeller = (storeID) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("No token found");
            }

            const response = await axios.put(
                `https://bloomgift2-hkdra9cyapase2cy.southeastasia-01.azurewebsites.net/api/admin/accounts-management/reject/${storeID}`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            if (response.status !== 200) {
                throw new Error(`Error rejecting account: ${response.status}`);
            }

            const updatedaccountData = response.data;
            dispatch({
                type: UPDATE_ACCOUNT_INFO,
                payload: updatedaccountData,
            });
            return updatedaccountData;
        } catch (error) {
            console.error("Reject account failed:", error);
            return Promise.reject(error);
        }
    };
}

export const acceptSeller = (storeID) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("No token found");
            }

            const response = await axios.put(
                `https://bloomgift2-hkdra9cyapase2cy.southeastasia-01.azurewebsites.net/api/admin/accounts-management/accept/${storeID}`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            if (response.status !== 200) {
                throw new Error(`Error accepting account: ${response.status}`);
            }

            const updatedaccountData = response.data;
            dispatch({
                type: UPDATE_ACCOUNT_INFO,
                payload: updatedaccountData,
            });
            return updatedaccountData;
        } catch (error) {
            console.error("Accept account failed:", error);
            return Promise.reject(error);
        }
    };
}

export const fetchCountStoresByStatus = async () => {
    const storeStatus = "Đã kích hoạt";
    try {
        const encodedStatus = encodeURIComponent(storeStatus);
        const response = await axios.get(`https://bloomgift2-hkdra9cyapase2cy.southeastasia-01.azurewebsites.net/api/admin/role-management/seller-count?storeStatus=${encodedStatus}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );

        if (response.status !== 200) {
            throw new Error(`Lỗi khi nhận dữ liệu: ${response.status}`);
        }

        return response.data;
    } catch (error) {
        console.error("Fetch store count failed:", error);
        return Promise.reject(error);
    }
};

export const fetchCountAccount = async () => {
    try {
        const response = await axios.get(`https://bloomgift2-hkdra9cyapase2cy.southeastasia-01.azurewebsites.net/api/admin/role-management/customer-count`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );

        if (response.status !== 200) {
            throw new Error(`Lỗi khi nhận dữ liệu: ${response.status}`);
        }

        return response.data;
    } catch (error) {
        console.error("Fetch account count failed:", error);
        return Promise.reject(error);
    }
};

export const fetchAllStores = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`https://bloomgift2-hkdra9cyapase2cy.southeastasia-01.azurewebsites.net/api/admin/store-management/get-all`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.status !== 200) {
                throw new Error(`Lỗi khi nhận dữ liệu: ${response.status}`);
            }

            dispatch({
                type: GET_ALL_STORES,
                payload: response.data,
            });
        } catch (error) {
            console.error("Fetch all stores failed:", error);
            return Promise.reject(error);
        }
    };
};

export const acceptStore = (storeID) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("No token found");
            }

            const response = await axios.put(
                `https://bloomgift2-hkdra9cyapase2cy.southeastasia-01.azurewebsites.net/api/admin/store-management/accept-store/${storeID}`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            if (response.status !== 200) {
                throw new Error(`Error accepting store: ${response.status}`);
            }

            dispatch({
                type: ACCEPT_STORE,
                payload: response.data,
            });
        } catch (error) {
            console.error("Accept store failed:", error);
            return Promise.reject(error);
        }
    };
};

export const rejectStore = (storeID) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("No token found");
            }

            const response = await axios.put(
                `https://bloomgift2-hkdra9cyapase2cy.southeastasia-01.azurewebsites.net/api/admin/store-management/reject-store/${storeID}`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            if (response.status !== 200) {
                throw new Error(`Error rejecting store: ${response.status}`);
            }

            dispatch({
                type: REJECT_STORE,
                payload: response.data,
            });
        } catch (error) {
            console.error("Reject store failed:", error);
            return Promise.reject(error);
        }
    };
};

