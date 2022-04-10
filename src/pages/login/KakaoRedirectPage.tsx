import {axiosKakaoLogin} from "../../config/AxiosConfig";
import { PageTagProps } from "../interface/PageInterface";
import { getLoginInfo} from "../../api/LoginApi";
import { StorageUtil } from "../../config/BrowserUtil";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const KakaoRedirectPage = (props: PageTagProps) => {
    const navigate = useNavigate();
    useEffect(() => {
        const doTokenValidate = async () => {
            const code = new URL(window.location.href).searchParams.get("code");
            const result = await axiosKakaoLogin("https://kauth.kakao.com/oauth/token",{
                grant_type: "authorization_code",
                client_id: "5c7fe0d39ddd530bb8c5588ef3c1452a",
                redirect_uri: `${process.env.REACT_APP_OAUTH_URL}/login/kakao/callback/`,
                code: code,
                client_secret: "IwKQJvbH6UN40GOyG6VWSCKrPVBcIUic",
            });
            const {access_token} = result.data;
            const userdata = await getLoginInfo(access_token);
            sessionStorage.setItem("access_token", userdata.access_token);
            sessionStorage.setItem("refresh_token", userdata.refresh_token);
            sessionStorage.setItem("userid", userdata.user.pk);
            sessionStorage.setItem("email", userdata.user.email);
            sessionStorage.setItem("status", userdata.status);
            let landingUrl = StorageUtil.session.getItem("landingUrl");
            StorageUtil.session.removeItem("landingUrl");
            if (landingUrl != '') {
                navigate(landingUrl);
            } else {
                navigate("/mypage/");
            }
        };
        doTokenValidate();
    }, []);

    return (
        <>
            로그인성공!
        </>
    );
}

export default KakaoRedirectPage;
