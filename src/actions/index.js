import streams from "../api/streams";

export const signIn = (userId, fullName, email, firstName) => {
  return {
    type: "SIGN_IN",
    payload: {
      userId,
      fullName,
      email,
      firstName,
    },
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

// export const FormSubmit = (valueObject) => {
//   return {
//     type: "FORM_SUBMIT",
//     payload: valueObject,
//   };
// };

export const CreateStream = (values) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post("/streams", { ...values, userId });
  dispatch({
    type: "CREATE_STREAM",
    payload: response.data,
  });
};

export const DeleteStream = (id) => async (dispatch) => {
  await streams.delete(`/streams/${id}`);
  dispatch({
    type: "DELETE_STREAM",
    payload: id,
  });
};

export const FetchStreams = () => async (dispatch) => {
  const response = await streams.get("/streams");

  dispatch({
    type: "FETCH_ALL_STREAMS",
    payload: response.data,
  });
};

export const EditStream = (id, values) => async (dispatch) => {
  const response = await streams.patch(`/streams/${Number(id)}`, values);
  console.log(response);
  dispatch({
    type: "EDIT_STREAM",
    payload: response.data,
  });
};

export const FetchStream = (id) => async (dispatch) => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({
    type: "FETCH_STREAM",
    payload: response.data,
  });
};
