import { firebaseDB } from '../services/firebase';
import { collection, addDoc, getDocs, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

// Store an expense (add to the 'expenses' collection)
export async function storeExpense(expenseData) {
  try {
    await addDoc(collection(firebaseDB, "expenses"), {
      expenseData
    })
  } catch (error) {
    console.error('Error storing expense:', error);
    throw error;
  }
}

// Fetch all expenses
export async function fetchExpenses() {
  try {
    const [values, loading, error] = useCollection(collection(firebaseDB, "expenses"))
    const expenses = values?.docs.map((doc) => ({...doc.data(), id: doc.id}))

    return expenses;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
}

// Update an expense
export async function updateExpense(id, expenseData) {
  try {
    const expenseRef = doc(firebaseDB, 'expenses', id); // Document reference
    await updateDoc(expenseRef, expenseData); // Update document with new data
  } catch (error) {
    console.error('Error updating expense:', error);
    throw error;
  }
}

// Delete an expense
export async function deleteExpense(id) {
  try {
    const expenseRef = doc(firebaseDB, 'expenses', id); // Document reference
    await deleteDoc(expenseRef); // Delete the document
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }
}