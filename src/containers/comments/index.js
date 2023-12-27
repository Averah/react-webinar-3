import { memo, useCallback, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Spinner from "../../components/spinner";
import { useDispatch, useSelector as useReduxSelector} from "react-redux";
import useSelector from '../../hooks/use-selector';
import shallowequal from "shallowequal";
import commentsActions from "../../store-redux/comments/actions";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import CommentsList from "../../components/comments-list";
import CommentForm from "../../components/comment-form";
import useAuth from "../../hooks/use-auth";

function Comments() {
  const store = useStore();

  const dispatch = useDispatch();

  const params = useParams();
  const location = useLocation();
  const pathname = location.pathname;

  const select = useReduxSelector(
    (state) => ({
      article: state.article.data,
      waiting: state.comments.waiting,
      comments: state.comments.comments,
      commentIdWithOpenedForm: state.comments.commentIdWithOpenedForm,
      formLevel: state.comments.formLevel,
    }),
    shallowequal
  );

  const userId = useSelector((state) => state.session.user._id)

  const options = {
    comments: useMemo(
      () => [
        ...treeToList(listToTree(select.comments), (item, level) => ({
          ...item,
          level,
        })),
      ],
      [select.comments]
    ),
  };

  const [_, ...comments] = options.comments;

  const { t, lang } = useTranslate();
  const { isAuth } = useAuth();

  useInit(() => {
    dispatch(commentsActions.load(params.id));
  }, [params.id, lang]);

  const callbacks = {
    sendComment: useCallback(
      (parentType, parentId, text) => {
        dispatch(commentsActions.send(params.id, parentType, parentId, text));
      },
      [params.id]
    ),
    setCommentIdWithOpenedForm: useCallback((id) => {
      if (id === null) {
        dispatch(commentsActions.setCommentIdWithOpenedForm(id));
        return;
      }

      let commentForAnswerLevel = null;
      for (let idx = 0; idx < comments.length; idx++) {
        if (comments[idx]._id === id) {
          commentForAnswerLevel = comments[idx].level;

          if (idx === comments.length - 1) {
            dispatch(commentsActions.setCommentIdWithOpenedForm(comments[idx]._id, commentForAnswerLevel + 1));
          }
          continue;
        }

        if (idx > 0 && commentForAnswerLevel && commentForAnswerLevel >= comments[idx].level) {
          dispatch(commentsActions.setCommentIdWithOpenedForm( comments[idx - 1]._id, commentForAnswerLevel + 1));
          break;
        }

        if (idx === comments.length - 1) {
          dispatch(commentsActions.setCommentIdWithOpenedForm(comments[idx]._id, commentForAnswerLevel + 1));
          break;
        }
      }
    }, [options.comments]),

    clearIsNewComment: useCallback(() => {
      dispatch(commentsActions.clearIsNewComment());
    }, []),
  };

  return (
    <Spinner active={select.waiting}>
      <CommentsList
        isAuth={isAuth}
        commentIdWithOpenedForm={select.commentIdWithOpenedForm}
        comments={comments}
        onSendNewComment={callbacks.sendComment}
        onSetCommentFormId={callbacks.setCommentIdWithOpenedForm}
        lang={lang}
        t={t}
        userId={userId}
        pathname={pathname}
        clearIsNewComment={callbacks.clearIsNewComment}
        formLevel={select.formLevel}
      />
      {!select.commentIdWithOpenedForm && (
        <CommentForm
          isAuth={isAuth}
          onSubmit={callbacks.sendComment}
          parentType="article"
          parentId={params.id}
          t={t}
          pathname={pathname}
        />
      )}
    </Spinner>
  );
}

export default memo(Comments);
