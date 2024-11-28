import { Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expensesContext';

export default function AllExpenses() {
  const expensesContext = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={expensesContext.expenses}
      expensesPeriod="Total"
      fallbackText="Ingen udgifter fundet"
    />
  );
}

const styles = StyleSheet.create({});
