import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import CommentForm from "../comment-form";
// import "./style.css";

function CommentCard({ comment, onSendNewComment, isFormOpened, onOpenCommentForm, isAuth }) {
  const cn = bem("CommentCard");

  const closeForm = useCallback(() => {
    onOpenCommentForm(null)
  }, []);

  return (
    <div className={cn()}>
      <div className={cn("header")}>
        <span className={cn("username")}>{comment.author.profile.name}</span>
        <span className={cn("date")}>
          {new Date(comment.dateUpdate).toLocaleDateString()}
        </span>
      </div>
      <div className={cn("text")}>{comment.text}</div>
      <button
        onClick={() => onOpenCommentForm(comment._id)}
        className={cn("responseBtn")}
      >
        Ответить
      </button>
      {isFormOpened && (
        <CommentForm
          isAuth={isAuth}
          parentType="comment"
          parentId={comment._id}
          onSubmit={onSendNewComment}
          onCancel={closeForm}
        />
      )}
    </div>
  );
}

CommentCard.propTypes = {
    isAuth: PropTypes.bool,
    comment: PropTypes.object,
    isFormOpened: PropTypes.bool,
    onOpenCommentForm: PropTypes.func,
    onSendNewComment: PropTypes.func,
//   onAdd: PropTypes.func,
//   t: PropTypes.func,
};

CommentCard.defaultProps = {
    onSendNewComment: () => {},
    onOpenCommentForm: () => {},
//   onAdd: () => {},
//   t: (text) => text,
};

export default memo(CommentCard);
