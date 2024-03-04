import axios from "axios";
import { CUSTOMER_GET_URL, CUSTOMER_UPDATE_URL, CUSTOMER_URL } from "../constants/CrudUrl";

export const getAllCustomer = async () =>
    await axios.get(CUSTOMER_GET_URL);

export const getAddonById = async (id) =>
    await axios.post(CUSTOMER_GET_URL, id, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

export const createCustomer = async (data) => {
    return await axios.post(CUSTOMER_URL, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export const updateCustomer = async (data) => {
    return await axios.post(CUSTOMER_UPDATE_URL, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export const deleteCustomer = async (id) =>
    await axios.delete(`${CUSTOMER_URL}/${id}`);

