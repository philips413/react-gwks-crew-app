import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {Alert, Badge, Button, Card, CardBody, CardHeader, CardText} from "reactstrap";
import { getUserDetail } from "../../api/UserApi";
import { StorageUtil } from "../../config/BrowserUtil";
import { CommunityCode } from "../../enum/OperationCode";
import Header from "../../layout/Header";
import { PageTagProps } from "../interface/PageInterface";
import {getCrewDetail, getCrewList} from "../../api/CrewApi";
import styled from "styled-components";
import {TiUserAdd} from "react-icons/ti";
import NoImage from "../../assets/img/no-image-found-360x250-1-300x208.png";
import CommunityBadgeList from "../../components/CommunityBadgeList";
import CrewCard from "../../components/CrewCard";
import CrewMemberCard from "../../components/CrewMemberCard";
import {find} from "styled-components/test-utils";


const FindCommunity = (code: number) => {
    return (CommunityCode.findById(code).text);
}

const MainPage = (props: PageTagProps) => {
    const navigate = useNavigate();
    const status = StorageUtil.session.getItem("status");
    const [userInfo, setUserInfo] = useState({} as any);
    const userId = StorageUtil.session.getId();
    const [crew, setCrew] = useState([] as any);
    const findCrew: any[] = [];

    useEffect(() => {
        const accessToken = StorageUtil.session.getAccessToken()
        if (accessToken == null) {
            navigate(`/login`);
        }

        const fetchUserData = async () => {
            const userData = await getUserDetail(Number(userId));
            setUserInfo(userData);
        }

        const fetchCrewData = async function() {
            const data = await getCrewList();
            setCrew(data);
        }

        fetchUserData();
        fetchCrewData();

    }, []);

    const doJoin = () => {
        navigate("/join");
    }

    const GetCardList = (crew: any) => {
        for(const crewMember of crew){
            const filterMembers = crewMember.members.filter((item: any) => item === Number(userId));
            if(filterMembers.length > 0){
                findCrew.push(crewMember);
            }
        }

        if(findCrew.length > 0){
            return findCrew.map((crewList: any, index:number) => {
                const{id, name, abstract, image_thumbnail, meeting_type, meeting_time, meeting_limit, member_limit} = crewList;
                return (
                    <CrewCard
                        key={`crew${index}`}
                        id={id}
                        name={name}
                        abstract={abstract}
                        image_thumbnail={image_thumbnail}
                        meeting_type={meeting_type}
                        meeting_time={meeting_time}
                        meeting_limit={meeting_limit}
                        member_limit={member_limit}
                    />
                )
            });
        }else return <b> 아직 가입한 크루가 없네요 :( </b>
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
                    <Card style={{"marginTop": "10px"}}>
                        <CardHeader>
                            내가 가입한 크루
                        </CardHeader>
                        <CardBody>
                            {GetCardList(crew)}
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
