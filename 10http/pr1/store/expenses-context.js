import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      return [action.payload , ...state];
    }
    case "SET": {
      const inverted = action.payload.reverse();
      return inverted;
    }
    case "DELETE": {
      return state.filter((expense) => expense.id !== action.payload);
    }
    case "UPDATE": {
      const editedExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[editedExpenseIndex];
      const updatedItem = {
        ...updatableExpense,
        ...action.payload.expenseData,
      };
      const updatedExpenses = [...state];
      updatedExpenses[editedExpenseIndex] = updatedItem;
      return updatedExpenses;
    }
    default: {
      return state;
    }
  }
};

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);
  function addExpense(expensesData) {
    dispatch({ type: "ADD", payload: expensesData });
  }
  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }
  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }
  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id, expenseData } });
  }
  return (
    <ExpensesContext.Provider
      value={{
        expenses: expensesState,
        addExpense,
        deleteExpense,
        updateExpense,
        setExpenses,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
