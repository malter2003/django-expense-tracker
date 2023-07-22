import "./styles.css";

import React from "react";

const CustomForm = ({
  title,
  formFields = [],
  formText = "",
  dataTestIdForm = "",
  submitBtnText = "Save",
  submitBtnColor = "primary",
  dataTestIdSubmitBtn = "",
  cancelBtn = false,
  dataTestIdCancelBtn = "",
  onSubmit,
  children,
}) => {
  return (
    <div className='form-container form-group'>
      <h3>{title}</h3>
      <form
        className='font-weight-bold'
        method='post'
        data-test={dataTestIdForm}
        onSubmit={onSubmit}
      >
        {formFields.map((field) => (
          <p>
            <label>{field}:</label>
            <input type='text' name={field} className='form-control'></input>
          </p>
        ))}
        {formText && <p>{formText}</p>}
        {children}
        <button
          type='submit'
          className={`btn btn-${submitBtnColor}`}
          data-test={dataTestIdSubmitBtn}
        >
          {submitBtnText}
        </button>
        {cancelBtn && (
          <button
            className='btn btn-secondary cancel-btn'
            onClick={() => (window.location.href = "/")}
            data-test={dataTestIdCancelBtn}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default CustomForm;
