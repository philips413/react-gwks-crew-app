import { PageTagProps } from "../interface/PageInterface";

const KakaoLogin = (props: PageTagProps) => {
    // @ts-ignore
    const { Kakao } = globalThis;
    Kakao.Auth.authorize({
        redirectUri: 'http://localhost:3000/login/kakao/callback/'
    })
    Kakao.Auth.login({
        success: function(authObj: any) {
            alert(JSON.stringify(authObj))
        },
        fail: function(err: any) {
            alert(JSON.stringify(err))
        }
    })
    return (
        <>
            <div></div>
        </>
    )
}


export default KakaoLogin;
