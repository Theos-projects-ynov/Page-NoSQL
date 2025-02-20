import axios from "axios";

const getMyAnswer = async (idAuthors) => {
    try {
        const response = await axios.get(`localhost:3000/answer/responder/${idAuthors}`);

        console.log("response : ", response);
        return response;
    } catch (error) {
        console.error(error);
    }
}


export { getMyAnswer };