import "./styles.css";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api-service";

import AddExpenseButton from "../../components/AddExpenseButton/AddExpenseButton";
import AddBudgetButton from "../../components/AddBudgetButton/AddBudgetButton";
import TotalExpensesContainer from "../../components/TotalExpensesContainer/TotalExpensesContainer";
import Instructions from "../../components/Instructions/Instructions";
import BudgetContainer from "../../components/BudgetContainer/BudgetContainer";
import ExpenseTable from "../../components/ExpenseTable/ExpenseTable";
import Pagination from "../../components/Pagination/Pagination";

import LineChart from "../../charts/LineChart/LineChart";

const Home = ({ accessToken }) => {
  const navigate = useNavigate();
  if (!accessToken) navigate("/accounts/login");

  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(0);
  const [lineChartData, setLineChartData] = useState([]);

  useEffect(() => {
    lineChartData.length === 0 &&
      API.fetchLineChartData(accessToken, setLineChartData);
    expenses.length === 0 && API.fetchExpenses(accessToken, setExpenses);
    !budget && API.fetchBudget(accessToken, setBudget);
  }, []);

  return (
    <>
      <div className='buttons-container'>
        <AddExpenseButton />
        {!budget.amount && <AddBudgetButton />}
      </div>

      <TotalExpensesContainer />

      {!expenses && <Instructions />}

      {budget.amount && <BudgetContainer />}

      {expenses.length < 2 ? (
        <h5 className='text-center instruction'>
          When you have 2 or more expenses your line chart will be displayed.
        </h5>
      ) : (
        <LineChart
          chartData={lineChartData}
          title={"Total expenses by day"}
          xLabel={"Dates"}
          yLabel={"(€) Amounts"}
        />
      )}

      <ExpenseTable expenses={expenses} />

      {/* <Pagination setExpenses={setExpenses}/> */}
    </>
  );
};

export default Home;
