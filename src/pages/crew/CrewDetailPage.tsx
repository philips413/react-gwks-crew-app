import styled from 'styled-components';
import {Button, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Table} from "reactstrap";
import Header from "../../layout/Header";
import {PageTagProps} from "../interface/PageInterface";
import NoImage from '../../assets/img/no-image-found-360x250-1-300x208.png';
import {getCrewDetail, postCrewJoin} from "../../api/CrewApi";
import React, {memo, useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router';
import {TiUserAdd} from 'react-icons/ti';
import CommunityBadgeList, {CommunityBadge} from '../../components/CommunityBadgeList';
import {StorageUtil} from "../../config/BrowserUtil";
import {getUserDetail} from "../../api/UserApi";
import CrewMemberCard from "../../components/CrewMemberCard";

const CrewTitle = styled.div`
    width: 100%;
    font-size : 30px;
    text-align: center;
`

const CrewDetailPage = (props: PageTagProps) => {
    let navigate = useNavigate();
    const params = useParams();
    const [crew, setCrew] = useState({
        members: [],
        members_detail: [],
        community_limit: [],
        member_limit: 0
    } as any);
    const [crewMaster, setCrewMaster] = useState({
        id: 0,
        profile_image: '',
        email: '',
        nickname: '',
        name: '',
        birthyear: 0,
        community: 0
    });
    const [crewMember, setCrewMember] = useState([] as any);
    const [hasMemeber, setHasMember] = useState(false);
    useEffect(()  => {
        const fetchData = async () => {
            const data = await getCrewDetail(Number(params.id));
            const resultCrewMaster = await getUserDetail(data.manager);

            const userid = StorageUtil.session.getId();
            const findUser = data.members.find((item: any) => item == userid);
            if (findUser !== '') {
                setHasMember(true);
            }
            setCrew(data);
            setCrewMaster(resultCrewMaster);
        }
        fetchData();
    }, []);
    const joinCrew = async (crewId: number) => {
        const userid = StorageUtil.session.getId();
        if (userid === '') {
            alert('로그인이 필요합니다.');
            StorageUtil.session.saveLandingUrl();
            navigate("/login");
            return;
        }
        // eslint-disable-next-line no-restricted-globals
        if(confirm('함께하게 되어서 좋습니다. :)\n크루에 가입하시겠습니까?')) {
            const result = await postCrewJoin(crewId, userid);
            if (result.isSuccess) {
                alert('크루 가입이 완료되었습니다.');
                window.location.reload();
                return;
            }
            alert(result.failed);
        }
    };

    const exitCrew = async (crewId: number) => {
        const userid = StorageUtil.session.getId();
        // eslint-disable-next-line no-restricted-globals
        if (confirm('너무 슬프네요 :(\n정말로 탈퇴하시겠습니까?')) {
            const result = await postCrewJoin(crewId, userid);
            if (result.isSuccess) {
                alert('크루 탈퇴가 완료되었습니다.\n함께해서 즐거웠어요~');
                navigate("/");
            }
        }
    }

    const hasMember = (members: [any]) => {
        const userid = StorageUtil.session.getId();
        let filterMember = members.filter(item => item === Number(userid));
        if (crew.members.length >= crew.member_limit) {
            return (
                <Button color={"secondary"} block onClick={e => joinCrew(crew.id)} disabled>
                    <TiUserAdd />&nbsp;인원 마감&nbsp;({crew.members.length}/{crew.member_limit})
                </Button>
            )
        }

        if (filterMember.length <= 0 || userid === '') {
            return (
                <Button color={"primary"} block onClick={e => joinCrew(crew.id)}>
                    <TiUserAdd />&nbsp;참가하기&nbsp;({crew.members.length}/{crew.member_limit})
                </Button>
            )
        }
        return (
            <Button color={"danger"} block onClick={e => exitCrew(crew.id)}>
                <TiUserAdd />&nbsp;탈퇴하기
            </Button>
        )
    }

    const joinRoom = (roomUrl: string) => {
        if (roomUrl === null) {
            alert('크루장님이 개설준비중입니다. ');
        } else {
            window.open(roomUrl);
        }
    }

    return (
        <div>
            <Header title={props.title} />
            <main>
                <CrewTitle>
                    <h2>
                        {crew.name}
                    </h2>
                </CrewTitle>
                <Card>
                    <CardHeader>
                        크루 소개
                    </CardHeader>
                    <img
                        alt={""}
                        src={crew.image || NoImage}
                        width={"100%"}
                    />
                    <CardBody>
                        <CardTitle>
                            {crew.abstract}
                        </CardTitle>
                        <CardText dangerouslySetInnerHTML={{__html : crew.description}}>
                        </CardText>
                    </CardBody>
                    <CardFooter>
                        {CommunityBadgeList(crew.community_limit)}
                    </CardFooter>
                </Card>
                <br />
                <Card>
                    <CardHeader>
                        크루 상세정보
                    </CardHeader>
                    <CardBody>
                        <table>
                            <colgroup>
                                <col width={"100px"} />
                                <col width={"100px"} />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td style={{"fontWeight": "bold"}}>모임 빈도</td>
                                    <td>{crew.period}</td>
                                </tr>
                                <tr>
                                    <td style={{"fontWeight": "bold"}}>모임 요일</td>
                                    <td>{crew.weekday}</td>
                                </tr>
                                <tr>
                                    <td style={{"fontWeight": "bold"}}>진행 시간</td>
                                    <td>{crew.start_time}~{crew.end_time}</td>
                                </tr>
                                <tr>
                                    <td style={{"fontWeight": "bold"}}>모임 형식</td>
                                    <td>{crew.meeting_type}</td>
                                </tr>
                                <tr>
                                    <td style={{"fontWeight": "bold"}}>참여 현황</td>
                                    <td>{crew.members.length} / {crew.member_limit}</td>
                                </tr>
                                <tr key={"openChat"}>
                                    <td>참여채팅방</td>
                                    <td>
                                        <Button disabled={crew.kakao_room === null ? true : false} onClick={e=> joinRoom(crew.kakao_room)}>
                                            {crew.kakao_room === null ? true : false}
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
                <br />
                <Card>
                    <CardHeader>
                        크루장 및 크루원
                    </CardHeader>
                    <CardBody>
                        <CrewMemberCard
                            isMaster={true}
                            profile_image={crewMaster.profile_image}
                            name={crewMaster.name}
                            nickname={crewMaster.nickname}
                            community={crewMaster.community}
                            birthyear={crewMaster.birthyear}
                        />
                        {
                            crew.members_detail.map((user: any) => {
                                if (user.id !== crewMaster.id) {
                                    const {profile_image, name, nickname, community, birthyear} = user;
                                    return (<CrewMemberCard isMaster={false} profile_image={profile_image} name={name} nickname={nickname} community={community} birthyear={birthyear} />)
                                }
                            })
                        }
                    </CardBody>
                </Card>
                <br />
                {hasMember(crew.members)}
                <br />
            </main>
        </div>
    )
}

export default CrewDetailPage;
