import React from "react";
import {Badge, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Col, Row} from "reactstrap";
import styled from "styled-components";
import {CommunityBadge} from "./CommunityBadgeList";
import {TiStarFullOutline} from "react-icons/ti";

interface UserCardProps {
    isMaster: boolean;
    profile_image: string;
    name: string;
    nickname: string;
    community: number;
    birthyear: number
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
                                {props.isMaster ? <span style={{color: "#ffc107"}}><TiStarFullOutline /></span> : ''}
                                &nbsp;
                                {props.nickname || props.name}&nbsp;<NameAndNickSpan>({props.name})</NameAndNickSpan>
                            </CardTitle>
                            <CardSubtitle>
                                {CommunityBadge(props.community)}
                                <Badge color={"success"}>
                                    {
                                        props.birthyear === null ? "알수없음"
                                            :
                                            props.birthyear <= 9 ? `0${props.birthyear}또래` : `${props.birthyear}또래`
                                    }
                                </Badge>
                            </CardSubtitle>
                        </Col>
                    </Row>
                </UserCardBodyDiv>
            </UserCardDiv>
        </React.Fragment>
    )
}

export default CrewMemberCard;
