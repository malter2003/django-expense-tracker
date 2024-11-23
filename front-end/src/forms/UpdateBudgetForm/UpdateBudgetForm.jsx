import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../../api-service";

import CustomForm from "../../components/CustomForm/CustomForm";

const UpdateBudgetForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [accessToken] = useState(
    JSON.parse(localStorage.getItem("accessToken"))
  );
  const [budget, setBudget] = useState({ amount: 0, budget_type: "Monthly" });
  const [budgetTooHighError, setBudgetTooHighError] = useState(false);

  useEffect(() => {
    // Fetch the existing budget details
    API.fetchBudget(accessToken, setBudget);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (budget.amount > 999999) {
      setBudgetTooHighError(true);
    } else {
      API.updateBudget(
        navigate,
        accessToken,
        id,
        JSON.stringify({
          amount: budget.amount,
          budget_type: budget.budget_type,
        }),
        setBudget
      );
    }
  };

  const handleTypeChange = (e) => {
    setBudget((prevBudget) => ({
      ...prevBudget,
      budget_type: e.target.value,
    }));
  };

  return (
    <>
      {budgetTooHighError && (
        <p>Ensure that budget amount is not higher than 999,999.</p>
      )}
      <CustomForm
        title="Update Budget:"
        dataTestIdForm="update-budget-form"
        dataTestIdSubmitBtn="update-budget-save"
        cancelBtn={true}
        dataTestIdCancelBtn="update-budget-cancel"
        onSubmit={handleSubmit}
      >
        {/* Amount Field */}
        <p>
          <label>Amount:</label>
          <input
            type="text"
            name="amount"
            className="form-control"
            value={budget.amount}
            onChange={(e) =>
              setBudget((prevBudget) => ({
                ...prevBudget,
                amount: e.target.value,
              }))
            }
            data-test="budget-input-amount"
          ></input>
        </p>

        {/* Budget Type Dropdown */}
        <p>
          <label>Budget Type:</label>
          <select
            name="budget_type"
            className="form-control"
            value={budget.budget_type}
            onChange={handleTypeChange}
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

export default UpdateBudgetForm;
