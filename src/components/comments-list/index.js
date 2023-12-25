import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import CommentCard from "../comment-card";

function CommentsList({
  comments,
  onSendNewComment,
  commentIdWithOpenedForm,
  onSetCommentFormId,
  isAuth,
  t,
  lang,
  userId,
  pathname,
  clearIsNewComment
}) {
  const cn = bem("CommentsList");

  return (
    <div className={cn()}>
      <div className={cn("title")}>
        {t("comments.Title")} ({comments.length})
      </div>
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
          userId={userId}
          pathname={pathname}
          clearIsNewComment={clearIsNewComment}
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
  clearIsNewComment: PropTypes.func,
  t: PropTypes.func,
  lang: PropTypes.string,
  userId: PropTypes.string,
  pathname: PropTypes.string
};

CommentsList.defaultProps = {
  commentIdWithOpenedForm: null,
  onSendNewComment: () => {},
  onSetCommentFormId: () => {},
  clearIsNewComment: () => {},
  t: (text) => text,

};

export default memo(CommentsList);
