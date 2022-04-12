import React, {useState} from "react";
import {Badge, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Col, Row} from "reactstrap";
import styled from "styled-components";
import {CommunityBadge} from "./CommunityBadgeList";
import {TiStarFullOutline} from "react-icons/ti";

interface UserCardProps {
    profile_image: string;
    name: string;
    nickname: string;
    community: number;
    birthyear: number;
    email: string;
}

const UserCardDiv = styled(Card)`
  margin-bottom: 5px;
  display: flex;
`

const UserCardBodyDiv = styled(CardBody)`
  padding: 5px;
  .profileContainer{
    height: 70px;
    position: relative;  
    background: #EEE;    
    margin: 0 auto;
    overflow: hidden;
    img {
      width: 100%;
      height: auto;
      position: absolute;
      background-size: cover;
    }
  } 
`

const NameAndNickSpan = styled.span`
  color: gray;
  font-size: 13px;
`

export const CrewMemberCard = (props: UserCardProps) => {
    return (
        <React.Fragment>
            <UserCardDiv>
                <UserCardBodyDiv>
                    <Row>
                        <Col xs={3}>
                            <div className={"profileContainer"}>
                                <img src={props.profile_image}/>
                            </div>
                        </Col>
                        <Col xs={9}>
                            <CardTitle>
                                {props.nickname || props.name}&nbsp;<NameAndNickSpan>({props.name})</NameAndNickSpan>
                            </CardTitle>
                            <CardSubtitle>
                                <span style={{color: "grey"}}>{props.email}</span>
                            </CardSubtitle>
                            <CardText>
                                {CommunityBadge(props.community)}
                                <Badge color={"success"}>
                                    {
                                        props.birthyear === null ? "알수없음"
                                            :
                                            props.birthyear <= 9 ? `0${props.birthyear}또래` : `${props.birthyear}또래`
                                    }
                                </Badge>
                            </CardText>
                        </Col>
                    </Row>
                </UserCardBodyDiv>
            </UserCardDiv>
        </React.Fragment>
    )
}

export default CrewMemberCard;
