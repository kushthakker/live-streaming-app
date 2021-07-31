import React from "react";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

const HomeForm = ({ titleValue = "", desciptionValue = "", onSubmit }) => {
  const history = useHistory();
  console.log(history);
  const validationSchema = yup.object({
    title: yup.string().required("Please fill this field"),
    description: yup.string().required("Please fill this field"),
  });
  return (
    <div>
      <Formik
        initialValues={{
          title: `${titleValue}`,
          description: `${desciptionValue}`,
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          onSubmit(data);
          setSubmitting(false);
          resetForm();
          history.replace("/");
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
                autoComplete="off"
              />
            </div>
            {touched.title && errors.title && (
              <div className="ui error  message">
                <div className="header">Action Forbidden</div>
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
                autoComplete="off"
                // style={{ resize: "none" }}
              />
            </div>
            {touched.description && errors.description && (
              <div className="ui error  message">
                <div className="header">Action Forbidden</div>
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

export default HomeForm;
