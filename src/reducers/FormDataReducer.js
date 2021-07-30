const list = [];

const FormDataReducer = (state = [...list], action) => {
  switch (action.type) {
    case "FORM_SUBMIT":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default FormDataReducer;
