import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { FetchStream } from "../../actions";
import flv from "flv.js";

const StreamShow = (props) => {
  const videoRef = useRef();

  useEffect(() => {
    const id = props.match.params.id;
    props.FetchStream(id);
    if (!props.stream) return;
    const flvPlayer = flv.createPlayer({
      type: "flv",
      url: `https://rtmp-server-for-kush.herokuapp.com/live/${id}.flv`,
    });
    flvPlayer.attachMediaElement(videoRef.current);
    flvPlayer.load();
    return () => {
      flvPlayer.destroy();
      console.log(`unmounted`);
    };
  }, []);

  const render = () => {
    return (
      <div>
        <video ref={videoRef} style={{ width: "100%" }} controls />
        <h1>{props.stream.title}</h1>
        <p>{props.stream.description}</p>
      </div>
    );
  };

  return (
    <div>
      {props.auth.isSignedIn === null ? <div>Loading...</div> : render()}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { auth: state.auth, stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { FetchStream })(StreamShow);
