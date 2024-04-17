import axios from "axios";

export const getTechnicByCategory = async (id) => {
    try {
        const response = await axios.get(`http://51.250.115.182:8080/api/catalog/category/${id}`);

        return response.data
    }
    catch (e) {
        console.log(e);
    }
}

export const createTechnic = async (data) => {
    try {
        const response = await axios.post('http://51.250.115.182:8080/api/admin/goods', data, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        });

        console.log(response.response.data);
    }
    catch (e) {
        console.log(e);
    }
}

export const getTechnic = async (id) => {
    try {
        const response = await axios.get(`http://51.250.115.182:8080/api/catalog/goods/${id}`);

        return response.data;
    }
    catch (e) {
        console.log(e);
    }
}