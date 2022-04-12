import React, {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Button, FormGroup, FormText, Input, Label } from "reactstrap";
import styled from "styled-components";
import { getUserDetail } from "../../api/UserApi";
import { StorageUtil } from "../../config/BrowserUtil";
import { CommunityCode } from "../../enum/OperationCode";
import Header from "../../layout/Header";
import JoinService from "../../service/join/JoinService";
import { PageTagProps } from "../interface/PageInterface";

const SignUpWrapper = styled.div`
  padding: 50px 30px;
`

const getClassList = () => {
    return CommunityCode.list
        .map((item, index) => (<option key={`option${index}`} value={item.value}>{item.text}</option>));
}

const MyInfoPage = (props: PageTagProps) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [community, setCommunity] = useState(0);
    const [birthyear, setBirthyear] = useState("");
    const [nickname, setNickname] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const userId = StorageUtil.session.getId();
            const userData = await getUserDetail(Number(userId));
            setEmail(userData.email);
            setName(userData.name);
            setCommunity(userData.community);
            setBirthyear(userData.birthyear);
            setNickname(userData.nickname);
        };

        fetchData();
    }, []);



    const DoCancelJoin = () => {
        if (window.confirm("취소하시겠습니다?")) {
            navigate("/");
        }
    };

    const DoAgreeJoin = () => {
        const joinService = new JoinService();
        const user = {email, name, community, birthyear, nickname};
        const isAccess = joinService.doValidation(user);
        if (isAccess) {
            const userId = StorageUtil.session.getItem("userid");
            joinService.join(Number(userId), user);
            alert('수정되었습니다.')
            navigate("/");
        } else {
            return;
        }
    }
    return (
        <React.Fragment>
            <Header title={props.title} />
            <main>

                <div>
                    <SignUpWrapper>
                        <FormGroup>
                            <Label for="userEmail">
                                아이디
                            </Label>
                            <Input
                                id="userEmail"
                                name="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="이메일을 입력하여 주세요."
                                disabled
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="userName">
                                이름
                            </Label>
                            <Input
                                id="userName"
                                name="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="이름을 입력해주세요."
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="userClass">
                                소속 공동체
                            </Label>
                            <Input
                                id="userClass"
                                name="class"
                                type="select"
                                value={community}
                                onChange={e => setCommunity(Number(e.target.value))}
                            >
                                {getClassList()}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="birtheyear">
                                또래
                            </Label>
                            <Input
                                id="birtheyear"
                                name="birtheyear"
                                value={birthyear}
                                onChange={e => setBirthyear(e.target.value)}
                                placeholder="또래를 입력해주세요."
                            />
                            <FormText>
                                나이나 수준이 서로 비슷한 무리. ex) 90년또래 {"->"} 90
                            </FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label for="userNickName">
                                닉네임
                            </Label>
                            <Input
                                id="userNickName"
                                name="nickName"
                                value={nickname}
                                onChange={e => setNickname(e.target.value)}
                                placeholder="닉네임을 입력해주세요."
                            />
                        </FormGroup>
                        <div style={{"textAlign": "center", "marginTop": "50px"}}>
                            <Button onClick={e => DoCancelJoin()} style={{"width": "130px"}}> 취소 </Button>
                            &emsp;&emsp;
                            <Button onClick={e => DoAgreeJoin()} style={{"width": "130px"}} color={"primary"}> 수정하기 </Button>
                        </div>
                    </SignUpWrapper>
                </div>
            </main>
        </React.Fragment>
    )
}

export default MyInfoPage;
