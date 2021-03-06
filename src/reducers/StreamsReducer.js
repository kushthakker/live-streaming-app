import _ from "lodash";

const streamsReducer = (state = {}, action) => {
  switch (action.type) {
    case "EDIT_STREAM":
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case "FETCH_STREAM":
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case "CREATE_STREAM":
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case "DELETE_STREAM":
      return _.omit(state, action.payload);

    case "FETCH_ALL_STREAMS":
      return { ...state, ..._.mapKeys(action.payload, "id") };
    default:
      return state;
  }
};

export default streamsReducer;
