import {Group, GroupVisibility, User} from "../../lib/gql/graphql.ts";
import "../../styles/group.scss";
import {AiFillCloseCircle} from "react-icons/ai";
import React, {createRef, useState} from "react";
import {toast} from "react-toastify";
import {uploadFilesWithToast} from "../../lib/controllers/firebase-upload-controller.ts";
import {createGroup} from "../../lib/controllers/group-controller.ts";
import {useNavigate} from "react-router-dom";

export function GroupComponent({group}: { group: Group }) {
    const navigate = useNavigate();
    console.log(group.picture)
    console.log(group.name)

    function redirectGroup() {
        navigate('/groups/' + group.id);
    }

    return (
        <div className="group-card">
            <div className="group-card-container" onClick={redirectGroup}>
                <img className="group-card-picture" src={group.picture!} alt="group picture"/>

                <div className="group-card-right">
                    <div className="group-card-name">
                        {group.name}
                    </div>
                    <div className="group-card-description">
                        {group.description}
                    </div>
                    <div className="group-card-info">
                        {group.members.length} members
                    </div>
                </div>

            </div>
        </div>
    )
}

export function CreateGroupCard({onClose}: { user: User, onClose: () => void }) {
    const [groupName, setGroupName] = useState<string>("");
    const [groupDescription, setGroupDescription] = useState<string>("");
    const [groupVisibility, setGroupVisibility] = useState<string>("public");
    const [groupImage, setGroupImage] = useState<string>("");

    const fileInputRef: React.Ref<HTMLInputElement> = createRef();

    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const imageUrl = await uploadFilesWithToast([file]);

            setGroupImage(imageUrl[0]);
        }
    }

    const onPictureClick = () => {
        if (!fileInputRef.current) {
            return;
        }

        fileInputRef.current.click();
    }

    function isReady() {
        return groupName !== "" && groupDescription !== "" && groupImage !== "";
    }

    async function onCreateGroup() {
        if (!isReady()) {
            toast.error("Please fill all the fields", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            })
            return;
        }

        const visibility: GroupVisibility = groupVisibility === "public" ? GroupVisibility.Public : GroupVisibility.Private;
        const response = await createGroup({
            name: groupName,
            description: groupDescription,
            visibility: visibility,
            picture: groupImage,
        });

        if (!response.success) {
            toast.error('Failed to create group', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            });
            return;
        }

        toast.success('Group created successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
        });
        window.location.reload();
    }

    return (
        <div className="create-group-card">
            <div className="create-group-card-container">
                <div className="create-group-card-header">
                    <div className="create-group-card-header-title">Create a group</div>
                    <AiFillCloseCircle className="create-group-card-header-close" onClick={onClose}/>
                </div>

                <div className="create-group-card-body">
                    <div className="create-group-card-body-input">
                        <input
                            type="text"
                            placeholder="Group name"
                            value={groupName}
                            onChange={(event) => setGroupName(event.target.value)}
                        />
                    </div>

                    <div className="create-group-card-body-input">
                        <input
                            type="text"
                            placeholder="Group description"
                            value={groupDescription}
                            onChange={(event) => setGroupDescription(event.target.value)}
                        />
                    </div>

                    <div className="create-group-card-body-input-select">
                        <select
                            value={groupVisibility}
                            onChange={(event) => setGroupVisibility(event.target.value)}
                        >
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </div>

                    <div className="create-group-card-body-input">
                        <input
                            className="create-group-card-body-input-file"
                            type="file"
                            accept={"image/*"}
                            ref={fileInputRef}
                            onChange={onFileChange}
                        />
                        <div className="create-group-card-body-input-file-button" onClick={onPictureClick}>
                            Upload group picture
                        </div>
                    </div>
                </div>

                <div className="create-group-card-footer">
                    {
                        isReady() ?
                            <div className="create-group-card-footer-button-enabled" onClick={onCreateGroup}>
                                Create group
                            </div>
                            :
                            <div className="create-group-card-footer-button-disabled" onClick={onCreateGroup}>
                                Create group
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}
