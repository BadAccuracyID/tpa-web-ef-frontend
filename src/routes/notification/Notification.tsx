import {useLoaderData} from "react-router-dom";
import {Notification, NotificationType, User} from "../../lib/gql/graphql.ts";
import {useCallback, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {getNotifications, readNotification} from "../../lib/controllers/notification-controller.ts";
import NavigationBar from "../../components/NavigationBar.tsx";
import "../../styles/notification.scss";
import {IoMdNotifications} from "react-icons/io";
import {AiFillExclamationCircle} from "react-icons/ai";

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

    async function onRead() {
        const response = await readNotification(notification.id);
        if (!response.success) {
            toast.error('Failed to read notification', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }

        window.location.reload();
    }

    return (
        <div className="notification-card" onClick={onRead}>
            <div className="notification-card-left">
                <div className="notification-card-header">
                    <IoMdNotifications className="notification-card-header-picture"/>

                    <div className="notification-card-header-text">
                        <div className="notification-card-header-text-name">
                            {getTypeFriendlyName(notification)}
                        </div>
                        <div className="notification-card-header-text-date">
                            {notification.createdAt}
                        </div>
                    </div>
                </div>

                <div className="notification-card-body">
                    <div className="notification-card-body-text">
                        {notification.content}
                    </div>
                </div>
            </div>

            {!notification.read ?
                <div className="notification-card-right">
                    <AiFillExclamationCircle className="notification-card-right-icon"/>
                </div> : <></>
            }

        </div>
    )
}

function getTypeFriendlyName({type}: { type: NotificationType }) {
    switch (type) {
        case NotificationType.ChatChannelAdded:
            return "Chat Channel Added"
        case NotificationType.Comment:
            return "Post Commented"
        case NotificationType.CommentLike:
            return "Post Comment Liked"
        case NotificationType.CommentReply:
            return "Post Comment Replied"
        case NotificationType.Generic:
            return "Generic"
        case NotificationType.Post:
            return "New Post"
        case NotificationType.PostLike:
            return "Post Liked"
        case NotificationType.PostMention:
            return "Mentioned in Post"
        case NotificationType.PostTag:
            return "Tagged in Post"
        case NotificationType.UserRelationAccepted:
            return "Friend Request Accepted"
        case NotificationType.UserRelationRequest:
            return "Friend Request"
    }
}
