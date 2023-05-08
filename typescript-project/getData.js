import axios from 'axios';
// const axios = require('axios').default;
export const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';
export async function getData(url) {
    try {
        const response = await axios.get(url);
        response.data.forEach((element) => {
            console.log(`Id: ${element.id}, Email: ${element.email}`);
        });
    }
    catch (error) {
        console.error(error);
    }
}
