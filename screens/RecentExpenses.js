import { Text, StyleSheet, View } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { firebaseDB } from '../services/firebase';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { getDateMinusDays } from '../utils/date';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import { ExpensesContext } from '../store/expenses-context';

export default function RecentExpenses() {
  const {expenses, setExpenses } = useContext(ExpensesContext);
  const [error, setError] = useState(null);
  
  const [values, loading, fetchError] = useCollection(collection(firebaseDB, 'expenses'));
  
  useEffect(() => {
    if (fetchError) {
      setError('Kunne ikke fetche udgifter: ' + fetchError.message);
      return;
    }
  
    if (values) {
      const fetchedExpenses = values.docs.map((doc) => {
        const data = doc.data();
        const date = new Date(data.expenseData.date.seconds * 1000);
  
        return {
          ...data.expenseData, // Spread expenseData properties directly
          id: doc.id,
          date, // Add the converted date
        };
      });
      setExpenses(fetchedExpenses);
      console.log("Converted Expenses:", JSON.stringify(fetchedExpenses, null, 2));
    }
  }, [values, fetchError]); 
  
  if (loading) {
    return <LoadingOverlay />;
  }
  
  if (error || fetchError) {
    return <ErrorOverlay message={error || 'An error occurred'} />;
  }
  
  const today = new Date();
  const date30DaysAgo = getDateMinusDays(today, 30);

  const recentExpenses = expenses.filter((expense) => {
    return expense.date >= date30DaysAgo;
  });
  
  return (
    <View style={styles.container}>
      <ExpensesOutput
        expenses={recentExpenses}
        expensesPeriod="Sidste 30 dage"
        fallbackText="Ingen udgifter registreret de seneste 30 dage"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});