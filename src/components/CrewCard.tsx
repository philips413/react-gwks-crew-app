import React from "react";
import styled from "styled-components";
import {Badge, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Col, Row} from "reactstrap";
import CrewMemberCard from "./UserCard";
import NoImage from "../assets/img/no-image-found-360x250-1-300x208.png";
import CommunityBadgeList from "./CommunityBadgeList";

interface CrewCardProps {
    id: number;
    name: string;
    abstract: string;
    image_thumbnail: string;
    meeting_type: string;
    meeting_time: string;
    meeting_limit: string;
    member_limit: number;
}

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

export const CrewCard = (props: CrewCardProps) => {
    return (
        <React.Fragment>
            <CrewCart>
                <CardBody>
                    <Row>
                        <Col xs={3}>
                            <img
                                alt={""}
                                src={props.image_thumbnail || NoImage}
                                style={{"width": "70px", "height": "70px"}}
                            />
                        </Col>
                        <Col xs={9}>
                            <CardTitle
                                tag="h5"
                            >
                                {props.name}
                            </CardTitle>
                            <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h6"
                            >
                                {props.abstract}&emsp;
                            </CardSubtitle>
                        </Col>
                    </Row>
                    <CardText>
                        {props.meeting_time ? (<HashSpan color={"primary"}>#{props.meeting_time}</HashSpan>) : ''}&nbsp;
                        {props.meeting_type ? (<HashSpan color={"success"}>#{props.meeting_type}</HashSpan>) : ''}&nbsp;
                        {props.member_limit ? (<HashSpan color={"success"}>#선착순{props.member_limit}명</HashSpan>) : ''}
                    </CardText>
                </CardBody>
            </CrewCart>
        </React.Fragment>
    );
}

export default CrewCard;