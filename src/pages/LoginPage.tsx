import Header from "../layout/Header";
import {PageTagProps} from "./interface/PageInterface";
import {StorageUtil} from "../config/BrowserUtil";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const LoginPage = (props: PageTagProps) => {
    const navigate = useNavigate();
    useEffect(() => {
        const accessToken = StorageUtil.session.getAccessToken();
        const status = StorageUtil.session.getItem("status");
        if (status === "new") {
            navigate("/join");
        }
        if (accessToken != null) {
            window.location.replace("/mypage");
        }
    });

    const loginWithKakao = () => {
        navigate("/login/kakao");
    }

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
