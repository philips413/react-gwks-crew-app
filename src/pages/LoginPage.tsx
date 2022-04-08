import { Button } from "reactstrap";
import Header from "../layout/Header";
import { PageTagProps } from "./interface/PageInterface";
import KakaoLogin from '../assets/img/kakao_login.png'
import { StorageUtil } from "../config/BrowserUtil";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function loginWithKakao() {
    window.open(`/login/kakao`, "kakaoLogin",  "width=500, height=800");
}

const LoginPage = (props: PageTagProps) => {
    const navigate = useNavigate();
    useEffect(() => {
        const accessToken = StorageUtil.local.getAccessToken();
        const status = StorageUtil.local.getItem("status");
        if (status === "new") {
            navigate("/join/");
        }
        if (accessToken != null) {
            navigate("/mypage/");
        }
    });
    return (
        <>
            <Header title={props.title} />
            <main>
                <a id="custom-login-btn" onClick={loginWithKakao}>
                    <img src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg" alt="카카오 로그인 버튼"/>
                </a>
            </main>
        </>
    )
}


export default LoginPage;
