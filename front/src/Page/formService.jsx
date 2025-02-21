import axios from 'axios';

export const getAllForms = () => {
    return axios.get('http://localhost:3000/form');
};

export const getMyForms = (userId) => {
    return axios.get(`http://localhost:3000/form/authour/${userId}`);
};

export const submitForm = (formData) => {
    return axios.post('http://localhost:3000/form/', formData);
};

export const getFormById = (id) => {
    return axios.get(`http://localhost:3000/form/${id}`);
};
export const updateForm = (id, formData) => {
    return axios.put(`http://localhost:3000/form/${id}`, formData);
};
