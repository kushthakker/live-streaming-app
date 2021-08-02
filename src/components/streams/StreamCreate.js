import React from "react";
import HomeForm from "../HomeForm";
import { connect } from "react-redux";
import { CreateStream } from "../../actions";
import { Redirect } from "react-router-dom";

const StreamCreate = ({ CreateStream, auth, stream }) => {
  const edit = (data) => {
    CreateStream(data);
  };

  const render = () => {
    return (
      <div>
        <h2>Create a Stream</h2>
        <HomeForm onSubmit={edit} />
      </div>
    );
  };

  return (
    <>
      {auth.isSignedIn === null ? (
        <div>Loading...</div>
      ) : auth.isSignedIn === true ? (
        render()
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};
const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    stream: state.streams[ownProps.match.params.id],
  };
};
export default connect(mapStateToProps, { CreateStream })(StreamCreate);
