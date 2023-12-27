export default {
  load: (id) => {
    return async (dispatch, _, services) => {
      dispatch({ type: "comments/load-comments" });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?search[parent]=${id}&fields=items(*,author(_id,profile(name)))&limit=*`,
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
          url: "/api/v1/comments?fields=*,author(_id,profile(name))",
          method: "POST",
          body: JSON.stringify({
            text,
            parent: {
              _id: parentId,
              _type: parentType,
            },
          }),
        });

        dispatch({
          type: "comments/send-success",
          payload: res.data.result
        });
      } catch (e) {
        dispatch({ type: "comments/send-error" });
      }
    };
  },
  setCommentIdWithOpenedForm: (id, formLevel) => ({
    type: "comments/set-comment-id-with-opened-form",
    payload: {
      id,
      formLevel
    },
  }),

  clearIsNewComment: () => ({
    type: "comments/clear-is-new-comment"
  }),
};

