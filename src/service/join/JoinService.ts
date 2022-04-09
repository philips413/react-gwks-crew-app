import { patchUserDetail } from "../../api/UserApi";

interface User {
    email: string,
    name: string,
    community: number,
    birthyear: string,
    nickname: string
}
export default class JoinService {

    doValidation(params: User) {
        if (params.name === '') {
            alert('이름을 입력하여 주세요.');
            return false;
        }
        if (params.birthyear === '') {
            alert("또래를 입력해주세요.");
            return false;
        }
        if(params.nickname === '') {
            alert("닉네임을 입력해주세요.");
            return false;
        }
        return true;
    }

    async join(id:number, user: User) {
        const result = await patchUserDetail(id, user);
        return result.id !== '';

    }
}
