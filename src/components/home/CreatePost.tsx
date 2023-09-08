import {Audience, User} from "../../lib/gql/graphql.ts";
import "../../styles/create-post.scss";
import {AiFillCloseCircle} from "react-icons/ai";
import {BiSolidUserCircle} from "react-icons/bi";
import React, {createRef, useState} from "react";
import {BsCameraVideoFill} from "react-icons/bs";
import {HiPhoto} from "react-icons/hi2";
import {uploadFilesWithToast} from "../../lib/controllers/firebase-upload-controller.ts";
import 'react-toastify/dist/ReactToastify.css';
import {createPost} from "../../lib/controllers/post-controller.ts";

export default function CreatePostComponent({user, onClose}: { user: User, onClose: () => void }) {
    const profilePicture = user.profilePicture;

    const [text, setText] = useState<string>("");
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const fileInputRef: React.Ref<HTMLInputElement> = createRef();

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            if (files.length > 10) {
                return;
            }

            setSelectedFiles(files);
        }
    };

    const onFileRemove = (index: number): React.MouseEventHandler<HTMLButtonElement> => {
        return () => {
            setSelectedFiles(prev => prev.filter((_, i) => i !== index));
        }
    }

    const onButtonClick = () => {
        if (!fileInputRef.current) {
            return;
        }

        fileInputRef.current.click();
    };

    const onCreatePost = async () => {
        if (text === "" || !text) {
            return;
        }

        // split image and video files
        const imageFiles = selectedFiles.filter(file => file.type.startsWith("image"));
        const videoFiles = selectedFiles.filter(file => file.type.startsWith("video"));

        // upload files
        const imageUrls = await uploadFilesWithToast(imageFiles);
        const videoUrls = await uploadFilesWithToast(videoFiles);

        // create post
        createPost({
            audience: Audience.Public,
            group: null,
            hashtags: null,
            imageContent: imageUrls,
            mentionedUsers: null,
            taggedUsers: null,
            textContent: text,
            title: text,
            videoContent: videoUrls
        }).then(() => {
            onClose();
        })
    }

    return (
        <div className="create-post-popup">
            <div className="create-post-popup-container">
                <div className="create-post-popup-container-header">
                    <p className="create-post-popup-container-header-title">
                        Create Post
                    </p>
                    <div onClick={onClose}>
                        <AiFillCloseCircle className="create-post-popup-container-header-close"/>
                    </div>
                </div>

                <br/>

                <div className="create-post-popup-container-user">
                    {profilePicture ? <img className="post-header-profile-picture" src={profilePicture}/> :
                        <BiSolidUserCircle className="post-header-profile-picture-null"/>}
                    <div className="create-post-popup-container-user-sub-info">
                        <p className="create-post-popup-container-user-sub-info-name">
                            {user.firstName} {user.lastName}
                        </p>
                        <select className="create-post-popup-container-user-sub-info-privacy">
                            <option value="public">Public</option>
                            <option value="friends">Friends</option>
                            <option value="only-me">Favorites</option>

                        </select>
                    </div>
                </div>

                <div className="create-post-popup-container-body">
                    <textarea
                        className="create-post-popup-container-body-input"
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                        placeholder={`What's on your mind, ${user.firstName}?`}
                    />
                </div>

                <div className="create-post-popup-container-footer">
                    <input
                        type="file"
                        onChange={onFileChange}
                        multiple
                        accept={"image/*, video/*"}
                        ref={fileInputRef}
                    />

                    <div className="create-post-popup-container-footer-container"
                         onClick={onButtonClick}>
                        <div className="create-post-popup-container-footer-container-button">
                            Upload File (Max. 10 files)
                        </div>

                        <div className="create-post-popup-container-footer-container-icons-container">
                            <BsCameraVideoFill
                                className="create-post-popup-container-footer-container-icons-icon-camera"/>
                            <HiPhoto
                                className="create-post-popup-container-footer-container-icons-icon-photo"/>
                        </div>
                    </div>

                    <div className="create-post-popup-container-footer-preview">
                        {selectedFiles.map((file, index) => {
                            const fileURL = URL.createObjectURL(file);
                            return (
                                <div className="photo-container" key={index}>
                                    <button className="delete-button" onClick={onFileRemove(index)}>
                                        <AiFillCloseCircle/>
                                    </button>
                                    <img src={fileURL} alt="preview"/>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div
                    className={text == "" ? "create-post-popup-container-button-unavailable" : "create-post-popup-container-button-available"}
                    onClick={onCreatePost}
                >
                    Post
                </div>
            </div>
        </div>
    )
}
