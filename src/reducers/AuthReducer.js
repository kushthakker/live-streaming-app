const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
  fullName: null,
  email: null,
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload,
        fullName: action.payload.fullname,
        email: action.payload.email,
      };
    case "SIGN_OUT":
      return {
        ...state,
        isSignedIn: false,
        userId: null,
        fullName: null,
        email: null,
      };
    default:
      return state;
  }
};

export default AuthReducer;
