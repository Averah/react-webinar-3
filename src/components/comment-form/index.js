import { memo, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";
import "./style.css";

function CommentForm({ parentType, parentId, onSubmit, onCancel, isAuth }) {
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
        {isParentComment ? "Новый ответ" : "Новый комментарий"}
      </div>
      <textarea
        className={cn("textarea")}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className={cn("buttonsContainer")}>
        <button type="submit">Отправить</button>
        {isParentComment && (
          <button type="button" onClick={onCancel}>
            Отмена
          </button>
        )}
      </div>
    </form>
  ) : (
    (
      <div className={cn('authLink')}>
        <Link to="/login">Войдите,</Link> чтобы иметь возможность {isParentComment ? 'ответить' : 'комментировать'}{' '} 
        {isParentComment && <button onClick={onCancel} className={cn("unauthCancelBtn")}>Отмена</button>}
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
//   t: PropTypes.func,
};

CommentForm.defaultProps = {
  parentId: '',
  onSubmit: () => {},
  onCancel: () => {},
  isAuth: false,
  // t: (text) => text,
};

export default memo(CommentForm);
