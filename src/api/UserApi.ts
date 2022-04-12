import {axiosGetRequest, axiosPatchRequest, axiosPostRequest} from "../config/AxiosConfig";

export interface User {
    id: number,
    last_login: string,
    is_superuser: boolean,
    email: string,
    is_active: boolean,
    is_admin: boolean,
    name?: string,
    birthyear?: number,
    community?: string,
    created_date: string,
    updated_date: string,
    profile_image?: string,

}

export const getUserList = async () => {
    const result = await axiosGetRequest(`/user`);
    return result.data;
}

export const getUserDetail = async (pk:number) => {
    const result = await axiosGetRequest(`/user/${pk}/`);
    return result.data;
}

export const patchUserDetail = async (pk:number, data: any) => {
    const formData = new FormData();
    for(const key in data) {
        formData.set(key, data[key]);
    }
    const result = await axiosPatchRequest(`/user/${pk}/`,formData);
    return result.data;
}
