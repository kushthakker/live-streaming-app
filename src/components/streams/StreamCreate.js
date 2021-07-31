import React from "react";
import HomeForm from "../HomeForm";
import { connect } from "react-redux";
import { CreateStream } from "../../actions";

const StreamCreate = ({ CreateStream }) => {
  const edit = (data) => {
    CreateStream(data);
  };
  return (
    <div>
      <h2>Create a Stream</h2>
      <HomeForm onSubmit={edit} />
    </div>
  );
};

export default connect(null, { CreateStream })(StreamCreate);
