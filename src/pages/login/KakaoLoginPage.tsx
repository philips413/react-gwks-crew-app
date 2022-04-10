import { PageTagProps } from "../interface/PageInterface";

const KakaoLogin = (props: PageTagProps) => {
    // @ts-ignore
    const { Kakao } = globalThis;
    Kakao.Auth.authorize({
        redirectUri: `${process.env.REACT_APP_OAUTH_URL}/login/kakao/callback/`
    })
    Kakao.Auth.login({
        success: function(authObj: any) {
            console.log(`로그인 성공 ==> ${JSON.stringify(authObj)}`)
        },
        fail: function(err: any) {
            alert(`로그인 실패 ==> ${JSON.stringify(err)}`)
        }
    })
    return (
        <>
            <div></div>
        </>
    )
}


export default KakaoLogin;
