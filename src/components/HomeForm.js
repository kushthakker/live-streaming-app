import React from "react";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { FormSubmit } from "../actions";
import { connect } from "react-redux";

const HomeForm = ({ FormSubmit }) => {
  const validationSchema = yup.object({
    title: yup.string().required("Please fill this field"),
    description: yup.string().required("Please fill this field"),
  });
  return (
    <div>
      <Formik
        initialValues={{ title: "", description: "" }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          console.log(data);
          FormSubmit(data);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ values, isSubmitting, errors, touched }) => (
          <Form className="ui form error">
            <div
              className={`three wide field ${
                touched.title && errors.title ? "error" : ""
              } `}
            >
              <label>Title</label>
              <Field
                name="title"
                component="input"
                type="text"
                placeholder="Title"
                autocomplete="off"
              />
            </div>
            {touched.title && errors.title && (
              <div class="ui error  message">
                <div class="header">Action Forbidden</div>
                <p>{errors.title}</p>
              </div>
            )}
            <div
              className={`five wide field ${
                touched.description && errors.description ? "error" : ""
              } `}
              style={{ marginTop: "3rem" }}
            >
              <label>Description</label>
              <Field
                name="description"
                component="textarea"
                type="text"
                placeholder="Description"
                rows="3"
                autocomplete="off"
                // style={{ resize: "none" }}
              />
            </div>
            {touched.description && errors.description && (
              <div class="ui error  message">
                <div class="header">Action Forbidden</div>
                <p>{errors.description}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="ui button"
              style={{ marginTop: "3rem" }}
            >
              Submit
            </button>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default connect(null, { FormSubmit })(HomeForm);
