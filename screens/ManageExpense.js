import { View, StyleSheet, TextInput } from 'react-native';
import { useLayoutEffect, useContext, useState } from 'react';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expensesContext';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { storeExpense, updateExpense, deleteExpense } from '../utils/crud';
import LoadingOverlay from '../components/UI/LoadingOverlay';

export default function ManageExpense({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const expensesContext = useContext(ExpensesContext);

  const selectedExpenseId = route.params?.expenseId;

  // Boolean conversion
  const isEditing = !!selectedExpenseId;

  const selectedExpense = expensesContext.expenses.find(
    expense => expense.id === selectedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Rediger Udgift' : 'Tilføj Udgift',
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      await deleteExpense(selectedExpenseId);
      expensesContext.deleteExpense(selectedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError('Udgift kunne ikke slettes');
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) { 
    setIsSubmitting(true);
    try {
      if (isEditing) {
        // Local update
        expensesContext.updateExpense(selectedExpenseId, expenseData);

        await updateExpense(selectedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
      }
      navigation.goBack();
    } catch (error) {
      setError('Data kunne ikke gemmes');
      setIsSubmitting(false);
    }
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Opdater' : 'Tilføj'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

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
    alignItems: 'center',
  },
});
