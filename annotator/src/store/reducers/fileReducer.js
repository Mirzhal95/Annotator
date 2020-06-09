const initialState = {
  file: [],
};

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      return { ...state, file: state.file.concat(action.payload) };

    case "REMOVE":
      return { ...state, file: [] };

    default:
      return state;
  }
};

export default fileReducer;
