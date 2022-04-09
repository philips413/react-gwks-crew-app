import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Button, FormGroup, FormText, Input, Label } from "reactstrap";
import styled from "styled-components";
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

const SignUpPage = (props: PageTagProps) => {
    const navigate = useNavigate();
    const _email = StorageUtil.session.getItem("email") || null;
    const [email, setEmail] = useState(_email as any);
    const [name, setName] = useState("");
    const [community, setCommunity] = useState(0);
    const [birthyear, setBirthyear] = useState("");
    const [nickname, setNickname] = useState("");

    const DoCancelJoin = () => {
        if (window.confirm("가입을 취소하시겠습니다?😥 \n괜찮아요, 다시 가입할수 있어요")) {
            navigate("/");
        }
    };

    const DoAgreeJoin = () => {
        const joinService = new JoinService();
        const user = {email, name, community, birthyear, nickname};
        const isAccess = joinService.doValidation(user);
        if (isAccess) {
            if (window.confirm("가입을 승인하시겠습니다?")) {
                const userId = StorageUtil.session.getItem("userid");
                joinService.join(Number(userId), user);
                navigate("/");
            }
        }
    }
    return (
        <React.Fragment>
            <Header title={props.title} />
            <main>
                <div>
                    <div style={{"marginTop": "50px","width": "100%", "textAlign": "center"}}>
                        <p>
                            청년마을 크루앱을 사용하기 위한 <br />
                            회원가입을 진행해주세요.
                        </p>
                    </div>
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
                            <Label for="userName">
                                또래
                            </Label>
                            <Input
                                id="userName"
                                name="name"
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
                            <Button onClick={e => DoAgreeJoin()} style={{"width": "130px"}} color={"primary"}> 가입하기 </Button>
                        </div>
                    </SignUpWrapper>
                </div>
            </main>
        </React.Fragment>
    )
}

export default SignUpPage;
