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
    const [isMemeber, setIsMemeber] = useState(false);
    useEffect(()  => {
        const fetchData = async () => {
            const data = await getCrewDetail(Number(params.id));
            const resultCrewMaster = await getUserDetail(data.manager);

            const userid = StorageUtil.session.getId();
            const findUser = data.members.filter((item: any) => item == userid);
            if (findUser.length > 0) {
                setIsMemeber(true);
            }
            setCrew(data);
            setCrewMaster(resultCrewMaster);
        }
        fetchData();
    }, []);
    const joinCrew = async (crewId: number) => {
        const userid = StorageUtil.session.getId();
        if (userid === '') {
            alert('???????????? ???????????????.');
            StorageUtil.session.saveLandingUrl();
            navigate("/login");
            return;
        }
        // eslint-disable-next-line no-restricted-globals
        if(confirm('???????????? ????????? ????????????. :)\n????????? ?????????????????????????')) {
            const result = await postCrewJoin(crewId, userid);
            if (result.isSuccess) {
                alert('?????? ????????? ?????????????????????.');
                window.location.reload();
                return;
            }
            alert(result.failed);
        }
    };

    const exitCrew = async (crewId: number) => {
        const userid = StorageUtil.session.getId();
        // eslint-disable-next-line no-restricted-globals
        if (confirm('?????? ???????????? :(\n????????? ?????????????????????????')) {
            const result = await postCrewJoin(crewId, userid);
            if (result.isSuccess) {
                alert('?????? ????????? ?????????????????????.\n???????????? ???????????????~');
                navigate("/");
            }
        }
    }

    const hasMember = (members: [any]) => {
        const userid = StorageUtil.session.getId();
        let filterMember = members.filter(item => item === Number(userid));

        if (filterMember.length > 0) {
            return (
                <Button color={"danger"} block onClick={e => exitCrew(crew.id)}>
                    <TiUserAdd />&nbsp;????????????
                </Button>
            )
        }

        if (crew.members.length >= crew.member_limit) {
            return (
                <Button color={"secondary"} block onClick={e => joinCrew(crew.id)} disabled>
                    <TiUserAdd />&nbsp;?????? ??????&nbsp;({crew.members.length}/{crew.member_limit})
                </Button>
            )
        }

        if (filterMember.length <= 0 || userid === '') {
            return (
                <Button color={"primary"} block onClick={e => joinCrew(crew.id)}>
                    <TiUserAdd />&nbsp;????????????&nbsp;({crew.members.length}/{crew.member_limit})
                </Button>
            )
        }
    }

    const joinRoom = (roomUrl: string) => { window.open(roomUrl) }
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
                        ?????? ??????
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
                        ?????? ????????????
                    </CardHeader>
                    <CardBody>
                        <table>
                            <colgroup>
                                <col width={"100px"} />
                                <col width={"100px"} />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td style={{"fontWeight": "bold"}}>?????? ??????</td>
                                    <td>{crew.period}</td>
                                </tr>
                                <tr>
                                    <td style={{"fontWeight": "bold"}}>?????? ??????</td>
                                    <td>{crew.weekday}</td>
                                </tr>
                                <tr>
                                    <td style={{"fontWeight": "bold"}}>?????? ??????</td>
                                    <td>{crew.start_time}~{crew.end_time}</td>
                                </tr>
                                <tr>
                                    <td style={{"fontWeight": "bold"}}>?????? ??????</td>
                                    <td>{crew.meeting_type}</td>
                                </tr>
                                <tr>
                                    <td style={{"fontWeight": "bold"}}>?????? ??????</td>
                                    <td>{crew.members.length} / {crew.member_limit}</td>
                                </tr>
                                {
                                    isMemeber ?
                                        <tr key={"openChat"}>
                                            <td>???????????????</td>
                                            <td>
                                                <Button color={"primary"} size={"sm"} disabled={crew.kakao_room === null ? true : false} onClick={e=> joinRoom(crew.kakao_room)}>
                                                    {crew.kakao_room === null ? "?????????" : "????????????"}
                                                </Button>
                                            </td>
                                        </tr>
                                    :
                                        ''
                                }
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
                <br />
                <Card>
                    <CardHeader>
                        ????????? ??? ?????????
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
                            crew.members_detail.map((user: any, index: number) => {
                                if (user.id !== crewMaster.id) {
                                    const {profile_image, name, nickname, community, birthyear} = user;
                                    return (<CrewMemberCard key={`crewMember${index}`} isMaster={false} profile_image={profile_image} name={name} nickname={nickname} community={community} birthyear={birthyear} />)
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
