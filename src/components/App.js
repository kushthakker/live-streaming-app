import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./Header";
import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import "semantic-ui-css/semantic.min.css";
import LogRocket from "logrocket";

const App = ({ isSignedIn }) => {
  LogRocket.identify(`${isSignedIn}`, {
    name: isSignedIn.fullName,
    email: isSignedIn.email,
  });
  return (
    <div className="ui container">
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={StreamList} />
          <Route path="/streams/new" exact component={StreamCreate} />
          <Route path="/streams/delete" exact component={StreamDelete} />
          <Route path="/streams/edit" exact component={StreamEdit} />
          <Route path="/streams/show" exact component={StreamShow} />
        </div>
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth };
};

export default connect(mapStateToProps)(App);
