import { IS_EDIT_MODE_OFF, IS_EDIT_MODE_ON } from "../actionTypes/actionTypes";

const initialState = {
  isEditMode: false,
};

const editReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_EDIT_MODE_ON:
      return { isEditMode: true };

    case IS_EDIT_MODE_OFF:
      return { isEditMode: false };

    default:
      return state;
  }
};

export default editReducer;
