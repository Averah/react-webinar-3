import { memo, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import { Link } from "react-router-dom";
// import "./style.css";

function CommentForm({ parentType, parentId, onSubmit, onCancel, isAuth }) {
  const [text, changeText] = useState('');
  const cn = bem("CommentForm");

  const submitForm = (e) => {
    e.preventDefault();
    onSubmit(parentType, parentId, text)
  }

  const isParentComment = parentType === 'comment';

  if (!isAuth) {
    return (
      <div>
        <Link to="/login">Войдите</Link> чтобы иметь возможность ответить.{' '} 
        <button className={cn("unauthCancelBtn")}>Отменить</button>
      </div>
    );
  }

  return (
    <form className={cn()} onSubmit={submitForm}>
      <div className={cn("title")}>
        {isParentComment ? "Новый ответ" : "Новый комментарий"}
      </div>
      <textarea
        className={cn("textarea")}
        onChange={(e) => changeText(e.target.value)}
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
