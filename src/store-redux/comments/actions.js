export default {
  load: (id) => {
    return async (dispatch, _, services) => {
      dispatch({ type: "comments/load-comments" });

      try {
        // лимит такой временно, комментов очень много, сюда наверное в дальнейшем надо прикрутить пагинацию или бесконечную ленту
        const res = await services.api.request({
          url: `/api/v1/comments?search[parent]=${id}&fields=items(*,author(_id,profile(name)))&limit=30`,
        });

        dispatch({
          type: "comments/load-success",
          payload: { items: res.data.result.items },
        });
      } catch (e) {
        dispatch({ type: "comments/load-error" });
      }
    };
  },
  send: (pageId, parentType, parentId, text) => {
    return async (dispatch, _, services) => {
      dispatch({ type: "comments/send-comments" });

      try {
        const res = await services.api.request({
          url: "/api/v1/comments",
          method: "POST",
          body: JSON.stringify({
            text,
            parent: {
              _id: parentId,
              _type: parentType,
            },
          }),
        });

        dispatch({ type: "comments/send-success" });
        dispatch(this.load(pageId));
      } catch (e) {
        dispatch({ type: "comments/send-error" });
      }
    };
  },
  setCommentIdWithOpenedForm: (id) => ({
    type: "comments/set-comment-id-with-opened-form",
    payload: id,
  }),
};
