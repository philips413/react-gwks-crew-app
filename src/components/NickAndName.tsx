import React from "react";
import styled from "styled-components";

const NameAndNickSpan = styled.span`
  color: gray;
  font-size: 13px;
`

const Email = styled.p`
  color: grey;
  font-size: 13px;
  margin-bottom: 0px;
`

interface NickAndName {
    nickname: string,
    name: string,
    email: string
}

export const NickAndName = (props: NickAndName) => {
    return (
        <React.Fragment>
            <div>
                <p style={{marginBottom: "2px"}}>{props.nickname || props.name} <NameAndNickSpan>({props.name})</NameAndNickSpan></p>
                <Email>{props.email}</Email>
            </div>
        </React.Fragment>
    )
}

export default NickAndName;