import { PageTagProps } from "../interface/PageInterface";
import {useEffect} from "react";

const KakaoLogin = (props: PageTagProps) => {
    useEffect(() => {
        const oauth = async () => {
            const redirectionUrl = `${process.env.REACT_APP_OAUTH_URL}/login/kakao/callback/`;
            window.location.replace(`https://kauth.kakao.com/oauth/authorize?client_id=7b512bfbe3a9c4c39baf19fd2984f20d&redirect_uri=${redirectionUrl}&response_type=code`)
        };
        oauth();
    }, []);
    return (
        <>
            <div></div>
        </>
    )
}


export default KakaoLogin;
