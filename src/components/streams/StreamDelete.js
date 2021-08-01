import React, { useEffect } from "react";
import Modal from "../modal";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { DeleteStream, FetchStream } from "../../actions";

const StreamDelete = (props) => {
  const history = useHistory();

  useEffect(() => {
    props.FetchStream(props.match.params.id);
  }, []);

  const handleDelete = () => {
    props.DeleteStream(props.match.params.id);
    history.replace("/");
  };

  const render = () => {
    return (
      <Modal
        title="Delete Stream"
        message={`Are you sure you want to delete the stream with title : '${props.stream.title}'?`}
        btn1="Delete"
        btn2="Cancel"
        onDismiss={() => history.replace("/")}
        onAccept={handleDelete}
      />
    );
  };

  return (
    <div>
      {props.auth.isSignedIn === null ? (
        <div>Loading...</div>
      ) : props.auth.isSignedIn === true &&
        props.stream.userId === props.auth.userId ? (
        render()
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { FetchStream, DeleteStream })(
  StreamDelete
);
