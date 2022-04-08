import styled from 'styled-components';
import {Badge, Button, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle} from "reactstrap";
import Header from "../../layout/Header";
import {PageTagProps} from "../interface/PageInterface";
import NoImage from '../../assets/img/no-image-found-360x250-1-300x208.png';
import {getCrewDetail} from "../../api/CrewApi";
import React, {useEffect, useState} from "react";
import {useParams} from 'react-router';
import {TiUserAdd} from 'react-icons/ti';
import { CommunityCode } from '../../enum/OperationCode';
import CommunityBadgeList from '../../components/CommunityBadgeList';

const CrewTitle = styled.div`
    width: 100%;
    font-size : 30px;
    text-align: center;
`

const CrewMemberList = styled.div`
 font-size : 15px;
 margin-bottom: 10px;
`
//
// const getClassList1 = () => {
//     const list = [
//         {value: 1, text: '기타'},
//         {value: 2, text: '매주'},
//     ]
//     return list.map((item, index) => (<option key={`option${index}`} value={item.value}>{item.text}</option>));
// }
//
// const getClassList2 = () => {
//     const list = [
//         {value: 1, text: '기타'},
//         {value: 2, text: '일요일'},
//         {value: 3, text: '월요일'},
//         {value: 4, text: '화요일'},
//         {value: 5, text: '수요일'},
//         {value: 6, text: '목요일'},
//         {value: 7, text: '금요일'},
//         {value: 8, text: '토요일'},
//     ]
//     return list.map((item, index) => (<option key={`option${index}`} value={item.value}>{item.text}</option>));
// }
//

const CrewDetailPage = (props: PageTagProps) => {
    const params = useParams();
    const [userData, setUserData] = useState({
        community_limit: []
    } as any);
    useEffect(()  => {
        const fetchData = async () => {
            const data = await getCrewDetail(Number(params.id));
            setUserData(data);
        }
        fetchData();
    }, []);

    return (
        <div>
            <Header title={props.title} />
            <main>
                <CrewTitle>
                    <h2>
                        {userData.name}
                    </h2>
                </CrewTitle>
                <Card>
                    <CardHeader>
                        크루 소개
                    </CardHeader>
                    <img
                        src={userData.image || NoImage}
                        width={"100%"}
                    />
                    <CardBody>
                        <CardTitle>
                            {userData.abstract}
                        </CardTitle>
                        <CardText dangerouslySetInnerHTML={{__html : userData.description}}>
                        </CardText>
                    </CardBody>
                    <CardFooter>
                        {CommunityBadgeList(userData.community_limit)}
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
                                <td>{userData.period}</td>
                            </tr>
                            <tr>
                                <td style={{"fontWeight": "bold"}}>모임 요일</td>
                                <td>{userData.weekday}</td>
                            </tr>
                            <tr>
                                <td style={{"fontWeight": "bold"}}>진행 시간</td>
                                <td>{userData.start_time}~{userData.end_time}</td>
                            </tr>
                            <tr>
                                <td style={{"fontWeight": "bold"}}>모임 형식</td>
                                <td>{userData.meeting_type}</td>
                            </tr>
                        </table>
                    </CardBody>
                </Card>
                <br />
                <Button color={"primary"} block>
                    <TiUserAdd />&nbsp;
                    참가하기
                </Button>
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
