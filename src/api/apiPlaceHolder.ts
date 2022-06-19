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
    post: (payload:{title: string, body: string, userId: number}) => {
        return instance.post<getPlaceHolderObjectType>('/posts', {
            title: payload.title,
            body: payload.body,
            userId: payload.userId
        })
    },
    delete: (value:number)=>{
        return instance.delete(`/posts/${value}`)
    }
}

export type getPlaceHolderObjectType = {
    "userId": number,
    "id": number,
    "title": string,
    "body": string
}
