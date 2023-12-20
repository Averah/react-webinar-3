export default {
    load: (id) => {
      return async (dispatch, getState, services) => {
        dispatch({type: 'comments/load-comments'});
  
        try {
          const res = await services.api.request({
            url: `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
          });
          dispatch({type: 'article/load-success', payload: {data: res.data.result.items}});
  
        } catch (e) {
          dispatch({type: 'article/load-error'});
        }
      }
    },
  }


//http://example.front.ylab.io/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=65817bed5c295a2ff2fcd189
