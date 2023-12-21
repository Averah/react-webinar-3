import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import CommentForm from "../comment-form";
import "./style.css";

function getLocalDateMonthYear(d) {
    return d.toLocaleDateString("ru-RU", { day: 'numeric', month: 'long' }) + " " +
           d.toLocaleDateString("ru-RU", { year: 'numeric' });
  }

function CommentCard({ comment, onSendNewComment, isFormOpened, onOpenCommentForm, isAuth }) {
  const cn = bem("CommentCard");

  const closeForm = useCallback(() => {
    onOpenCommentForm(null)
  }, []);

  const date = getLocalDateMonthYear(new Date(comment.dateUpdate));

  const time = new Date(comment.dateUpdate).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
   });

  return (
    <div
      className={cn()}
      style={{ paddingLeft: `${(comment.level - 1) * 30}px` }}
    >
      <div className={cn("container")}>
        <div className={cn("header")}>
          <span className={cn("username")}>{comment.author.profile.name}</span>
          <span className={cn("date")}>
            {date} в {time}
          </span>
        </div>
        <div className={cn("text")}>{comment.text}</div>
        <button
          onClick={() => onOpenCommentForm(comment._id)}
          className={cn("responseBtn")}
        >
          Ответить
        </button>
      </div>
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
