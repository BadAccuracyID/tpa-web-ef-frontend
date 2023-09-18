import {Comment, User} from "../../lib/gql/graphql.ts";
import "../../styles/post.scss";
import {BiSolidCommentDetail, BiSolidUserCircle} from "react-icons/bi";
import {likeComment, unlikeComment} from "../../lib/controllers/post-controller.ts";
import {toast} from "react-toastify";
import {AiFillLike, AiOutlineLike} from "react-icons/ai";

export default function CommentComponent({currentUser, comment, onReplyClick}: {
    currentUser: User,
    comment: Comment,
    onReplyClick: () => void
}) {
    const author = comment.author;
    const profilePicture = author.profilePicture;

    function isCommentLiked() {
        return comment.likedBy!.some(it => it.id == currentUser.id);
    }

    async function onLikeComment() {
        const response = await likeComment(comment.id);
        if (!response.success) {
            toast.error('Failed to like comment', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }

        toast.success('Liked comment', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
        });
        window.location.reload();
    }

    async function onUnlikeComment() {
        const response = await unlikeComment(comment.id);
        if (!response.success) {
            toast.error('Failed to unlike comment', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }

        toast.success('Unliked comment', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
        });
        window.location.reload();
    }

    async function toggleLike() {
        if (isCommentLiked()) {
            await onUnlikeComment();
        } else {
            await onLikeComment();
        }
    }

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
                    <div className="comment-right-buttons-like" onClick={toggleLike}>
                        {
                            isCommentLiked() ?
                                <AiFillLike/> :
                                <AiOutlineLike/>
                        }
                        Like
                    </div>
                    <div className="comment-right-buttons-comment" onClick={onReplyClick}>
                        <BiSolidCommentDetail/>
                        Comment
                    </div>
                </div>
            </div>
        </div>
    )
}
