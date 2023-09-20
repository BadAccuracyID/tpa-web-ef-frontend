import {Group} from "../../lib/gql/graphql.ts";
import {getPublicGroups} from "../../lib/controllers/group-controller.ts";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {GroupComponent} from "./GroupComponent.tsx";

export function DiscoverGroupContent() {

    const [publicGroups, setPublicGroups] = useState<Group[]>([]);

    async function loadPublicGroups() {
        const response = await getPublicGroups();
        if (!response.success) {
            toast.error('Failed to load public groups', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            });
            return;
        }

        setPublicGroups(response.data!);
    }

    useEffect(() => {
        loadPublicGroups();
    }, []);

    return (
        <div className="your-group-content">
            {publicGroups.map((group: Group) => {
                return <GroupComponent
                    group={group}
                />
            })}
        </div>
    )
}
