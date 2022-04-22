import React, { useEffect, useState } from "react";
import { getUserList } from "../../api/UserApi";
import Header from "../../layout/Header";
import { PageTagProps } from "../interface/PageInterface";
import UserCard from "../../components/UserCard";
import styled from "styled-components";
import {Button, ButtonGroup, CardBody} from "reactstrap";
import {StorageUtil} from "../../config/BrowserUtil";
import {TiUserAdd} from "react-icons/ti";


const SelCommunity = styled.div`
  font-size: 15px;
  text-align: center;
  margin-bottom: 15px;
  display: flex;
  .btn{
    padding: 5px;
    margin-outside: 5px;
    border: 1px solid;
  }
`

const CrewListPage = (props: PageTagProps) => {

    const [crewList, setCrewList] = useState([] as any);
    const [selectCrewList, setSelectCrewList] = useState([] as any);
    const [activeButton, setActiveButton] = useState(-1);
    const [community1, setCommunity1] = useState([] as any);
    const [community2, setCommunity2] = useState([] as any);
    const [community3, setCommunity3] = useState([] as any);
    const [communityBR, setCommunityBR] = useState([] as any);


    useEffect(() => {
        const fetchData = async () => {
            const crewList = await getUserList();
            for(const crew of crewList){
                if(crew.community === 0){
                    community1.push(crew);
                }
                else if(crew.community === 1){
                    community2.push(crew);
                }
                else if(crew.community === 2){
                    community3.push(crew);
                }
                else if(crew.community === 3){
                    communityBR.push(crew);
                }
            }
            setCrewList(crewList);
            setSelectCrewList(crewList);
            setCommunity1(community1);
            setCommunity2(community2);
            setCommunity3(community3);
            setCommunityBR(communityBR);

            console.log(community1.length);
            console.log(community2.length);
            console.log(community3.length);
            console.log(communityBR.length);

        }
        fetchData();

    }, []);


    const selectCommunityList = (communityCode: number, list: any) => {
        let tmpCommunityList = [] as any;
        setActiveButton(communityCode);

        if(communityCode < 0){
            tmpCommunityList = [...list];
        }

        for(const crewCommunity of crewList){
            if(crewCommunity.community === communityCode){
                tmpCommunityList.push(crewCommunity);
            }
        }
        setSelectCrewList(tmpCommunityList);
    }

    return (
        <>
            <Header title={props.title} />
            <main>
                <SelCommunity>
                    <Button color={activeButton === -1 ? "secondary" : "outline-secondary"} block onClick={e => selectCommunityList(-1, crewList)}> 전체({crewList.length}) </Button>&nbsp;
                    <Button color={activeButton === 0 ? "secondary" : "outline-secondary"} block onClick={e => selectCommunityList(0, crewList)}> 1청년부({community1.length}) </Button>&nbsp;
                    <Button color={activeButton === 1 ? "secondary" : "outline-secondary"} block onClick={e => selectCommunityList(1, crewList)}> 2청년부({community2.length}) </Button>&nbsp;
                    <Button color={activeButton === 2 ? "secondary" : "outline-secondary"} block onClick={e => selectCommunityList(2, crewList)}> 3청년부({community3.length}) </Button>&nbsp;
                    <Button color={activeButton === 3 ? "secondary" : "outline-secondary"} block onClick={e => selectCommunityList(3, crewList)}> 신혼BR({communityBR.length}) </Button>
                </SelCommunity>
                {selectCrewList.map((item: any, index: number) => {
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
