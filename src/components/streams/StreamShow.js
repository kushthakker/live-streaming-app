import React, { useEffect } from "react";
import { connect } from "react-redux";
import { FetchStream } from "../../actions";
import { Redirect } from "react-router-dom";

const StreamShow = (props) => {
  console.log(props);
  useEffect(() => {
    props.FetchStream(props.match.params.id);
  }, []);

  const render = () => {
    return (
      <div>
        <h1>{props.stream.title}</h1>
        <p>{props.stream.description}</p>
      </div>
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
  return { auth: state.auth, stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { FetchStream })(StreamShow);
