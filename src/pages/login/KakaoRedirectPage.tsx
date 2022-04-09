import {axiosKakaoLogin, axiosPostRequest} from "../../config/AxiosConfig";
import { PageTagProps } from "../interface/PageInterface";
import { getLoginInfo} from "../../api/LoginApi";
import { StorageUtil } from "../../config/BrowserUtil";

async function doTokenInfo() {
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
    StorageUtil.local.setItem("access_token", userdata.access_token);
    StorageUtil.local.setItem("refresh_token", userdata.refresh_token);
    StorageUtil.local.setItem("userid", userdata.user.pk);
    StorageUtil.local.setItem("email", userdata.user.email);
    StorageUtil.local.setItem("status", userdata.status);
    let landingUrl = StorageUtil.session.getItem("landingUrl");
    StorageUtil.session.removeItem("landingUrl");
    if (landingUrl !== '') {
        window.opener.location.replace(landingUrl);
    } else {
        window.opener.location.reload();
    }
    window.close();
}

const KakaoRedirectPage = (props: PageTagProps) => {
    doTokenInfo();
    return (
        <>
            로그인성공!
        </>
    );
}

export default KakaoRedirectPage;
