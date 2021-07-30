export const signIn = (userId, fullName, email) => {
  return {
    type: "SIGN_IN",
    payload: {
      userId,
      fullName,
      email,
    },
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

export const FormSubmit = (valueObject) => {
  return {
    type: "FORM_SUBMIT",
    payload: valueObject,
  };
};
