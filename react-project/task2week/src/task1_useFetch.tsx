import { useFetch } from './useFetch'

// interface RequestInitParams extends RequestInit {
//     _limit: number
// }

interface Post {
    userId: number,
    id: number,
    title: string,
    body: string
}


const URL_POSTS: string = 'https://jsonplaceholder.typicode.com/posts';
// const URL_POSTS: string = 'https://jsonplaceholder.typicode.com/posts?_limit=3';

function Demo() {
    const request = useFetch<Post[]>(URL_POSTS);

    return (
        <div>
            <h1>Задание #1</h1>
            <div>
                <button onClick={() => request.refetch({
                    params: {
                        _limit: 3
                    }
                })}>
                    Перезапросить
                </button>
            </div>
            {request.isLoading && 'Загрузка...'}
            {request.error && 'Произошла ошибка'}
            {request.data && !request.isLoading  && request.data.map(item => <div key={item.id}>{item.title}</div>)}
        </div>
    )
}

export default Demo
