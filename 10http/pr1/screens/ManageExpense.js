import { useLayoutEffect, useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

import IconButton from "../components/UI/IconButton";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";

function ManageExpense({ route, navigation }) {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContext);
  const editedExpensId = route.params?.expenseId;
  const isEditing = !!editedExpensId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpensId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit expense" : "Add expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmiting(true);
    try {
      await deleteExpense(editedExpensId);
      expensesCtx.deleteExpense(editedExpensId);
      navigation.goBack();
    } catch (err) {
      setError("Failed deletion");
    }
    setIsSubmiting(false);
  }
  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHandler(expenseData) {
    setIsSubmiting(true);
    try {
      if (!isEditing) {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id });
      } else {
        expensesCtx.updateExpense(editedExpensId, expenseData);
        updateExpense(editedExpensId, expenseData);
      }
      navigation.goBack();
    } catch (err) {
      setError("Failed to save data");
      setIsSubmiting(false);
    }
  }
  if (error && !isSubmiting) {
    return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;
  }
  if (isSubmiting) {
    return <LoadingOverlay />;
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}
export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
