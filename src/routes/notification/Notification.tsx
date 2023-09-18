import {useLoaderData} from "react-router-dom";
import {Notification, User} from "../../lib/gql/graphql.ts";
import {useCallback, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {getNotifications} from "../../lib/controllers/notification-controller.ts";
import NavigationBar from "../../components/NavigationBar.tsx";
import "../../styles/notification.scss";

export default function NotificationPage() {
    const currentUser = useLoaderData() as User;
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const loadNotification = useCallback(async () => {
        const response = await getNotifications();
        if (!response.success) {
            toast.error('Failed to load notifications', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }

        setNotifications(response.data!);
    }, [])

    useEffect(() => {
        loadNotification();
    }, []);

    return (
        <div>
            <NavigationBar user={currentUser}/>

            <div className="notification">
                <div className="notification-list">
                    {notifications.map((it) => {
                        return <NotificationCard notification={it}/>
                    })}
                </div>
            </div>

        </div>
    );
}

function NotificationCard({notification}: { notification: Notification }) {
    // const profilePicture = notification.contentMedia

    return (
        <div>
            <h1>{notification.content}</h1>
        </div>
    )
}
