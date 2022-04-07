import Axios from 'axios';
import { StorageUtil } from './BrowserUtil';

const axioxMainInstance = async () => {
    let instance: any;
    function init() {
        return Axios.create({
            baseURL: "http://20.214.141.40/apis",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            maxRedirects: 2,
            timeout: 10000
        })
    }

    return {
        getInstance: async () => {
            if (!instance) {
                instance = await init();
            }
            return instance;
        }
    }
}

function getAccessToken () {
    return StorageUtil.local.getItem("access_token");
}

export async function axiosGetRequest(url: string, params?: {}) {
    const axiosInstance = await axioxMainInstance();
    const axios = await axiosInstance.getInstance();
    return await axios.request({
        url: url,
        method: "GET",
        params: params
    })
}


export async function axiosPostRequest(url: string, params?: {}) {
    const axiosInstance = await axioxMainInstance();
    const axios = await axiosInstance.getInstance();
    return await axios.request({
        url: url,
        headers: {
            "Authorization" : `Bearer ${getAccessToken()}`
        },
        method: "POST",
        params: params
    })
}


export async function axiosPutRequest(url: string, params?: {}) {
    const axiosInstance = await axioxMainInstance();
    const axios = await axiosInstance.getInstance();
    return await axios.request({
        url: url,
        headers: {
            "Authorization" : `Bearer ${getAccessToken()}`
        },
        method: "PUT",
        params: params
    })
}


export async function axiosPatchRequest(url: string, params?: {}) {
    const axiosInstance = await axioxMainInstance();
    const axios = await axiosInstance.getInstance();
    return await axios.request({
        url: url,
        method: "PATCH",
        headers: {
            "Authorization" : `Bearer ${getAccessToken()}`
        },
        data: params,
    })
}


export async function axiosDeleteRequest(url: string, params?: {}) {
    const axiosInstance = await axioxMainInstance();
    const axios = await axiosInstance.getInstance();
    return await axios.request({
        url: url,
        headers: {
            "Authorization" : `Bearer ${getAccessToken()}`
        },
        method: "DELETE",
        params: params
    })
}

