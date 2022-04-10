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

export const CommunityBadge = (communityCode: number) => {
    const select = (id: number) => CommunityCode.findById(id).text
    return (
        <React.Fragment>
            {
                <React.Fragment key={`BadgeFragment`}>
                    <Badge key={communityCode} color={"secondary"}>{select(communityCode)}</Badge>
                    &nbsp;
                </React.Fragment>
            }
        </React.Fragment>
    );

}

export default CommunityBadgeList;
