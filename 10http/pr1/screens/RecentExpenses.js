import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RESCENT_PERIOD_VALUE = 7;

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const { expenses, setExpenses } = useContext(ExpensesContext);
  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        setExpenses(expenses);
      } catch (err) {
        setError("Failed to load data...");
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);
  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;
  }
  if (isFetching) {
    return <LoadingOverlay />;
  }
  const rescentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, RESCENT_PERIOD_VALUE);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });
  return (
    <ExpensesOutput
      expenses={rescentExpenses}
      expensesPeriod="Last 7 days"
      fallbackOutput="No expenses registered for the last 7 days"
    />
  );
}
export default RecentExpenses;
