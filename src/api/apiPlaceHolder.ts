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
    post: (payload:{title: string, body: string}) => {
        return instance.post<getPlaceHolderObjectType>('/posts', {
            title: payload.title,
            body: payload.body,
            // userId: payload.userId
        })
    },
    delete: (value:number)=>{
        return instance.delete(`/posts/${value}`)
    },
    update: (id:number, newTitle:string)=>{
        return instance.put(`/posts/${id}`,{
            id:id,
            title: newTitle,
            body: 'newbar',
         /*   userId: 1,*/
        })
    }
}

export type getPlaceHolderObjectType = {
    userId: number,
    id: number,
    title: string,
    body: string
}
