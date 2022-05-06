import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

const RESCENT_PERIOD_VALUE = 7;

function RecentExpenses() {
  const { expenses } = useContext(ExpensesContext);
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
