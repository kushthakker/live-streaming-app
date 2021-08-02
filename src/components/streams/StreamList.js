import React, { useEffect } from "react";
import { connect } from "react-redux";
import { FetchStreams } from "../../actions";
import { useHistory, Link } from "react-router-dom";

const StreamList = ({
  streams,
  FetchStreams,
  currentStateId,
  isSignedIn,
  fullName,
}) => {
  const history = useHistory();
  useEffect(() => {
    FetchStreams();
  }, [FetchStreams]);

  const renderAdmin = (stream) => {
    if (stream.userId === currentStateId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      );
    }
  };

  const renderCreateButton = () => {
    if (isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <button
            className="ui button primary"
            onClick={() => history.push("/streams/new")}
          >
            Create Stream
          </button>
        </div>
      );
    }
    return null;
  };

  const renderList = () => {
    return streams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/streams/show/${stream.id}`} className="header">
              {stream.title}
            </Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <div id="homePage">
      {isSignedIn === null ? null : <h2>Welcome {`${fullName}`}</h2>}
      <h2>Streams</h2>
      <div className="ui celled list">{renderList()}</div>
      <div>{renderCreateButton()}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentStateId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
    fullName: state.auth.firstName,
  };
};

export default connect(mapStateToProps, { FetchStreams })(StreamList);
