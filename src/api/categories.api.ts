import axios from "axios";

export const getAllCategories = async () => {
    try {
        const response = await axios.get('http://51.250.115.182:8080/api/catalog/category');

        return response.data;
    }
    catch (e) {
        console.log(e);
    }
}

export const getCategory = async (id) => {
    try {
        const response = await axios.get(`http://51.250.115.182:8080/api/catalog/category/${id}`);

        return response.data;
    }
    catch (e) {
        console.log(e);
    }
}

export const createCategory = async (data) => {
    try {
        const response = await axios.post('http://51.250.115.182:8080/api/admin/category', data);

        console.log(response);
    }
    catch (e) {
        console.log(e);
    }
}

export const createTechnic = async (data) => {
    try {
        const response = await axios.post('http://51.250.115.182:8080/api/admin/goods', data);

        console.log(response);
    }
    catch (e) {
        console.log(e);
    }
}

export const getTechnicByCategory = async (id) => {
    try {
        const response = await axios.get(`http://51.250.115.182:8080/api/catalog/category/${id}`);

        return response.data
    }
    catch (e) {
        console.log(e);
    }
}