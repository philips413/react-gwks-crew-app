import styled from 'styled-components';
import {Button, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle} from "reactstrap";
import Header from "../../layout/Header";
import {PageTagProps} from "../interface/PageInterface";
import NoImage from '../../assets/img/no-image-found-360x250-1-300x208.png';
import {getCrewDetail, postCrewJoin} from "../../api/CrewApi";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router';
import {TiUserAdd} from 'react-icons/ti';
import CommunityBadgeList from '../../components/CommunityBadgeList';
import {StorageUtil} from "../../config/BrowserUtil";

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
    useEffect(()  => {
        const fetchData = async () => {
            const data = await getCrewDetail(Number(params.id));
            setCrew(data);
        }
        fetchData();
    }, []);

    const joinCrew = async (crewId: number) => {
        const userid = StorageUtil.local.getId();
        if (userid === '') {
            alert('로그인이 필요합니다.');
            StorageUtil.session.saveLandingUrl();
            navigate("/login");
            return;
        }
        // eslint-disable-next-line no-restricted-globals
        if(confirm('함께하게 되어서 좋습니다. :)\n크루에 가입하시겠습니까?')) {
            const result = await postCrewJoin(crewId, userid);
            if (result) {
                alert('크루 가입이 완료되었습니다.');
                window.location.reload();
            }
        }
    };

    const exitCrew = async (crewId: number) => {
        const userid = StorageUtil.local.getId();
        // eslint-disable-next-line no-restricted-globals
        if (confirm('너무 슬프네요 :(\n정말로 탈퇴하시겠습니까?')) {
            await postCrewJoin(crewId, userid);
            alert('크루 탈퇴가 완료되었습니다.\n함께해서 즐거웠어요~');
            navigate("/");
        }
    }

    const hasMember = (members: [any]) => {
        const userid = StorageUtil.local.getId();
        let filterMember = members.filter(item => item === userid);
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
                            <col width={"100px"} />
                            <col width={"100px"} />
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
                        </table>
                    </CardBody>
                </Card>
                <br />
                    {hasMember(crew.members)}
                <br />
                {/*<CrewMemberList>*/}
                {/*    <ListGroup flush>*/}
                {/*        <ListGroupItem>*/}
                {/*            카톡프사 이름1 (닉네임1) &nbsp;*/}
                {/*                <Badge color="primary">*/}
                {/*                    매니저*/}
                {/*                </Badge>*/}
                {/*        </ListGroupItem>*/}
                {/*        <ListGroupItem>*/}
                {/*            카톡프사 이름2 (닉네임2)*/}
                {/*        </ListGroupItem>*/}
                {/*        <ListGroupItem>*/}
                {/*            카톡프사 이름3 (닉네임3)*/}
                {/*        </ListGroupItem>*/}
                {/*        <ListGroupItem>*/}
                {/*            카톡프사 이름4 (닉네임4)*/}
                {/*        </ListGroupItem>*/}
                {/*        <ListGroupItem>*/}
                {/*            카톡프사 이름5 (닉네임5)*/}
                {/*        </ListGroupItem>*/}
                {/*    </ListGroup>*/}
                {/*</CrewMemberList>*/}
            </main>
        </div>
    )
}

export default CrewDetailPage;
