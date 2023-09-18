import {Comment} from "../../lib/gql/graphql.ts";
import "../../styles/post.scss";
import {BiSolidUserCircle} from "react-icons/bi";

export default function CommentComponent({comment}: { comment: Comment }) {
    const author = comment.author;
    const profilePicture = author.profilePicture;
    return (
        <div className="comment">
            {profilePicture ? <img className="comment-picture" src={profilePicture}/> :
                <BiSolidUserCircle className="comment-picture-null"/>}

            <div className="comment-right">
                <div className="comment-right-name">
                    {author.firstName} {author.lastName}
                </div>
                <div className="comment-right-content">
                    {comment.textContent}
                </div>

                <div className="comment-right-buttons">
                    <div className="comment-right-buttons-like">
                        Like
                    </div>
                    <div className="comment-right-buttons-comment">
                        Comment
                    </div>
                </div>
            </div>
        </div>
    )
}
