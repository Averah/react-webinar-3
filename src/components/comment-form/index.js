import { memo, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";
import "./style.css";

function CommentForm({ parentType, parentId, onSubmit, onCancel, isAuth, t }) {
  const [text, setText] = useState('');
  const cn = bem("CommentForm");

  const submitForm = (e) => {
    e.preventDefault();
    onSubmit(parentType, parentId, text);
    setText('');
  }

  const isParentComment = parentType === 'comment';

  let content = isAuth ? (
    <form onSubmit={submitForm} className={cn('form')}>
      <div className={cn("title")}>
        {isParentComment ? t('commentsForm.NewAnswer') : t('commentsForm.NewComment')}
      </div>
      <textarea
        className={cn("textarea")}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className={cn("buttonsContainer")}>
        <button type="submit">{t('commentsForm.Send')}</button>
        {isParentComment && (
          <button type="button" onClick={onCancel}>
            {t('commentsForm.Cancel')}
          </button>
        )}
      </div>
    </form>
  ) : (
    (
      <div className={cn('authLink')}>
        <Link to="/login">{t('commentsForm.Login')}</Link>, {t('commentsForm.toHaveOportunity')} {isParentComment ? t('commentsForm.respond') : t('commentsForm.comment')}{' '} 
        {isParentComment && <button onClick={onCancel} className={cn("unauthCancelBtn")}>{t('commentsForm.Cancel')}</button>}
      </div>
    )
  )

  return (
    <div className={`${cn()} ${cn(`parent-${parentType}`)}`}>
      {content}
    </div>
  );
}

CommentForm.propTypes = {
    parentType: PropTypes.oneOf(['comment', 'article']),
    isAuth: PropTypes.bool,
    parentId: PropTypes.string,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    t: PropTypes.func,
};

CommentForm.defaultProps = {
  parentId: '',
  onSubmit: () => {},
  onCancel: () => {},
  isAuth: false,
  t: (text) => text,
};

export default memo(CommentForm);
