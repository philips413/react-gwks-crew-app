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
                        <React.Fragment key={`BadgeFragment${index}`}>
                            <Badge key={item} color={"secondary"}>{select(item)}</Badge>
                            &nbsp;
                        </React.Fragment>
                    )
                })
            }

        </React.Fragment>
    );
}

export default CommunityBadgeList;
