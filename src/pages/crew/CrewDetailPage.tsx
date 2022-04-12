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
import {CommunityCode} from "../../enum/OperationCode";

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
        community_limit: []
    } as any);
    const [crewMaster, setCrewMaster] = useState({
        nickname: '',
        name: '',
        birthyear: 0,
        community: 0
    });
    const [crewMember, setCrewMember] = useState([] as any);
    useEffect(()  => {
        const fetchData = async () => {
            const data = await getCrewDetail(Number(params.id));
            const resultCrewMaster = await getUserDetail(data.manager);
            let _crewMember:any[] = [];
            for(let id of data.members) {
                if (resultCrewMaster.id !== id) {
                    const user = await getUserDetail(id);
                    _crewMember.push(user);
                }
            }
            setCrew(data);
            setCrewMaster(resultCrewMaster);
            setCrewMember(_crewMember);
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
        if (filterMember.length <= 0 || userid === '') {
            return (
                <Button color={"primary"} block onClick={e => joinCrew(crew.id)}>
                    <TiUserAdd />&nbsp;참가하기
                </Button>
            )
        }
        return (
            <Button color={"danger"} block onClick={e => exitCrew(crew.id)}>
                <TiUserAdd />&nbsp;탈퇴하기
            </Button>
        )
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
                        <Table>
                            <colgroup>
                            </colgroup>
                            <thead>
                                <tr>
                                    <td>#</td>
                                    <td>닉네임(이름)</td>
                                    <td>또래</td>
                                    <td>소속 공동체</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>크루장</td>
                                    <td>{crewMaster.nickname || crewMaster.name}({crewMaster.name})</td>
                                    <td>{crewMaster.birthyear}</td>
                                    <td>{CommunityBadge(crewMaster.community)}</td>
                                </tr>
                                {
                                    crewMember.map((item:any, index: number) => {
                                        const {name, nickname, birthyear, community} = item;
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{nickname}({name})</td>
                                                <td>{birthyear}</td>
                                                <td>
                                                    {CommunityBadge(community)}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
                {hasMember(crew.members)}
                <br />
            </main>
        </div>
    )
}

export default CrewDetailPage;
