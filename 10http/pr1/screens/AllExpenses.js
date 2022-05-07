import { useContext, useEffect } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { fetchExpenses } from "../util/http";

function AllExpenses() {
  const { expenses, setExpenses } = useContext(ExpensesContext);
  useEffect(() => {
    async function getExpenses() {
      const expenses = await fetchExpenses();
      setExpenses(expenses);
    }
    getExpenses();
  }, []);
  return (
    <ExpensesOutput
      expenses={expenses}
      expensesPeriod="Total"
      fallbackOutput="No registered expenses found!"
    />
  );
}
export default AllExpenses;
