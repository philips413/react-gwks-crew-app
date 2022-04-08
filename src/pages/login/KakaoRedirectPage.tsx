import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { axiosPostRequest } from "../../config/AxiosConfig";
import { PageTagProps } from "../interface/PageInterface";
import { getLoginInfo} from "../../api/LoginApi";
import { StorageUtil } from "../../config/BrowserUtil";

async function doTokenInfo() {
    const code = new URL(window.location.href).searchParams.get("code");
    const result = await axiosPostRequest("https://kauth.kakao.com/oauth/token",{
        grant_type: "authorization_code",
        client_id: "5c7fe0d39ddd530bb8c5588ef3c1452a",
        redirect_uri: "http://52.78.188.142/login/kakao/callback",
        code: code,
        client_secret: "IwKQJvbH6UN40GOyG6VWSCKrPVBcIUic",
    });
    const {access_token, expires_in, refresh_token, refresh_token_expires_in} = result.data;
    const userdata = await getLoginInfo(access_token);
    StorageUtil.local.setItem("access_token", userdata.access_token);
    StorageUtil.local.setItem("refresh_token", userdata.refresh_token);
    StorageUtil.local.setItem("userid", userdata.user.pk);
    StorageUtil.local.setItem("email", userdata.user.email);
    StorageUtil.local.setItem("status", userdata.status);
    // @ts-ignore
    window.opener.location.reload();
    window.close();
}

const KakaoRedirectPage = (props: PageTagProps) => {
    const [token, setToken] = useState("");
    doTokenInfo();
    return (
        <>
            로그인성공!
        </>
    );
}

export default KakaoRedirectPage;
