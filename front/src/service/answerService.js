import axios from "axios";

const getMyAnswer = async (idAuthors) => {
    try {
        const response = await axios.get(`http://localhost:3000/answer/responder/${idAuthors}`);

        console.log("response answer : ", response);
        return response;
    } catch (error) {
        console.error(error);
    }
}


export { getMyAnswer };