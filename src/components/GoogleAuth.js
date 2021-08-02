import React, { useEffect } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";
import { gapi } from "gapi-script";

const GoogleAuth = ({ signIn, signOut, isSignedIn }) => {
  let onAuthChange;
  const KEY = process.env.GOOGLE_AUTH;

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          clientId:
            "109676282292-lhnkgvbiq2s1snod03sa4sdnisq7gbgg.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          const auth = gapi.auth2.getAuthInstance();
          onAuthChange(auth.isSignedIn.get());
          auth.isSignedIn.listen(onAuthChange);
        });
    });
  }, [onAuthChange]);

  onAuthChange = (isSignedIn) => {
    if (isSignedIn)
      signIn(
        gapi.auth2.getAuthInstance().currentUser.get().getId(),
        gapi.auth2
          .getAuthInstance()
          .currentUser.get()
          .getBasicProfile()
          .getName(),
        gapi.auth2
          .getAuthInstance()
          .currentUser.get()
          .getBasicProfile()
          .getEmail(),
        gapi.auth2
          .getAuthInstance()
          .currentUser.get()
          .getBasicProfile()
          .getGivenName()
      );
    else signOut();
  };

  const onSignInClick = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const onSignOutClick = () => {
    gapi.auth2.getAuthInstance().signOut();
    // gapi.auth2.getAuthInstance().disconnect();
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
