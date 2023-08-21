import {User} from "../../lib/gql/graphql.ts";
import "../../styles/create-post.scss";
import {AiFillCloseCircle} from "react-icons/ai";

export default function CreatePostComponent({user, onClose}: { user: User, onClose: () => void }) {
    const profilePicture = "https://student-activity.binus.ac.id/himmat/wp-content/uploads/sites/14/2023/03/jere-pp.jpg";

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
                    <img className="create-post-popup-container-user-profile-picture" src={profilePicture}/>
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
                        placeholder={`What's on your mind, ${user.firstName}?`}/>
                </div>

                {/*<div className="create-post-popup-container-footer">*/}
                {/*    <input type="file"/>*/}
                {/*</div>*/}

                <div className="create-post-popup-container-button-unavailable">
                    Post
                </div>
            </div>
        </div>
    )
}
