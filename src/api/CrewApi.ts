import {axiosGetRequest, axiosPatchRequest, axiosPostRequest} from "../config/AxiosConfig";
import header from "../layout/Header";

interface Crew {
    id: number,
    name: string,
    description: string,
    create_date: string,
    meeting_type: string,
    meeting_time: string,
    meeting_limit?: string,
    community: string,
    member_limit: number,
    image?: string,
    image_thumbnail?: string,
    manager: number,
    member?: null

}

export const getCrewList = async () => {
    const result = await axiosGetRequest(`/crew`, {});
    return result.data;
}

export const getCrewDetail = async (pk:number) => {
    const result = await axiosGetRequest(`/crew/${pk}`,{});
    return result.data;
}

export const postCrewJoin = async (pk:number, userid:any) => {
    const formData = new FormData();
    formData.append('userid', userid);
    const result = await axiosPostRequest(`/crew/${pk}/join`,formData);
    result.data.isSuccess = (result.data['success'] !== undefined)
    return result.data;
}
