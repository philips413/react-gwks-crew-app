import { useEffect, useState } from "react";
import { getUserList } from "../../api/UserApi";
import Header from "../../layout/Header";
import { PageTagProps } from "../interface/PageInterface";
import UserCard from "../../components/UserCard";

const CrewListPage = (props: PageTagProps) => {

    const [crewList, setCrewList] = useState([] as any);

    useEffect(() => {
        const fetchData = async () => {
            const crewList = await getUserList();
            setCrewList(crewList);
        }
        fetchData();
    }, []);


    return (
        <>
            <Header title={props.title} />
            <main>
                {crewList.map((item: any, index: number) => {
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
