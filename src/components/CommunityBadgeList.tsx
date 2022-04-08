import React from "react";
import { Badge } from "reactstrap"
import { CommunityCode } from "../enum/OperationCode"

const CommunityBadgeList = (list: []) => {
    const select = (id: number) => CommunityCode.findById(id).text
    return (
        <React.Fragment>
            {
                list.map((item:number, index:number) => {
                    return (
                        <>
                            <Badge key={`Badge${index}`} color={"secondary"}>{select(item)}</Badge>
                            &nbsp;
                        </>
                    )
                })
            }

        </React.Fragment>
    );
}

export default CommunityBadgeList;
