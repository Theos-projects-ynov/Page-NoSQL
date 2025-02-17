import axios from "axios";

const submitForm = async (data) => {
    try {
        const response = await fetch('http://localhost:3000/form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

const getAllForms = async () => {
    try {
        const response = await axios.get('http://localhost:3000/form');
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

export { submitForm };