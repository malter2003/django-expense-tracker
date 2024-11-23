import "./styles.css";

import React, { useState, useEffect } from "react";
import { API } from "../../api-service";

const BudgetContainer = () => {
  const [accessToken, setAccessToken] = useState(
    JSON.parse(localStorage.getItem("accessToken"))
  );

  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([{ amount: 0 }]);

  const totalExpenses = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
  console.log("Total expenses? :", totalExpenses);
  const expenseVsBudgetPercentageDiff =
    (totalExpenses / budget.amount) * 100;

  useEffect(() => {
    API.fetchBudget(accessToken, setBudget);
    API.fetchExpenses(accessToken, setExpenses);
  }, []);

  return (
    <>
    {budget.amount > 0 ? (
      <div className="col-md-9 mx-auto">
        <div
          id="budget-container"
          className="budget-container font-weight-bold"
          data-test="budget-container"
        >
          <div className="progress" style={{ position: "relative" }}>
            <div
              className={`progress-bar ${
                totalExpenses > budget.amount ? "bg-danger" : "bg-success"
              }`}
              role="progressbar"
              style={{ width: `${Math.min(expenseVsBudgetPercentageDiff, 100)}%` }}
              aria-valuenow={totalExpenses}
              aria-valuemin="0"
              aria-valuemax="100"
              data-test="budget-progress-bar"
            ></div>
            <span
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                color: totalExpenses > budget.amount ? "white" : "black",
                fontWeight: "bold",
              }}
            >
              ${totalExpenses} spent / ${budget.amount}
            </span>
          </div>
          <div
            className="monthly-budget"
            data-test="monthly-budget"
          >
            <span>
                {budget.budget_type} Budget: ${budget.amount}
            </span>
            <div>
              <a
                href={`/update-budget/${budget.id}`}
                className="font-weight-bold"
                data-test="update-budget"
              >
                <span className="badge-pill badge-warning">✎</span>
              </a>
              <a
                href={`/delete-budget/${budget.id}`}
                className="font-weight-bold"
                data-test="delete-budget"
              >
                <span className="badge-pill badge-danger">X</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    ) : null}
  </>
  );
};

export default BudgetContainer;