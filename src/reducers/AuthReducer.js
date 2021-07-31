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
        userId: action.payload.userId,
        fullName: action.payload.fullName,
        email: action.payload.email,
        firstName: action.payload.firstName,
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
