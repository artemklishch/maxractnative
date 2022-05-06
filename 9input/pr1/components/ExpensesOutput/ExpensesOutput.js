import { View, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";

import ExpensesSummury from "./ExpensesSummury";
import ExpensesList from "./ExpensesList";

function ExpensesOutput({ expenses, expensesPeriod, fallbackOutput }) {
  let content = <Text style={styles.infoText}>{fallbackOutput}</Text>;
  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }
  return (
    <View style={styles.container}>
      <ExpensesSummury expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
