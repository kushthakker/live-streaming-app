import React, { useEffect } from "react";
import Modal from "../modal";
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

  return (
    <div>
      <Modal
        title="Delete Stream"
        message="Are you sure you want to delete this stream?"
        btn1="Delete"
        btn2="Cancel"
        onDismiss={() => history.replace("/")}
        onAccept={handleDelete}
      />
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
