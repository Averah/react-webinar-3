import { memo, useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import CommentForm from "../comment-form";
import "./style.css";

function getLocalDateMonthYear(d, locale) {
  return (
    d.toLocaleDateString(locale, { day: "numeric", month: "long" }) +
    " " +
    d.toLocaleDateString(locale, { year: "numeric" })
  );
}

function CommentCard({
  comment,
  onSendNewComment,
  isFormOpened,
  onOpenCommentForm,
  isAuth,
  t,
  lang,
  userId,
  pathname,
  clearIsNewComment
}) {
  const cn = bem("CommentCard");

  const closeForm = useCallback(() => {
    onOpenCommentForm(null);
  }, []);

  const date = getLocalDateMonthYear(new Date(comment.dateUpdate), lang);

  const time = new Date(comment.dateUpdate).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const MAX_LEVEL = 5;

  const cardContainerRef = useRef(null);

  useEffect(() => {
    if (comment.isNewComment) {
      cardContainerRef.current?.scrollIntoView();
      clearIsNewComment();
    }
    
  }, [comment.isNewComment])

  return (
    <div
      ref={cardContainerRef}
      className={`${cn()}_${comment.level}`}
      style={{ paddingLeft: `${(comment.level <= MAX_LEVEL ? comment.level - 1 : MAX_LEVEL) * 30}px` }}
    >
      <div className={cn("container")}>
        <div className={cn("header")}>
          <span className={cn("username", {'authorized': userId === comment.author._id})}>{comment.author.profile.name}</span>
          <span className={cn("date")}>
            {date} {t("comments.in")} {time}
          </span>
        </div>
        <div className={cn("text")}>{comment.text}</div>
        <button
          onClick={() => onOpenCommentForm(comment._id)}
          className={cn("responseBtn")}
        >
          {t("comments.Respond")}
        </button>
      </div>
      {isFormOpened && (
        <CommentForm
          isAuth={isAuth}
          parentType="comment"
          parentId={comment._id}
          onSubmit={onSendNewComment}
          onCancel={closeForm}
          t={t}
          pathname={pathname}
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
  clearIsNewComment: PropTypes.func,
  t: PropTypes.func,
  lang: PropTypes.string,
  userId: PropTypes.string,
  pathname: PropTypes.string,
};

CommentCard.defaultProps = {
  onSendNewComment: () => {},
  onOpenCommentForm: () => {},
  clearIsNewComment: () => {},
  t: (text) => text,
};

export default memo(CommentCard);
