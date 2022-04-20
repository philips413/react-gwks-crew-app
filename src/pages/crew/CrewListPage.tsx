import React, { useEffect, useState } from "react";
import { getUserList } from "../../api/UserApi";
import Header from "../../layout/Header";
import { PageTagProps } from "../interface/PageInterface";
import UserCard from "../../components/UserCard";
import styled from "styled-components";
import {Button, ButtonGroup, CardBody} from "reactstrap";
import {render} from "react-dom";
import {StorageUtil} from "../../config/BrowserUtil";
import {TiUserAdd} from "react-icons/ti";


const SelCommunity = styled.div`
  //padding-left: 5px;
  font-size: 15px;
  text-align: center;
  margin-bottom: 15px;
  display: flex;
  .btn{
    padding: 5px;
    border: 1px solid;
  }
`

const CrewListPage = (props: PageTagProps) => {

    const [crewList, setCrewList] = useState([] as any);
    const [selCrewList, setSelCrewList] = useState([] as any);

    useEffect(() => {
        const fetchData = async () => {
            const crewList = await getUserList();
            setCrewList(crewList);
            setSelCrewList(crewList);
        }
        fetchData();
    }, []);

    const allCommunity = (item: any) => {
        setSelCrewList(crewList);
        return;
    }

    const selCommunity1 = (crewList: any) => {
        const communityGroup1 = [];

        for(const crewCommunity of crewList){
            if(crewCommunity.community === 0){
                communityGroup1.push(crewCommunity);
            }
        }

        setSelCrewList(communityGroup1);
        return;
    }

    const selCommunity2 = (crewList: any) => {
        const communityGroup2 = [];

        for(const crewCommunity of crewList){
            if(crewCommunity.community === 1){
                communityGroup2.push(crewCommunity);
            }
        }
        setSelCrewList(communityGroup2);
        return;
    }

    const selCommunity3 = (crewList: any) => {
        const communityGroup3 = [];

        for(const crewCommunity of crewList){
            if(crewCommunity.community === 2){
                communityGroup3.push(crewCommunity);
            }
        }
        setSelCrewList(communityGroup3);
        return;
    }

    const selCommunityBR = (crewList: any) => {
        const communityGroupBR = [];

        for(const crewCommunity of crewList){
            if(crewCommunity.community === 3){
                communityGroupBR.push(crewCommunity);
            }
        }
        setSelCrewList(communityGroupBR);
        return;
    }


    return (
        <>
            <Header title={props.title} />
            <main>
                <SelCommunity>
                    <Button color="outline-secondary" block onClick={e => allCommunity(crewList)}> 전체 </Button>
                    <Button color="outline-secondary" block onClick={e => selCommunity1(crewList)}> 1청년부 </Button>
                    <Button color="outline-secondary" block onClick={e => selCommunity2(crewList)}> 2청년부 </Button>
                    <Button color="outline-secondary" block onClick={e => selCommunity3(crewList)}> 3청년부 </Button>
                    <Button color="outline-secondary" block onClick={e => selCommunityBR(crewList)}> 신혼BR </Button>
                </SelCommunity>
                {selCrewList.map((item: any, index: number) => {
                    return (
                        <UserCard key={`userCar${index}`}
                            profile_image={item.profile_image}
                            name={item.name}
                            nickname={item.nickname}
                            community={item.community}
                            birthyear={item.birthyear}
                            email={item.email}
                        />
                    )
                })}
            </main>
        </>
    )
}

export default CrewListPage;
