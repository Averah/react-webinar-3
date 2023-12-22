import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import CommentCard from "../comment-card";

function CommentsList({ comments, onSendNewComment, commentIdWithOpenedForm, onSetCommentFormId, isAuth, t, lang }) {
  const cn = bem("CommentsList");

  return (
    <div className={cn()}>
      <div className={cn("title")}>{t('comments.Title')} ({comments.length})</div>
      {comments.map((comment) => (
        <CommentCard
          isFormOpened={comment._id === commentIdWithOpenedForm}
          onOpenCommentForm={onSetCommentFormId}
          key={comment._id}
          comment={comment}
          onSendNewComment={onSendNewComment}
          isAuth={isAuth}
          t={t}
          lang={lang}
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
    t: PropTypes.func,
    lang: PropTypes.string,
//   onAdd: PropTypes.func,
};

CommentsList.defaultProps = {
    commentIdWithOpenedForm: null,
    onSendNewComment: () => {},
    onSetCommentFormId: () => {},
    t: (text) => text,
//   onAdd: () => {},
};

export default memo(CommentsList);
