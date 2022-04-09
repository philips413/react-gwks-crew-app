import jwt_decode, { JwtPayload } from "jwt-decode";
export const StorageUtil = {
    session: {
        getItem: (key: string) => sessionStorage.getItem(key) || '',
        removeItem: (key: string) => sessionStorage.removeItem(key),
        setItem: (key: string, value: string) => sessionStorage.setItem(key, value),
        getId: ():string => {
            let userId = sessionStorage.getItem("userid") || '';
            if (userId == null) {
                userId = '';
            }
            return userId;
        },
        getAccessToken: () => sessionStorage.getItem("access_token"),
        saveLandingUrl: () => {
            sessionStorage.setItem("landingUrl", window.location.href);
        }
    },
    local: {
        getItem: (key: string) => localStorage.getItem(key) || '',
        setItem: (key: string, value: string) => localStorage.setItem(key, value),
        doInitToken: () => {
            const accessToken = localStorage.getItem("access_token") || '';
            const decodeToken = jwt_decode<JwtPayload>(accessToken);
            if (decodeToken.exp != null){
                let now = new Date().getTime()  // 현재 시간
                let timeDiff = (decodeToken.exp * 1000) - now // 토큰의 남은 수명
                if (timeDiff < 0) {
                    // 토큰이 만료됨에 따라, 사용자 정보
                    localStorage.clear();
                }
            }
        },
        logout: () => localStorage.clear()
    }
}
