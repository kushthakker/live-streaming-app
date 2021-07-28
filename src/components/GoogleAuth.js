import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";

const GoogleAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          clientId: `109676282292-d33607mi00qg8bbbe5hb872ngsjqnk87.apps.googleusercontent.com`,
          scope: "email",
        })
        .then(() => {
          const auth = gapi.auth2.getAuthInstance();
          setIsLoggedIn(auth.isSignedIn.get());
          auth.isSignedIn.listen(onAuthChange);
        });
    });
  }, [isLoggedIn]);

  const onAuthChange = () => {
    setIsLoggedIn(gapi.auth2.getAuthInstance().isSignedIn.get());
  };

  const onSignInClick = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const onSignOutClick = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  const renderAuthButton = () => {
    if (isLoggedIn === null) {
      return <div>Loading...</div>;
    }
    if (isLoggedIn) {
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

export default GoogleAuth;
