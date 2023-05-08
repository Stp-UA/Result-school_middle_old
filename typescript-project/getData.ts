import axios from 'axios'
// const axios = require('axios').default;

export const COMMENTS_URL: string = 'https://jsonplaceholder.typicode.com/comments';

interface Str {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string
}

export async function getData(url: string) {
    try {
        const response = await axios.get(url);
        response.data.forEach((element: Str) => {
            console.log(`Id: ${element.id}, Email: ${element.email}`)
        });
    } catch (error) {
        console.error(error);
    }
}
