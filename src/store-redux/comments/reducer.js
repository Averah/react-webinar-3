// Начальное состояние
export const initialState = {
    comments: [],
    waiting: false,
    error: ''
  }
  
  // Обработчик действий
  function reducer(state = initialState, action) {
    switch (action.type) {
      case "commments/load-comments":
        return {...state, data: {}, waiting: true};
  
      case "commments/load-success":
        return {...state, comments: action.payload.items, waiting: false};
  
      case "commments/load-error":
        return {...state, data: {}, waiting: false, error: action.payload};
  
      default:
        return state;
    }
  }
  
  export default reducer;
  