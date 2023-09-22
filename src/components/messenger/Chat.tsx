import {Conversation, Message, MessageContentType, Subscription, User} from "../../lib/gql/graphql.ts";
import "../../styles/messenger.scss";
import React, {createRef, useEffect, useRef, useState} from "react";
import {sendMessage, subscribeConversation} from "../../lib/controllers/messanger-controller.ts";
import {toast} from "react-toastify";
import {BiSolidUserCircle} from "react-icons/bi";
import {BsChatDotsFill} from "react-icons/bs";
import {HiPhoto} from "react-icons/hi2";
import {uploadFilesWithToast} from "../../lib/controllers/firebase-upload-controller.ts";

export default function ChatComponent({user, conversation}: { user: User, conversation: Conversation }) {
    const [messages, setMessages] = useState(conversation.messages);
    const [typedMessage, setTypedMessage] = useState("")
    const subscription = useRef<Subscription | null>(null);
    const fileInputRef: React.Ref<HTMLInputElement> = createRef();

    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            const fileUrl = await uploadFilesWithToast([file]);

            let contentType: MessageContentType;
            if (file.type.startsWith("video")) {
                contentType = MessageContentType.Video;
            } else {
                contentType = MessageContentType.Image;
            }

            const response = await sendMessage(user.id, conversation.id, fileUrl[0], contentType);
            if (!response.success) {
                toast.error('Failed to send media', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
                return;
            }

            toast.success('Media sent', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            subscribeConversation(conversation.id, (message: Message) => {
                setMessages([...messages, message]);
            }).then((response) => {
                if (!response.success) {
                    console.error(response.errorMsg);
                    return;
                }

                subscription.current = response.subscription;
            })
        };

        if (!subscription.current) {
            fetchData();
        }

        return () => {
            // Clean up the subscription
            if (subscription.current) {
                subscription.current = null;
            }
        };
    }, [messages]);

    function getMemberNames() {
        let names = "";
        conversation.members.forEach((member) => {
            names += member.firstName + " " + member.lastName + ", ";
        });

        return names.slice(0, -2);
    }

    function onUploadMediaClick() {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (!fileInputRef!.current) {
            return;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fileInputRef!.current.click();
    }

    async function onSendMessage(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            const fetched = await sendMessage(user.id, conversation.id, typedMessage, MessageContentType.Text);
            if (!fetched.success) {
                toast.error('Failed to send message', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
                return;
            }

            setTypedMessage("");
        }
    }

    return (
        <div className="chat">
            <div className="chat-header">
                <BsChatDotsFill className="chat-header-picture-null"/>

                <div className="chat-header-right">
                    <div className="chat-header-right-title">
                        {conversation.title}
                    </div>

                    <div className="chat-header-right-members">
                        {getMemberNames()}
                    </div>
                </div>
            </div>

            <div className="chat">
                {
                    messages.map((message) => {
                        if (message.sender.id === user.id) {
                            return <BlueChatBubble message={message}/>
                        } else {
                            return <GreyChatBubble message={message}/>
                        }
                    })
                }
            </div>

            <div className="chat-floating">
                <input
                    className="chat-input"
                    placeholder="Aa"
                    value={typedMessage}
                    onChange={(e) => setTypedMessage(e.target.value)}
                    onKeyDown={onSendMessage}
                />
                <HiPhoto className="chat-media" onClick={() => onUploadMediaClick()}/>

                <input
                    type="file"
                    className="profile-header-input-hidden"
                    onChange={onFileChange}
                    accept={"image/*, video/*"}
                    ref={fileInputRef}
                />
            </div>

        </div>
    )
}

function BlueChatBubble({message}: { message: Message }) {
    const profilePicture = message.sender.profilePicture;

    console.log(message.contentType)

    return (
        <div className="bubble bubble-blue">
            <div className="bubble-right">
                <div className="bubble-right-name bubble-blue-right-name">
                    {message.sender.firstName} {message.sender.lastName}
                </div>

                <BlueChatBubbleContent message={message}/>
            </div>

            {profilePicture ? <img className="bubble-profile-picture" src={profilePicture}/> :
                <BiSolidUserCircle className="bubble-profile-picture-null"/>}
        </div>
    );
}

function BlueChatBubbleContent({message}: { message: Message }) {
    console.log(message.contentType)
    switch (message.contentType) {
        case MessageContentType.Post:
        case MessageContentType.Text:
        case MessageContentType.Voice:
            return (
                <div className="bubble-right-content bubble-blue-right-content">
                    {message.content}
                </div>
            )
        case MessageContentType.Image:
            return (
                <div className="bubble-right-content bubble-blue-right-content">
                    <img
                        src={message.content}
                        alt={'image'}
                    />
                </div>
            )
        case MessageContentType.Video:
            return (
                <div className="bubble-right-content bubble-blue-right-content">
                    <video
                        src={message.content}
                    />
                </div>
            )
    }
}

function GreyChatBubble({message}: { message: Message }) {
    const profilePicture = message.sender.profilePicture;
    return (
        <div className="bubble bubble-gray">
            {profilePicture ? <img className="bubble-profile-picture" src={profilePicture}/> :
                <BiSolidUserCircle className="bubble-profile-picture-null"/>}

            <div className="bubble-right">
                <div className="bubble-right-name bubble-gray-right-name">
                    {message.sender.firstName} {message.sender.lastName}
                </div>

                <GreyChatBubbleContent message={message}/>
            </div>
        </div>
    );
}

function GreyChatBubbleContent({message}: { message: Message }) {
    switch (message.contentType) {
        case MessageContentType.Post:
        case MessageContentType.Text:
        case MessageContentType.Voice:
            return (
                <div className="bubble-right-content bubble-gray-right-content">
                    {message.content}
                </div>
            )
        case MessageContentType.Image:
            return (
                <div className="bubble-right-content bubble-gray-right-content">
                    <img
                        src={message.content}
                        alt={'image'}
                    />
                </div>
            )
        case MessageContentType.Video:
            return (
                <div className="bubble-right-content bubble-gray-right-content">
                    <video
                        src={message.content}
                    />
                </div>
            )
    }
}
