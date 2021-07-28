import React, { useEffect } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";
import { gapi } from "gapi-script";

const GoogleAuth = ({ signIn, signOut, isSignedIn }) => {
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          clientId: `109676282292-d33607mi00qg8bbbe5hb872ngsjqnk87.apps.googleusercontent.com`,
          scope: "email",
        })
        .then(() => {
          const auth = gapi.auth2.getAuthInstance();
          onAuthChange(auth.isSignedIn.get());
          auth.isSignedIn.listen(onAuthChange);
        });
    });
  }, []);

  const onAuthChange = (isSignedIn) => {
    if (isSignedIn) signIn();
    else signOut();
  };

  const onSignInClick = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const onSignOutClick = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return <div>Loading...</div>;
    }
    if (isSignedIn) {
      return (
        <button className="ui red google button" onClick={onSignOutClick}>
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else
      return (
        <button className="ui red google button" onClick={onSignInClick}>
          <i className="google icon" />
          Sign in with Google
        </button>
      );
  };

  return <div>{renderAuthButton()}</div>;
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
