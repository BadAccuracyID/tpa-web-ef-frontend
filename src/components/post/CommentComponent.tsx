import {Comment} from "../../lib/gql/graphql.ts";
import "../../styles/post.scss";

export default function CommentComponent({comment}: { comment: Comment }) {
    return (
        <div className="comment">
            {comment.textContent}
        </div>
    )
}
