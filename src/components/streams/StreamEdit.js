import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import HomeForm from "../HomeForm";
import { connect } from "react-redux";
import { EditStream, FetchStream } from "../../actions";
const StreamEdit = (props) => {
  useEffect(() => {
    props.FetchStream(props.match.params.id);
  }, []);

  const edit = (data) => {
    const id = Number(props.match.params.id);
    props.EditStream(id, data);
  };

  const render = () => {
    if (!props.stream) return <div> Loading... </div>;
    else
      return (
        <div>
          <h2>Edit a Stream</h2>
          <h3>{props.stream.title}</h3>
          <HomeForm
            titleValue={props.stream.title}
            desciptionValue={props.stream.description}
            onSubmit={edit}
          />
        </div>
      );
  };

  return (
    <>
      {props.auth.isSignedIn === null ? (
        <div>Loading...</div>
      ) : props.auth.isSignedIn === true &&
        props.stream.userId === props.auth.userId ? (
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
export default connect(mapStateToProps, {
  FetchStream,
  EditStream,
})(StreamEdit);
