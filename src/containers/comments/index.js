import {memo, useCallback, useMemo} from 'react';
import {useParams} from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Spinner from '../../components/spinner';
import {useDispatch, useSelector} from 'react-redux';
import shallowequal from 'shallowequal';
import commentsActions from '../../store-redux/comments/actions';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import CommentsList from '../../components/comments-list';
import CommentForm from '../../components/comment-form';
import useAuth from '../../hooks/use-auth';

function Comments() {
  const store = useStore();

  const dispatch = useDispatch();

  const params = useParams();

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.comments.waiting,
    comments: state.comments.comments,
    commentIdWithOpenedForm: state.comments.commentIdWithOpenedForm
  }), shallowequal);

  const options = {
    comments: useMemo(() => ([
      ...treeToList(listToTree(select.comments), (item, level) => (
        { ...item, level }
      ))
    ]), [select.comments]),
  };

  const {t, lang} = useTranslate();
  const { isAuth } = useAuth();

  useInit(() => {
    dispatch(commentsActions.load(params.id));
  }, [params.id, lang]);

  const callbacks = {
    sendComment: useCallback((parentType, parentId, text) => {
      dispatch(commentsActions.send(params.id, parentType, parentId, text));
    }, [params.id]),
    setCommentIdWithOpenedForm: useCallback((id) => {
      dispatch(commentsActions.setCommentIdWithOpenedForm(id));
    }, []),
  }

  const [trash, ...comments] = options.comments;

  return (
    <Spinner active={select.waiting}>
      <CommentsList
        isAuth={isAuth}
        commentIdWithOpenedForm={select.commentIdWithOpenedForm} 
        comments={comments} 
        onSendNewComment={callbacks.sendComment}
        onSetCommentFormId={callbacks.setCommentIdWithOpenedForm} 
      />
      {!select.commentIdWithOpenedForm && (
        <CommentForm isAuth={isAuth} onSubmit={callbacks.sendComment} parentType="article" parentId={params.id} />
      )}
    </Spinner>
  );
}

export default memo(Comments);
