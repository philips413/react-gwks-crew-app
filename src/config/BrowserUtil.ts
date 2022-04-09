import jwt_decode, { JwtPayload } from "jwt-decode";
export const StorageUtil = {
    session: {
        getItem: (key: string) => sessionStorage.getItem(key),
        removeItem: (key: string) => sessionStorage.removeItem(key),
        setItem: (key: string, value: string) => sessionStorage.setItem(key, value),
        saveLandingUrl: () => {
            sessionStorage.setItem("landingUrl", window.location.href);
        }
    },
    local: {
        getItem: (key: string) => localStorage.getItem(key),
        setItem: (key: string, value: string) => localStorage.setItem(key, value),
        getAccessToken: () => localStorage.getItem("access_token"),
        getId: ():string => {
            let userId = localStorage.getItem("userid") || '';
            if (userId == null) {
                userId = '';
            }
            return userId;
        },
        doInitToken: () => {
            const accessToken = localStorage.getItem("access_token") || '';
            const decodeToken = jwt_decode<JwtPayload>(accessToken);
            if (decodeToken.exp != null){
                let now = new Date().getTime()  // 현재 시간
                let timeDiff = (decodeToken.exp * 1000) - now // 토큰의 남은 수명
                console.log(timeDiff)
                if (timeDiff < 0) {
                    // 토큰이 만료됨에 따라, 사용자 정보
                    localStorage.clear();
                }
            }
        },
        logout: () => localStorage.clear()
    }
}
