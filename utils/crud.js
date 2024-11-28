import { firebaseDB } from '../services/firebase';
import { collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

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

export async function updateExpense(id, expenseData) {
  try {
    await updateDoc(doc(firebaseDB, "expenses", id), {
      expenseData
    })
  } catch (error) {
    console.error('Fejl i opdatering af udgift:', error);
    throw error;
  }
}

export async function deleteExpense(id) {
  try {
    await deleteDoc(doc(firebaseDB, "expenses", id))
  } catch (error) {
    console.error('Fejl under fjernelse af udgift:', error);
    throw error;
  }
}