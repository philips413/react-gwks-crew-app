import { PageTagProps } from "../interface/PageInterface";
import Header from "../../layout/Header";
import styled from "styled-components";
import { getCrewList } from "../../api/CrewApi";
import { useEffect, useState } from "react";
import CrewList from "../../components/home/CrewList";
import React from "react";
import {Badge, Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Row } from "reactstrap";
import NoImage from '../../assets/img/no-image-found-360x250-1-300x208.png'
import { Link } from "react-router-dom";

// const RowWrapper =  styled.div`
//   .cardRow {
//     margin-bottom: 10px;
//   }
// `
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
    return list.map((item: any) => {
        return (
            <React.Fragment>
                <CrewCart key={item.id}>
                    <CardBody>
                        <Row
                            key={`cardRow${item.id}`}
                            xs={2}
                        >
                            <Col xs={3}>
                                <img
                                    src={item.image_thumbnail || NoImage}
                                    style={{"width": "80px", "height": "80px"}}
                                />
                            </Col>
                            <Col xs={9}>
                                <CardTitle tag="h5">
                                    {item.name}
                                </CardTitle>
                                <CardSubtitle
                                    className="mb-2 text-muted"
                                    tag="h6"
                                >
                                    {item.abstract}
                                </CardSubtitle>
                            </Col>
                        </Row>
                        <CardText>
                            {item.meeting_time ? (<HashSpan color={"primary"}>#{item.meeting_time}</HashSpan>) : ''}&nbsp;
                            {item.meeting_type ? (<HashSpan color={"success"}>#{item.meeting_type}</HashSpan>) : ''}&nbsp;
                            {item.member_limit ? (<HashSpan color={"success"}>#선착순{item.member_limit}명</HashSpan>) : ''}
                        </CardText>
                        <Link to={`/crew_detail/${item.id}`}>
                            자세히 보기
                        </Link>
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
