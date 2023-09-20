import {Group, User} from "../../lib/gql/graphql.ts";
import {getUserGroups} from "../../lib/controllers/group-controller.ts";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import {GroupComponent} from "./GroupComponent.tsx";
import "../../styles/group.scss";

export function YourGroupContent({currentUser}: { currentUser: User }) {

    const [joinedGroups, setJoinedGroups] = useState<Group[]>([]);

    async function loadGroups() {
        const response = await getUserGroups();
        if (!response.success) {
            toast.error('Failed to load groups', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            });
            return;
        }

        setJoinedGroups(response.data!);
    }

    useEffect(() => {
        loadGroups();
    }, []);

    return (
        <div className="your-group-content">
            {joinedGroups.map((group: Group) => {
                return <GroupComponent
                    group={group}
                />
            })}
        </div>
    )
}
