import axios from "axios";

let instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    //withCredentials:true
    // headers:{
    //     'API-KEY':'bgyhhujhnkj'
    // }
})

export const apiPlaceHolder = {
    get: () => {
        return instance.get<Array<getPlaceHolderObjectType>>('/posts')
    },
    post: () => {
        return instance.post<getPlaceHolderObjectType>('/posts', {
            title: 'foo',
            body: 'bar',
            userId: 1,
        })
    }
}

export type getPlaceHolderObjectType = {
    "userId": number,
    "id": number,
    "title": string,
    "body": string
}
