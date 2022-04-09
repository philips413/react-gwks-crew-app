import {PageTagProps} from "../interface/PageInterface";
import Header from "../../layout/Header";
import styled from "styled-components";
import {getCrewList} from "../../api/CrewApi";
import React, {useEffect, useState} from "react";
import {Badge, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Row} from "reactstrap";
import NoImage from '../../assets/img/no-image-found-360x250-1-300x208.png'
import {Link, useNavigate} from "react-router-dom";
import CommunityBadgeList from "../../components/CommunityBadgeList";
import {StorageUtil} from "../../config/BrowserUtil";

const CrewCart = styled(Card)`
  margin-bottom: 10px;
`

const HashSpan = styled.span`
  color: #5899fa;
  font-size: 13px;
  cursor: pointer;
  :active {
    text-decoration: underline;
  }
`

const GetCardList = (list: any) => {
    let navigate = useNavigate();
    const vaildCrewMember = (members: []) => {
        const userid = StorageUtil.session.getId();
        const filterMembers = members.filter(item => item === userid);
        if (filterMembers.length > 0) {
            return (
                <Badge color={"success"} pill>참여중..</Badge>
            )
        }
    }

    const goLink = (id: number) => {
        navigate(`/crew_detail/${id}`);
    }

    return list.map((item: any) => {
        return (
            <React.Fragment>
                <CrewCart key={`card${item.id}`}>
                    <CardBody>
                        <Row
                            key={`cardRow${item.id}`}
                            xs={2}
                        >
                            <Col xs={3}>
                                <img
                                    alt={""}
                                    src={item.image_thumbnail || NoImage}
                                    style={{"width": "80px", "height": "80px"}}
                                    onClick={() => goLink(item.id)}
                                />
                            </Col>
                            <Col xs={9}>
                                <CardTitle
                                    tag="h5"
                                    onClick={() => goLink(item.id)}
                                >
                                    {item.name}
                                </CardTitle>
                                <CardSubtitle
                                    className="mb-2 text-muted"
                                    tag="h6"
                                    onClick={() => goLink(item.id)}
                                >
                                    {vaildCrewMember(item.members)}&nbsp;{item.abstract}
                                </CardSubtitle>
                            </Col>
                        </Row>
                        <CardText>
                            {item.meeting_time ? (<HashSpan color={"primary"}>#{item.meeting_time}</HashSpan>) : ''}&nbsp;
                            {item.meeting_type ? (<HashSpan color={"success"}>#{item.meeting_type}</HashSpan>) : ''}&nbsp;
                            {item.member_limit ? (<HashSpan color={"success"}>#선착순{item.member_limit}명</HashSpan>) : ''}
                        </CardText>
                        <p>{CommunityBadgeList(item.community_limit)}</p>
                    </CardBody>
                </CrewCart>
            </React.Fragment>
        );
    })
}

const HomePage = (props: PageTagProps) => {
    let [list, setList] = useState([] as any);
    useEffect(() => {
        const fetchData = async function () {
            const result = await getCrewList();
            setList(result);
        };
        fetchData();
    }, []);
    return (
        <>
            <Header title={props.title} />
            <main>
                {GetCardList(list)}
            </main>
        </>
    )
}

export default HomePage;
