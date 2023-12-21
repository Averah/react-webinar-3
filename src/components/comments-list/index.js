import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
// import "./style.css";
import CommentCard from "../comment-card";

function CommentsList({ comments, onSendNewComment, commentIdWithOpenedForm, onSetCommentFormId, isAuth }) {
  const cn = bem("CommentsList");

  return (
    <div className={cn()}>
      <span className={cn("username")}>Комментарии ({comments.length})</span>
      {comments.map((comment) => (
        <CommentCard
          isFormOpened={comment._id === commentIdWithOpenedForm}
          onOpenCommentForm={onSetCommentFormId}
          key={comment._id}
          comment={comment}
          onSendNewComment={onSendNewComment}
          isAuth={isAuth}
        />
      ))}
    </div>
  );
}

CommentsList.propTypes = {
    isAuth: PropTypes.bool,
    commentIdWithOpenedForm: PropTypes.string,
    comments: PropTypes.array,
    onSetCommentFormId: PropTypes.func,
    onSendNewComment: PropTypes.func,
//   onAdd: PropTypes.func,
//   t: PropTypes.func,
};

CommentsList.defaultProps = {
    commentIdWithOpenedForm: null,
    onSendNewComment: () => {},
    onSetCommentFormId: () => {},
//   onAdd: () => {},
//   t: (text) => text,
};

export default memo(CommentsList);
