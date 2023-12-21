// Начальное состояние
export const initialState = {
    comments: [],
    waiting: false,
    sendWaiting: false,
    error: '',
    commentIdWithOpenedForm: null,
    isArticleCommonComment: null
  }
  
  // Обработчик действий
  function reducer(state = initialState, action) {
    switch (action.type) {
      case "comments/load-comments":
        return {...state, comments: [], waiting: true};
  
      case "comments/load-success":
        return {...state, comments: action.payload.items, waiting: false};
  
      case "comments/load-error":
        return {...state, comments: [], waiting: false, error: action.payload};

      case "comments/send-comments":
        return {...state, sendWaiting: true};
  
      case "comments/send-success":
        return {...state, sendWaiting: false, commentIdWithOpenedForm: null};
  
      case "comments/send-error":
        return {...state, sendWaiting: false};  

      case "comments/set-comment-id-with-opened-form":
        return {...state, commentIdWithOpenedForm: action.payload};
  
      default:
        return state;
    }
  }
  
  export default reducer;
  