import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {Alert, Button, Card, CardBody, CardText} from "reactstrap";
import { getUserDetail } from "../../api/UserApi";
import { StorageUtil } from "../../config/BrowserUtil";
import { CommunityCode } from "../../enum/OperationCode";
import Header from "../../layout/Header";
import { PageTagProps } from "../interface/PageInterface";

const FindCommunity = (code: number) => {
    return (CommunityCode.findById(code).text);
}

const MainPage = (props: PageTagProps) => {
    const navigate = useNavigate();
    const status = StorageUtil.session.getItem("status");
    const [userInfo, setUserInfo] = useState({} as any);
    const userId = StorageUtil.session.getId();

    useEffect(() => {
        const accessToken = StorageUtil.session.getAccessToken()
        if (accessToken == null) {
            navigate(`/login`);
        }

        const fetchUserData = async () => {
            const userData = await getUserDetail(Number(userId));
            setUserInfo(userData);
        }
        fetchUserData();
    }, []);

    const doJoin = () => {
        navigate("/join");
    }

    return (
        <>
            <Header title={props.title} />
            <main>
                <div>
                    <div>
                        {status === "new" ?
                            <Alert color={"warning"}>
                                <h4 className="alert-heading">
                                    Oops! 회원가입을 마무리 하지 못했군요?
                                </h4>
                                <p>
                                    <ul>
                                        <li><b>이름</b>이 기재 되어 있지 않을 경우, 크루장님이 찾아내기가 어렵습니다.</li>
                                        <li><b>소속 공동체</b>를 선택하지 않을 경우, 원하는 크루에 가입이 안될 수 있습니다.</li>
                                    </ul>
                                </p>
                                <hr />
                                <p className="mb-0">
                                    <Button color={"primary"} onClick={e => doJoin()}>회원가입</Button>
                                </p>
                            </Alert>
                            :
                            <div></div>
                        }
                    </div>
                    <Card>
                        <CardBody>
                            <CardText>
                                <b>닉네임</b> : {userInfo.nickname || "<닉네임을 입력하여 주세요.>"}
                            </CardText>
                            <CardText>
                                <b>이름</b> : {userInfo.name || "<이름을 입력하여 주세요.>"}
                            </CardText>
                            <CardText>
                                <b>이메일</b> : {userInfo.email}
                            </CardText>
                            <CardText>
                                <b>또래</b> : {userInfo.birthyear}
                            </CardText>
                            <CardText>
                                <b>소속 공동체</b> : {FindCommunity(userInfo.community)}
                            </CardText>
                            <div style={{"textAlign": "center", "marginTop": "40px"}}>
                                <Button onClick={ e => navigate(`/mypage/${userId}/`)}>
                                    내 정보 수정
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div style={{"float": "right", "marginTop": "5px", "bottom": "50px"}}>
                    <p style={{"fontSize":"11px", "color": "#ced4da", "fontStyle": "italic"}}>Made By. Street Coding Fighter Crew</p>
                </div>
            </main>
        </>
    )
}

export default MainPage;
