import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api-service";

import CustomForm from "../../components/CustomForm/CustomForm";

const AddBudgetForm = () => {
  const navigate = useNavigate();
  const [accessToken] = useState(
    JSON.parse(localStorage.getItem("accessToken"))
  );
  const [amount, setAmount] = useState(0);
  const [budgetType, setBudgetType] = useState("Monthly"); // Default to monthly
  const [budgetTooHighError, setBudgetTooHighError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (amount > 999999) {
      setBudgetTooHighError(true);
    } else {
      // Include the budget type in the payload
      const payload = JSON.stringify({ amount, budget_type: budgetType });
      API.createBudget(navigate, accessToken, payload, setAmount);
    }
  };

  return (
    <>
      {budgetTooHighError && (
        <p>Ensure that budget amount is not higher than 999,999.</p>
      )}
      <CustomForm
        title="Create Budget:"
        cancelBtn={true}
        onSubmit={handleSubmit}
        dataTestIdForm="create-budget-form"
        dataTestIdSubmitBtn="create-budget-save"
      >
        <p>
          <label>Amount:</label>
          <input
            type="text"
            name="amount"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            data-test="budget-input-amount"
          />
        </p>
        <p>
          <label>Budget Type:</label>
          <select
            name="budgetType"
            className="form-control"
            value={budgetType}
            onChange={(e) => setBudgetType(e.target.value)}
            data-test="budget-input-type"
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </p>
      </CustomForm>
    </>
  );
};

export default AddBudgetForm;
